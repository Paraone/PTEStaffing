import React from 'react';
import { array, func, string } from 'prop-types';
import cx from 'classnames';
import Link from 'next/link';
import styles from './Dropdown.module.scss';

const Dropdown = ({ heading, list, cta, className, onClick }) => {

    return (
        <div className={cx(styles.dropdown, className)}>
            <Link onClick={onClick} className={styles.heading} href={cta}>{heading}</Link>
            <ul className={styles.list}>
                {
                    list.map(({ linkName, cta }, index) => (
                        <li key={index}><Link onClick={onClick} href={cta}>{linkName}</Link></li>
                    ))
                }
            </ul>
        </div>
    )
};

Dropdown.propTypes = {
    heading: string.isRequired,
    cta: string,
    className: string,
    list: array,
    onClick: func
};

Dropdown.defaultProps = {
    list: [],
    cta: '',
    className: '',
    onClick: _ => _
}

export default Dropdown;