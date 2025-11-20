import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}
console.log(cn('btn'))
export function isURL(text) {
    return /^https?:\/\//.test(text)
}
