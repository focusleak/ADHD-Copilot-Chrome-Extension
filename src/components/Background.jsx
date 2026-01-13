import { useState, useEffect } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

const getBase64fromURL = async (src) => {
    const res = await fetch(src)
    const filename = res.url.split('?')[1]
    const blob = await res.blob()
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
        reader.onloadend = async () => {
            const base64Data = reader.result
            resolve({ base64: base64Data, filename })
        }
        reader.onerror = () => reject(reader.error)
        reader.readAsDataURL(blob)
    })
}
export const Background = ({
    className,
    style,
    src,
    asChild,
    children,
    ...props
}) => {
    const [base64, setBase64] = useState(null)
    const [filename, setFilename] = useState(null)
    const handleChangeImage = () => {
        if (src) {
            getBase64fromURL(src).then(({ base64, filename }) => {
                setBase64(base64)
                setFilename(filename)
            })
        }
    }
    useEffect(() => {
        handleChangeImage()
    }, [])
    const handleDownload = () => {
        if (base64) {
            const link = document.createElement('a')
            link.href = base64
            link.download = filename
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }
    const Comp = asChild ? Slot : 'div'

    return (
        <Comp
            className={cn('bg-cover bg-center bg-no-repeat', className)}
            style={{ ...style, backgroundImage: `url(${base64})` }}
            {...props}
        >
            {children}
            <span className="absolute right-[120px] bottom-2 flex cursor-pointer gap-1 dark:text-white">
                <span onClick={handleDownload}>下载</span>
                <span onClick={handleChangeImage}>换一张</span>
            </span>
        </Comp>
    )
}
