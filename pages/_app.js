import { SessionProvider } from 'next-auth/react';
import PropTypes from 'prop-types';
import { Layout } from '~components';
import '../styles.scss';

export function MyApp ({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    );
} 

MyApp.propTypes = {
    Component: PropTypes.func.isRequired,
    pageProps: PropTypes.shape({
        session: PropTypes.shape({})
    })
}

export default MyApp;
