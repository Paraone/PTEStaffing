import Head from 'next/head';
import { useTransitionHook } from '~hooks';

function Contact() {
  const pageStyles = useTransitionHook();
  
  return (
    <div className={pageStyles}>
      <Head>
        <title>Contact Us | PTE Staffing</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>Contact Us</h1>
      <h2>EMAIL YOUR INQUIRY NOW</h2>
      <p>REMEMBER TO INCLUDE YOUR NAME AND BOOKING INQUIRY IN THE SUBJECT</p>
    </div>
  );
}

export default Contact;