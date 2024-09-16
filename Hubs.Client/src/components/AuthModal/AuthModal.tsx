import { useRef, useState } from "react";
import styles from "./AuthModal.module.css";
import LoginForm from "../LoginForm/LoginForm.tsx";
import RegisterForm from "../RegisterForm/RegisterForm.tsx";
import Button from "../ui/Button/Button.tsx";

const AuthModal = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const authModal = useRef<HTMLDialogElement | null>(null);

  const showDialog = () => {
    if (authModal.current) {
      authModal.current.showModal();
    }
  };

  const closeDialog = () => {
    if (authModal.current) {
      authModal.current.close();
    }
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <>
      <dialog
        aria-label={"Login or sign up"}
        className={styles.modal}
        ref={authModal}
      >
        {isLoginForm ? (
          <LoginForm closeDialog={closeDialog} />
        ) : (
          <RegisterForm />
        )}
        <Button width={"100%"} onClick={toggleForm}>
          {isLoginForm
            ? "Not a user? Sign up instead"
            : "Already a user? Login instead"}
        </Button>
        <Button width={"100%"} onClick={closeDialog}>
          Cancel
        </Button>
      </dialog>
      <Button width={"100%"} onClick={showDialog}>
        Login
      </Button>
    </>
  );
};

export default AuthModal;
