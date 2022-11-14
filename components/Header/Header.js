import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Menu from '../Menu/Menu';
import { UserContext } from '~components/Layout/Layout';
import { Login } from '~components';
import menuItems from '../../json/nav.json';
import styles from './Header.module.scss';

const Header = () => {
    const { userId, profileId } = useContext(UserContext);
    const userMenu = [
      {
        heading: 'users',
        cta: '/users'
      },
      {
        heading: 'profile',
        cta: `/users/${profileId}`
      },
      {
        heading: 'account',
        cta: `/accounts/${profileId}`
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
              {!!userId ?
                (
                  <Menu className={styles['user-menu']} menuItems={userMenu}/>
                ) : (    
                  <div className={styles['header-login']}>
                    <Login /> <span>or</span> <Link href="/signup">Sign Up</Link>
                  </div>
                )
              }
            </div>
          </div>
          <Menu menuItems={menuItems}/>
        </div>
    )
};

export default Header;