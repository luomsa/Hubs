import {Link as ChakraLink, ListItem, Stack, Text, UnorderedList} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {IconChartBarPopular, IconHome} from "@tabler/icons-react";
import {NavLink} from "react-router-dom";

const NavItems = () => {

    return (
        <UnorderedList     sx={{
            "& a.active":{
                backgroundColor: "gray.200",
                fontWeight: "bold"
            },
            "& a:hover:not(.active)":{
                backgroundColor: "gray.50",
                fontWeight: "bold"
            }
        }} listStyleType={"none"} marginInlineStart={"0"}>
            <ListItem _hover={{cursor: "pointer"}} marginBlock={3}>
                <ChakraLink display={"block"} padding={"0.5rem"} rounded={3} as={NavLink} to={"/"}>
                    <Stack direction={"row"}>
                        <Icon as={IconHome} boxSize={6}/>
                        <Text>Home</Text>
                    </Stack>
                </ChakraLink>
            </ListItem>
            <ListItem _hover={{cursor: "pointer"}} marginBlock={3}>
                <ChakraLink display={"block"} padding={"0.5rem"} rounded={3}  as={NavLink} to={"/popular"}>
                    <Stack direction={"row"}>
                        <Icon as={IconChartBarPopular} boxSize={6}/>
                        <Text>Popular</Text>
                    </Stack>
                </ChakraLink>
            </ListItem>
        </UnorderedList>
    );
};
export default NavItems;
