import Main from "./main";
import Header from "./header";
interface ProtectedRouteProps {
    token: string | null | undefined;
}

const Dashboard: React.FC<ProtectedRouteProps> = ({ token }) => {
    return ( 
        <>
            <Header isAuthenticated={token} />
            <Main/> 
        </>             
    );
};

export default Dashboard;
