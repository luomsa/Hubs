import Button from "../ui/Button/Button.tsx";
import styles from "./NewComment.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { CommentDto, NewCommentRequest, PostParams } from "../../types.ts";
import client from "../../api/http.ts";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
type Props = {
  page: number;
};
const NewComment = ({ page }: Props) => {
  const queryClient = useQueryClient();
  const params = useParams() as PostParams;
  const mutation = useMutation({
    mutationFn: async (input: { content: string }) => {
      const { data } = await client.POST("/api/posts/{postId}/comments", {
        body: input,
        params: { path: { postId: params.postId } },
      });
      return data;
    },
    onSuccess: (newComment) => {
      queryClient.setQueryData(
        ["comment", page, params.postId],
        (old: CommentDto[]) => [newComment, ...old],
      );
      reset();
    },
  });

  const [lineBreakCount, setLineBreakCount] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<NewCommentRequest>();
  const onSubmit: SubmitHandler<NewCommentRequest> = async (input) => {
    try {
      mutation.mutate(input);
    } catch (error) {
      console.error(error);
    }
  };
  const calculateHeight = () => {
    const count = watch("content").split("\n").length;
    setLineBreakCount(count);
  };
  return (
    <div className={styles.composer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          style={{ height: `${lineBreakCount * 20 + 60}px` }}
          onKeyUp={calculateHeight}
          placeholder={"Add a comment"}
          {...register("content", {
            required: { value: true, message: "Comment is required" },
            maxLength: {
              value: 1000,
              message: "Comment cannot be more than 1000 characters",
            },
          })}
        ></textarea>
        <div className={styles.error}>{errors.content?.message}</div>
        <div className={styles.buttons}>
          <Button type={"submit"}>Comment</Button>
        </div>
      </form>
    </div>
  );
};
export default NewComment;
