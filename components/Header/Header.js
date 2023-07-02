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
        </div>
    )
};

export default Header;