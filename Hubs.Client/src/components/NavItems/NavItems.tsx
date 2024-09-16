import { NavLink } from "react-router-dom";

const NavItems = () => {
  return (
    <ul>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/"}>Popular</NavLink>
      </li>
    </ul>
  );
};
export default NavItems;
