import { UserProvider } from "@/context/userContext"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <UserProvider>
        {children}
        </UserProvider>
    )
}