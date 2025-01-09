import { Fieldset, Input, Stack } from "@chakra-ui/react";
import { FC, useState } from "react";
import { Field } from "../ui/field";
import { PasswordInput } from "../ui/password-input";
import { Button } from "../ui/button";
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from "../ui/file-upload";
import { HiUpload } from "react-icons/hi";

const Signup: FC = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

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
            required
          />
        </Field>
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

        <FileUploadRoot accept={["image/png"]} mb={8}>
          <FileUploadTrigger asChild>
            <Button variant="outline" size="sm">
              <HiUpload /> Upload Profile Pic
            </Button>
          </FileUploadTrigger>
          <FileUploadList />
        </FileUploadRoot>

        <Button>Submit</Button>
      </Fieldset.Content>
    </Fieldset.Root>
  );
};

export default Signup;
