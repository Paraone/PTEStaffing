import React from 'react';
import { array, string } from 'prop-types';
import cx from 'classnames';
import Link from 'next/link';
import styles from './Dropdown.module.scss';

const Dropdown = ({ heading, list, cta, className }) => {

    return (
        <div className={cx(styles.dropdown, className)}>
            <Link className={styles.heading} href={cta}>{heading}</Link>
            <ul className={styles.list}>
                {
                    list.map(({ linkName, cta }, index) => (
                        <li key={index}><Link href={cta}>{linkName}</Link></li>
                    ))
                }
            </ul>
        </div>
    )
};

Dropdown.propTypes = {
    heading: string.isRequired,
    cta: string,
    list: array
};

Dropdown.defaultProps = {
    list: [],
    cta: ''
}

export default Dropdown;