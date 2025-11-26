import React, { useEffect, useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'

import {
    Reminders,
    Calculator,
    CheatSheet,
    Clock,
    VocabularyBook,
    Downloader,
    ImageClipper,
    TextProcessor,
    DailyTrace,
} from '@/applications'
const apps = [
    Reminders,
    Calculator,
    TextProcessor,
    DailyTrace,
    Clock,
    VocabularyBook,
    Downloader,
    CheatSheet,
    ImageClipper,
]

function SheetContainer({ children, name, icon }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <div>
                    <div className="m-4 mb-2 h-10 w-10 overflow-hidden rounded-[9px] shadow-lg">
                        {icon ? (
                            <img src={icon} width="100%" height="100%" />
                        ) : (
                            <span className="">{name[0]}</span>
                        )}
                    </div>
                    <p className="text-center leading-none">{name}</p>
                </div>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle className="text-xl">{name}</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>
                <div className="h-full overflow-auto">{children}</div>
                {/* <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter> */}
            </SheetContent>
        </Sheet>
    )
}

// ToDo - Drag to sort
const Sidebar = ({ className }) => {
    return (
        <div
            className={cn(
                'w-18 bg-white/20 shadow-lg backdrop-blur-md',
                className
            )}
        >
            <ScrollArea className="h-full">
                <ul className="flex-col items-center gap-4">
                    {apps.map(({ name, icon, Component }) => (
                        <li key={name}>
                            <SheetContainer name={name} icon={icon}>
                                <Component />
                            </SheetContainer>
                        </li>
                    ))}
                </ul>
                {/* <ScrollArea.Scrollbar orientation="horizontal"><ScrollArea.Thumb state="hidden" /></ScrollArea.Scrollbar> */}
            </ScrollArea>
        </div>
    )
}
export default Sidebar
