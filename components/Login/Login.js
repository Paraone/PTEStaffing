import React from 'react';
// import cookie from 'js-cookie';
// import Router from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';
// import { Form } from '~components';
// import loginForm from '../../json/forms/login.json';
// import styles from './Login.module.scss';

// const ROUTE = '/api/auth';
// const handleData = ({ data }) => {
//   const { error, message, token } = data || {};

//   if (error) console.log({ error: message });
//   if (token) {
//     cookie.set('token', token, { expires: 2 });
//     Router.push('/');
//   }
// };

const Login = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <span>Signed in as {session.user.email}</span>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      <button onClick={() => signIn()}>Log in</button>
    </>
  )
  // return (
  //   <Form className={styles['header-login']} inputs={loginForm} submission="Log In" route={ROUTE} handleData={handleData} />
  // );
};

export default Login;
