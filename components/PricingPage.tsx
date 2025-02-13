'use client'

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { PricingPlan, pricingPlan } from '@/lib/PricingPlan'
import { Badge } from './ui/badge'


import CheckOut from './CheckOut'
import { Button } from './ui/button'

function PricingPage({ level }: { level?: string }) {



    return (
        <div>
            <div className="text-center mb-8">
                <h1 className="font-extrabold text-3xl">Plan and Pricing</h1>
                <p className="text-gray-500 pt-7 px-5 md:px-0 md:pt-0">
                    Receive unlimited credits when you pay earl, and save your plan.
                </p>
            </div>
            <div className='flex justify-center flex-wrap gap-10'>

                {
                    pricingPlan.map((plan: PricingPlan, index: number) => (
                        <Card key={index} className={` ${plan.level === level ? ('bg-[#1c1c1c] text-white ') : (plan.level == 'Free' && !plan.level ? ('bg-[#1c1c1c] text-white ') : null)} w-[350px] flex flex-col justify-between`}>
                            <CardHeader className="flex flex-row items-center gap-2">
                                <CardTitle>{plan.level}</CardTitle>
                                {
                                    plan.level === 'Pro' && <Badge className="rounded-full bg-orange-600 hover:bg-null">  🔥 Popular</Badge>
                                }
                            </CardHeader>
                            <CardContent className="flex-1">
                                <p className="text-2xl font-bold">{plan.price}</p>
                                <ul className="mt-4 space-y-2">
                                    {plan.services.map((item: string, index: number) => (
                                        <li className="flex items-center" key={index}>
                                            <span className="text-green-500 mr-2">✓</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                {
                                    plan.level == 'Free' ? (<Button>Get Started With Free</Button>) : (<CheckOut price={plan.price} level={plan.level} />)
                                }

                            </CardFooter>
                        </Card>

                    ))
                }
            </div>
        </div>
    )
}

export default PricingPage
