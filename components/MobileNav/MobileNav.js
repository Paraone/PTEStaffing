import { useState } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import Menu from '../Menu/Menu';
import { Login } from '~components';
import menuItems from '../../json/nav.json';
import styles from './MobileNav.module.scss';
import { useSession, signOut } from 'next-auth/react';

const MobileNav = () => {
    const { data: session } = useSession();
    const { profileId, businessName } = session?.session?.user || {};
    const [displayMenu, setDisplayMenu] = useState(false);
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
                        <Menu onClick={toggleMenu} className={styles['mobile-user-menu']} menuItems={userMenu} />
                    ) : (
                        <div className={styles['mobile-nav-login']}>
                            <Login /> 
                            <span>or</span> 
                            <div>
                                <span>Find: </span><Link onClick={toggleMenu} href="/employer/signup">Staff</Link><span> | </span><Link onClick={toggleMenu} href="/staff/signup">Work</Link>
                            </div>
                        </div>
                    )
                }
                <Menu onClick={toggleMenu} className={styles['mobile-user-menu']} menuItems={menuItems} />
                {session &&
                    <Link href="" onClick={() => signOut({ callbackUrl: `/?alert=${'You have been signed out.'}`})}>Sign Out</Link>
                }

            </div>
        </>

    )
};

export default MobileNav;