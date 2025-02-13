'use client'



import { RazorpayOptions } from '@/types/form';
import { useRouter } from 'next/navigation';



import Script from 'next/script'
import { Button } from './ui/button';
import { createSubscription } from '@/lib/actions/subscription.action';



declare global {
    interface Window {
        Razorpay: (options: RazorpayOptions) => {
            open: () => void;
            close: () => void;
            on: (event: string, callback: () => void) => void;
        };
    }

}

function CheckOut({ level, price }: { level: string, price: string }) {



    const priceNumber = parseFloat(price.replace(/[^0-9.]/g, ""));
    const amountInCents = Math.round(priceNumber * 100);

    console.log(amountInCents)

    let UserAllowedForm;

    if (amountInCents == 2900) {
        UserAllowedForm = 5
    } else {
        UserAllowedForm = 8
    }


    const router = useRouter();



    const handlePayment = async () => {


        try {
            const response = await fetch("/api/payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: 100 })
            })
            const data = await response.json()


            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
                amount: amountInCents,
                currency: 'USD',
                name: '',
                description: 'Test Transaction',
                order_id: data.orderId,
                handler: function () {



                    const detail = {
                        level,
                        money: amountInCents,
                        razorPayId: data.order.id,
                        subscribed: true,
                        FormAllow: UserAllowedForm
                    }

                    createSubscription(detail)

                    // toast.success("Ticket Purchesed Successfully")




                    router.push('/profile')
                },

                prefill: {
                    name: 'Aman',
                    email: 'johndoe@example.com',
                    contact: '9999999999'
                },
                theme: {
                    color: '#3399cc'
                },


            }

            const rzp1 = window.Razorpay(options)
            rzp1.open();
        }
        catch (error) {
            console.log('PAYMENT FAILED', error)
        }
    }


    return (

        <div>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            {

                <Button onClick={handlePayment} >Get Started with {level}</Button>

            }

        </div>

    )
}

export default CheckOut
