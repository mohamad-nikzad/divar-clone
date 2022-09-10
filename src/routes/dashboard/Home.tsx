import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1 className="text-red-500 text-4xl">Home</h1>
      <Link to="/auth/login">Login</Link>
      <Link to="/auth/register">register</Link>
    </div>
  );
};

export default Home;
