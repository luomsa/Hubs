import NavMenu from "./components/NavMenu/NavMenu.tsx";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar.tsx";
import styles from "./App.module.css";
function App() {
  const toggleMenu = () => {
    if (
      window
        .getComputedStyle(document.documentElement)
        .getPropertyValue("--mobile-menu-active") === "block"
    ) {
      document.documentElement.style.setProperty(
        "--mobile-menu-active",
        "none",
      );
    } else {
      document.documentElement.style.setProperty(
        "--mobile-menu-active",
        "block",
      );
    }
  };
  return (
    <>
      <NavMenu toggleMenu={toggleMenu} />
      <div className={styles.wrapper}>
        <Sidebar />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
      <ScrollRestoration />
    </>
  );
}

export default App;
