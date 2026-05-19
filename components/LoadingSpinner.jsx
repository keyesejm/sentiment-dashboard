export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
      </div>
      <p className="text-gray-600 text-center">
        Analyzing articles for sentiment...
      </p>
      <p className="text-sm text-gray-400 text-center mt-2">
        This may take a few seconds
      </p>
    </div>
  );
}
