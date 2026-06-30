import { useEffect, useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

const TaskIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-8 h-8"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

const quotes = [
  "Organize your work, simplify your life.",
  "Small steps every day lead to big success.",
  "Stay focused. Stay consistent.",
  "One task at a time leads to big results.",
  "Discipline creates progress.",
  "Do it today, not someday.",
];

export default function AuthPage({ setLoggedIn }) {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 300000);

    return () => clearInterval(interval);
  }, []);

const handleLogin = () => {
  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    setError("No account found. Please Sign Up.");
    return;
  }

  if (
    email !== savedUser.email ||
    password !== savedUser.password
  ) {
    setError("Invalid email or password.");
    return;
  }

  localStorage.setItem("loggedIn", "true");
  setError("");
  setLoggedIn(true);
};

const handleSignup = () => {
  const user = {
    email,
    password,
  };

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("loggedIn", "true");

  setLoggedIn(true);
};

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-50">

      {/* LEFT */}
      <div className="hidden lg:flex flex-col justify-between bg-linear-to-br from-indigo-700 via-purple-700 to-blue-600 text-white p-14">
        <div className="flex items-center gap-3">
          <TaskIcon />
          <h1 className="text-xl font-semibold">Task Manager</h1>
        </div>

        <div>
          <h2 className="text-5xl font-bold mb-6">
            Organize better. <br /> Do better.
          </h2>

          <div className="bg-white/10 p-6 rounded-2xl">
            <p className="italic">"{quotes[quoteIndex]}"</p>
          </div>
        </div>

        <p className="text-sm text-white/70">Design your day ✨</p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

          {/* LOGIN */}
          {isLogin ? (
            <Login
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              onLogin={handleLogin}
              switchToSignup={() => setIsLogin(false)}
              error={error}
              setError={setError}
            />
          ) : (
            <Signup
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              onSignup={handleSignup}
              switchToLogin={() => setIsLogin(true)}
              error={error}
              setError={setError}
            />
          )}
        </div>
      </div>
    </div>
  );
}