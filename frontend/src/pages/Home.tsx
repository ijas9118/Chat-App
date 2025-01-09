import { Box, Container, Heading, Tabs } from "@chakra-ui/react";
import { FC } from "react";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";

const Home: FC = () => {
  return (
    <Container maxW="lg" centerContent p={4}>
      <Box
        m="40px 0 24px 0"
        borderWidth="1px"
        p="16px 52px"
        w="100%"
        rounded="xl"
        justifyContent="center"
        display="flex"
      >
        <Heading size="4xl">Chat App</Heading>
      </Box>
      <Box w="100%" p={4} rounded="xl" borderWidth="1px">
        <Tabs.Root defaultValue="login" variant="outline">
          <Tabs.List mb="1em">
            <Tabs.Trigger value="login">Login</Tabs.Trigger>
            <Tabs.Trigger value="signup">Signup</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="login">
            <Login />
          </Tabs.Content>
          <Tabs.Content value="signup">
            <Signup />
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Container>
  );
};

export default Home;
