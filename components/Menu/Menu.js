import Link from 'next/link';
import Dropdown from '~components/Dropdown/Dropdown';
import styles from './Menu.module.css';


const Menu = () => {
    return (
        <nav className={styles.menu}>
            <div><Dropdown heading="Event Consultation & Staffing" cta="/events" list={[{ linkName: 'home', linkValue: '/'}]} /></div>
            <div><Dropdown heading="Medical & Allied Health Care Staffing" cta="/healthcare" list={[{ linkName: 'users', linkValue: '/users'}]} /></div>
            <div><Dropdown heading="Cleaning Services" cta="/cleaning" /></div>
            <div><Link href="/privacy">Privacy Policy</Link></div>
        </nav>
    )
};

export default Menu;