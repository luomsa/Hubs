import styles from "./Button.module.css";
import { CSSProperties, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  width?: string | number;
};
const Button = ({
  type = "button",
  onClick,
  children,
  width = "auto",
}: ButtonProps) => {
  return (
    <button
      style={{ "--button-width": width } as CSSProperties}
      type={type}
      className={styles.button}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
