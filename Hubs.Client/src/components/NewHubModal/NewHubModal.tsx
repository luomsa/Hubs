import { useRef } from "react";
import styles from "./NewHubModal.module.css";
import Input from "../ui/Input/Input.tsx";
import Button from "../ui/Button/Button.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import Textarea from "../ui/Textarea/Textarea.tsx";
import client, { ApiError } from "../../api/http.ts";
import { useNavigate } from "react-router-dom";
type Inputs = {
  name: string;
  description: string;
};
const NewHubModal = () => {
  const navigate = useNavigate();
  const newHubModal = useRef<HTMLDialogElement | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
  });
  const showDialog = () => {
    if (newHubModal.current) {
      newHubModal.current.showModal();
    }
  };

  const closeDialog = () => {
    if (newHubModal.current) {
      newHubModal.current.close();
    }
  };
  const onSubmit: SubmitHandler<Inputs> = async (input) => {
    try {
      await client.POST("/api/hubs", { body: input });
      navigate(`/hub/${input.name}`);
      closeDialog();
    } catch (error) {
      if (error instanceof ApiError) {
        setError(`root.${error.message}`, {
          type: "manual",
          message: error.message,
        });
      }
    }
  };

  return (
    <>
      <li onClick={showDialog}>Create a hub</li>
      <dialog className={styles.modal} ref={newHubModal}>
        <h2>Create a new hub</h2>
        {Object.values(errors.root ?? {}).map((value, i) => (
          <div className={styles.error} key={i}>
            {typeof value === "object" && value.message}
          </div>
        ))}
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <label htmlFor={"name"}>Name</label>
          <Input
            type={"text"}
            id={"name"}
            {...register("name", {
              required: { value: true, message: "Name is required" },
              pattern: {
                value: RegExp("^[a-zA-Z0-9]+$"),
                message: "Name can only have alphanumeric characters",
              },
              minLength: {
                value: 3,
                message: "Name has to be at least 3 characters long",
              },
              maxLength: {
                value: 20,
                message: "Name can be at most 20 characters long",
              },
            })}
          />
          <div className={styles.error}>{errors.name?.message}</div>
          <label htmlFor={"description"}>Description</label>
          <Textarea
            id={"description"}
            {...register("description", {
              required: { value: true, message: "Description is required" },
              minLength: {
                value: 1,
                message: "Description has to be at least 1 character long",
              },
              maxLength: {
                value: 500,
                message: "Description can be at most 500 characters long",
              },
            })}
          />
          <div className={styles.error}>{errors.description?.message}</div>
          <Button type={"submit"}>Create</Button>
          <Button onClick={closeDialog}>Cancel</Button>
        </form>
      </dialog>
    </>
  );
};
export default NewHubModal;
