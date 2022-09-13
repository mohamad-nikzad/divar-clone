import { useEffect } from "react";
import { themeAtom, userAtom } from "@/atoms";
import { useAtom } from "jotai";
import { Link } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useAtom(userAtom);
  const [theme, toggleTheme] = useAtom(themeAtom);
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      <h1 className="text-red-500 text-4xl">Home</h1>
      <Link to="/auth/login">Login</Link>
      <Link to="/auth/register">register</Link>
      {user && (
        <button className="btn btn-error" onClick={handleLogout}>
          خروج
        </button>
      )}
      <hr />
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">change theme</span>
          <input
            type="checkbox"
            className="toggle toggle-secondary"
            checked={theme === "dark" ? true : false}
            // value={}
            onChange={() => toggleTheme()}
          />
        </label>
      </div>
    </div>
  );
};

export default Home;
