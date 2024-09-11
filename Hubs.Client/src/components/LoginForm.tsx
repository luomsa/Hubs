import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.tsx";
import client from "../services/http.ts";

interface LoginFormProps {
  onClose: MouseEventHandler<HTMLButtonElement> | undefined;
  setTabIndex: Dispatch<SetStateAction<number>>;
}

type Inputs = {
  username: string;
  password: string;
};
const LoginForm = ({ onClose, setTabIndex }: LoginFormProps) => {
  const user = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    user.setUser({ username: data.username });
    try {
      const { data: data1, error } = await client.POST("/auth/login", {
        body: {
          username: data.username,
          password: data.password,
        },
      });
      console.log(data1, error);
    } catch (error) {
      console.log("error!!", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader>Login</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <FormControl isInvalid={!!errors.username}>
          <FormLabel>Username</FormLabel>
          <Input
            type={"text"}
            autoComplete={"username"}
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
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
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
            })}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          onClick={() => setTabIndex(1)}
          variant="link"
        >
          Not a user? Sign up instead
        </Button>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} type={"submit"}>
          Login
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </form>
  );
};
export default LoginForm;
