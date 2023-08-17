import React from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

const Login = ({ className }) => {  
  return (
    <>
      <Link className={className} href="" onClick={() => signIn("email", { callbackUrl: `/?alert=${'You have signed in.'}`})}>Sign In</Link>
    </>
  )
};

export default Login;
