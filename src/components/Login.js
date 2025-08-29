import React, { useState } from "react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <>
      <div className="login-container col-12 col-sm-4">
        <div className="title"> Login</div>
        <div className="text">Email or username</div>
        <input
          id="email"
          type="text"
          placeholder="Email or username..."
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className="input-2">
          <input
            id="pass"
            type={isShowPassword === true ? "text" : "password"}
            placeholder="Password.."
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <i
            className={
              isShowPassword === true
                ? "fa-regular fa-eye"
                : "fa-regular fa-eye-slash"
            }
            onClick={() => {
              setIsShowPassword(!isShowPassword);
            }}
          ></i>
        </div>

        <button
          className={email && password ? "active" : ""}
          disabled={!email || !password}
          id="login"
        >
          Login
        </button>
        <div className="back">
          <i className="fa-solid fa-angles-left"></i> Go back
        </div>
      </div>
    </>
  );
};
export default Login;
