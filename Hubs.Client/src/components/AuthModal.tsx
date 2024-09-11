import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import LoginForm from "./LoginForm.tsx";
import { useState } from "react";
import RegisterForm from "./RegisterForm.tsx";

const AuthModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <Button onClick={onOpen}>Login</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Tabs index={tabIndex}>
            <TabPanels>
              <TabPanel>
                <LoginForm
                  onClose={onClose}
                  setTabIndex={(v) => setTabIndex(v)}
                />
              </TabPanel>
              <TabPanel>
                <RegisterForm
                  onClose={onClose}
                  setTabIndex={(v) => setTabIndex(v)}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;
