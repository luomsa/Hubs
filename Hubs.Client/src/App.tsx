import "./App.css";
import {
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import NavMenu from "./components/NavMenu.tsx";
import AuthModal from "./components/AuthModal.tsx";
import { useAuth } from "./context/AuthContext.tsx";
import NavItems from "./components/NavItems.tsx";

function App() {
  const hideDrawerBreakpoint = useBreakpointValue({
    base: "block",
    xl: "none",
  });
  const hideSidebarBreakpoint = useBreakpointValue({
    base: "none",
    xl: "block",
  });
  const user = useAuth();
  return (
    <>
      <Flex
        justifyContent={"space-between"}
        as={"header"}
        h={"57px"}
        w="100%"
        p={4}
        borderBottomWidth={1}
        alignItems={"center"}
        gap={1}
        position={"fixed"}
        top={0}
        bg={"white"}
      >
        <Box display={hideDrawerBreakpoint}>
          <NavMenu />
        </Box>
        <Heading as="div" size="md">
          Hubs
        </Heading>
        {user.user == null ? <AuthModal /> : null}
      </Flex>
      <Flex>
        <Stack
          display={hideSidebarBreakpoint}
          as={"nav"}
          spacing={4}
          direction="column"
          align="center"
          minW={"250px"}
          minH={"calc(100dvh - 57px)"}
          borderInlineEndWidth={1}
          paddingInline={"1.5em"}
          position={"fixed"}
          top={"57px"}
        >
          <NavItems />
        </Stack>
        <Container marginTop={"57px"} maxW={"750px"} centerContent>
          <Stack as={"main"} spacing={4} direction="column" align="center">
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>{" "}
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>{" "}
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>{" "}
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>{" "}
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>{" "}
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>
            <Box as={"article"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur cumque libero pariatur praesentium saepe. Alias
              consectetur, cum eligendi excepturi hic in libero nostrum odio
              pariatur, quaerat suscipit velit vitae voluptates.
            </Box>
          </Stack>
        </Container>
      </Flex>
    </>
  );
}

export default App;
