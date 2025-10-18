export type DashboardWrapperProps = {
    children: React.ReactNode
    role: "admin" | "user"
}

export type CarFormPayload = {
    make: string;
    model: string;
    price: number;
    category: string;
    image: string;
    available: boolean;
}