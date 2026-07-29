function Button({
    children,
    onClick,
    type="button",
    disabled=false,
    variant="primary",
    className=""
}) {


    const styles = {

        primary:
        `
        bg-[#12304A]
        hover:bg-[#1c4665]
        text-white
        `,


        secondary:
        `
        border
        border-[#12304A]
        text-[#12304A]
        hover:bg-gray-100
        `,


        danger:
        `
        bg-red-700
        hover:bg-red-800
        text-white
        `,


        success:
        `
        bg-green-700
        hover:bg-green-800
        text-white
        `

    };




    return (

        <button

            type={type}

            onClick={onClick}

            disabled={disabled}


            className={`
                px-5
                py-2
                rounded-lg
                font-medium
                transition
                disabled:opacity-50
                ${styles[variant]}
                ${className}
            `}


        >

            {children}


        </button>

    );

}


export default Button;