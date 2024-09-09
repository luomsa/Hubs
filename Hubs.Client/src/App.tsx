import './App.css'
import {Box, Button, Container, Flex, Heading, Stack, useBreakpoint, useBreakpointValue} from "@chakra-ui/react";
import NavMenu from "./components/NavMenu.tsx";

function App() {
    const hideDrawerBreakpoint = useBreakpointValue({
        base: "block",
        md: "none"
    })
    const hideSidebarBreakpoint = useBreakpointValue({
        base: "none",
        md: "block"
    })
    return (
        <>
            <Flex as={"header"} w='100%' p={4} borderBottomWidth={1} alignItems={"center"} gap={1}>
               <Box display={hideDrawerBreakpoint}><NavMenu /></Box>
                <Heading as='div' size='md'>
                    Hubs
                </Heading>
            </Flex>
            <Flex>
                <Stack display={hideSidebarBreakpoint} as={"nav"} spacing={4} direction='column' align='center' minW={"250px"} borderWidth={1}>
                    <Box borderWidth={1}>
                        Home
                    </Box>
                    <Box>
                        Popular
                    </Box>
                </Stack>
                <Container maxW={"750px"} centerContent>
                    <Stack as={"main"} spacing={4} direction='column' align='center'>
                        <Box as={"article"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
                            cumque
                            libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                            nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box> <Box as={"article"}>Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                        libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                        nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box> <Box as={"article"}>Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                        libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                        nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box> <Box as={"article"}>Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                        libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                        nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box> <Box as={"article"}>Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                        libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                        nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box> <Box as={"article"}>Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                        libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                        nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box>
                    </Stack>
                </Container>
            </Flex>
        </>
    )
}

export default App
