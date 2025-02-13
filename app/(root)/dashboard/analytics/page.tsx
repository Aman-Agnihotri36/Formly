
import Analytics from '@/components/Analytics'
import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'

const page = async () => {

    const user = await currentUser()

    const submissions = await prisma.form.aggregate({
        where: {
            ownerId: user?.id as string
        },
        _sum: {
            submission: true
        }
    })

    const numberOfSubmissions = submissions._sum.submission || 0
    return (
        <div className='flex justify-center mt-10 md:justify-start  md:mt-8 md:ml-0'>
            <Analytics noOfSubmissions={numberOfSubmissions || 0} />
        </div>
    )
}

export default page