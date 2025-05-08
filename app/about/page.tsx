import { AboutPageClient } from './about-page-client';
// Correct import for getServerSession
import getServerSession from 'next-auth';
import { authOptions } from '../../lib/auth';

export const metadata = {
  title: 'About - F.B Consulting',
  description:
    'Learn about Farzad Bayat, AI Systems Consultant based in Oslo, Norway.',
};

export default async function AboutPage() {
  // TODO: Provide authOptions for getServerSession if authentication is needed
  // const session = await getServerSession(authOptions);

  // Pass null or undefined for now to avoid build error
  return <AboutPageClient session={undefined} />;
}
