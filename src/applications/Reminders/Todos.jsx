import { cn } from '@/lib/utils'

import data from './data.json'
const ToDos = ({ className }) => {
    return (
        <ul className={cn('p-4', className)}>
            {data.map(({ title, url }) => (
                <li key={url}>
                    <a
                        href={url}
                        className="block overflow-hidden text-nowrap text-ellipsis hover:text-green-500"
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
