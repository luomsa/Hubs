import { HubDto } from "../../types.ts";
import styles from "./HubInfo.module.css";
const HubInfo = ({ name, description, totalMembers }: HubDto) => {
  return (
    <div className={styles.container}>
      <p>{name}</p>
      <p>{description}</p>
      <p>{totalMembers}</p>
    </div>
  );
};
export default HubInfo;
