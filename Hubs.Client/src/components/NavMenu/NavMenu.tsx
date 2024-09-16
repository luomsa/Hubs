import styles from "./NavMenu.module.css";
import AuthModal from "../AuthModal/AuthModal.tsx";
import Input from "../ui/Input/Input.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
const NavMenu = () => {
  const auth = useAuth();
  return (
    <div className={styles.header}>
      <div>
        <h2>Hubs</h2>
      </div>
      <div>
        <Input type={"text"} placeholder={"Search"} />
      </div>
      <div>{auth.user === null ? <AuthModal /> : <p>logged in</p>}</div>
    </div>
  );
};
export default NavMenu;
