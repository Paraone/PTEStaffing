import Head from 'next/head';
import { useTransitionHook } from '~hooks';

function Cleaning() {

  const pageStyles = useTransitionHook();

  return (
    <div className={pageStyles}>
      <Head>
        <title>Cleaning Us | PTE Staffing</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <h1>Prime Time Commercial Cleaning&nbsp;</h1>

        <p><span>Ask about our eco-friendly commercial cleaning services</span></p>

        <p>&nbsp;Building Cleaning</p>

        <p>Janitorial and Office Cleaning</p>

        <p>&nbsp;Window Cleaning (Internal)</p>

        <p>Floor and Carpet Cleaning&nbsp;</p>

        <p>Restrooms</p>

        <p>Garbage Removal</p>

        <p>&nbsp;Specialty Services Before and After Corporate Events</p>

        <h1>Prime Time Residential Cleaning</h1>

        <p><span>Ask about our eco-friendly residential cleaning services</span></p>

        <p>Living Room Area</p>

        <p>Kitchen Spaces</p>

        <p>Countertops</p>

        <p>&nbsp;Sinks</p>

        <p>&nbsp;Appliances</p>

        <p>Floors</p>

        <p>Bathroom walls</p>

        <p>Showers</p>

        <p>&nbsp;Tubs</p>

        <p>&nbsp;Sinks</p>

        <p>Mirrors</p>

        <p>&nbsp;Toilets</p>

        <p>Bedrooms &nbsp;</p>

        <p>Vacuuming</p>

        <p>&nbsp;Surface dusting</p>

        <p>&nbsp;Cleaning of window sills and blinds.</p>

        <p>
          Prime Time professionals will leave your commercial space and residence in flawless condition using environmentally safe cleaning products and practices.
        </p>

        <p>
          We make sure that each room is clean, grime-free, disinfected and dazzling.
        </p>

      </div>
    </div>
  );
}

export default Cleaning;