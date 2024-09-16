import NavMenu from "./components/NavMenu/NavMenu.tsx";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar.tsx";
import styles from "./App.module.css";
function App() {
  return (
    <>
      <NavMenu />
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
