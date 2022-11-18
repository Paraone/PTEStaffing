import React from 'react';
import cookie from 'js-cookie';
import Router from 'next/router';
import loginForm from '../json/forms/login.json';
import { Form } from '~components';
import {useTransitionHook} from '~hooks';


const ROUTE = '/api/auth';
const handleData = ({ data }) => {
  const { error, message, token } = data || {};
  
  if (error) console.log({ error: message });
  if (token) {
    cookie.set('token', token, { expires: 2 });
    Router.push('/');
  }
};

const Login = () => {
  const pageStyles = useTransitionHook();
  
  return (
    <div className={pageStyles}>
      <Form inputs={loginForm} title="Log In" route={ROUTE} handleData={handleData} />
    </div>
  );
};

export default Login;
