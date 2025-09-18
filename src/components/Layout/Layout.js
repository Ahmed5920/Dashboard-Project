import { Outlet } from "react-router-dom";
import { Fragment, useContext, useState } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import AppContext from "../../Context/AppContext";
import Notification from "../UI/Notification";
import LoadingSpinner from "../UI/LoadingSpinner";

const Layout = () => {
  const ctx = useContext(AppContext)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <Fragment>
      <div className="flex">
        <Sidebar open={sidebarOpen} />
        <div className={`flex-1 ${sidebarOpen ? "ml-64" : " "} transition-all duration-300`}>
          <Topbar toggleSidebar={toggleSidebar}/>
          <main className="p-6">
            {ctx.notify&& <Notification/>}
            <Outlet />
            {ctx.isLoading&& <LoadingSpinner/> }
          </main>
        </div>
      </div>
    </Fragment>
  );
};

export default Layout;
