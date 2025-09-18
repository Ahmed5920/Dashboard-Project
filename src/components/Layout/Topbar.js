import { FiMenu } from "react-icons/fi";
import Button from "../UI/Button";

const Topbar = ({ toggleSidebar ,open }) => {
  return (
    <div className="flex gap-4 items-center p-4 shadow-md bg-white">
      <Button onClick={toggleSidebar} className={`p-2 ${open ? "ml-64" : " "} transition-all duration-300`}>
        <FiMenu className="text-2xl" />
      </Button>
      <h1 className="text-2xl font-medium">Mini Dashboard</h1>
    </div>
  );
};

export default Topbar;
