import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import { Redirector } from '~components';

const User = () => {
    const router = useRouter();
    const { query: { businessName } } = router;

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        let source = axios.CancelToken.source();
        axios.get(`/api/employer/${businessName}`, {
            cancelToken: source.token
        }).then((response) => {

            setUserData(response?.data?.data);
        }).catch((err) => {
          console.log('users/[businessName].js', { err })
        });
        
        return () => { source.cancel("Cancelling in cleanup") };
    }, []);

    const { 
      email,
      firstName,
      lastName,
      phone,
      address1,
      address2,
      city,
      state,
      zip,
      positions,
      logo,
      resume
     } = userData || {};
    const logoUrl = `https://drive.google.com/uc?id=${logo}`;
    
    return (!!email &&
      <Redirector>
        <div>
          <Head>
            <title>Profile Page: {businessName}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>
          <div>
            {logo && <img src={logoUrl}width={120}/>}
          </div>
          <h1>{businessName}</h1>
          <h3>{firstName + ' ' + lastName}</h3>
    
          <div>phone: {phone}</div>
          <div>email: {email}</div>
          <div>positions: {positions}</div>
          <div>
            <p>Address:</p>
            {address1 && <div>{address1}</div>}
            {address2 && <div>{address2}</div>}
            {(city || state || zip) && <div>{`${city}, ${state} ${zip}`}</div>}
          </div>
          {resume && <h3><a href={`https://drive.google.com/uc?id=${resume}`} target="_blank" rel="noreferrer">resume</a></h3>}
        </div>
      </Redirector>
    );
}

export default User;