﻿import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext.tsx";
import client, { ApiError } from "../../api/http.ts";
import styles from "./LoginForm.module.css";
import Button from "../ui/Button/Button.tsx";
import Input from "../ui/Input/Input.tsx";

type Inputs = {
  username: string;
  password: string;
};

interface LoginFormProps {
  closeDialog: () => void;
}

const LoginForm = ({ closeDialog }: LoginFormProps) => {
  const user = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
  });
  const onSubmit: SubmitHandler<Inputs> = async (input) => {
    console.log(input);
    try {
      await client.POST("/api/auth/login", {
        body: input,
      });
      const { data: userData } = await client.GET("/api/users/me");
      if (userData === undefined) {
        throw new Error("No data");
      }
      user.setUser({ username: userData.username, userId: userData.userId });
      closeDialog();
    } catch (error) {
      if (error instanceof ApiError) {
        console.log("error!!", error);
        setError(`root.${error.message}`, {
          type: "manual",
          message: error.message,
        });
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>
      <div>
        {Object.values(errors.root ?? {}).map((value, i) => (
          <div className={styles.error} key={i}>
            {typeof value === "object" && value.message}
          </div>
        ))}
        <div>
          <label>Username</label>
          <Input
            type={"text"}
            autoComplete={"username"}
            autoCapitalize="none"
            {...register("username", {
              required: { value: true, message: "Username is required" },
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters long",
              },
              maxLength: {
                value: 20,
                message: "Username must be at most 20 characters long",
              },
              onBlur: () => clearErrors("root"),
            })}
          />
          <div className={styles.error}>{errors.username?.message}</div>
        </div>

        <div>
          <label>Password</label>
          <Input
            type={"password"}
            autoComplete={"current-password"}
            {...register("password", {
              required: { value: true, message: "Password is required" },
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              maxLength: {
                value: 50,
                message: "Password must be at most 50 characters long",
              },
              onBlur: () => clearErrors("root"),
            })}
          />
          <div className={styles.error}>{errors.password?.message}</div>
        </div>
      </div>
      <div>
        <Button width={"100%"} type={"submit"}>
          Login
        </Button>
      </div>
    </form>
  );
};
export default LoginForm;