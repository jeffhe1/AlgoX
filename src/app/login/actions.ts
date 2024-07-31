'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import prisma from '@/lib/db'
import { randomUUID } from 'crypto'
import crypto from "crypto"

export async function login(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log("inside", error?.name);
    return (false)
  }
  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard')
}


export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    username: formData.get('username') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  })

  if (error) {
    console.log(error);
  }

  try {
    const num_duplicates = await prisma.user.count({
      where: {
        email: data.email,
      },
    })
    if (num_duplicates > 0) {
      return(false)
    }
    const response = await prisma.user.create({
          data:{
            id: crypto.createHash("sha256").update(data.email).digest("hex"),
            email: data.email,
            name: data.username,
          }
        })
        console.log(response);
  } 
  catch (err){
    console.log(1);
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signout() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    redirect('/error')
  }
  redirect('/home')
}