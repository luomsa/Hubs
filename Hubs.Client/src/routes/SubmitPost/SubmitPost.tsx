﻿import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { NewPostRequest } from "../../types.ts";
import client from "../../api/http.ts";
import styles from "./SubmitPost.module.css";
import Input from "../../components/ui/Input/Input.tsx";
import Button from "../../components/ui/Button/Button.tsx";
import Textarea from "../../components/ui/Textarea/Textarea.tsx";
const SubmitPost = () => {
  const hub = useParams();
  const navigate = useNavigate();
  console.log(hub);
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<NewPostRequest>({
    defaultValues: {
      type: "Text",
    },
  });
  const onSubmit: SubmitHandler<NewPostRequest> = async (input) => {
    const { data } = await client.POST("/api/posts", {
      body: { ...input, hubName: hub.name! },
    });
    if (data === undefined) {
      throw new Error("No data");
    }
    navigate(`/hub/${hub.name}/${data.postId}/${data.slug}`);
  };
  return (
    <div>
      <form
        className={styles.form}
        style={{ width: "100%" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>hub/{hub.name}</h1>
        <div className={styles.title}>
          <label htmlFor={"title"}>Title</label>
          <Input
            id={"title"}
            type="text"
            {...register("title", {
              required: { value: true, message: "Title is required" },
              minLength: {
                value: 3,
                message: "Title has to be at least 3 characters long",
              },
              maxLength: {
                value: 100,
                message: "Title has to be at most 100 characters long",
              },
            })}
          />
          <div>{errors.title?.message}</div>
        </div>
        <fieldset
          className={styles.type}
          onChange={() => clearErrors("content")}
        >
          <div>
            <Input
              id={"text"}
              type={"radio"}
              value="Text"
              {...register("type")}
            />
            <label htmlFor={"text"}>Text</label>
          </div>
          <div>
            <Input
              id={"image"}
              type={"radio"}
              value="Image"
              {...register("type")}
            />
            <label htmlFor={"image"}>Image</label>
          </div>
        </fieldset>
        <div className={styles.content}>
          <label>
            Body
            {watch("type") === "Text" ? (
              <Textarea
                {...register("content", {
                  required: { value: true, message: "Body is required" },
                  minLength: {
                    value: 3,
                    message: "Body has to be at least 3 characters long",
                  },
                  maxLength: {
                    value: 1000,
                    message: "Body has to be at most 1000 characters long",
                  },
                })}
              />
            ) : (
              <Input
                type={"text"}
                {...register("content", {
                  required: { value: true, message: "Link to image missing" },
                  minLength: {
                    value: 3,
                    message: "Body has to be at least 3 characters long",
                  },
                  maxLength: {
                    value: 1000,
                    message: "Body has to be at most 1000 characters long",
                  },
                  validate: async (value) => {
                    try {
                      const result = await fetch(value, { method: "head" });
                      const isImage = result.headers
                        .get("content-type")
                        ?.includes("image");
                      return isImage ? true : "Not an image";
                    } catch (error) {
                      return "This owner of the website does not allow linking, try another one";
                    }
                  },
                })}
              />
            )}
          </label>
          <div>{errors.content?.message}</div>
        </div>
        <Button type={"submit"}>Submit</Button>
      </form>
    </div>
  );
};
export default SubmitPost;
