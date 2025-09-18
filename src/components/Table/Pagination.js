import Button from "../UI/Button";
import { GoArrowRight , GoArrowLeft} from "react-icons/go";

const Pagination = ({currPage,setCurrPage,totalPages}) => {
  let pagesNumber = [];
  const getItemProps = (index) => ({
    onClick: () => setCurrPage(index),
    className: `px-3 py-1 rounded-lg border transition ${
      currPage === index
        ? "bg-gray-800 text-white border-gray-800"
        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
    }`,
  });

  for (let index = 0; index < totalPages; index++) {
    pagesNumber[index] = index+1 ;

  }

  const next = () => {
    if (currPage === totalPages) return;
    setCurrPage((prev) => prev + 1);
  };

  const prev = () => {
    if (currPage === 1) return;
    setCurrPage((prev) => prev - 1);
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={prev}
        disabled={currPage === 1}
        className={`flex items-center gap-2 px-3 py-1 rounded-lg border transition ${
          currPage === 1
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "text-gray-700 border-gray-300 hover:bg-gray-100"
        }`}
      >
        <GoArrowLeft strokeWidth={2} className="h-4 w-4" />
        Previous
      </Button>

      {/* Numbered Buttons */}
      <div className="flex items-center gap-2">
        {pagesNumber.map((num) => (
          <Button key={num} {...getItemProps(num)}>
            {num}
          </Button>
        ))}
      </div>

      <Button
        onClick={next}
        disabled={currPage === totalPages}
        className={`flex items-center gap-2 px-3 py-1 rounded-lg border transition ${
          currPage === totalPages
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "text-gray-700 border-gray-300 hover:bg-gray-100"
        }`}
      >
        Next
        <GoArrowRight strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
