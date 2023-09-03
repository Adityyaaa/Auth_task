import React, {SyntheticEvent, useState} from 'react'import { Navigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        console.log({
          name,
          email,
          password
        })

  await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({
           name,
           email,
           password
       })
      });

     setRedirect(true);

  if(redirect) {
      return <Navigate to="/login"/>;
  }

  return (
    <form onSubmit={submit}>
    <h1 className="h1 mb-5 ">Greeting visitor, you have stepped into our website!</h1>
    <h1 className="h3 mb-3">Please Register-</h1>


      <input type="name" className="form-control" placeholder="Name" required
      onChange={e => setName(e.target.value)}/>
  
    

    
      <input type="email" className="form-control" placeholder="Email" required
      onChange={e => setEmail(e.target.value)}/>
  
    
    
      <input type="password" className="form-control" placeholder="Password" required
      onChange={e => setPassword(e.target.value)}/>
        
    

    <button className="btn btn-primary w-100 py-2" type="submit">Submit</button>
    
  </form>
  )
}

export default Register