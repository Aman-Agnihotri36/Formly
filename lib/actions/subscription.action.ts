"use server"
import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { getForms } from "./getForms.action"

type prop = {
    level: string
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    money: any,
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    razorPayId: any,
    subscribed: boolean,
    FormAllow: number
}

export const createSubscription = async (detail: prop) => {

    const user = await currentUser()

    if (!user?.id) {
        throw new Error("User not authenticated");
    }

    const NoOfForms = await getForms()
    const getLengthOfCreatedForms = NoOfForms?.data?.length

    const Allow = getLengthOfCreatedForms! + detail.FormAllow

    const subscription = await prisma.subscription.create({
        data: {
            userId: user?.id,
            subscribed: detail.subscribed,
            razorpayId: detail.razorPayId,
            level: detail.level,
            formAllowed: Allow,
            amount: detail.money,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    });



    return subscription;
}

export const getUserSubscription = async (userId: string) => {

    if (!userId) {
        throw new Error("User not authenticated")
    }
    const subscription = await prisma.subscription.findFirst({
        where: {
            userId: userId
        },
    });

    return subscription
}