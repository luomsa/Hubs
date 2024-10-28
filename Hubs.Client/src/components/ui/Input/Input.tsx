import {
  ClassAttributes,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
} from "react";
import { JSX } from "react/jsx-runtime";
import styles from "./Input.module.css";
const Input = forwardRef(
  (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLInputElement> &
      InputHTMLAttributes<HTMLInputElement>,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return <input ref={ref} className={styles.input} {...props} />;
  },
);
export default Input;
