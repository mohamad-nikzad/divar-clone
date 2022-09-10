import { Route, Routes } from "react-router-dom";
import { Home, Login, Register } from "./routes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
