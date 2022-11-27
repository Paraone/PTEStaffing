import { useState } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import Menu from '../Menu/Menu';
import { Login } from '~components';
import menuItems from '../../json/nav.json';
import styles from './MobileNav.module.scss';
import { useSession } from 'next-auth/react';

const MobileNav = () => {
    const { data: session } = useSession();
    const { userId, profileId } = session?.session?.user || {};
    const [displayMenu, setDisplayMenu] = useState(false);
    const userMenu = [
      {
        heading: 'staff',
        cta: '/staff'
      },
      {
        heading: 'profile',
        cta: `/staff/${profileId}`
      },
      {
        heading: 'account',
        cta: `/accounts/${profileId}`
      }
    ];

    const toggleMenu = () => {
        setDisplayMenu(!displayMenu);
    };

    return (
        <>
        <div className={styles.MobileNav}>
            <div className={styles['mobile-nav']}>
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

                <button onClick={toggleMenu} className={styles.hamburger}>
                    <div></div>
                    <div></div>
                    <div></div>
                </button>
            </div>
        </div>
        <div className={cx(styles['modal-menu'], { [styles.hide]: !displayMenu })}>
            <div className={styles['close-btn']}><button onClick={toggleMenu}>X</button></div>
            {session ?
                (
                    <Menu onClick={toggleMenu} className={styles['mobile-user-menu']} menuItems={userMenu}/>
                ) : (    
                    <div className={styles['mobile-nav-login']}>
                    <Login /> <span>or</span> <Link onClick={toggleMenu} href="/signup">Sign Up</Link>
                    </div>
                )
            }
            <Menu onClick={toggleMenu} className={styles['mobile-user-menu']} menuItems={menuItems}/>
        </div>
        </>

    )
};

export default MobileNav;