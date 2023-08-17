import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import cx from 'classnames';
import { useTransitionHook } from '~hooks';
import { useSession } from 'next-auth/react';
import { Login } from '~components';
import styles from './index.module.scss';
import { PROVIDER_TYPE, STAFF_TYPE } from '~constants';

function Home() {
  const { data: session } = useSession();
  const accountType = session?.session?.user?.accountType;
  const pageStyles = useTransitionHook(10);
  const becomeADiamond = session ? `/job/createJob` : '/contentprovider/signup';
  const findWorkHref = session ? `/jobs` : '/staff/signup';
  return (
    <div className={cx(styles.root, pageStyles)}>
      <Head>
        <title>Welcome to Diamond Elite</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <p>Experience Rare Before It&apos;s Too Late</p>
      <h1>Diamond Elite</h1>
      <Link className={styles['logo-link']} href="/">
        <Image
          priority
          height={100}
          width={200}
          className={styles.logo}
          src="/images/rotating_diamond.gif"
          alt="Prime Time Entertainment Staffing logo"
        />
      </Link>
      <div className={styles.buttons}>
        {(!session || accountType === PROVIDER_TYPE) &&
          <Link className={styles['find-btn']} href={becomeADiamond}>Become a Diamond Elite Content Provider</Link>
        }
        {(!session || accountType === STAFF_TYPE) &&
          <Link className={styles['find-btn']} href={findWorkHref}>Join the Diamond Elite Community</Link>
        }
      </div>

      {/* <div className={styles.or}>or</div> */}

      <Login className={styles.signin}/>
      
    </div>
  );
}

export default Home;
