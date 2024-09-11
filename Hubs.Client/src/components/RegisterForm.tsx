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

interface RegisterFormProps {
  onClose: MouseEventHandler<HTMLButtonElement> | undefined;
  setTabIndex: Dispatch<SetStateAction<number>>;
}
type Inputs = {
  username: string;
  password: string;
  confirmPassword: string;
};
const RegisterForm = ({ onClose, setTabIndex }: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader>Register</ModalHeader>
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
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.confirmPassword}>
          <FormLabel>Confirm password</FormLabel>
          <Input
            type={"password"}
            autoComplete={"new-password"}
            {...register("confirmPassword", {
              required: { value: true, message: "Password is required" },
              validate: (value, formValues) =>
                value === formValues.password || "Passwords do not match",
            })}
          />
          <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          onClick={() => setTabIndex(0)}
          variant="link"
        >
          Already a user? Login instead
        </Button>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} type={"submit"}>
          Register
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </form>
  );
};
export default RegisterForm;
