import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Display from "./Pages/Display";
import { useMoralis } from "react-moralis";
import { useEffect } from "react";

function App() {
  const { login, isInitialized } = useMoralis();

  useEffect(() => {
    if (isInitialized) {
      login("que", "my pass", {
        onSuccess(user) {
          console.log(user);
        },
        onError: (err) => console.log(err),
      });
    }
  }, [isInitialized]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Display path="dashboard" />} />
        <Route path="/upload" element={<Display path="upload" />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
