import styles from "../App.module.css";
import Sidebar from "./Sidebar/Sidebar.tsx";

const HubErrorBoundary = () => {
  return (
    <div>
      <div className={styles.wrapper}>
        <Sidebar />
        <main className={styles.main}>
          <h1>There was an error</h1>
        </main>
      </div>
    </div>
  );
};
export default HubErrorBoundary;
