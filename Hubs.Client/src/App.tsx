import "./App.css";
import {
    Avatar,
    Box,
    Container,
    Flex,
    Heading, Input, Menu, MenuButton, MenuItem, MenuList,
    Stack,
    useBreakpointValue,
} from "@chakra-ui/react";
import NavMenu from "./components/NavMenu.tsx";
import AuthModal from "./components/AuthModal.tsx";
import {useAuth} from "./context/AuthContext.tsx";
import NavItems from "./components/NavItems.tsx";
import {Outlet} from "react-router-dom";
import {useRef} from "react";
import {Property} from "csstype"

function App() {
    const hideDrawerBreakpoint = useBreakpointValue({
        base: "block",
        xl: "none",
    });
    const hideSidebarBreakpoint = useBreakpointValue({
        base: "none",
        xl: "block",
    });
    const popOverRef = useRef<HTMLDivElement | null>(null);
    const startSearch = () => {
        if (popOverRef.current !== null) {
            popOverRef.current.style.display = "block";
        }
    }
    const popOverBreakpoint = useBreakpointValue({
        base: "static",
        md: "relative",
    });
    const auth = useAuth();
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
                    <NavMenu/>
                </Box>
                <Heading as="div" size="md">
                    Hubs
                </Heading>
                <Box style={{position: popOverBreakpoint as Property.Position}} w={"500px"}>
                    <Input onChange={startSearch} w={"100%"} placeholder="Search"/>
                    <Box borderRadius={"0.5rem"} p={"0.5rem"} sx={
                        {
                            display: "none",
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            backgroundColor: "white",
                            width: "100%",
                        }} borderWidth={1} ref={popOverRef}>
                        <Box bg='tomato' w='100%' p={4} color='white'>
                            This is the Box
                        </Box>
                        <Box bg='tomato' w='100%' p={4} color='white'>
                            This is the Box
                        </Box>
                        <Box bg='tomato' w='100%' p={4} color='white'>
                            This is the Box
                        </Box>
                        <Box bg='tomato' w='100%' p={4} color='white'>
                            This is the Box
                        </Box><Box bg='tomato' w='100%' p={4} color='white'>
                        This is the Box
                    </Box>
                        <Box bg='tomato' w='100%' p={4} color='white'>
                            This is the Box
                        </Box>

                    </Box>
                </Box>
                {auth.user == null ? <AuthModal/> : <Menu>
                    <MenuButton>
                        <Avatar/>
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>Log out</MenuItem>
                    </MenuList>
                </Menu>}
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
                    <NavItems/>
                </Stack>
                <Container marginTop={"57px"} maxW={"750px"} centerContent>
                    <Stack as={"main"} spacing={4} direction="column" align="center">
                        <Outlet/>
                    </Stack>
                </Container>
            </Flex>
        </>
    );
}

export default App;
