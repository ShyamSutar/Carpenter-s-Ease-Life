const UpdateShowAttendance = ({setShow}) => {
  return (
    <div className="bg-slate-200 rounded shadow-sm mb-8 w-[95%] p-2 flex flex-col gap-4">
          <h3 className="float-right font-bold">Date: {}</h3>

          <div>
            <label
              htmlFor="time"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select time:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="time"
                id="time"
                name="start"
                className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-myRed focus:border-myRed block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                // onChange={handleOnChange}
                // value={inputs.start}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="time2"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select time:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="time"
                id="time2"
                name="end"
                className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-myRed focus:border-myRed block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                // onChange={handleOnChange}
                // value={inputs.end}
                required
              />
            </div>
          </div>

          <div className="">
            <label
              htmlFor="time2"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Attendance:
            </label>

            <select
              className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-myRed focus:border-myRed block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="status"
              id=""
            //   onChange={handleOnChange}
            //   value={inputs.status}
            >
              <option value="">select</option>
              <option value="P">P</option>
              <option value="H">H</option>
              <option value="A">A</option>
              <option value="O">O</option>
            </select>
          </div>

          <div className="">
            <label
              htmlFor="time2"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Advance:
            </label>
            <input
              className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-myRed focus:border-myRed block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="Number"
              name="advance"
            //   onChange={handleOnChange}
            //   value={inputs.advance}
            />
          </div>

          <div className="flex gap-4">
            <button
              className="py-2 px-6 bg-green-500 rounded text-white font-semibold hover:scale-105 transition-all"
            //   onClick={handleApply}
            >
              Apply
            </button>
            <button
              className="py-2 px-6 bg-red-500 rounded text-white font-semibold hover:scale-105 transition-all"
              onClick={()=>setShow(false)}
            >
              Close
            </button>
          </div>
        </div>
  )
}

export default UpdateShowAttendance