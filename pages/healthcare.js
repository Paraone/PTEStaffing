import { useTransitionHook } from 'customHooks';
import Head from 'next/head';

function Healthcare() {
  const pageStyles = useTransitionHook();

  return (
    <div className={pageStyles}>
      <Head>
        <title>Healthcare Services | PTE Staffing</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <h1>Medical & Allied Health Care Staffing</h1>
        <p>PTE is Your Allied Workforce Solutions Partner &nbsp;</p>

        <p>
          <span>
            PTE is an innovator in workforce solutions and offers medical clinician and allied health care workforce specialties for various assignment lengths — including&nbsp;
          </span>
          <a href="https://www.amnhealthcare.com/permanent-placement-recruitment-services/" rel="noreferrer" target="_blank">
            <span>permanent placement</span>
          </a>
          <span>, travel, and temporary staff.</span>
        </p>

        <p>
          Our staffing experts will match you with qualified candidates through a careful screening, interviewing, and quality assurance process.&nbsp;
        </p>

        <p>Home Health Care Aides and Medical Field Workforce Solutions</p>

        <p>
          <span>
            You can trust PTE with your loved one&apos;s and organizations medical affiliate clinicians staffing needs. PTE&apos;s r
          </span>
          <a href="https://www.amnhealthcare.com/recruitment-process-outsourcing/" rel="noreferrer" target="_blank">
            <span>ecruitment process is tailored to</span>
          </a>
          <span>
            &nbsp;provides a dedicated team to your facility for the complete process of recruitment, hiring, and onboarding. We specialize in sourcing Home Health Aides, Registered Professional Nurses (RN&apos;s), and Clinical Nurse Specialists (CNS&apos;s) Whether your family member requires live-in care or regular check-ins several times a week, our services are the answer you are looking for. We work with patients who have recently been discharged from the hospital, patients with disabilities, as well as patients with chronic or terminal illness. Our services include short-term and long-term plans, which we can adjust based on the changing needs of your family member. We also offer respite care for patients who already have a primary caregiver but are in need of on call coverage.&nbsp;
          </span>
        </p>

        <p>Filling More Allied Positions</p>

        <p>PTE Staffing allied services recruit qualified allied health professionals.</p>

        <p>Physical Therapists</p>

        <p>
          We specialize in delivering qualified Physical Therapists (PT) to a variety of clinic settings. Our team understands how important a PT is when planning for preventive care, rehabilitation, and treatment for patients with chronic conditions and illnesses. That’s why we’ll work hard to mine our database of PTs. You can count on a diversified and well-rounded candidate to hit the ground from day one. We go the extra step to vet each candidate to make sure they are the best fit for your therapy needs.
        </p>

      </div>
    </div>
  );
}

export default Healthcare;