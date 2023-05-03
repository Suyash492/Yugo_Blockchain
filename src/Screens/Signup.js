import * as React from "react";
import { loadBlockchainData, loadWeb3 } from "../Web3helpers";
import myimage3 from "../images/Data_security_27.jpg"
 
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
 
  const navigate = useNavigate();
 
  const [accounts, setAccounts] = React.useState(null);
  const [auth, setAuth] = React.useState(null);
 
  const loadAccounts = async () => {
    let { auth, accounts } = await loadBlockchainData();
 
    setAccounts(accounts);
    setAuth(auth);
  };
 function tologin(){
navigate("/");
 }
  const signUp = async () => {
    if (!username || !email || !password) {
      alert("please fill all details");
      return;
    }
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat)) {
      alert("please enter valid email address");
      return;
    }
    try {
      await auth.methods
        .createUser(username, email, password)
        .send({ from: accounts });
 
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
      navigate("/Signin");
    } catch (e) {
      console.log(e.message);
    }
  };
  React.useEffect(() => {
    loadWeb3();
  }, []);
 
  React.useEffect(() => {
    loadAccounts();
  }, []);
 
  return (
    <div className="" style={rootDiv}>
      <div className="flex">
      <img className="w-auto h-[720px] ml-[-300px]" src={myimage3} alt="" />
      <div className="pl-[100px]" style={rootDiv}>
      <h1 className="text-3xl mb-4">What's your email?</h1>
      <input
      className="bg-slate-200"
        style={input}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        type="text"
      />
      <input
      className="bg-slate-200"
        style={input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="text"
      />
      <input
      className="bg-slate-200"
        style={input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <button style={button}  onClick={signUp}>
        {" "}
        
        Sign Up
      </button>
      <p>Already have a account?</p>
      <span onClick={tologin} className="text-blue-400">Login</span>
      </div>
      </div>
      
      
    </div>
  );
}
 
const rootDiv = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};
 
const input = {
  width: 300,
  padding: 10,
  margin: 10,
  borderRadius: 10,
  outline: "none",
  border: "2px solid grey",
  fontSize: 17,
};
 
const button = {
  width: 100,
  padding: 10,
  borderRadius: 10,
  margin: 8,
  cursor: "pointer",
  fontSize: 17,
  color: "white",
  backgroundColor: "blue",
  border: "none",
};
 
const image = {
  width: 70,
  height: 70,
  objectFit: "contain",
  borderRadius: 70,
};