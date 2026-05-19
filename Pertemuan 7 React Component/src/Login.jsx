const isLoggedIn = false;

// function renderCondition() {
//   if (isLoggedIn) {
//     return <h2>Welcome Back</h2>;
//   } else {
//     return <LoginComponents />;
//   }
// }

function LoginComponents() {
  return (
    <div className="login-container">
      <div className="login-card">
        <form>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Login() {
  return <div>{isLoggedIn ? <LoginComponents /> : <h2>Welcome Back</h2>}</div>;
}
