import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Redirector, Loader } from '~components';
import {useTransitionHook} from '~hooks';
import styles from './staff.module.scss';


// TODO: remove unwanted fields from user data

const Staff = () => {
    const pageStyles = useTransitionHook();
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        let source = axios.CancelToken.source();
        axios.get('/api/staff', {
            cancelToken: source.token
        }).then((response) => {
            const users = response?.data?.data;
            setUserData(users);
        });
        
        return () => { source.cancel("Cancelling in cleanup") };
    }, []);

    const userProfiles = Array.isArray(userData) && userData.length > 0 ?
        userData.map(({ profileId, firstName, lastName, email, profilePic1 }, index) => (
            <div className={styles['staff-member']} key={index}>
                <div><img width={120} src={profilePic1 ? `https://drive.google.com/uc?id=${profilePic1}` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/1200px-Placeholder_no_text.svg.png'} /></div>
                <div>First Name: {firstName}</div>
                <div>Last Name: {lastName}</div>
                <div>Email: {email}</div>
                <div><Link href="/staff/[profileId]" as={`/staff/${profileId}`}>profilePage</Link></div>
                <div><Link href="/staff/[accountId]/account" as={`/staff/${profileId}/account`}>Account Page</Link></div>
            </div>
        ))
        :
        (<Loader />);

    return (
        <Redirector>
            <div className={pageStyles}>
                <h1>Staff Members:</h1>
                <div className={styles['staff-members']}>
                    {userProfiles}  
                </div>
            </div>
        </Redirector>
    );
}

export default Staff;