import { useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
// https://tanstack.com/virtual/latest/docs/introduction

const VirtualList = ({ count, estimateSize, height, children }) => {
    const parentRef = useRef(null)

    // The virtualizer
    const rowVirtualizer = useVirtualizer({
        count: count,
        getScrollElement: () => parentRef.current,
        estimateSize: () => estimateSize,
    })

    return (
        <>
            {/* The scrollable element for your list */}
            <div
                ref={parentRef}
                style={{
                    height: height,
                    overflow: 'auto', // Make it scroll!
                }}
            >
                {/* The large inner element to hold all of the items */}
                <div
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    {/* Only the visible items in the virtualizer, manually positioned to be in view */}
                    {rowVirtualizer.getVirtualItems().map((virtualItem) => (
                        <div
                            key={virtualItem.key}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: `${virtualItem.size}px`,
                                transform: `translateY(${virtualItem.start}px)`,
                            }}
                        >
                            Row {virtualItem.index}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default VirtualList
