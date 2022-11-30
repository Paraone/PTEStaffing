import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Redirector, Loader } from '~components';
import {useTransitionHook} from '~hooks';
import styles from './employers.module.scss';


const Employers = () => {
    const pageStyles = useTransitionHook();
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        let source = axios.CancelToken.source();
        axios.get('/api/employers', {
            cancelToken: source.token
        }).then((response) => {
            let users = response?.data?.data;
            if (Array.isArray(users) && users.length > 1) {
                users = users.sort((a, b) => b.businessName > a.businessName ? -1 : 1)
            }
            setUserData(users);
        });
        
        return () => { source.cancel("Cancelling in cleanup") };
    }, []);

    const userProfiles = Array.isArray(userData) && userData.length > 0 ?
        userData.map(({ businessName, firstName, lastName, email, logo }, index) => (
            <div className={styles.business} key={index}>
                <h1>{businessName}</h1>
                <div><img width={120} src={logo ? `https://drive.google.com/uc?id=${logo}` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/1200px-Placeholder_no_text.svg.png'} /></div>
                <div>First Name: {firstName}</div>
                <div>Last Name: {lastName}</div>
                <div>Email: {email}</div>
                <div><Link href="/employer/[businessName]" as={`/employer/${businessName}`}>Overview</Link></div>
                <div><Link href="/employer/[accountId]/account" as={`/employer/${businessName}/account`}>Account Page</Link></div>
            </div>
        ))
        :
        (<Loader />);

    return (
        <Redirector>
            <div className={pageStyles}>
                <h2>Businesses:</h2>
                <div className={styles.businesses}>
                    {userProfiles}  
                </div>
            </div>
        </Redirector>
    );
}

export default Employers;