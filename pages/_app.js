import App from 'next/app';
import { Layout } from '~components';
import '../styles.scss';

class MyApp extends App {
    render () {
        const { Component, pageProps } = this.props;
        return (
            <Layout>
                <Component {...pageProps} />
            </Layout>
        );
    }
}

export default MyApp;
