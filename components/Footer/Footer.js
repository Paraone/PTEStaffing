import { useSession, signOut } from 'next-auth/react';

const Footer = () =>{
    const { data: session } = useSession();

    return (session &&
        <p>
            <button onClick={() => { signOut({ callbackUrl: `/?alert=${'You have been signed out.'}`}) }}>
                Logout
            </button>
        </p>
    );
};

export default Footer;