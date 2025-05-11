import { AskBar } from '@/components/hero-section/ask-bar';

export default function HomePage() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Welcome to Our Application
      </h1>
      <p className="text-lg text-gray-700 mb-12 text-center max-w-2xl mx-auto">
        This is a brief description of our application and what it offers. We
        aim to provide innovative solutions to complex problems, making your
        life easier and more productive.
      </p>

      {/* Hero Ask Bar - Reusing existing component structure */}
      <section className="my-12">
        <AskBar />
      </section>

      <section className="my-12">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Our Core Services
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Service One</h3>
            <p className="text-gray-600">
              Description of the first core service. Highlighting its key
              benefits and features.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Service Two</h3>
            <p className="text-gray-600">
              Description of the second core service. Emphasizing its unique
              value proposition.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Service Three</h3>
            <p className="text-gray-600">
              Description of the third core service. Focusing on how it
              addresses customer needs.
            </p>
          </div>
        </div>
      </section>

      <section className="my-12 text-center">
        <h2 className="text-3xl font-semibold mb-4">Placeholder Section</h2>
        <p className="text-gray-700">
          More content will go here, such as testimonials, case studies, or
          other relevant information.
        </p>
      </section>
    </main>
  );
}
