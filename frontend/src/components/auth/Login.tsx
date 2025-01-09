import { FC, useState } from "react";
import { Field } from "../ui/field";
import { PasswordInput } from "../ui/password-input";
import { Fieldset, Input, Stack } from "@chakra-ui/react";
import { Button } from "../ui/button";

const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <Button>Submit</Button>
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
      </Fieldset.Content>
    </Fieldset.Root>
  );
};

export default Login;
