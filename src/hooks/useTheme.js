import { useState, useEffect } from 'react'

export const useTheme = (defaultTheme = 'light') => {
    const [theme, setTheme] = useState(defaultTheme)

    useEffect(() => {
        document.body.className = theme
    }, [theme])

    return [theme, setTheme]
}
