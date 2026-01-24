import React from 'react'
import { useTitle } from '@/hooks/useTitle'

import applications from '@/applications'
import CubeNet from './CubeNet/CubeNet'
import StructuredInterview from '@/applications/StructuredInterview/StructuredInterview'
const Default = () => {
    return (
        <ul className="flex w-full flex-wrap items-center justify-center text-xl">
            {applications.map(({ name }) => {
                return (
                    <li key={name} className="m-4">
                        <a
                            href={`?name=${name}`}
                            className="hover:text-green-500"
                        >
                            {name}
                        </a>
                    </li>
                )
            })}
        </ul>
    )
}
const App = () => {
    const { Component, icon, name } = applications.find(
        ({ name }) =>
            name === new URLSearchParams(window.location.search).get('name')
    ) || {
        Component: Default,
    }
    useTitle(name || 'Applications')
    return (
        <>
            {/* <img width={32} height={32} src={icon} /> */}
            <div className="h-full w-full p-4 text-xl">
                <Component />
                {/* <CubeNet /> */}
            </div>
        </>
    )
}
export default App
