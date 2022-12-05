import React from 'react';
import Router from 'next/router';
import signupForm from 'json/forms/signup.json';
import cx from 'classnames';
import { Form } from '~components';
import {useTransitionHook} from '~hooks';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import styles from './signup.module.scss';


const ROUTE = '/api/staff';
const handleData = ({data}) => {
  const { error, email, url } = data || {};
  if (error) console.log({error});
  if (email) {
    Router.push(`/confirmation?email=${email}&confirmationURL=${url}`)
  }
};

const Signup = () => {
  const pageStyles = useTransitionHook();

  return (
  <div className={cx(styles.root, pageStyles)}>
    <span>Already a member? </span>
    <Link href="" onClick={() => signIn("email", { callbackUrl: `/?alert=${'You have signed in.'}` })}>Sign In</Link>
    <Form inputs={signupForm} title="Staff Sign Up" route={ROUTE} handleData={handleData} />
  </div>
)};

export default Signup;
