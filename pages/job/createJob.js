import React from 'react';
import Router from 'next/router';
import jobForm from 'json/forms/jobForm.json';
import { Form } from '~components';
import {useTransitionHook} from '~hooks';

const ROUTE = '/api/jobs';
const handleData = ({data}) => {
  const { error, message, jobId } = data || {};
  if (error) console.log({ message });
  if (jobId) {
    Router.push(`/job/${jobId}`);
  }
};

const Signup = () => {
  const pageStyles = useTransitionHook();

  return (
  <div className={pageStyles}>
    <Form inputs={jobForm} title="Post a job" route={ROUTE} handleData={handleData} />
  </div>
)};

export default Signup;
