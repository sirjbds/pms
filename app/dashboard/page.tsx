"use client"

import { useUser } from "@/context/userContext"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import AdminDashboard from "@/components/dashboard/admin/admin-dashboard"
import EmployeeDashboard from "@/components/dashboard/employee/employee-dashboard"


export default function Page() {
  const { employee, loading } = useUser()

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader headertitle="Dashboard" />

        {loading && <div>Loading...</div>}

        {!loading && employee?.role === "admin" && <AdminDashboard />}
        {!loading && employee?.role === "employee" && <EmployeeDashboard />}
      </SidebarInset>
    </SidebarProvider>
  )
}
