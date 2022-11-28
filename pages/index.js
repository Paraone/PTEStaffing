import Head from 'next/head';
import Link from 'next/link';
import { useTransitionHook } from '~hooks';
import { useSession } from 'next-auth/react';
import styles from './index.module.scss';

function Home() {
  const { data: session } = useSession();

  const pageStyles = useTransitionHook(10);
  const findStaffHref = session ? `/staff` : '/employer/signup';
  const findWorkHref = session ? `/employers` : '/staff/signup';
  return (
    <div className={pageStyles}>
      <Head>
        <title>Welcome to PTE Staffing</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>PTESTAFFING.COM</h1>
      <h2>I want to:</h2>
      <div className={styles.signups}>
        <Link className={styles['signup-btn']} href={findStaffHref}>find staff</Link>
        <Link className={styles['signup-btn']} href={findWorkHref}>find work</Link>
      </div>
      <h2>The Tri-State Area&apos;s Leading Professional Staffing Network</h2>
      <p>
        Our Network of Associates are Dedicated to Excellence of Service 
        in Medical and Allied Health Care Industries, Event Consultation & Planning 
        and Corporate & Residential Cleaning Services
      </p>
      {!session &&
        <>
          <Link href="/login">Login</Link>
          <p>or</p>
          <Link href="/signup">Sign Up</Link>
        </>
      }
      
    </div>
  );
}

export default Home;
