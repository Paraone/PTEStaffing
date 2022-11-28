import React from 'react';
import { string } from 'prop-types';
import { getCsrfToken } from "next-auth/react"

export default function Login({ csrfToken }) {
  return (
    <form method="post" action="/api/auth/callback/credentials">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label htmlFor='email'>
        email
      </label>
      <input name="email" type="email" required />
      <label htmlFor='password'>
        Password
      </label>
      <input name="password" type="password" required />
      <div>
        <button type="submit">Sign in</button>
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
