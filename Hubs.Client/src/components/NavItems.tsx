import { ListItem, Stack, Text, UnorderedList } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { IconChartBarPopular, IconHome } from "@tabler/icons-react";

const NavItems = () => {
  return (
    <UnorderedList listStyleType={"none"} marginInlineStart={"0"}>
      <ListItem _hover={{ cursor: "pointer" }} marginBlock={3}>
        <Stack direction={"row"}>
          <Icon as={IconHome} boxSize={6} />
          <Text>Home</Text>
        </Stack>
      </ListItem>
      <ListItem _hover={{ cursor: "pointer" }} marginBlock={3}>
        <Stack direction={"row"}>
          <Icon as={IconChartBarPopular} boxSize={6} />
          <Text>Popular</Text>
        </Stack>
      </ListItem>
    </UnorderedList>
  );
};
export default NavItems;
