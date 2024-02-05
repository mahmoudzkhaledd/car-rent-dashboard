export default function Button({
    children,
    disabled,
    className = "",
    onClick,
    loading,
    btnType,
    color = true,
}) {

    return (
        <button
            type={btnType}
            disabled={disabled}
            onClick={onClick}
            className={` transition ${color && "bg-[color:var(--primary)] text-[color:var(--text)] hover:bg-[color:var(--primary-select)]"} focus:ring-4 font-medium rounded-lg text-sm px-5 py-2   focus:outline-none  ${className}`}>
            {
                !loading ? children :
                    <i className={`fa-solid fa-circle-notch btn__spinner`}></i>
            }

        </button>
    )
}
