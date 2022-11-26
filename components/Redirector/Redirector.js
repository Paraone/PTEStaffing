import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { node } from 'prop-types';
import Router, { useRouter } from 'next/router';
import { useTransitionHook } from 'customHooks';

const Redirector = ({ children }) => {
    const pageStyles = useTransitionHook();
    const router = useRouter();
    const { query = {} } = router;
    const { accountId } = query;
    const { data: session } = useSession();
    const { profileId, email, emailConfirmed } = session?.session?.user || {};
    const [loading, setLoading] = useState(true);

    useEffect(() => {   
        if (!session) {
            const alert = 'you must be logged in to view this page.'
            Router.push(`/login?alert=${alert}`);
            return;
        }
        
        // TODO: increase login security by comparing userId
        if (!!accountId && accountId !== profileId) {
            const alert = 'you are unauthorized to view this page.'
            Router.push(`/?alert=${alert}`);
            return;
        }

        if (!emailConfirmed) {
            Router.push(`/confirmation?email=${email}`);
            return;
        }
        setLoading(false);
    }, [router]);

    if (loading) return <h1>Loading...</h1>;

    return (
        <div className={pageStyles}>
            {children}
        </div>
    );
}

Redirector.propTypes = {
    children: node.isRequired
}

export default Redirector;