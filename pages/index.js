import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import cx from 'classnames';
import { useTransitionHook } from '~hooks';
import { useSession, signIn } from 'next-auth/react';
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
      <p>Experience Rare Before It's Too Late.</p>
      <Link className={styles['logo-link']} href="/">
        <Image
          priority
          height={150}
          width={500}
          className={styles.logo}
          src="/images/diamond_elite_logo.jpg"
          alt="Prime Time Entertainment Staffing logo"
        />
      </Link>
      <div className={styles.buttons}>
        {(!session || accountType === PROVIDER_TYPE) &&
          <Link className={styles['find-btn']} href={becomeADiamond}>Become a Diamond Elite content provider</Link>
        }
        {(!session || accountType === STAFF_TYPE) &&
          <Link className={styles['find-btn']} href={findWorkHref}>Join the Diamond Elite community</Link>
        }
      </div>
      
    </div>
  );
}

export default Home;
