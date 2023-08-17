import React from 'react';
import { string } from 'prop-types';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

const Login = ({ className }) => {  
  return (
    <>
      <Link className={className} href="" onClick={() => signIn("email", { callbackUrl: `/?alert=${'You have signed in.'}`})}>Sign In</Link>
    </>
  )
};

Login.propTypes = {
  className: string
}

Login.defaultProps = {
  className: ''
}

export default Login;
