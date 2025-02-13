import Link from "next/link";
import React from "react";
import { Progress } from "../ui/progress";
import { getForms } from "@/lib/actions/getForms.action";
import { getUserSubscription } from "@/lib/actions/subscription.action";
import { MAX_FREE_FORM } from "@/lib/utils";

type Props = {
    userId: string | undefined;
}

const UpgradeButton: React.FC<Props> = async ({ userId }) => {
    const forms = await getForms();
    const isSubscribed = await getUserSubscription(userId!);


    const formsGenerated = forms?.data?.length;



    let percentage;
    if (isSubscribed) {
        percentage = (formsGenerated! / isSubscribed.formAllowed) * 100;
    } else {
        if (formsGenerated! > 3) {
            percentage = (formsGenerated! / formsGenerated!) * 100;
        } else {
            percentage = (formsGenerated! / MAX_FREE_FORM) * 100;
        }


    }




    return (
        <div className="m-3">
            {isSubscribed ? (
                <span className="text-sm">
                    You have a subscription plan, you are eligble to create more forms
                </span>
            ) : (
                <>
                    <Progress value={percentage} />
                    <p>
                        {(formsGenerated! < 3 ? (`${3 - formsGenerated!} forms remains to create`) : ('No forms remain take Subsceription'))}{" "}
                        <Link
                            href={"/dashboard/upgrade"}
                            className="text-blue-600 underline"
                        >
                            {" "}
                            Upgrade{" "}
                        </Link>{" "}
                        to generate more forms
                    </p>
                </>
            )}
        </div>
    );
};

export default UpgradeButton;