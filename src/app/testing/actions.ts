'use server';
import prisma from "@/lib/db";

export async function addPortfolio(formdata: FormData) {
    const name = formdata.get('name') as string | "jeff";
    const object = await prisma.testing.create({
        data: {
            id: "12",
            name: name,
            userId: "12"
        }
    })
}