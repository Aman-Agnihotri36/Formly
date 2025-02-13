'use client'
import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Checkbox } from './ui/checkbox'
import { Button } from './ui/button'
import { publishForm } from '@/lib/actions/publishForm'
import FormPublishDialog from './shared/FormPublishDialog'

import toast from 'react-hot-toast'
import { submitFormAction } from '@/lib/actions/submitForm.action'

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function AiGeneratedForm({ form, isEditMode }: { form: any, isEditMode: boolean }) {

    const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState<any>({})

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handlePublish = async (e: React.FormEvent) => {
        e.preventDefault()
        if (isEditMode) {
            await publishForm(form.id)
            setSuccessDialogOpen(true)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const data = await submitFormAction(form.id, formData)

        if (data?.success) {
            toast.success(data.message)
            setFormData({})
        }

        if (!data?.success) {
            toast.error(data?.message)
        }
    }
    return (
        <div>
            <form className='w-[265px] md:w-full' onSubmit={isEditMode ? handlePublish : handleSubmit}>
                {
                    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
                    form?.content?.formFields.map((item: any, index: number) => (
                        <div className='mb-4' key={index}>
                            <Label>{item?.label}</Label>
                            {item.type === 'text' ||
                                item.type === 'email' ||
                                item.type === 'date' ||
                                item.type === 'tel' ||
                                item.type === 'number' ||
                                item.type === 'file' ? (
                                <Input onChange={handleChange} type={item.type} name={item.label} placeholder={item.placeholder} required={!isEditMode && item.required} />
                            ) : (
                                item.type === 'textarea' ? (
                                    <Textarea name={item.label} placeholder={item.placeholder} required={true} className='w-full border rounded' />
                                ) : (
                                    item.type === 'dropdown' ? (
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder={item.placeholder}></SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    item.options!.map((option: string, index: number) => (
                                                        <SelectItem key={index} value={option}>
                                                            {option}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    ) : (item.type === 'radio' ? (
                                        <RadioGroup>
                                            {
                                                item.options!.map((option: string, index: number) => (
                                                    <Label key={index} className='flex items-center space-x-2'>
                                                        {option}
                                                        <RadioGroupItem value={option} required={!isEditMode && item.required} />
                                                    </Label>
                                                ))
                                            }
                                        </RadioGroup>
                                    ) : (
                                        item.type === "checkbox" || "select" ? (
                                            item.options!.map((option: string, index: number) => (
                                                <Label key={index}>
                                                    <Checkbox name={item.label} value={option} />
                                                    <span>{option}</span>
                                                </Label>
                                            ))
                                        ) : (
                                            null
                                        )
                                    ))
                                )
                            )
                            }
                        </div>
                    ))
                }

                <Button className='w-full' type='submit'>
                    {isEditMode ? 'Publish' : form.content.submitButton.label ? form.content.submitButton.label : form.content.submitButton.text}
                </Button>
            </form>
            <FormPublishDialog formId={form.id} open={successDialogOpen} onOpenChange={setSuccessDialogOpen} />
        </div>
    )
}

export default AiGeneratedForm
