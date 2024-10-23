import { useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import PasswordInput from "../../Components/Input/PasswordInput";
import {Link} from 'react-router-dom'
import { validateEmail } from "../../utils/helper";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleSignUp = async (e) => {
    e.preventDefault();

    if(!name){
      setError("Plese enter your name")
      return
    }

    if(!validateEmail(email)){
      setError("Plese Enter a valid Email address")
      return;
    }

    if(!password){
      setError("Plese enter the password")
      return
    }

    setError('')
  };

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">SignUp</h4>
            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
             {error && <p className=" text-red-500 text-xs pb-1">{error}</p>}
            <button type="submit" className="btn-primary">
              Create Account
            </button>
            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
