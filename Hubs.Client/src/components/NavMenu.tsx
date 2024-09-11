import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import NavItems from "./NavItems.tsx";

const NavMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        aria-label={"Open navigation menu"}
        icon={<HamburgerIcon />}
        onClick={onOpen}
      />
      <Drawer size={"xs"} placement={"left"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Hubs</DrawerHeader>
          <DrawerBody>
            <NavItems />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default NavMenu;
