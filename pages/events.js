import Head from 'next/head';
import Image from 'next/image';
import cx from 'classnames';
import { useTransitionHook } from '~hooks';
import styles from './events.module.scss';

function Events() {
  const transitionStyles = useTransitionHook();

  return (
    <div className={cx(styles['events-page'], transitionStyles)}>
      <Head>
        <title>Events | PTE Staffing</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles['image-section']}>
        <Image 
          className="testClass"
          priority
          height={256}
          width={169}
          alt="Wait Staff"
          src="/images/waitstaff.webp"
        />
        <Image 
          priority
          height={156}
          width={209}
          alt="Casino Staff"
          src="/images/casino.webp"
        />
        <Image 
          priority
          height={171}
          width={256}
          alt="Brand Ambassadors"
          src="/images/modelstaff.webp"
        />
        <Image 
          priority
          height={256}
          width={169}
          alt="Puzzle"
          src="/images/puzzle.webp"
        />
        <Image 
          priority
          height={156}
          width={209}
          alt="Construction Staff"
          src="/images/construction.webp"
        />
      </div>
      <div>
        <h1>Event Consultation &amp; Staffing</h1>
        <p>
          <span>
            Since 2014 PTE has been a valued staffing solutions partner in the Tri- State Area. PTE experts simplify the onboarding process by sourcing, vetting and matching prospective candidates to the specific needs of your organization. Whether you are planning an event in the privacy of your home or are expecting 30,000 guests at your music festival. PTE is your go to staffing solution. It is no secret that s
          </span>
          <span>
            taff turnover, absences, burnout and even expansion can lead to staffing vacancies resulting in lost revenues for your business. Based in New York City, operating Nationally PTE has amassed a diverse network of Skilled, Reliable, and Attentive associates delivering support in each market and industry we serve.
          </span>
        </p>
        <p>
          <span>A Unique Consulting and Assignment Staffing Solution</span>
        </p>
        <p>
          <span>Live Entertainment</span>
        </p>
        <ul>
          <li>
            Concert Production and Promotion
          </li>
          <li>
            Private and Corporate Event Planning
          </li>
          <li>
            Brand Activation &amp; Promotional Campaigns
          </li>
          <li>
            Digital Advertising Solutions&nbsp;
          </li>
        </ul>

        <p>Hospitality</p>

        <ul>
          <li>
            F&amp;B Staffing
          </li>
          <li>
            Concierge&nbsp;
          </li>
          <li>
            Private and Corporate Culinary Experiences
          </li>
          <li>
            Food and Cocktail Menu design
          </li>
          <li>
            Corporate and Residential Cleaning
          </li>
        </ul>

        <p>Construction and Renovation</p>

        <ul>
          <li>
            Project Managers
          </li>
          <li>
            Laborers
          </li>
          <li>
            Trade Experts
          </li>
        </ul>

        <p>Medical Clinicians and Allied Health Care</p>

        <ul>
          <li>
            RN&apos;s
          </li>
          <li>
            CNS&apos;s
          </li>
          <li>
            NP&apos;s
          </li>
          <li>
            LPN&apos;s
          </li>
          <li>
            Allied Health Care Providers
          </li>
        </ul>

        <p>
          Whether at home, on location or at the office. We truly understand what it takes to create life long memories and the long term success you or your organization deserves!
        </p>

        <p>We Are Here To Help&nbsp;</p>

        <p>
          Submit a staffing request by calling (646) 245-6603 or complete our quick online staffing request form below. We will get back to you as quickly as possible.
        </p>
      </div>
    </div>
  );
}

export default Events;