import Button from "../ui/Button/Button.tsx";
import styles from "./Pagination.module.css";
type Props = {
  page: number;
  setPage: (page: number) => void;
};
const Pagination = ({ page, setPage }: Props) => {
  return (
    <div className={styles.pagination}>
      <Button disabled={page <= 0} onClick={() => setPage(page - 1)}>
        Previous
      </Button>
      <span>{page + 1}</span>
      <Button onClick={() => setPage(page + 1)}>Next</Button>
    </div>
  );
};
export default Pagination;
