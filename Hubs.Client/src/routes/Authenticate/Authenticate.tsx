import LoginForm from "../../components/LoginForm/LoginForm.tsx";
import RegisterForm from "../../components/RegisterForm/RegisterForm.tsx";
import Button from "../../components/ui/Button/Button.tsx";
import { useState } from "react";
import styles from "./Authenticate.module.css";
const Authenticate = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <div className={styles.container}>
      {isLoginForm ? <LoginForm /> : <RegisterForm />}
      <Button width={"100%"} onClick={toggleForm}>
        {isLoginForm
          ? "Not a user? Sign up instead"
          : "Already a user? Login instead"}
      </Button>
    </div>
  );
};
export default Authenticate;
