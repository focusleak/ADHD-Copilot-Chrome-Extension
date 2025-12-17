import { useEffect, useState } from 'react'
const useURLParams = () => {
    const [params, setParams] = useState(new URLSearchParams(window.location.search))
    useEffect(() => {
        const handleURLChange = () => {
            setParams(new URLSearchParams(window.location.search))
        }
        window.addEventListener('popstate', handleURLChange)
        return () => {
            window.removeEventListener('popstate', handleURLChange)
        }
    }, [])
    
}
