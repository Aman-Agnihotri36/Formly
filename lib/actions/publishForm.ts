'use server'
import { currentUser } from "@clerk/nextjs/server"
import prisma from "../prisma"

export const publishForm = async (formId: number) => {
    try {
        const user = await currentUser()

        if (!user) {
            return { success: false, message: 'User not found' }
        }

        if (!formId) {
            return { success: false, message: 'Form is not found' }
        }

        const form = await prisma.form.findUnique({
            where: {
                id: formId
            }
        })

        if (!form) {
            return { success: false, message: 'Form is not found' }
        }

        if (form.ownerId !== user.id) {
            return { success: false, message: 'Unathorized' }
        }

        await prisma.form.update({
            where: {
                id: formId
            },
            data: {
                published: true
            }
        })
    } catch (error) {
        throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
    }
}