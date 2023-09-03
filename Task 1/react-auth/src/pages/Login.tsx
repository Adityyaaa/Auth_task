import React, {SyntheticEvent, useState} from 'react';
import { Navigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch('http://localhost:8000/api/login', {
        mode: 'no-cors',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials:'include', 
        body: JSON.stringify({
            email,
            password
        })
       });

       setRedirect(true);
    }

    if(redirect) {
        return <Navigate to="/"/>;
    }

  return (
    <form onSubmit={submit}>
    <h1 className="h1 mb-5 ">Greeting visitor, you have stepped into our website!</h1>
    <h1 className="h3 mb-3">Please Signin-</h1>

    
      <input type="email" className="form-control" placeholder="Email" required
      onChange={e => setEmail(e.target.value)}
      />
  
    
      <input type="password" className="form-control" placeholder="Password" required
      onChange={e => setPassword(e.target.value)}
      />
        
    

    <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
    
  </form>
  );
}

export default Login