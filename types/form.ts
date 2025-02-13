export type Fields = {
    name?: string;
    label?: string;
    placeholder?: string;
}
export type Content = {
    formTitle: string;
    formFields: Fields[]
}
export type Form = {
    id: number;
    ownerId: string;
    published: boolean;
    content: Content;
    submission: number;
    shareUrl: string;
}

export type RazorpayOptions = {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;

};