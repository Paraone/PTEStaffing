import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import { Redirector } from '~components';

const Job = () => {
    const router = useRouter();
    const { query: { jobId } } = router;

    const [jobData, setJobData] = useState(null);

    useEffect(() => {
        let source = axios.CancelToken.source();
        axios.get(`/api/job/${jobId}`, {
            cancelToken: source.token
        }).then((response) => {
            setJobData(response?.data);
        }).catch((err) => {
          console.log('job/[jobId].js', { err })
        });
        
        return () => { source.cancel("Cancelling in cleanup") };
    }, []);

    const { 
      jobtitle,
      date,
      wardrobe,
      positions,
      other,
      othertext
     } = jobData || {};

    return (
      <Redirector>
        <div>
          <Head>
            <title>{jobtitle}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>
          <h1>{jobtitle}</h1>
          <h3>{date}</h3>
    
          <div>wardrobe: {wardrobe}</div>
          <div>positions: {positions}</div>
          {(other && !othertext) &&
            <div>other: {othertext}</div>
          }
        </div>
      </Redirector>
    );
}

export default Job;