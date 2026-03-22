import { AppSidebar } from "@/components/app-sidebar"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash2, Eye, PlusIcon, CircleCheck, CircleX } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const mockEmployees = [
    { id: 1, name: "Juan dela Cruz", email: "juan@example.com", position: "Developer", status: "Active" },
    { id: 2, name: "Maria Santos", email: "maria@example.com", position: "Designer", status: "Active" },
    { id: 3, name: "Pedro Reyes", email: "pedro@example.com", position: "Manager", status: "Active" },
    { id: 4, name: "Ana Gonzales", email: "ana@example.com", position: "HR", status: "Active" },
    { id: 5, name: "Jose Rizal", email: "jose@example.com", position: "Accountant", status: "Inactive" },
]

export default function EmployeesPage() {
    return (
        <SidebarProvider
            style={{
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties}
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader headertitle="Employees Table" />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">

                            {/* Top bar */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold">Employee List</h2>
                                    <p className="text-sm text-muted-foreground">
                                        Manage and view all employees
                                    </p>
                                </div>
                                <Button><PlusIcon />Add New Employee</Button>
                            </div>

                            {/* Table */}
                            <div className="rounded-lg border overflow-hidden">
                                <Table>
                                    <TableHeader className="bg-muted">
                                        <TableRow>
                                            <TableHead>#</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Position</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-center">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {mockEmployees.map((emp) => (
                                            <TableRow key={emp.id}>
                                                <TableCell>{emp.id}</TableCell>
                                                <TableCell className="font-medium h-12">{emp.name}</TableCell>
                                                <TableCell>{emp.email}</TableCell>
                                                <TableCell>{emp.position}</TableCell>
                                                <TableCell>
                                                    <Badge variant={emp.status === "Active" ? "default" : "destructive"}>
                                                        {emp.status === "Active"
                                                            ? <CircleCheck className="size-3" />
                                                            : <CircleX className="size-3" />
                                                        }
                                                        {emp.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="size-8">
                                                                <MoreHorizontal className="size-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem>
                                                                <Eye className="size-4" />
                                                                View
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Pencil className="size-4" />
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="text-red-600 focus:text-red-600">
                                                                <Trash2 className="size-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}