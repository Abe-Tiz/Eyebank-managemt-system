const Button = ({ title, icon, ariaLabel }) => {
    return (
        <button
            aria-label={ariaLabel}
            type="button"
            className="flex w-full items-center justify-center space-x-4 rounded-md border border-gray-300 bg-gray-100 py-3 hover:border-purple-400 hover:bg-gray-200 focus:ring-2 focus:ring-purple-400 focus:ring-offset-1 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-purple-600 dark:hover:bg-gray-600"
        >
            {icon}
            <p>{title}</p>
        </button>
    );
};

export default Button;