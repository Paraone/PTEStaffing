import React from 'react';
import Router from 'next/router';
import jobForm from 'json/forms/jobForm.json';
import { Form } from '~components';
import {useTransitionHook} from '~hooks';

const ROUTE = '/api/jobs';
const handleData = ({data}) => {
  const { error, message, id } = data || {};
  if (error) console.log({ message });
  if (id) Router.push(`/job/${id}`);
};

const createJob = () => {
  const pageStyles = useTransitionHook();

  return (
  <div className={pageStyles}>
    <Form inputs={jobForm} title="Post a job" route={ROUTE} handleData={handleData} />
  </div>
)};

export default createJob;
