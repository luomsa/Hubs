import { useNavigate, useParams } from "react-router-dom";
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
    console.log(input);
    const { data } = await client.POST("/api/posts", {
      body: { ...input, hubName: hub.name! },
    });
    if (data !== undefined) {
      // navigate(`/hub/${hub.name}/${data.postId}/${data.slug}`);
    }
  };
  return (
    <div>
      <h1>hub/{hub.name}</h1>
      <form
        className={styles.form}
        style={{ width: "100%" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.title}>
          <label htmlFor={"title"}>Title</label>
          <Input
            id={"title"}
            type="text"
            {...register("title", {
              required: { value: true, message: "Title is required" },
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
                })}
              />
            ) : (
              <Input
                type={"text"}
                {...register("content", {
                  required: { value: true, message: "Link to image missing" },
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
