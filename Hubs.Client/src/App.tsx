import './App.css'
import {Box, Container, Flex, Heading, ListItem, Stack, UnorderedList, useBreakpointValue, Text} from "@chakra-ui/react";
import NavMenu from "./components/NavMenu.tsx";
import {Icon} from "@chakra-ui/icons";
import {IconChartBarPopular, IconHome} from "@tabler/icons-react";

function App() {
    const hideDrawerBreakpoint = useBreakpointValue({
        base: "block",
        xl: "none"
    })
    const hideSidebarBreakpoint = useBreakpointValue({
        base: "none",
        xl: "block"
    })
    return (
        <>
            <Flex as={"header"} h={"57px"} w='100%' p={4} borderBottomWidth={1} alignItems={"center"} gap={1} position={"fixed"} top={0} bg={"white"}>
                <Box display={hideDrawerBreakpoint}><NavMenu/></Box>
                <Heading as='div' size='md'>
                    Hubs
                </Heading>
            </Flex>
            <Flex>
                <Stack display={hideSidebarBreakpoint} as={"nav"} spacing={4} direction='column' align='center'
                       minW={"250px"} minH={"calc(100dvh - 57px)"} borderInlineEndWidth={1} paddingInline={"1.5em"} position={"fixed"} top={"57px"}>
                    <UnorderedList listStyleType={"none"} marginInlineStart={"0"}>
                        <ListItem _hover={{cursor: "pointer"}} marginBlock={3}><Stack direction={"row"}><Icon as={IconHome} boxSize={6}/><Text>Home</Text></Stack></ListItem>
                        <ListItem _hover={{cursor: "pointer"}} marginBlock={3}><Stack direction={"row"}><Icon as={IconChartBarPopular} boxSize={6}/><Text>Popular</Text></Stack></ListItem>
                    </UnorderedList>
                </Stack>
                <Container marginTop={"57px"} maxW={"750px"} centerContent>
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
                        <Box as={"article"}>Lorem
                            ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                            libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                            nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box><Box as={"article"}>Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                        libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                        nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box><Box as={"article"}>Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                        libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                        nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box><Box as={"article"}>Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                        libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                        nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box><Box as={"article"}>Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                        libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                        nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box><Box as={"article"}>Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                        libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                        nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box><Box as={"article"}>Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                        libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                        nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box><Box as={"article"}>Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                        libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                        nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box><Box as={"article"}>Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                        libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                        nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box><Box as={"article"}>Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                        libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                        nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box><Box as={"article"}>Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                        libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                        nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box><Box as={"article"}>Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                        libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                        nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box><Box as={"article"}>Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                        libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                        nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box><Box as={"article"}>Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                        libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                        nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box><Box as={"article"}>Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                        libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                        nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box><Box as={"article"}>Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                        libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                        nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box><Box as={"article"}>Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                        libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                        nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box><Box as={"article"}>Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                        libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                        nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box><Box as={"article"}>Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                        libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                        nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box><Box as={"article"}>Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                        libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                        nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box><Box as={"article"}>Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                        libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                        nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box><Box as={"article"}>Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                        libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                        nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box><Box as={"article"}>Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                        libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                        nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box><Box as={"article"}>Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                        libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                        nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box><Box as={"article"}>Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque
                        libero pariatur praesentium saepe. Alias consectetur, cum eligendi excepturi hic in libero
                        nostrum odio pariatur, quaerat suscipit velit vitae voluptates.</Box><Box as={"article"}>Lorem
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
