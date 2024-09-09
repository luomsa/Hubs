import {
    Button,
    Drawer, DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay, IconButton, useDisclosure
} from "@chakra-ui/react";
import {HamburgerIcon} from "@chakra-ui/icons";

const NavMenu = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    return (
        <>
            <IconButton aria-label={"Open navigation menu"} icon={<HamburgerIcon/>} onClick={onOpen}/>
            <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
                    <DrawerBody>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}
export default NavMenu