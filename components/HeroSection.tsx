'use client'

import React, { useState } from 'react'
import GenerateFormInput from './GenerateFormInput'
import { Button } from './ui/button';

function HeroSection({ allowForm, getLengthOfCreatedForms }: { allowForm?: number, getLengthOfCreatedForms?: number }) {

    type SuggestionText = {
        label: string;
        text: string;
    };

    const suggestionBtnText: SuggestionText[] = [
        {
            label: "Job Application",
            text: "Develop a basic job application form that serves as a one-page solution form collecting essential information from applicants.",
        },
        {
            label: "Registration Form",
            text: "Create a course registration form suitable form any scheool or instituition.",
        },
        {
            label: "Feedback Form",
            text: "Create a client feedback form to gather valuable insights from any clients.",
        },
    ];

    const [text, setText] = useState<string>("")

    return (
        <section>
            <div className="relative pt-10 md:pt-0">

                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-2xl opacity-50 -z-10"></div>

                <div className="container  text-center relative">
                    <h1 className="md:text-4xl text-[30px] font-bold">
                        Build AI-Driven Forms Effortlessly
                    </h1>
                    <p className="mt-4 px-5 md:px-0 text-[18px] ">
                        Leverage the power of AI to create responsive and dynamic froms in
                        minutes
                    </p>
                </div>
            </div>
            <GenerateFormInput allowForm={allowForm} getLengthOfCreatedForms={getLengthOfCreatedForms} text={text} />

            <div className='flex flex-wrap justify-center gap-3'>
                {
                    suggestionBtnText.map((item: SuggestionText, index: number) => (
                        <Button onClick={() => setText(item.text)} key={index} variant={'outline'} className='rounded-full h-10'>{item.label}</Button>
                    ))
                }
            </div>

        </section>
    )
}

export default HeroSection
