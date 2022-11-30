import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { debounce } from 'lodash';
import { node, string, oneOfType } from 'prop-types';
import { Header, Footer, MobileNav, Loader } from '~components';

const Layout = ({ children }) => {
    const { query: { alert } } = useRouter();

    const [showMobile, setShowMobile] = useState(true);
    const [loaded, setLoaded] = useState(false);

    const handleResize = debounce(() => {
        if (window.screen.availWidth >= 480) setShowMobile(false);
        else if (window.screen.availWidth <= 480) setShowMobile(true);
        if (!loaded) setLoaded(true);
    }, 250);

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => { window.removeEventListener('resize', handleResize); }
    }, []);

    if (!loaded) return <Loader />;
    const navigation = showMobile ? <MobileNav /> : <Header />
    // let loggedIn = !!data.profileId;

    return (
        <div>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {navigation}
            {!!alert && <p>{alert}</p>}
            {children}
            <Footer />
        </div>
    );
};

Layout.propTypes = {
    children: oneOfType([node, string]).isRequired
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      },
    }
  }

  return {
    props: {
      ...session,
    }
  }
}

export default Layout;