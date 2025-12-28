import { useState, useEffect } from 'react'

const useTheme = (defaultTheme = 'light') => {
    const [theme, setTheme] = useState(defaultTheme)

    useEffect(() => {
        document.body.className = theme
    }, [theme])

    return [theme, setTheme]
}
export default useTheme
