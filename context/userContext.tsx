"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

type Employee = {
    id: string
    full_name: string
    role: "employee" | "admin"
    email: string
    // hourly_rate: number
    // created_at: string
}

type UserContextType = {
    employee: Employee | null
    loading: boolean
}

const UserContext = createContext<UserContextType>({ employee: null, loading: true })

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [employee, setEmployee] = useState<Employee | null>(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const fetchEmployee = async () => {
            const { data } = await supabase.auth.getClaims()
            const user = data?.claims

            // console.log(user)

            if (!user) return setLoading(false)

            const { data: employeeData } = await supabase
                .from("employees")
                .select("*")
                .eq("id", user.sub)   //  getClaims uses user.sub instead of user.id
                .single()

            setEmployee({ ...employeeData, email: user.email })
            setLoading(false)
        }

        fetchEmployee()
    }, [])

    return (
        <UserContext.Provider value={{ employee, loading }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)