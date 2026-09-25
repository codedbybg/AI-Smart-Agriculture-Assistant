function Button({
    children,
    type = "button",
    onClick,
    disabled = false,
    className = "",
}){
    return(
        <button 
            type={type}
            onClick={onClick}
            disabled = {disabled}
            className={`rounded-lg bg-green-700 px-5 py-2.5 font-medium text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;