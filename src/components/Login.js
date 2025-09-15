import React, { useEffect, useState } from "react";
import { loginApi } from "../services/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loadingAPI, setLoadingAPI] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);
  const HandleLogin = async () => {
    if (!email || !password) {
      toast.error("Email/Password is required");
      return;
    }
    setLoadingAPI(true);
    let res= await loginApi(email, password);
    console.log(">>> check res", res);
    if(res && res.data.token){
      localStorage.setItem("token", res.data.token);
      navigate("/");
      toast.success("Login success");
    }
    else{
      if(res && res.status===400){
        toast.error(res.data.error);
      }
    }
      setLoadingAPI(false);
  }
  //eve.holt@reqres.in cityslicka
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
          onClick={()=>HandleLogin()}
        >
         {loadingAPI &&<i className="fa-solid fa-sync fa-spin"></i>} &nbsp; Login
        </button>
        <div className="back">
          <i className="fa-solid fa-angles-left"></i> Go back
        </div>
      </div>
    </>
  );
};
export default Login;
