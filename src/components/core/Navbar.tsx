import {NavLink} from "react-router-dom";
import ThemesList from "./ThemesList.tsx";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Application Detector</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 font-bold">
          <li><NavLink className="btn btn-sm btn-ghost drawer-button" to={"/applications"}>Applications</NavLink></li>
          <li><NavLink className="btn btn-sm btn-ghost drawer-button" to={"/sessions"}>Sessions</NavLink></li>
          <li>
            <details>
              <summary className="btn btn-sm btn-ghost drawer-button">Choose theme</summary>
              <ul className="bg-base-200 p-2 z-10">
                <ThemesList />
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar;