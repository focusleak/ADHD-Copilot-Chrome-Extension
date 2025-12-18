import { cn } from '@/lib/utils'

import data from './data.json'
const ToDos = ({ className }) => {
    return (
        <ul className={cn('overflow-hidden p-4', className)}>
            {data.map(({ title, url }) => (
                <li key={url}>
                    <a
                        href={url}
                        className="hover:text-green-500"
                        target="_blank"
                        rel="noreferrer"
                    >
                        {title}
                    </a>
                </li>
            ))}
        </ul>
    )
}
export default ToDos
