import { Skeleton } from "@/components/ui/skeleton"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

export function SidebarSkeleton() {
    return (
        <Sidebar collapsible="offcanvas">
            {/* Header */}
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center gap-2 p-1.5">
                        <Skeleton className="size-5 rounded" />
                        <Skeleton className="h-4 w-36" />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Nav items */}
            <SidebarContent>
                <div className="flex flex-col gap-1 p-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-2 px-2 py-1.5">
                            <Skeleton className="size-4 rounded" />
                            <Skeleton className="h-5 w-40" />
                        </div>
                    ))}
                </div>

                {/* NavSecondary */}
                <div className="mt-auto flex flex-col gap-1 p-2">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-2 px-2 py-1.5">
                            <Skeleton className="size-4 rounded" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                    ))}
                </div>
            </SidebarContent>

            {/* Footer / NavUser */}
            <SidebarFooter>
                <div className="flex items-center gap-2 p-2">
                    <Skeleton className="size-8 rounded-full" />
                    <div className="flex flex-col gap-1">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}