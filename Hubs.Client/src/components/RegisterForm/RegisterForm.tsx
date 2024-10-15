import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../ui/Button/Button.tsx";
import client, { ApiError } from "../../api/http.ts";
import Input from "../ui/Input/Input.tsx";
import styles from "./RegisterForm.module.css";
type Inputs = {
  username: string;
  password: string;
  confirmPassword: string;
};
const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
  });
  const onSubmit: SubmitHandler<Inputs> = async (input) => {
    console.log(input);
    try {
      await client.POST("/api/auth/register", {
        body: input,
      });
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
    <form className={styles["register-form"]} onSubmit={handleSubmit(onSubmit)}>
      <h1>Register</h1>
      <div>
        {Object.values(errors.root ?? {}).map((value, i) => (
          <div className={styles.error} key={i}>
            {typeof value === "object" && value.message}
          </div>
        ))}
        <div>
          <label htmlFor={"username"}>Username</label>
          <Input
            id={"username"}
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
            })}
          />
          <div className={styles.error}>{errors.username?.message}</div>
        </div>

        <div>
          <label htmlFor={"password"}>Password</label>
          <Input
            id={"password"}
            type={"password"}
            autoComplete={"new-password"}
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
            })}
          />
          <div className={styles.error}>{errors.password?.message}</div>
        </div>

        <div>
          <label htmlFor={"confirmPassword"}>Confirm password</label>
          <Input
            id={"confirmPassword"}
            type={"password"}
            autoComplete={"new-password"}
            {...register("confirmPassword", {
              required: { value: true, message: "Password is required" },
              validate: (value, formValues) =>
                value === formValues.password || "Passwords do not match",
            })}
          />
          <div className={styles.error}>{errors.confirmPassword?.message}</div>
        </div>
      </div>
      <div>
        <Button width={"100%"} type={"submit"}>
          Register
        </Button>
      </div>
    </form>
  );
};
export default RegisterForm;
