import { cookies } from 'next/headers';


import { auth } from '../(auth)/auth';
import Script from 'next/script';



export default async function Layout({
  children,
}: {
  children: JSX.Element;
}) {
  const [session, cookieStore] = await Promise.all([auth(), cookies()]);
  const isCollapsed = cookieStore.get('sidebar:state')?.value !== 'true';

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
        strategy="beforeInteractive"
      />
      {children}
    </>
  );
}
