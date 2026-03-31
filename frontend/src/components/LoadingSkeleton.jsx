const LoadingSkeleton = ({ type = 'page' }) => {
  if (type === 'hero') {
    return (
      <div className="relative h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="h-12 w-64 bg-gray-700 rounded mx-auto"></div>
            <div className="h-6 w-96 bg-gray-700 rounded mx-auto"></div>
            <div className="h-10 w-32 bg-gray-700 rounded mx-auto mt-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 animate-pulse">
        <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 animate-pulse">
      <div className="h-16 bg-gray-300 dark:bg-gray-800"></div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-gray-300 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
