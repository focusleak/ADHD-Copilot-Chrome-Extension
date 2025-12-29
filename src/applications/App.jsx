import React from 'react'
import { useTitle } from '@/hooks/useTitle'

import applications from '@/applications'
import CubeNet from './CubeNet/CubeNet'
const Default = () => {
    return (
        <div className="flex w-full items-center justify-center text-xl">
            {applications.map(({ name }) => {
                return (
                    <div key={name} className="m-2">
                        <a href={`?name=${name}`}>{name}</a>
                    </div>
                )
            })}
        </div>
    )
}
const App = () => {
    const { Component, name } = applications.find(
        ({ name }) =>
            name === new URLSearchParams(window.location.search).get('name')
    ) || {
        Component: Default,
    }
    useTitle(name || 'Applications')
    return (
        <>
            {/* <img width={32} height={32} src={icon} /> */}
            <div className="flex w-full items-center justify-center text-xl">
                <Component className={'absolute top-[20%]'} />
                {/* <CubeNet /> */}
            </div>
        </>
    )
}
export default App
