import { z } from "zod";
import { useState } from "react";

const MistryModal = ({ slot, handleOnChange, inputs, handleApply, handleClose }) => {
  const [errors, setErrors] = useState({});

  // Define Zod schema
  const schema = z.object({
    start: z.string().optional().refine(
      (val) => val || inputs.status === "A",
      {
        message: "Start time is required unless attendance is 'A'.",
      }
    ),
    end: z.string().optional().refine(
      (val) => val || inputs.status === "A",
      {
        message: "End time is required unless attendance is 'A'.",
      }
    ),
    status: z.enum(["P", "H", "A", "O"], {
      errorMap: () => ({ message: "Attendance is required." }),
    }),
    advance: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Number(val)), {
        message: "Advance must be a valid number.",
      }),
  });

  const validateAndApply = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault(); // Prevent default form submission behavior
    }

    try {
      // Validate inputs
      schema.parse(inputs);
      setErrors({});
      handleApply(e); // Pass the event object to handleApply
    } catch (err) {
      if (err.errors) {
        // Map Zod errors to state
        const newErrors = {};
        err.errors.forEach((error) => {
          newErrors[error.path[0]] = error.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="bg-slate-200 rounded-xl shadow-lg mb-8 w-full max-w-3xl p-4 sm:p-6 md:p-8 flex flex-col gap-6">
      <h3 className="text-lg sm:text-xl font-bold text-right text-gray-800">Date: {slot}</h3>

      <div>
        <label
          htmlFor="time"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select time:
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 right-0 top-0 flex items-center pr-3 pointer-events-none">
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-myRed focus:border-myRed block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleOnChange}
            value={inputs.start}
          />
          {errors.start && <p className="text-red-500 text-sm">{errors.start}</p>}
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
          <div className="absolute inset-y-0 right-0 top-0 flex items-center pr-3 pointer-events-none">
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-myRed focus:border-myRed block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleOnChange}
            value={inputs.end}
          />
          {errors.end && <p className="text-red-500 text-sm">{errors.end}</p>}
        </div>
      </div>

      <div>
        <label
          htmlFor="status"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Attendance:
        </label>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-myRed focus:border-myRed block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="status"
          id="status"
          onChange={handleOnChange}
          value={inputs.status}
        >
          <option value="">Select</option>
          <option value="P">P</option>
          <option value="H">H</option>
          <option value="A">A</option>
          <option value="O">O</option>
        </select>
        {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
      </div>

      <div>
        <label
          htmlFor="advance"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Advance:
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-myRed focus:border-myRed block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="number"
          name="advance"
          onChange={handleOnChange}
          value={inputs.advance}
        />
        {errors.advance && <p className="text-red-500 text-sm">{errors.advance}</p>}
      </div>

      <div className="flex gap-6 flex-wrap justify-center sm:justify-start">
        <button
          className="py-2 px-6 bg-green-500 rounded-lg text-white font-semibold hover:scale-105 transition-all w-full sm:w-auto"
          onClick={(e) => validateAndApply(e)} // Pass the event object
        >
          Apply
        </button>
        <button
          className="py-2 px-6 bg-red-500 rounded-lg text-white font-semibold hover:scale-105 transition-all w-full sm:w-auto"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MistryModal;