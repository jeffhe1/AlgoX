import { Card, CardContent } from '@/components/ui/card'
import { login, signup } from './actions'
import { createClient } from '@/utils/supabase/server'
import LoginForm from '@/components/login_components/login_form'
import LoginCard from '@/components/login_components/login_card'


async function handleSignInWithGoogle(response:any) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: 'google',
    token: response.credential,
  })
}

export default function LoginPage() {
  return (
    <div className="flex-row content-center w-[500px]">
      <LoginCard/>
    </div>
    
  )
}