"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  AlarmClockCheck,
  AlarmClockOff,
  BadgeCheck,
  Clock,
  Hourglass,
  LogIn,
  Users,
} from "lucide-react"
export default function EmployeeDashboard() {
  const [user, setUser] = useState<any>(null)
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const supabase = createClient()

  const today = new Date().toISOString().split("T")[0]

  // ✅ Get current user
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      console.log(user)
    }
    getUser()
  }, [])

  // ✅ Fetch today's logs
  const fetchLogs = async (userId: string) => {
    const { data, error } = await supabase
      .from("attendance_logs")
      .select("*")
      .eq("user_id", userId)
      .gte("timestamp", today)
      .order("timestamp", { ascending: true })

    if (!error) setLogs(data || [])
  }

  useEffect(() => {
    if (user) {
      fetchLogs(user.id)
    }
  }, [user])

  // ✅ Determine status
  const lastLog = logs[logs.length - 1]
  const isTimedIn = lastLog?.type === "time_in"

  // ✅ Time In
  const handleTimeIn = async () => {
    console.log("Time In clicked")

    if (!user) {
      console.error("No user found")
      return
    }

    setLoading(true)

    const { data, error } = await supabase
      .from("attendance_logs")
      .insert([
        {
          user_id: user.id,
          type: "time_in",
        },
      ])
      .select()

    console.log("Insert result:", data)

    if (error) {
      console.error("Time In error:", error)
      alert(error.message)
      setLoading(false)
      return
    }

    console.log("Time In success")

    await fetchLogs(user.id)
    setLoading(false)
  }

  // ✅ Time Out
  const handleTimeOut = async () => {
    if (!user) return
    setLoading(true)

    await supabase.from("attendance_logs").insert([
      {
        user_id: user.id,
        type: "time_out",
      },
    ])

    await fetchLogs(user.id)
    setLoading(false)
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 p-6 md:gap-6 md:p-6">
          <div className="space-y-6">
            {/* Header */}

            {/* Today Card */}
            <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs sm:grid-cols-2 dark:*:data-[slot=card]:bg-card">
              {/* LEFT — Attendance */}
              <Card className="@container/card overflow-hidden">
                <CardHeader>
                  <h1 className="text-xl font-bold">Attendance</h1>
                  <p className="text-muted-foreground">
                    Manage your daily time logs
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status Today:</span>

                    <Badge
                      className={
                        isTimedIn
                          ? "border border-green-800 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                          : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
                      }
                    >
                      <AlarmClockCheck data-icon="inline-start" />
                      {isTimedIn ? "Timed In" : "Not Timed In"}
                    </Badge>
                  </div>

                  {!isTimedIn ? (
                    <Button
                      onClick={handleTimeIn}
                      disabled={loading}
                      className="w-full"
                    >
                      {loading ? "Processing..." : "Time In"}
                    </Button>
                  ) : (
                    <Button
                      variant="destructive"
                      onClick={handleTimeOut}
                      disabled={loading}
                      className="w-full bg-red-500 text-white hover:bg-red-600"
                    >
                      {loading ? "Processing..." : "Time Out"}
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* RIGHT — Stats Cards */}
              <Card className="@container/card flex h-full flex-col overflow-hidden">
                <CardHeader className="relative flex-1">
                  <CardDescription className="text-xl font-bold">
                    Total Rendered Hours
                  </CardDescription>
                  <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    4 hrs.
                  </CardTitle>
                  <Clock className="absolute top-1/2 right-4 size-16 -translate-y-1/2 text-primary/10" />
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                  <div className="text-muted-foreground">
                    Your total hours so far
                  </div>
                </CardFooter>
              </Card>
            </div>

            {/* Logs */}

            <CardHeader className="px-6 py-2">
              <CardTitle className="text-lg font-bold">Today's Logs</CardTitle>
            </CardHeader>

            <Card className="gap-0 p-0">
              <CardContent className="p-0">
                {logs.length === 0 ? (
                  <p className="p-4 text-sm text-muted-foreground">
                    No logs yet
                  </p>
                ) : (
                  <Table>
                    <TableHeader className="sticky top-0 z-10 bg-muted">
                      <TableRow>
                        <TableHead className="text-center">Time</TableHead>
                        <TableHead className="text-center">Type</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {logs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="text-center">
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge
                              className={
                                log.type === "time_in"
                                  ? "border border-green-300 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300"
                                  : "border border-red-300 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
                              }
                            >
                              {log.type === "time_in" ? (
                                <AlarmClockCheck className="size-3.5" />
                              ) : (
                                <AlarmClockOff className="size-3.5" />
                              )}
                              {log.type.replace("_", " ")}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
