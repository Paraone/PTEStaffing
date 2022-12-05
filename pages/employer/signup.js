import React from 'react';
import Router from 'next/router';
import Link from 'next/link';
import cx from 'classnames';
import { signIn } from 'next-auth/react';
import { setup } from 'lib/csrf';
import { Form } from '~components';
import {useTransitionHook} from '~hooks';
import signupForm from 'json/forms/employerSignup.json';
import styles from './signup.module.scss';

const ROUTE = '/api/employers';
const handleData = ({data}) => {
  const { error, message, email, url } = data || {};
  if (error) console.log({ message });
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
    <Form inputs={signupForm} title="Employer Sign Up" route={ROUTE} handleData={handleData} />
  </div>
)};

export const getServerSideProps = setup(async () => ({ props: {} }))

export default Signup;
