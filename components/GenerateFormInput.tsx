'use client'

import React, { useActionState, useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useFormStatus } from 'react-dom'
import { Sparkles } from 'lucide-react'
import { generateForm } from '@/lib/actions/generateForm.action'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function GenerateFormInput({ allowForm, getLengthOfCreatedForms, text }: { allowForm?: any, getLengthOfCreatedForms?: number, text: string }) {
    type InitialState = {
        message: string;
        success: boolean;
        data?: any;
    };



    const router = useRouter()




    const initialState: InitialState = {
        message: "",
        success: false

    };

    const [state, formAction] = useActionState(generateForm, initialState);
    const [description, setdescription] = useState<string>(text)

    useEffect(() => {
        setdescription(text)
    }, [text])


    useEffect(() => {
        if (state?.success) {
            toast(state.message)
            router.push(`/dashboard/forms/edit/${state?.data?.id}`)

        }


    }, [state])

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const handleChange = (e: any) => {
        setdescription(e.target.value)
    }

    const handleClick = () => {
        if (!allowForm && getLengthOfCreatedForms! == 3) {
            toast('Your Free Plain Expeired')
            router.push('/dashboard/upgrade')
        }
    }



    return (
        <form action={formAction} className='flex items-center px-5  gap-4 my-8'>

            {
                !allowForm && getLengthOfCreatedForms! == 3 ? (<Input
                    onChange={(e) => handleChange(e)}
                    name="description"

                    value={description}
                    type="text"
                    placeholder="Write a prompt to generate form..."

                />) : (
                    <Input
                        onChange={(e) => handleChange(e)}
                        name="description"

                        value={description}
                        type="text"
                        placeholder="Write a prompt to generate form..."
                        required
                    />
                )
            }

            {
                !allowForm && getLengthOfCreatedForms! == 3 ? <Button onClick={handleClick} className='h-11 bg-gradient-to-r from-blue-500 to bg-purple-600'> GetPlan</Button> : <SubmitButton />
            }
        </form>
    )
}

export default GenerateFormInput


const SubmitButton = () => {
    const { pending } = useFormStatus()

    return (
        <Button className='h-12 bg-gradient-to-r from-blue-500 to bg-purple-600'>
            <Sparkles />
            {
                pending ? (
                    <span>Generating Form...</span>
                ) : ("Generate Form")
            }
        </Button>
    )
}