const EmptyState = ({ icon, title, message, ctaText, onCtaClick }) => (
    <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg animate-fade-in">
        <div className="mx-auto text-gray-400">{icon}</div>
        <h3 className="mt-4 text-xl font-semibold text-gray-700">{title}</h3>
        <p className="mt-2 text-gray-500">{message}</p>
        {ctaText && onCtaClick && (
            <button onClick={onCtaClick} className="mt-6 bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition-all">
                {ctaText}
            </button>
        )}
    </div>
);

export default EmptyState;