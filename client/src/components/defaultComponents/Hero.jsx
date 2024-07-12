const Hero = () => {
  return (
    <div className="text-center h-screen flex justify-center items-center gap-4">
            <div>
              <div className="w-full flex justify-center">
                <h1 className="text-5xl font-semibold py-2 w-fit">Welcome to <span className=" headingContent block">Carpenter&apos;s Ease Life</span></h1>
              </div>
              <p className="mt-8 text-lg">Your one-stop solution for all carpentry needs. Manage your projects efficiently with our innovative tools and features.</p>
              <div className="flex justify-center gap-2 mt-8">
                <button type="button" className="focus:outline-none text-white bg-myRed hover:bg-red-700 font-medium rounded text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Get Started</button>
                <button type="button" className="focus:outline-none text-myRed border border-myRed hover:bg-gray-400 hover:border-gray-400 hover:text-white font-medium rounded text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 transition-all">Get Started</button>
              </div>
            </div>
        </div>
  )
}

export default Hero