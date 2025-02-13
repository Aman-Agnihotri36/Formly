"use server"

import prisma from "../prisma"
import { currentUser } from "@clerk/nextjs/server"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from 'zod'
import { getUserSubscription } from "./subscription.action";
import { getForms } from "./getForms.action";




export const generateForm = async (prevState: null, formData: FormData) => {
    try {
        const user = await currentUser()
        if (!user) {
            return { success: false, message: 'User not found' }
        }

        const isSubscribed = await getUserSubscription(user?.id)
        const allowForm = isSubscribed?.formAllowed
        const NoOfForms = await getForms()
        const getLengthOfCreatedForms = NoOfForms?.data?.length


        let canCreate = false
        if (isSubscribed) {

            if (allowForm == getLengthOfCreatedForms) {
                await prisma.subscription.delete({
                    where: {
                        userId: user.id
                    }
                })

                return { success: false, message: 'Take the Subscription to Generate more Forms' }
            }


            if (allowForm! > getLengthOfCreatedForms!) {
                canCreate = true

            }

        }

        if (!canCreate && getLengthOfCreatedForms! > 3) {
            return { success: false, message: 'Take the Subscription to Generate more Forms' }

        }


        const schema = z.object({
            description: z.string().min(1, "Description is required")
        })

        const result = schema.safeParse({
            description: formData.get("description") as string
        })

        if (!result.success) {
            return { success: false, message: "Invalid form data", error: result.error.errors }
        }

        const description = result.data.description
        const prompt = `Generate a JSON response for a form with the following structure. Ensure the keys and format remain constant in every response.
        {
          "formTitle": "string",
          "formFields": [
            {
              "label": "string",
              "name": "string",
              "type": "string",
              "placeholder": "string"
            }
          ],
          "submitButton": {
            "label": "string"
          }
        }
        Requirements:
        - Use only the given keys: "formTitle", "formFields", "label", "name", "type", "placeholder", "submitButton".
        - Always include at least 3 fields in the "formFields" array.
        - Keep the field names consistent across every generation for reliable rendering.
        - Provide meaningful placeholder text for each field based on its label.
        - Use appropriate field types such as "text", "email", "date", "tel", "number", and "file".
        - Ensure the "submitButton" object is always included with a relevant label.
        - Use concise, single-word format for both "label" and "name" (e.g., "fullname" instead of "Full Name").
        `;




        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

        const resultAns = await model.generateContent(`${description} ${prompt}`)
        const response = await resultAns.response;
        const output = await response.text();

        const cleanedOutput = output.replace(/```json|```/g, "").trim();

        let formJson;
        try {
            formJson = JSON.parse(cleanedOutput);  // Manually parse the text response into JSON
        } catch (error) {
            console.error("Error parsing JSON response:", error);
            return { success: false, message: "Invalid JSON format", data: undefined };
        }


        const savedForm = await prisma.form.create({
            data: {
                ownerId: user.id,
                content: formJson ? formJson : null
            }
        })


        return { success: true, data: savedForm, message: 'Form Generated Successfully' }
    } catch (error) {
        console.log(error)
    }
}