import { AppSidebar } from "@/components/app-sidebar"
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
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  PlusIcon,
  CircleCheck,
  CircleX,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const mockEmployees = [
  {
    id: 1,
    name: "Juan dela Cruz",
    email: "juan@example.com",
    position: "Developer",
    status: "Active",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@example.com",
    position: "Designer",
    status: "Active",
  },
  {
    id: 3,
    name: "Pedro Reyes",
    email: "pedro@example.com",
    position: "Manager",
    status: "Active",
  },
  {
    id: 4,
    name: "Ana Gonzales",
    email: "ana@example.com",
    position: "HR",
    status: "Active",
  },
  {
    id: 5,
    name: "Jose Rizal",
    email: "jose@example.com",
    position: "Accountant",
    status: "Inactive",
  },
]

export default function EmployeesPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader headertitle="Employees Table" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:py-6 lg:px-6">
              {/* Top bar */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Employee List</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage and view all employees
                  </p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <PlusIcon />
                      Add New Employee
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="lg:max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Add New Employee</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="Juan dela Cruz" />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="juan@example.com"
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="position">Position</Label>
                        <Input id="position" placeholder="Developer" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="salary">Base Salary</Label>
                          <Input id="salary" type="number" placeholder="0.00" />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="allowance">Allowance</Label>
                          <Input
                            id="allowance"
                            type="number"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                    </div>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>

                      <Button>Save Employee</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Table */}
              <div className="overflow-hidden rounded-lg border">
                <Table>
                  <TableHeader className="bg-muted">
                    <TableRow>
                      <TableHead className="w-12 pl-6">#</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Position</TableHead>

                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockEmployees.map((emp) => (
                      <TableRow key={emp.id}>
                        <TableCell className="pl-6">{emp.id}</TableCell>
                        <TableCell className="h-12 font-medium">
                          {emp.name}
                        </TableCell>
                        <TableCell>{emp.email}</TableCell>
                        <TableCell>{emp.position}</TableCell>

                        <TableCell className="text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8"
                              >
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
