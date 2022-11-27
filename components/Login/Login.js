import React from 'react';
import { signIn } from 'next-auth/react';

const Login = () => {  
  return (
    <>
      <button onClick={() => signIn("email", { callbackUrl: `/?alert=${'You have signed in.'}`})}>Log in</button>
    </>
  )
};

export default Login;
