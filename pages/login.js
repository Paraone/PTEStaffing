import React from 'react';
import { string } from 'prop-types';
import { getCsrfToken } from "next-auth/react";
import Image from 'next/image';
import Link from 'next/link';
import styles from './login.module.scss';

export default function Login({ csrfToken }) {
  return (
    <form className={styles.root} method="post" action="/api/auth/callback/credentials">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <Link className={styles.link} href="/">
        <h1>
          Diamond Elite
        </h1>
        <Image
          priority
          height={75}
          width={150}
          className={styles.logo}
          src="/images/rotating_diamond.gif"
          alt="Prime Time Entertainment Staffing logo"
        />
      </Link>
      <div className={styles.input}>
        <label htmlFor='email'>
          email
        </label>
        <input name="email" type="email" required />
      </div>
      <div className={styles.input}>
        <label htmlFor='password'>
          Password
        </label>
        <input name="password" type="password" required />
      </div>
      <div>
        <button className={styles.submit} type="submit">Sign in</button>
      </div>
    </form>
  )
}

Login.propTypes = {
  csrfToken: string.isRequired
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
