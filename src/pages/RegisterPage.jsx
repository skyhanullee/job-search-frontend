import { useContext, useState } from "react"
import { useNavigate } from "react-router";
import UserContext from "../context/UserContext";

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    const newUser = {
      email,
      password
    };

    const AWS_EC2_URL = process.env.REACT_APP_AWS_EC2_URL;

    const signUpRes = await fetch(`${AWS_EC2_URL}/login/signup`, {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    if (!signUpRes.ok) {
      // console.log('POST: did not send to mongo db');
    };
    if (signUpRes.status === 409) {
      alert('User already exists.');
    };
    if (signUpRes.ok) {
      alert(`New user has been added`);
      setEmail('');
      setPassword('');
      navigate('/');
    };
  };

  return (
    <div className='page'>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input type="submit" value="Register" />
      </form>
    </div>
  )
}
export default RegisterPage
