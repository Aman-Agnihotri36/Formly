import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { Button } from '../ui/button'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { DarkMode } from '../DarkMode'

import Image from 'next/image'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Separator } from '../ui/separator'
import { items } from './Sidebar'

async function Header() {


    return (
        <div className="border-b">

            <nav className="flex items-center px-4 justify-between max-w-7xl mx-auto py-2">
                <Logo />
                <div className="flex items-center gap-4 md:gap-2">

                    <div className='md:hidden block'>
                        <Sheet >
                            <SheetTrigger className="align-middle">
                                <Image src="/menu.svg" alt="menu" width={26} height={26} className="cursor-pointer" />
                            </SheetTrigger>
                            <SheetContent className="flex flex-col gap bg-white md:hidden">

                                <SheetHeader>
                                    <SheetTitle >
                                        <Link href={"/"}>
                                            <h1 className='font-extrabold text-gray-700  text-2xl'>Formly</h1>
                                        </Link>
                                    </SheetTitle>
                                </SheetHeader>


                                <Separator className="border-gray-50" />
                                {/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */}
                                {items.map((item: any, index: number) => (
                                    <Link key={index} href={item.url} className="p-2  text-gray-700  flex hover:bg-gray-100 rounded">
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>

                                ))}
                            </SheetContent>
                        </Sheet>
                    </div>

                    <Link className='hidden md:block' href={"/dashboard/analytics"}>
                        {" "}
                        <Button variant={"link"}>Dashboard</Button>
                    </Link>
                    <div className='flex justify-between items-center gap-5'>
                        <SignedIn>
                            <UserButton signInUrl='/' />

                        </SignedIn>

                        <SignedOut>
                            <Button asChild className="rounded-full size='lg">
                                <Link href='/sign-in'>
                                    Login
                                </Link>
                            </Button>
                        </SignedOut>
                        <DarkMode />
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
