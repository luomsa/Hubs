import Button from "../ui/Button/Button.tsx";
import styles from "./Pagination.module.css";
type Props = {
  page: number;
  setPage: (page: number) => void;
  hasMore: boolean;
};
const Pagination = ({ page, setPage, hasMore }: Props) => {
  return (
    <div className={styles.pagination}>
      <Button disabled={page <= 0} onClick={() => setPage(page - 1)}>
        Previous
      </Button>
      <span>{page + 1}</span>
      <Button disabled={!hasMore} onClick={() => setPage(page + 1)}>
        Next
      </Button>
    </div>
  );
};
export default Pagination;
