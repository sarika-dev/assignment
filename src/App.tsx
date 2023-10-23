import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserCreateEdit from "./Container/user/UserCreateEdit";

// lazy loading
const HomePage = lazy(() => import("./Container/user/UserList"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Routes>
            <Route element={<HomePage/>} path="/" />
            <Route element={<UserCreateEdit/>} path="/user/add" />
          </Routes>
        </Router>
    </Suspense>
  );
}

export default App;
