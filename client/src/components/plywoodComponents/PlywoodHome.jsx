const PlywoodHome = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="text-center h-screen flex justify-center items-center gap-4">
        <div className="px-2 sm:px-4 md:px-6">
          <div className="w-full flex justify-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold py-2 w-fit -mb-2">
              Welcome to{" "}
              <span className=" headingContent block pb-4">Plywood Section</span>
            </h1>
          </div>
          <p className="mt-8 text-lg">
            Your one-stop solution for all carpentry needs. Manage your projects
            efficiently with our innovative tools and features.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlywoodHome;
