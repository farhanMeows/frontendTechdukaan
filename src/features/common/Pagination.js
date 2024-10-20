import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ITEMS_PER_PAGE } from "../../app/constants";

export default function Pagination({ page, setPage, handlePage, totalItems }) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  return (
    <div className="flex items-center justify-between border-t border-gray-800 bg-gray-900 px-4 py-3 sm:px-6 text-gray-100">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
          className="relative inline-flex items-center rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all duration-300 ease-out shadow-lg hover:shadow-indigo-500"
        >
          Previous
        </div>
        <div
          onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
          className="relative ml-3 inline-flex items-center rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all duration-300 ease-out shadow-lg hover:shadow-indigo-500"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-400">
            Showing{" "}
            <span className="font-medium text-indigo-400">
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-indigo-400">
              {page * ITEMS_PER_PAGE > totalItems
                ? totalItems
                : page * ITEMS_PER_PAGE}
            </span>{" "}
            of <span className="font-medium text-indigo-400">{totalItems}</span>{" "}
            results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-lg"
            aria-label="Pagination"
          >
            <div
              onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 bg-gray-800 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all duration-300 ease-out shadow-lg hover:shadow-indigo-500"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>

            {Array.from({ length: totalPages }).map((el, index) => (
              <div
                key={index}
                onClick={(e) => handlePage(index + 1)}
                aria-current="page"
                className={`relative z-10 inline-flex items-center cursor-pointer px-4 py-2 text-sm font-semibold ${
                  index + 1 === page
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-800 text-indigo-400 hover:bg-indigo-500 hover:text-white"
                } transition-all duration-300 ease-out shadow-lg hover:shadow-indigo-500`}
              >
                {index + 1}
              </div>
            ))}

            <div
              onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 bg-gray-800 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all duration-300 ease-out shadow-lg hover:shadow-indigo-500"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
