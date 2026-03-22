"use client"

import * as React from "react"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Settings2Icon, CommandIcon, LayoutDashboard, Users, CalendarClock, Banknote, FileText } from "lucide-react"
import { useUser } from "@/context/userContext"
import { SidebarSkeleton } from "./dashboard/sidebar-skeleton"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    { title: "Dashboard", url: "/dashboard", icon: <LayoutDashboard />, roles: ["admin", "employee"] },
    { title: "Employees", url: "/dashboard/employees", icon: <Users />, roles: ["admin"] },
    { title: "Attendance Logs", url: "dashboard/attendance-logs", icon: <CalendarClock />, roles: ["admin", "employee"] },
    { title: "Payroll", url: "/payroll", icon: <Banknote />, roles: ["admin"] },
    { title: "Generated Payrolls", url: "/generated-payrolls", icon: <FileText />, roles: ["admin"] },
  ],

  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: (
        <Settings2Icon
        />
      ),
    },
  ],

}



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { employee, loading } = useUser()

  if (loading) return <SidebarSkeleton />
  if (!employee) return <SidebarSkeleton />

  const userRole = employee?.role;

  const filteredNav = data.navMain.filter((item) =>
    item.roles.includes(userRole)
  )



  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <CommandIcon className="size-5!" />
                <span className="text-base font-bold">Digitech Solutions</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNav} />

        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
