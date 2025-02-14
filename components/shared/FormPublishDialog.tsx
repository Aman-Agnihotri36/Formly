import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '../ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { LinkIcon } from "lucide-react";
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';




type Props = {
    formId: number,
    open: boolean,
    onOpenChange: (open: boolean) => void
}

function FormPublishDialog({ formId, open, onOpenChange }: Props) {

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

    const copyClipboard = () => {
        const Link = `${BASE_URL}/form/${formId}`
        navigator.clipboard.writeText(Link)
        toast.success('Copied to clipboard')
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Your Form has been successfully published!</DialogTitle>
                    <DialogDescription>
                        You can now share your form with the workd and start collection
                        response.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <p>Your form is now live and can be accessed at the following URL:</p>
                    <br />
                    <div className="flex items-center justify-between mt-4 gap-2">
                        <LinkIcon />
                        <Input
                            placeholder="link"
                            disabled
                            className="w-full outline-none bg-gray-100 dark:bg-gray-800"
                            value={`${BASE_URL}/form/${formId}`}
                        />
                        <Button onClick={copyClipboard}>Copy</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default FormPublishDialog
