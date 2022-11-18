import Head from 'next/head';
import cx from 'classnames';
import { useTransitionHook } from '~hooks';
import transitionStyles from '../transitions.module.scss';

function Cleaning() {

  const pageStyles = useTransitionHook();

  return (
    <div className={pageStyles}>
      <Head>
        <title>Cleaning Us | PTE Staffing</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>Cleaning Us</h1>
      <h2>EMAIL YOUR INQUIRY NOW</h2>
      <p>REMEMBER TO INCLUDE YOUR NAME AND BOOKING INQUIRY IN THE SUBJECT</p>
    </div>
  );
}

export default Cleaning;