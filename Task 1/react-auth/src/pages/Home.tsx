import React, {useEffect} from 'react';

const Home = () => {

  useEffect(() => {
    (
      async () => {
        await fetch('http://localhost:8000/api/user', {
        headers: {'Content-Type': 'application/json'},
        credentials:'include', 
        mode: 'no-cors',
       });

  
      
      }
    )();
  });
  
  return (
    <div>
      Hi 
    </div>
  );
};

export default Home