"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg">
          {error.message}
        </div>
        <button
          onClick={reset}
          className="mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
