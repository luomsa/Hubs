import styles from "./Sidebar.module.css";
import NavItems from "../NavItems/NavItems.tsx";
const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <NavItems />
    </aside>
  );
};
export default Sidebar;
