import React from 'react'

import applications from '@/applications'

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
    const { Component } = applications.find(
        ({ name }) =>
            name === new URLSearchParams(window.location.search).get('name')
    ) || {
        Component: Default,
    }
    return (
        <>
            {/* <img width={32} height={32} src={icon} /> */}
            <div className="flex w-full items-center justify-center text-xl">
                <Component className={'absolute top-[20%]'} />
            </div>
        </>
    )
}
export default App
