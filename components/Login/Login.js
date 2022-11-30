import React from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

const Login = () => {  
  return (
    <>
      <Link href="" onClick={() => signIn("email", { callbackUrl: `/?alert=${'You have signed in.'}`})}>Sign in</Link>
    </>
  )
};

export default Login;
