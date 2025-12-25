const Power = ({ base, exponent, className, ...props }) => {
    return (
        <span className={className} {...props}>
            {base}
            <sup>{exponent}</sup>
        </span>
    )
}

export default Power
