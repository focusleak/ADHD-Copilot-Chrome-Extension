import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

export default function ({ className, tabsList }) {
    return (
        <Tabs defaultValue={0} className={cn('text-center', className)}>
            <TabsList className="m-auto mb-6">
                {tabsList.map(({ value, label }) => {
                    return (
                        <TabsTrigger key={value} value={value}>
                            {label}
                        </TabsTrigger>
                    )
                })}
            </TabsList>
            {tabsList.map(({ value, Component }) => {
                return (
                    <TabsContent key={value} value={value}>
                        <Component />
                    </TabsContent>
                )
            })}
        </Tabs>
    )
}
