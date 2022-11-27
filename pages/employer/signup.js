import React from 'react';
import Router from 'next/router';
import signupForm from 'json/forms/employerSignup.json';
import { Form } from '~components';
import {useTransitionHook} from '~hooks';

const ROUTE = '/api/employers';
const handleData = ({data}) => {
  const { error, email, url } = data || {};
  console.log({ url })
  if (error) console.log({error});
  if (email) {
    Router.push(`/confirmation?email=${email}&alert=${`Go to ${encodeURIComponent(url)}`}`)
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
