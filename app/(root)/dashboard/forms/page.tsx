import { getForms } from "@/lib/actions/getForms.action";
import FormList from "@/components/FormList";
import GenerateFormInput from "@/components/GenerateFormInput";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React from "react";

const MyForm = async () => {
    const forms = await getForms();

    return (
        <div>
            <section className="flex md:mt-5 md:mx-10 justify-center md:justify-between max-w-7xl mx-auto mb-4">
                <h1 className="font-bold pl-7 md:pl-0 text-2xl md:text-xl">My Forms</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="m-7 md:m-0" variant="outline">
                            {" "}
                            <Plus /> Create New Form
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Write a prompt</DialogTitle>
                            <DialogDescription>
                                Write a clean prompt to get better results.
                            </DialogDescription>
                        </DialogHeader>
                        <GenerateFormInput text={""} />
                    </DialogContent>
                </Dialog>
            </section>
            <div className="flex mt-8 md:mt-8 md:justify-start md:ml-11 flex-wrap justify-center gap-8 md:gap-10">
                {forms?.data?.map((form: any, index: number) => (
                    <FormList key={index} form={form} />
                ))}
            </div>
        </div>
    );
};

export default MyForm;