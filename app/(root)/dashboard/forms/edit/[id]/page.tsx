import AiGeneratedForm from '@/components/AiGeneratedForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import prisma from '@/lib/prisma';
import React from 'react'

async function Edit({ params }: { params: { id: string } }) {
    const formId = (await params).id



    if (!formId) {
        return <h1>No form id found for id {formId}</h1>;
    }

    const form: any = await prisma.form.findUnique({
        where: {
            id: Number(formId)
        }
    })



    return (
        <div className='md:h-[80%] md:w-[60%]'>
            <Card className=' md:w-full  h-full md:mt-10 mx-auto  '>
                <CardHeader>
                    <CardTitle>
                        <h1 className="font-bold text-2xl text-center">{form?.content?.formTitle || "NA"}</h1>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <AiGeneratedForm form={form} isEditMode={true} />
                </CardContent>
            </Card>
        </div>
    )
}

export default Edit
