import { useState } from "react";

export default function Signup({
  email,
  password,
  setEmail,
  setPassword,
  onSignup,
  switchToLogin,
  error,
  setError,
}) {
  const [passwordTouched, setPasswordTouched] = useState(false);

  const passwordRules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const isPasswordValid =
    Object.values(passwordRules).every(Boolean);

const handleSubmit = (e) => {
  e.preventDefault();

  console.log("Submit clicked");
  console.log("Password:", password);
  console.log("isPasswordValid:", isPasswordValid);

  if (!isPasswordValid) {
    alert("Password is INVALID");
    setError("Password does not meet the required criteria.");
    return;
  }

  alert("Password is VALID");
  onSignup();
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <h2 className="text-2xl font-bold text-center">
        Create Account
      </h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 rounded"
        value={password}
        onFocus={() => setPasswordTouched(true)}
        onChange={(e) => {
        setPassword(e.target.value);
        setPasswordTouched(true);
}}
        required
      />

      <p className="text-gray-500 text-sm mt-1">
      Use at least 8 characters with an uppercase letter, lowercase letter, number, and special character.
      </p>

      {passwordTouched && (
        <div className="text-sm border rounded p-3 bg-gray-50">
          <p className="font-semibold mb-2">
            Password must contain:
          </p>

          <p className={passwordRules.length ? "text-green-600" : "text-red-500"}>
            {passwordRules.length ? "✔" : "✖"} Minimum 8 characters
          </p>

          <p className={passwordRules.uppercase ? "text-green-600" : "text-red-500"}>
            {passwordRules.uppercase ? "✔" : "✖"} One uppercase letter
          </p>

          <p className={passwordRules.lowercase ? "text-green-600" : "text-red-500"}>
            {passwordRules.lowercase ? "✔" : "✖"} One lowercase letter
          </p>

          <p className={passwordRules.number ? "text-green-600" : "text-red-500"}>
            {passwordRules.number ? "✔" : "✖"} One number
          </p>

          <p className={passwordRules.special ? "text-green-600" : "text-red-500"}>
            {passwordRules.special ? "✔" : "✖"} One special character
          </p>
        </div>
      )}

      {error && (
        <p className="text-red-500">
          {error}
        </p>
      )}

      <button
        type="submit"
        className={`w-full p-2 rounded text-white ${
          isPasswordValid
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      
      >
        Sign Up
      </button>

      <p className="text-center">
        Already have an account?
        <button
          type="button"
          onClick={switchToLogin}
          className="text-blue-600 ml-2"
        >
          Login
        </button>
      </p>

    </form>
  );
}