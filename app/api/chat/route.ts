// app/api/chat/route.ts
import { streamText, tool } from 'ai';
import { StreamingTextResponse, StreamData } from 'ai/rsc';
import { perplexity } from '@ai-sdk/perplexity';
import { z } from 'zod';


export const maxDuration = 30; // Optional: Set a higher timeout for Vercel Hobby tier

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: perplexity('sonar-medium-chat'),
    system: "You are a helpful AI assistant for a consulting website. Be friendly and informative. You can answer questions about AI, available courses, and consulting services.",
    messages,
    tools: {
      getServiceInformation: tool({
        description: 'Get details about a specific consulting service offered.',
        parameters: z.object({
          serviceName: z.string().describe('The name of the service to get information about (e.g., "AI Strategy Workshop", "Custom Model Development").'),
        }),
        execute: async ({ serviceName }) => {
          // Mocked service data
          if (serviceName.toLowerCase().includes("strategy")) {
            return {
              serviceName,
              description: "Our AI Strategy Workshop helps businesses identify AI opportunities and create a roadmap.",
              duration: "1-2 days",
              cost: "$5,000 - $10,000"
            };
          }
          if (serviceName.toLowerCase().includes("custom model")) {
            return {
              serviceName,
              description: "We develop custom AI models tailored to your specific business needs.",
              duration: "Varies",
              cost: "Starts at $15,000"
            };
          }
          return { 
            serviceName, 
            description: `Details for '${serviceName}' not found. Available services include: AI Strategy Workshop, Custom Model Development.`, 
            notFound: true 
          };
        },
      }),
      askForConfirmation: tool({
        description: 'Asks the user for a yes/no confirmation before proceeding with an action. The message should be clear.',
        parameters: z.object({
            message: z.string().describe('The question or statement to present to the user for confirmation.'),
        }),
        execute: async (args) => {
          // This tool is primarily handled by the client.
          // The backend acknowledges the call. The client will render UI and send back the result.
          console.log(`askForConfirmation tool called with: ${args.message}`);
          return { status: "confirmation_pending", message: args.message };
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}