import { FC, useState } from "react";
import { Field } from "../ui/field";
import { PasswordInput } from "../ui/password-input";
import { Fieldset, Input, Stack } from "@chakra-ui/react";
import { Button } from "../ui/button";
import apiClient from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { Toaster, toaster } from "../ui/toaster";

const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password) {
      toaster.create({
        description: "Please enter all fields",
        type: "info",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post("/users/login", {
        email,
        password,
      });

      console.log(response.data);
      navigate("/chat");
    } catch (error: any) {
      console.log(error.response.data.message);
      toaster.create({
        description: error.response.data.message || "An error occured",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fieldset.Root size="lg">
      <Stack>
        <Fieldset.Legend>Login To Chat App</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide your credentials below.
        </Fieldset.HelperText>
      </Stack>

      <Fieldset.Content m="20px 0px">
        <Field label="Email" w="md" required>
          <Input
            name="email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Field>
        <Field label="Password" w="md" required mb={8}>
          <PasswordInput
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        <Button
          onClick={handleSubmit}
          loading={loading}
          loadingText="Checking.."
        >
          Submit
        </Button>
        <Button
          colorPalette="cyan"
          variant="subtle"
          onClick={() => {
            setEmail("guest@mail.com");
            setPassword("12345678");
          }}
        >
          Login as Guest
        </Button>
        <Toaster />
      </Fieldset.Content>
    </Fieldset.Root>
  );
};

export default Login;
