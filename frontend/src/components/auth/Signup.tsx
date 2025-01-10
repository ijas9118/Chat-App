import { Fieldset, Input, Stack } from "@chakra-ui/react";
import { FC, useState } from "react";
import { Field } from "../ui/field";
import { PasswordInput } from "../ui/password-input";
import { Button } from "../ui/button";
import apiClient from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { toaster, Toaster } from "../ui/toaster";

const Signup: FC = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!userName || !email || !password || !confirmPass) {
      toaster.create({
        description: "Please enter all fields",
        type: "info",
      });
      return;
    }

    if (password !== confirmPass) {
      toaster.create({
        description: "Passwords do not match",
        type: "error",
      });
      return;
    }
    setLoading(true);

    try {
      const response = await apiClient.post("/users/register", {
        userName,
        email,
        password,
      });
      console.log("User registered:", response.data);
      navigate("/chat");
    } catch (error: any) {
      console.error(
        "Error registering user:",
        error.response?.data?.message || error.message
      );
      toaster.create({
        description: error.response?.data?.message || "An error occured",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fieldset.Root size="lg">
      <Stack>
        <Fieldset.Legend>Let's chat using Chat App</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide your details below.
        </Fieldset.HelperText>
      </Stack>

      <Fieldset.Content m="40px 0px">
        <Field label="User Name" w="md" required>
          <Input
            name="userName"
            placeholder="Enter a User-name"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Field>
        <Field label="Email" w="md" required>
          <Input
            name="email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Field label="Password" w="md" required>
          <PasswordInput
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        <Field label="Confirm Password" w="md" required mb={2}>
          <PasswordInput
            placeholder="Enter your password again"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </Field>

        <Button
          onClick={handleSubmit}
          loading={loading}
          loadingText="Saving..."
        >
          Submit
        </Button>
        <Toaster />
      </Fieldset.Content>
    </Fieldset.Root>
  );
};

export default Signup;
