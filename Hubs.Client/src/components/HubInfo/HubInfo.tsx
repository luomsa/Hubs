import { HubDto } from "../../types.ts";
import styles from "./HubInfo.module.css";
import { Link, useParams } from "react-router-dom";
const HubInfo = ({ name, description, totalMembers, createdAt }: HubDto) => {
  const hub = useParams();
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <Link to={`/hub/${hub.name}`}>{name}</Link>
      </h2>
      <p>{description}</p>
      <p>Created: {new Date(createdAt).toDateString()}</p>
      <p>Members: {totalMembers}</p>
    </div>
  );
};
export default HubInfo;
