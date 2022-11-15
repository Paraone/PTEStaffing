import React from 'react';
import cookie from 'js-cookie';
import Router from 'next/router';
import loginForm from '../../json/forms/login.json';
import { Form } from '~components';
import styles from './Login.module.scss';

const ROUTE = '/api/auth';
const handleData = ({ data }) => {
  const { error, message, token } = data || {};

  if (error) console.log({ error: message });
  if (token) {
    cookie.set('token', token, { expires: 2 });
    Router.push('/');
  }
};

const Login = () => (
  <Form className={styles['header-login']} inputs={loginForm} submission="Log In" route={ROUTE} handleData={handleData} />
);

export default Login;
