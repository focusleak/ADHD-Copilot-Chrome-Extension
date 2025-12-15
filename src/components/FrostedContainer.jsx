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
                'bg-black/40 backdrop-blur-md text-white',
                { 'rounded-lg': rounded, 'shadow-lg': shadow },
                className
            )}
        >
            {children}
        </Comp>
    )
}
export default FrostedContainer
