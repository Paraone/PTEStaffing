import { func } from 'prop-types';
import { useContext } from 'react';
import { UserContext } from '~components/Layout/Layout';

const Footer = ({ revalidate, cookie }) =>{
    const { userId } = useContext(UserContext);
    return (userId &&
        <p>
            <button
                onClick={() => {
                cookie.remove('token');
                revalidate();
            }}>
                Logout
            </button>
        </p>
    );
};

Footer.propTypes = {
    revalidate: func.isRequired,
    cookie: func.isRequired
}

export default Footer;