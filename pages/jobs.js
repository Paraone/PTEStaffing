import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cx from 'classnames';
import Link from 'next/link';
import { Redirector, Loader } from '~components';
import {useTransitionHook} from '~hooks';
import styles from './jobs.module.scss';


// TODO: remove unwanted fields from user data

const Jobs = () => {
    const pageStyles = useTransitionHook();
    const [jobsData, setJobsData] = useState([]);
    useEffect(() => {
        let source = axios.CancelToken.source();
        axios.get('/api/jobs', {
            cancelToken: source.token
        }).then((response) => {
            const jobs = response?.data?.data;
            setJobsData(jobs);
        });
        
        return () => { source.cancel("Cancelling in cleanup") };
    }, []);

    const jobsAvailable = Array.isArray(jobsData) && jobsData.length > 0 ?
        jobsData.map(({ 
            id,
            jobtitle,
            date,
            wardrobe,
            positions
         }, index) => (
            <div className={styles['job-card']} key={index}>
                <h1>{jobtitle}<Link className={styles['card-link']} href={`/job/${id}`}>{' ->'}</Link></h1>
                <div>Date: {date}</div>
                <div>wardrobe: {wardrobe}</div>
                <div>positions: {positions}</div>
                <div></div>
            </div>
        ))
        :
        (<Loader />);

    return (
        <Redirector>
            <div className={cx(styles.root, pageStyles)}>
                <h1>Job Posts:</h1>
                <div className={styles['job-list']}>
                    {jobsAvailable}  
                </div>
            </div>
        </Redirector>
    );
}

export default Jobs;