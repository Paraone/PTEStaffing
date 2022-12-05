import Link from 'next/link';
import Image from 'next/image';
import Menu from '../Menu/Menu';
import { useSession } from 'next-auth/react';
import { Login } from '~components';
import menuItems from '../../json/nav.json';
import styles from './Header.module.scss';

const Header = () => {
  const { data: session } = useSession();
  const { userId, profileId, businessName } = session?.session?.user || {};

  let profileHeading = 'profile';
  let profileCta = `/staff/${profileId}`
  let accountCta = `/staff/${profileId}/account`
  if (businessName) {
    profileHeading = 'overview';
    profileCta = `/employer/${businessName}`;
    accountCta = `/employer/${businessName}/account`
  }
    const userMenu = [
      {
          heading: 'jobs',
          cta: '/jobs'
      },
      {
        heading: 'employers',
        cta: '/employers'
      },
      {
        heading: 'staff',
        cta: '/staff'
      },
      {
        heading: profileHeading,
        cta: profileCta
      },
      {
        heading: 'account',
        cta: accountCta
      }
    ]

    return (
        <div className={styles.header}>
          <div className={styles['header-top']}>
            <Link href="/">
              <Image
                priority
                height={100}
                width={100}
                className={styles.logo}
                src="/images/pte-logo.jpg"
                alt="Prime Time Entertainment Staffing logo"
              />
            </Link>
            <div>
              {userId ?
                (
                  <Menu className={styles['user-menu']} menuItems={userMenu}/>
                ) : (    
                  <div className={styles['header-login']}>
                    <Login /> 
                    <span>or Find: </span> 
                    <Link className={styles['plain-link']} href="/employer/signup">Staff</Link><span> | </span><Link className={styles['plain-link']} href="/staff/signup">Work</Link>
                  </div>
                )
              }
            </div>
          </div>
          <Menu className={styles['main-nav']} menuItems={menuItems}/>
        </div>
    )
};

export default Header;