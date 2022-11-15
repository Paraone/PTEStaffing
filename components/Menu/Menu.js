import Link from 'next/link';
import { array, func, string } from 'prop-types';
import cx from 'classnames';
import Dropdown from '~components/Dropdown/Dropdown';
import styles from './Menu.module.scss';


const Menu = ({ menuItems, className, onClick }) => {
    const items = menuItems.map(({ heading, cta, list }, index) => {
        const hasList = list && list.length > 0;
        return hasList ? 
        (
            <Dropdown 
                onClick={onClick}
                key={index} 
                heading={heading} 
                cta={cta} 
                list={list} 
            />
        ) :
        (
            <Link 
                onClick={onClick} 
                key={index} 
                href={cta}
            >
                {heading}
            </Link>
        )
    });

    return (
        <nav className={cx(styles.menu, className)}>
            {items}
        </nav>
    )
};

Menu.propTypes = {
    menuItems: array.isRequired,
    className: string,
    onClick: func
}

Menu.defaultProps = {
    className: '',
    onClick: _ => _
}

export default Menu;