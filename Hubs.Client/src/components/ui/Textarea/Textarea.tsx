import { ForwardedRef, forwardRef } from "react";
import styles from "./Textarea.module.css";
const Textarea = forwardRef((props, ref: ForwardedRef<any>) => {
  return <textarea className={styles.textarea} ref={ref} {...props}></textarea>;
});
export default Textarea;
