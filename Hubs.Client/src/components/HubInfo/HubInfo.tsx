import { HubDto } from "../../types.ts";
import styles from "./HubInfo.module.css";
const HubInfo = ({ name, description, totalMembers }: HubDto) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{name}</p>
      <p>{description}</p>
      <p>Members: {totalMembers}</p>
    </div>
  );
};
export default HubInfo;
