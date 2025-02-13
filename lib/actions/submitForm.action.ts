"use server"
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const submitFormAction = async (formId: number, formData: any) => {
    try {
        const user = await currentUser();

        if (!user) {
            return { success: false, message: "User not found" }
        }
        if (!formId) {
            return { success: false, message: "Form id not found" }
        }
        const form = await prisma.form.findUnique({
            where: {
                id: formId
            }
        });
        if (!form) {
            return { success: false, message: "form not found" }
        }
        await prisma.submissions.create({
            data: {
                formId,
                content: formData
            }
        });

        await prisma.form.update({
            where: {
                id: formId
            },
            data: {
                submission: {
                    increment: 1
                }
            }

        });
        return { success: true, message: "Form submitted successsfully." }
    } catch (error) {
        console.log(error);
    }
}