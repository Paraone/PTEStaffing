import React from 'react';
import Router from 'next/router';
import signupForm from 'json/forms/signup.json';
import { Form } from '~components';
import {useTransitionHook} from '~hooks';

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
  <div className={pageStyles}>
    <Form inputs={signupForm} title="Staff Sign Up" route={ROUTE} handleData={handleData} />
  </div>
)};

export default Signup;
