import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { node } from 'prop-types';
import Router, { useRouter } from 'next/router';
import { useTransitionHook } from 'customHooks';
import { Loader } from '~components';
import { EMPLOYER_TYPE, STAFF_TYPE } from 'constants';

const Redirector = ({ children }) => {
    const pageStyles = useTransitionHook();
    const router = useRouter();
    const { query, pathname } = router;
    const { businessName, profileId } = query || {};
    const { data: session } = useSession();
    const { profileId: sessionProfileId, businessName: sessionBusinessName, email, emailConfirmed } = session?.session?.user || {};
    const [loading, setLoading] = useState(true);
    const [, accountType,, accountRoute] = pathname.split('/');
    const user = sessionProfileId || sessionBusinessName;
    const isStaffAccount = accountType === STAFF_TYPE && !!accountRoute;
    const isEmployerAccount = accountType === EMPLOYER_TYPE && !!accountRoute;

    useEffect(() => {   
        if (!session) {
            const alert = 'you must be logged in to view this page.'
            Router.push(`/login?alert=${alert}`);
            return;
        }
        
        if ((isStaffAccount && (user !== profileId)) || (isEmployerAccount && (user !== businessName))) {
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

    if (loading) return <Loader />;

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