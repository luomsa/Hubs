import {
    Alert, AlertIcon,
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
import {Dispatch, MouseEventHandler, SetStateAction} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAuth} from "../context/AuthContext.tsx";
import client, {ApiError} from "../api/http.ts";

interface LoginFormProps {
    onClose: MouseEventHandler<HTMLButtonElement> | undefined;
    setTabIndex: Dispatch<SetStateAction<number>>;
}

type Inputs = {
    username: string;
    password: string;
};
const LoginForm = ({onClose, setTabIndex}: LoginFormProps) => {
    const user = useAuth();
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: {errors},
    } = useForm<Inputs>({
        mode: "onBlur",
    });
    const onSubmit: SubmitHandler<Inputs> = async (input) => {
        console.log(input);
        try {
            await client.POST("/api/auth/login", {
                body: input
            });
            const {data: userData} = await client.GET("/api/users/me");
            if (userData === undefined) {
                throw new Error("No data");
            }
            console.log(userData);
            user.setUser({username: userData.username, userId: userData.userId});
        } catch (error) {

            if (error instanceof ApiError) {
                console.log("error!!", error);
                setError(`root.${error.message}`, {
                    type: "manual",
                    message: error.message,
                })
            }
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton/>
            <ModalBody pb={6}>
                {Object.values(errors.root ?? {}).map((value, i) => (
                    <Alert status={"error"} key={i}><AlertIcon/>{typeof value === "object" && value.message}</Alert>
                ))}
                <FormControl isInvalid={!!errors.username}>
                    <FormLabel>Username</FormLabel>
                    <Input
                        type={"text"}
                        autoComplete={"username"}
                        autoCapitalize="none"

                        {...register("username", {
                            required: {value: true, message: "Username is required"},
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
                    <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
                </FormControl>

                <FormControl mt={4} isInvalid={!!errors.password}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type={"password"}
                        autoComplete={"current-password"}
                        {...register("password", {
                            required: {value: true, message: "Password is required"},
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
