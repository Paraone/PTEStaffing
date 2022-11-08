import React from 'react';
import { array, string } from 'prop-types';
import Link from 'next/link';
import styles from './Dropdown.module.css';

const Dropdown = ({ heading, list, cta }) => {

    return (
        <div className={styles.dropdown}>
            <div className={styles.heading}><Link href={cta}>{heading}</Link></div>
            <ul className={styles.list}>
                {
                    list.map(({ linkName, linkValue }, index) => (
                        <li key={index}><Link href={linkValue}>{linkName}</Link></li>
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