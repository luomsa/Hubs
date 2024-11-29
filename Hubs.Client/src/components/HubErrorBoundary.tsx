import styles from "../App.module.css";

const HubErrorBoundary = () => {
  return (
    <div>
      <div className={styles.wrapper}>
        <main className={styles.main}>
          <h1>There was an error</h1>
        </main>
      </div>
    </div>
  );
};
export default HubErrorBoundary;
