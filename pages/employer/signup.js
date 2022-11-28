import React from 'react';
import Router from 'next/router';
import signupForm from 'json/forms/employerSignup.json';
import { Form } from '~components';
import {useTransitionHook} from '~hooks';

const ROUTE = '/api/employers';
const handleData = ({data}) => {
  const { error, message, email, url } = data || {};
  if (error) console.log({ message });
  if (email) {
    Router.push(`/confirmation?email=${email}&confirmationURL=${encodeURIComponent(url)}`)
  }
};

const Signup = () => {
  const pageStyles = useTransitionHook();

  return (
  <div className={pageStyles}>
    <Form inputs={signupForm} title="Employer Sign Up" route={ROUTE} handleData={handleData} />
  </div>
)};

export default Signup;
