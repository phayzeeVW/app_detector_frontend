import { NavLink } from "react-router-dom";
import ThemesList from "./ThemesList.tsx";

const Navbar = () => {
  return (
    <div className="navbar shadow-md">
      <div className="flex-1">
        <NavLink to="/applications" className="btn btn-ghost text-xl">
          Application Detector
        </NavLink>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 font-bold">
          <li>
            <NavLink
              className="btn btn-sm btn-ghost drawer-button"
              to={"/applications"}
            >
              Applications
            </NavLink>
          </li>
          <li>
            <NavLink
              className="btn btn-sm btn-ghost drawer-button"
              to={"/sessions"}
            >
              Sessions
            </NavLink>
          </li>
          <li>
            <details>
              <summary className="btn btn-sm btn-ghost drawer-button">
                Choose theme
              </summary>
              <ul className="bg-base-200 p-2 z-10">
                <ThemesList />
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
