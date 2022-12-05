import Head from 'next/head';
import Link from 'next/link';
import cx from 'classnames';
import { useTransitionHook } from '~hooks';
import { useSession, signIn } from 'next-auth/react';
import styles from './index.module.scss';
import { EMPLOYER_TYPE, STAFF_TYPE } from '~constants';

function Home() {
  const { data: session } = useSession();
  const accountType = session?.session?.user?.accountType;
  const pageStyles = useTransitionHook(10);
  const findStaffHref = session ? `/job/createJob` : '/employer/signup';
  const findWorkHref = session ? `/jobs` : '/staff/signup';
  return (
    <div className={cx(styles.root, pageStyles)}>
      <Head>
        <title>Welcome to PTE Staffing</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>PTESTAFFING.COM</h1>
      <div className={styles.buttons}>
        {(!session || accountType === EMPLOYER_TYPE) &&
          <Link className={styles['find-btn']} href={findStaffHref}>find staff</Link>
        }
        {(!session || accountType === STAFF_TYPE) &&
          <Link className={styles['find-btn']} href={findWorkHref}>find work</Link>
        }
      </div>
      <h2>The Tri-State Area&apos;s Leading Professional Staffing Network</h2>
      <p>
        Our Network of Associates are Dedicated to Excellence of Service 
        in Medical and Allied Health Care Industries, Event Consultation & Planning 
        and Corporate & Residential Cleaning Services
      </p>
      {!session &&
        <>
          <Link href="/login" onClick={() => signIn('email', { callbackUrl: `/?alert=${'You have signed in.'}`})}>Sign In</Link>
          <p>or</p>
          <p>
            find <Link href="/employer/signup">Staff</Link> | <Link href="/staff/signup">Work</Link>
          </p>
        </>
      }
      
    </div>
  );
}

export default Home;
