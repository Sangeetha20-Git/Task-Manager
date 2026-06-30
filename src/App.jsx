import { useState } from "react";
import AuthPage from "./pages/AuthPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(
  localStorage.getItem("loggedIn") === "true"
);

  return loggedIn ? (
    <Dashboard
      setLoggedIn={setLoggedIn}
    />
  ) : (
    <AuthPage
      setLoggedIn={setLoggedIn}
    />
  );
}

export default App;