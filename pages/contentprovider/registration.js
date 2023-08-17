import React from 'react';
import Router from 'next/router';
import cx from 'classnames';
import { setup } from 'lib/csrf';
import { Form } from '~components';
import {useTransitionHook} from '~hooks';
import registrationForm from 'json/forms/contentProviderRegistration.json';
import styles from './registration.module.scss';

const ROUTE = '/api/contentproviders';
const handleData = ({data}) => {
  const { error, message, email, url } = data || {};
  if (error) console.log({ message });
  if (email) {
    Router.push(`/confirmation?email=${email}&confirmationURL=${url}`)
  }
};

const registration = () => {
    console.log('registration page')
  const pageStyles = useTransitionHook();
  return (
  <div className={cx(styles.root, pageStyles)}>
    <div className={styles.container}>
      <p>Regitstration Page</p>
      <Form className={styles.form} inputs={registrationForm} route={ROUTE} handleData={handleData} />
    </div>
  </div>
)};

export const getServerSideProps = setup(async () => ({ props: {} }))

export default registration;
