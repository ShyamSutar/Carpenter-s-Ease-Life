const Loading = () => {
  return (
    <>
         <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
    <div className="flex flex-col items-center">
      <svg
        className="animate-spin h-12 w-12 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
      <p className="mt-2 text-gray-700">Loading, please wait...</p>
    </div>
  </div>
    </>
  )
}

export default Loading