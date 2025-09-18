import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import ItemForm from "../Table/ItemForm";

const Sidebar = ({ open }) => {
  const [showForm,setShowForm] = useState(false);
  return (
    <div>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 font-semibold text-gray-700">Welcome</div>
        <nav className="flex flex-col gap-4 p-4">
          <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
          <Button className="flex justify-center items-center p-3 mt-2 bg-blue-600 text-white cursor-pointer" onClick={()=>setShowForm(true)}>
              <FiPlus className="text-xl mr-1"/>
              New Entry
          </Button>
        </nav>
      </div>
      {showForm && <Modal open={showForm} onClose={() => setShowForm(false)}>
          <ItemForm onClose={() => setShowForm(false)} formTitle={"Create Entry"}/>
        </Modal>}
    </div>
  );
};

export default Sidebar;
