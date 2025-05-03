import { AboutPageClient } from './about-page-client';
import { getServerSession } from 'next-auth/react';
// import { authOptions } from '@/lib/auth';

export const metadata = {
  title: 'About - F.B Consulting',
  description:
    'Learn about Farzad Bayat, AI Systems Consultant based in Oslo, Norway.',
};

export default async function AboutPage() {
  const session = await getServerSession(authOptions);

  return <AboutPageClient session={session} />;
}
