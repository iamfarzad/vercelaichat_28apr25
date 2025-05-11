// import { Header } from '@/components/header'; // Removed
// import { Footer } from '@/components/footer'; // Removed

export default function WorkshopLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Header /> Removed */}
      <main className="flex-grow">{children}</main>
      {/* <Footer /> Removed */}
    </>
  );
}
