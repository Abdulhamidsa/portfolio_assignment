import { Outlet } from "react-router-dom";
import AppNavbar from "./AppNavbar";

const AppLayout = () => {
  return (
    <>
      <AppNavbar />
      <main className=" pt-5 mt-4 ps-4 pe-4">
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
