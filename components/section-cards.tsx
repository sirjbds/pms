"use client"

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CalendarCheck, Users } from "lucide-react"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card overflow-hidden">
        <CardHeader className="relative">
          <CardDescription>Total Employees</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            4
          </CardTitle>
          <Users className="absolute right-4 top-1/2 -translate-y-1/2 size-16 text-primary/10" />
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Total headcount in the company
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card overflow-hidden">
        <CardHeader className="relative">
          <CardDescription>Present Employees</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            5
          </CardTitle>
          <CalendarCheck className="absolute right-4 top-1/2 -translate-y-1/2 size-16 text-primary/10" />
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Based on today&apos;s attendance logs
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
