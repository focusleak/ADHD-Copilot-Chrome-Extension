import { cn } from '@/lib/utils'

const Footer = ({ className }) => {
    return (
        <footer
            className={cn(
                'absolute bottom-0 h-6 w-full text-center text-sm/6 text-white',
                className
            )}
        >
            <a href="https://github.com/focusleak">
                &copy; Copyright 2025 FocusLeak. All rights reserved.
            </a>
        </footer>
    )
}

export default Footer
