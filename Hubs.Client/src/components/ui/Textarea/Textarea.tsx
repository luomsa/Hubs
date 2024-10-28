import {
  ClassAttributes,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
} from "react";
import styles from "./Textarea.module.css";
import { JSX } from "react/jsx-runtime";
const Textarea = forwardRef(
  (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLTextAreaElement> &
      InputHTMLAttributes<HTMLTextAreaElement>,
    ref: ForwardedRef<HTMLTextAreaElement>,
  ) => {
    return (
      <textarea className={styles.textarea} ref={ref} {...props}></textarea>
    );
  },
);
export default Textarea;
