import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Display from "./Pages/Display";
import {
  useMoralis,
  useMoralisQuery,
  useMoralisSubscription,
} from "react-moralis";
import { useEffect, useState } from "react";
import { digital } from "units-converter";
import moment from "moment";

function App() {
  const { user, login, isInitialized, isAuthenticated } = useMoralis();
  const [tableData, setTableData] = useState([]);

  const { data, fetch } = useMoralisQuery(
    "IPFSManager",
    (query) => query.equalTo("owner", user),
    [user],
    {
      autoFetch: true,
      live: true,
    },
  );

  useEffect(() => {
    const init = [];

    if (isInitialized && !isAuthenticated) {
      login("que", "my pass", {
        onSuccess(user) {
          console.log(user);
        },
        onError: (err) => console.log(err),
      });
    }

    data &&
      [...data].reverse().forEach((_data) => {
        let unit = digital(_data.get("size")).from("b").toBest();
        init.push({
          name: _data.get("name"),
          cID: _data.get("cID"),
          type: _data.get("type"),
          size: `${unit.value.toFixed(1)} ${unit.unit.toUpperCase()}`,
          date: moment(_data.get("createdAt")).format("DD/MM/YYYY"),
        });
      });
    setTableData(init);
  }, [isInitialized, data]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={<Display path="dashboard" tableData={tableData} />}
        />
        <Route path="/upload" element={<Display path="upload" />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
