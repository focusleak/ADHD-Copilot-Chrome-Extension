export const Link = ({ href, children, ...props }) => {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
        </a>
    )
}
