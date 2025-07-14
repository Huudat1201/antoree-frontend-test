const SkeletonCard = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden"><div className="bg-gray-300 h-48 w-full animate-pulse"></div><div className="p-4"><div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse mb-2"></div><div className="h-4 bg-gray-300 rounded w-full animate-pulse mb-4"></div><div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div><div className="flex justify-between items-center mt-4"><div className="h-8 bg-gray-300 rounded w-1/3 animate-pulse"></div><div className="h-6 bg-gray-300 rounded w-1/4 animate-pulse"></div></div></div></div>
);

export default SkeletonCard;