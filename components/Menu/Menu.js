import Link from 'next/link';
import Dropdown from '~components/Dropdown/Dropdown';
import styles from './Menu.module.scss';


const Menu = () => {
    return (
        <nav className={styles.menu}>
            <div><Dropdown className={styles.dropdown} heading="Event Consultation & Staffing" cta="/events" list={[{ linkName: 'home', linkValue: '/'}, { linkName: 'users', linkValue: '/users'}]} /></div>
            <div><Dropdown className={styles.dropdown} heading="Medical & Allied Health Care Staffing" cta="/healthcare" list={[{ linkName: 'users', linkValue: '/users'}]} /></div>
            <div><Dropdown className={styles.dropdown} heading="Cleaning Services" cta="/cleaning" /></div>
            <div><Dropdown className={styles.dropdown} heading="Privacy Police" cta="/privacy" /></div>
        </nav>
    )
};

export default Menu;