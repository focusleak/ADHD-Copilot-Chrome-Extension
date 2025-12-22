import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
const FrostedContainer = ({
    className,
    rounded,
    shadow,
    children,
    asChild,
    ...props
}) => {
    const Comp = asChild ? Slot : 'div'
    return (
        <Comp
            {...props}
            className={cn(
                'bg-black/40 text-white backdrop-blur-md',
                // 'bg-black/40 text-white backdrop-blur-md hover:opacity-100 opacity-50 transition-opacity',
                { 'rounded-lg': rounded, 'shadow-lg': shadow },
                className
            )}
        >
            {children}
        </Comp>
    )
}
export default FrostedContainer
