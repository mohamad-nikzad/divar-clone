import { Route, Routes } from "react-router-dom";
import { Auth, Dashboard, Home, Login, Register } from "./routes";
import "./assets/styles/global.css";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { themeAtom, userAtom } from "@/atoms";

function App() {
  const [user] = useAtom(userAtom);
  const [theme] = useAtom(themeAtom);

  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="auth" element={<Auth isAllowed={!user} />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="dashboard" element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
