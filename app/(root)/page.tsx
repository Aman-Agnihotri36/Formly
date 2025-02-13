
import HeroSection from "@/components/HeroSection";
import PricingPage from "@/components/PricingPage";
import Footer from "@/components/shared/Footer";
import { getForms } from "@/lib/actions/getForms.action";
import { getUserSubscription } from "@/lib/actions/subscription.action";
import { currentUser } from "@clerk/nextjs/server";




export default async function Home() {

  const user = await currentUser()

  if (!user) {
    return
  }

  const isSubscribed = await getUserSubscription(user?.id)
  const level = isSubscribed?.level
  let allowForm = undefined;
  if (isSubscribed) {
    allowForm = 1
  }
  const NoOfForms = await getForms()
  const getLengthOfCreatedForms = NoOfForms?.data?.length


  return (
    <div className='grid items-center justify-items-center min-h-screen  gap-16 sm:p-20 '>
      <HeroSection allowForm={allowForm} getLengthOfCreatedForms={getLengthOfCreatedForms} />
      <PricingPage level={level} />
      <Footer />
    </div>
  );
}
