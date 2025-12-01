import { cn } from '@/lib/utils'
const Container = ({ className, children }) => {
    return (
        <div
            className={cn('bg-white/20 shadow-lg backdrop-blur-md', className)}
        >
            {children}
        </div>
    )
}
export default Container