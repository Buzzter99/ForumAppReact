import PropTypes from 'prop-types';

export default function SuccessMessage({ successMessageHeader, successMessageContent }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <div className="w-2/6 p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
                <div className="flex items-center">
                    <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <h3 className="text-lg font-medium">{successMessageHeader}</h3>
                </div>
                <div className="mt-2 mb-4 text-sm">
                    {successMessageContent}
                </div>
            </div>
        </div>
    )
}

SuccessMessage.propTypes = {
    successMessageHeader: PropTypes.string.isRequired,
    successMessageContent: PropTypes.string.isRequired
};