const CarpenterSearchList = ({ mistry, sendNotification }) => {
  return (
    <>
      <div className="mt-4 mr-2 flex justify-center">
        <div className="rounded-md border bg-slate-100 shadow-md w-[70vw]">
          <div className="w-full p-4">
            <h2 className="font-semibold">Name: {mistry.username}</h2>
            <h2 className="font-semibold">Email: {mistry.email}</h2>
          </div>

          <div className="flex gap-2 m-4">
            <button
              className="bg-green-500 hover:bg-green-600 transition-all text-white px-6 py-2 rounded-md"
              onClick={() => sendNotification(mistry)}
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarpenterSearchList;
