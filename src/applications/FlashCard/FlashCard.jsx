import { cn } from '@/lib/utils'

// 85.60mm × 53.98mm ISO/IEC 7810 rounded corners with a radius of 2.88–3.48
// 3+3⁄8 in × 2+1⁄8 in
const FlashCard = ({ className }) => {
    return (
        <div className={cn('', className)}>
            <div className="h-[2.125in] w-[3.375in] rounded-[0.125in] border">
                ISO/IEC 7810
            </div>
        </div>
    )
}

export default FlashCard
