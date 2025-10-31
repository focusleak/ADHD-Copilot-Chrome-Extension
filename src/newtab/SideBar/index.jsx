import React, { useEffect, useState, useRef } from 'react'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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

import Reminders from '../Reminders'
const apps = [
    Reminders
    // { name: 'Calculator' },
]

function SheetContainer({ children, name }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <div>
                    <div className="m-2 h-12 w-12 rounded-2xl shadow-lg"></div>
                    <p className="text-center">{name}</p>
                </div>
            </SheetTrigger>
            <SheetContent side="left">
                {/* <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader> */}
                {children}
                {/* <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter> */}
            </SheetContent>
        </Sheet>
    )
}
const Sidebar = () => {
    return (
        // 毛玻璃
        <ul className="absolute top-0 left-0 flex h-full w-16 flex-col items-center bg-white/20 shadow-lg backdrop-blur-md">
            {apps.map(({ name, Component }) => (
                <li key={name} className="transition hover:scale-110">
                    <SheetContainer name={name}>
                        <Component />
                    </SheetContainer>
                </li>
            ))}
        </ul>
    )
}
export default Sidebar
