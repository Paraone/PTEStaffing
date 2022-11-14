import Link from 'next/link';
import { array } from 'prop-types';
import cx from 'classnames';
import Dropdown from '~components/Dropdown/Dropdown';
import styles from './Menu.module.scss';


const Menu = ({ menuItems, className }) => {
    const items = menuItems.map(({ heading, cta, list }, index) => {
        const hasList = list && list.length > 0;
        return hasList ? 
        (
            <Dropdown key={index} heading={heading} cta={cta} list={list} />
        ) :
        (
            <Link href={cta}>{heading}</Link>
        )
    });

    return (
        <nav className={cx(styles.menu, className)}>
            {items}
        </nav>
    )
};

Menu.propTypes = {
    menuItems: array.isRequired
}

export default Menu;