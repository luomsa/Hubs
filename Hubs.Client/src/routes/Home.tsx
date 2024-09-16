import { useAuth } from "../context/AuthContext.tsx";
import { Link } from "react-router-dom";

const Home = () => {
  const auth = useAuth();
  if (auth.user == null) {
    return (
      <>
        not logged in <Link to={"/hub/cats"}>cat hub</Link>{" "}
      </>
    );
  }
  return <>hello world</>;
};
export default Home;
