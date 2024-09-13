import {useAuth} from "../context/AuthContext.tsx";

const Home = () => {
    const auth = useAuth();
    if(auth.user == null) {
        return <>not logged in</>
    }
    return <>hello world</>
}
export default Home;