import WorkshopLayout from './layout';

// Placeholder content for the Workshop page
// You can replace this with the actual content from page_structures/4_workshop.md

export default function WorkshopPage() {
  return (
    <WorkshopLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Hands-On AI Workshops for Your Team</h1>
        <p className="text-lg mb-8">
          Coming Soon – Get notified when the full workshop schedule is live.
        </p>
        <a href="/#waitlist" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Join the Waitlist
        </a>

        <section className="my-12">
          <h2 className="text-3xl font-semibold mb-4">What to Expect</h2>
          <p className="mb-4">
            These workshops are built from real-world experience—not theory. Every session is designed to give your team a working understanding of AI and the ability to build practical tools by the end of the day.
          </p>
          <p className="mb-4">
            Most AI tools fail in companies not because the technology is bad—but because the team doesn't understand how they work. These workshops start from the ground up:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>No prior coding or AI experience required</li>
            <li>Clear explanations of how prompts, tokens, context windows, and APIs actually function</li>
            <li>You'll leave knowing how to troubleshoot basic AI issues on your own</li>
          </ul>
        </section>

        <section className="my-12">
          <h3 className="text-2xl font-semibold mb-2">Workshop Format</h3>
          <ul className="list-disc list-inside mb-4">
            <li><strong>3 hours theory:</strong> What LLMs are, how they work, risks, limitations, and architecture basics.</li>
            <li><strong>3 hours hands-on:</strong> Build a chatbot, automate a task, or create your own internal assistant using tools like ChatGPT, Claude, Gemini, and LangChain.</li>
          </ul>
        </section>

        {/* Add more sections as needed based on 4_workshop.md */}

      </div>
    </WorkshopLayout>
  );
}
