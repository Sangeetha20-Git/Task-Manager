export default function Login({
  email,
  password,
  setEmail,
  setPassword,
  onLogin,
  switchToSignup,
  error,
  setError,
}) {
  const handleLogin = (e) => {
    e.preventDefault();

    if (!email?.trim() || !password?.trim()) {
      setError("Please enter Email and Password.");
      return;
    }

    setError("");
    onLogin();
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>

      <form onSubmit={handleLogin} className="space-y-5">

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) setError("");
          }}
          className="w-full border p-3 rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg"
        >
          Sign In
        </button>

        <p className="text-center">
          Don't have an account?
          <button
            type="button"
            onClick={switchToSignup}
            className="ml-2 text-indigo-600 font-semibold"
          >
            Sign Up
          </button>
        </p>
      </form>
    </>
  );
}