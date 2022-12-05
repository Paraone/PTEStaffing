import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { Loader } from '~components';
import { useTransitionHook } from '~hooks';


function Confirmation() {
    const router = useRouter();
    const { confirmationCode, email, profileId, businessName, confirmationURL } = router?.query || {};
    const pageStyles = useTransitionHook();
    if (confirmationCode) {
        if (businessName) {
            axios
            .patch(`/api/employer/${businessName}?confirmationCode=${confirmationCode}`)
            .then(({ data: { error, email } }) => {
                if (error) console.log({error});
                if (!email) return console.log({ email });
                Router.push(`/?alert=${'You have successfully registered your account.'}`);
            });

            return (
                <>
                    <Loader />
                    <h1>Redirecting...</h1>
                </>
            )
        }

        axios
        .patch(`/api/staff/${profileId}?confirmationCode=${confirmationCode}`)
        .then(({ data: { error, email } }) => {
            if (error) console.log({error});
            if (!email) return console.log({ email });
            Router.push(`/?alert=${'You have successfully registered your account.'}`);
        });

        return (
            <>
                <Loader />
                <h1>Redirecting...</h1>
            </>
        );
    }

    return (
        <div className={pageStyles}>
            <Head>
            <title>PTEStaffing | Account Confirmation Page</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <h1>PTESTAFFING.COM</h1>
            <div><span>Go to: </span><Link href={confirmationURL}>{confirmationURL}</Link></div>
            <p>
                Please confirm your account by visiting the link in the email sent to {email}
            </p>
        </div>
    );
}

export default Confirmation;
