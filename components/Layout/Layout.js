import React, { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';
import fetch from 'isomorphic-unfetch';
import { node, string, oneOfType } from 'prop-types';
import useSWR from 'swr';
import cookie from 'js-cookie';
import { Header, Footer, MobileNav } from '~components';

export const UserContext = createContext({});

const Layout = ({ children }) => {
    const { query: { alert } } = useRouter();

    const {data = {}, revalidate} = useSWR('/api/me', async function(args) {
        const res = await fetch(args);
        return res.json();
    });

    const [showMobile, setShowMobile] = useState(true);
    const handleResize = debounce(() => {
        if (window.screen.availWidth >= 480) setShowMobile(false);
        else if (window.screen.availWidth <= 480) setShowMobile(true);
    }, 250);

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => { window.removeEventListener('resize', handleResize); }
    }, []);

    useEffect(() => { revalidate(); }, [children]);

    if (!data) return <h1>Loading...</h1>;
    const navigation = showMobile ? <MobileNav /> : <Header />
    // let loggedIn = !!data.profileId;

    return (
        <UserContext.Provider value={data}>
            {navigation}
            {!!alert && <p>{alert}</p>}
            {children}
            <Footer cookie={cookie} revalidate={revalidate} />
        </UserContext.Provider>
    );
};

Layout.propTypes = {
    children: oneOfType([node, string]).isRequired
}

export default Layout;