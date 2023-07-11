import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { useNavigate } from "react-router";
import UserContext from "../context/UserContext";


function SignInPage() {
  const [email, setEmail] = useState('');
  // const { username, setUsername } = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const AWS_EC2_URL = process.env.REACT_APP_AWS_EC2_URL;

  const loginUser = async (e) => {
    e.preventDefault();
    const loginUser = {
      email,
      password
    };

    const signInRes = await fetch(`${AWS_EC2_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(loginUser),
      headers: new Headers({
        'Content-Type': 'application/json',
        // "Authorization": token
      })
    });
    const resJson = await signInRes.json();
    if (!signInRes.ok) {
      console.log('POST: did not send to mongo db');
    }
    // when successful, token is passed in signInRes
    if (resJson.token) {
      alert(`Login successful`);

      // clear any token in localStorage
      localStorage.removeItem('token');

      // store into local storage
      localStorage.setItem('token', resJson.token);
      setUser(true);
      setEmail('');
      setPassword('');
      navigate('/');
    }
    else {
      alert(`Please check your username and password`);
    }
  };

  return (
    <div className='page'>
      <h1>Sign In</h1>
      <form onSubmit={loginUser}>
        <input type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input type="submit" value="Sign In" />
      </form>
      <Link to='/register'>Register</Link>
    </div>
  )
}

export default SignInPage
