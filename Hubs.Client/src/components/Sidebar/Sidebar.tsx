import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.tsx";
import NewHubModal from "../NewHubModal/NewHubModal.tsx";
const Sidebar = () => {
  const { state } = useAuth();
  const hideMobileMenu = () => {
    document.documentElement.style.setProperty("--mobile-menu-active", "none");
  };
  return (
    <aside className={styles.sidebar}>
      <ul>
        <li>
          <NavLink className={styles.link} to={"/"} onClick={hideMobileMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={styles.link}
            to={"/popular"}
            onClick={hideMobileMenu}
          >
            Popular
          </NavLink>
        </li>
      </ul>
      <ul>
        <div className={styles.link}>
          {state.user !== null && <NewHubModal />}
        </div>
        {state.user !== null &&
          state.user?.joinedHubs.map((hub) => (
            <li key={hub.hubId}>
              <NavLink
                className={styles.link}
                to={`/hub/${hub.name}`}
                onClick={hideMobileMenu}
              >
                {hub.name}
              </NavLink>
            </li>
          ))}
      </ul>
    </aside>
  );
};
export default Sidebar;
