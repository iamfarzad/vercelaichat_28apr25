'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { ModernButton } from '@/components/ui/modern-button';

// Create component aliases to avoid naming conflicts
const CardComponent = Card;
const CardContentComponent = CardContent;
const TabsComponent = Tabs;
const TabsListComponent = TabsList;
const TabsTriggerComponent = TabsTrigger;
const TabsContentComponent = TabsContent;

// Define types for the about page
interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

// Mock data for the about page
const testimonials: Record<string, Testimonial[]> = {
  business: [
    {
      id: 'business-1',
      name: 'Sarah Johnson',
      role: 'CEO',
      company: 'TechCorp',
      content: 'Farzad transformed our customer support with an AI assistant that reduced response times by 70%. His understanding of both business needs and technical implementation was impressive.',
      rating: 5
    },
    {
      id: 'business-2',
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'InnovateX',
      content: 'Working with Farzad was a game-changer for our product. He delivered a scalable AI solution that exceeded our expectations and was completed ahead of schedule.',
      rating: 5
    }
  ],
  tech: [
    {
      id: 'tech-1',
      name: 'Alex Rodriguez',
      role: 'CTO',
      company: 'DevHub',
      content: 'The AI integration Farzad implemented was technically flawless. His documentation made it easy for our team to maintain and extend the system.',
      rating: 5
    },
    {
      id: 'tech-2',
      name: 'Jamie Wilson',
      role: 'Lead Developer',
      company: 'CodeCraft',
      content: 'Farzad\'s expertise in AI and machine learning is top-notch. He helped us implement a complex recommendation system that improved our user engagement by 45%.',
      rating: 5
    }
  ]
};

// Define skill type
interface Skill {
  id: string;
  name: string;
  description?: string;
}

// Define tool category type
interface ToolCategory {
  id: string;
  name: string;
  tools: string[];
}

// Define project type
interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

// Mock data for skills section
const skills: Skill[] = [
  { id: 'ai-automation', name: 'AI Automation & Workflow Design' },
  { id: 'conversational-ai', name: 'Conversational AI (Chatbots & Copilots)' },
  { id: 'llm-implementation', name: 'Local/Private LLM Implementation' },
  { id: 'prompt-engineering', name: 'Prompt Engineering & Tool Integration' },
  { id: 'vector-dbs', name: 'Vector Databases & Hybrid Search' },
  { id: 'graph-mindmaps', name: 'Graph-based Mindmaps & User Modeling' },
  { id: 'mvp-prototyping', name: 'MVP Prototyping & Team Leadership' },
];

// Mock data for tools
const tools: ToolCategory[] = [
  {
    id: 'ai-models',
    name: 'AI Models & Platforms',
    tools: [
      'OpenAI / ChatGPT (GPT-4, 4o)',
      'Claude (Sonnet 3.5 / 3.7)',
      'Google Gemini API (multimodal)',
      'Microsoft Copilot & Azure AI Studio',
    ],
  },
  {
    id: 'development',
    name: 'Development Stack',
    tools: [
      'LangChain, Chroma, Supabase',
      'Redis, Postgres, Vercel',
      'Tailwind CSS, Next.js, React',
      'Zapier, Make.com, LM Studio, Ollama',
    ],
  },
];

// Mock data for projects section
const projects: Project[] = [
  {
    id: 'talk-to-eve',
    title: 'Talk to Eve',
    description: 'A mental wellness platform with memory, emotion tracking, and mindmapping capabilities.',
    tags: ['LLM Integration', 'Emotion Analysis', 'Graph Database'],
  },
  {
    id: 'iwriter-ai',
    title: 'iWriter.ai',
    description: 'AI-powered content generation platform with industry-specific templates and tone control.',
    tags: ['Content Generation', 'Custom Templates', 'API Integration'],
  },
  {
    id: 'farzad-ai',
    title: 'FarzadAI Assistant',
    description: 'The AI assistant powering this website, with voice chat, document analysis, and real-time interaction.',
    tags: ['Voice Interface', 'Document Processing', 'Multi-modal'],
  },
];

// Testimonial card component
function TestimonialCard({ testimonial }: { testimonial: Testimonial }): JSX.Element {
  return (
    <CardComponent className="border-border hover:shadow-md transition-shadow">
      <CardContentComponent className="pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 text-brand-orange">
            {'★'.repeat(testimonial.rating)}
          </div>
          <p className="italic mb-6">"{testimonial.content}"</p>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
              <span className="font-medium">
                {testimonial.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </span>
            </div>
            <div>
              <p className="font-medium">{testimonial.name}</p>
              <p className="text-sm text-muted-foreground">
                {testimonial.role}, {testimonial.company}
              </p>
            </div>
          </div>
        </motion.div>
      </CardContentComponent>
    </CardComponent>
  );
}

// Main about page component
function AboutPageClient() {
  return (
    <div className="min-h-screen bg-background">
      {/* Skills, Tools & Projects Tabs Section */}
      <section className="w-full py-16 md:py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">My Expertise</h2>

          <TabsComponent defaultValue="skills" className="max-w-4xl mx-auto">
            <TabsListComponent className="grid w-full grid-cols-3 mb-8">
              <TabsTriggerComponent value="skills">Skills & Expertise</TabsTriggerComponent>
              <TabsTriggerComponent value="tools">Tools I Work With</TabsTriggerComponent>
              <TabsTriggerComponent value="projects">Notable Projects</TabsTriggerComponent>
            </TabsListComponent>

            {/* Skills Tab */}
            <TabsContentComponent value="skills">
              <CardComponent className="bg-card/80 backdrop-blur-sm border border-border">
                <CardContentComponent className="pt-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ul className="space-y-3">
                      {skills.map((skill) => (
                        <li key={skill.id} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-brand-orange mr-2 mt-1 flex-shrink-0" />
                          <span>{skill.name}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </CardContentComponent>
              </CardComponent>
            </TabsContentComponent>

            {/* Tools Tab */}
            <TabsContentComponent value="tools">
              <CardComponent className="bg-card/80 backdrop-blur-sm border border-border">
                <CardContentComponent className="pt-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {tools.map((category: ToolCategory) => (
                        <div key={category.id}>
                          <h3 className="text-lg font-medium mb-3">
                            {category.name}
                          </h3>
                          <ul className="space-y-2">
                            {category.tools.map((tool: string, index: number) => (
                              <li key={`${category.id}-${index}`} className="flex items-center">
                                <span className="w-2 h-2 rounded-full bg-brand-orange mr-2" />
                                {tool}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </CardContentComponent>
              </CardComponent>
            </TabsContentComponent>

            {/* Projects Tab */}
            <TabsContentComponent value="projects">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <CardComponent key={project.id} className="border-border hover:shadow-md transition-shadow">
                    <CardContentComponent className="pt-6">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span 
                            key={`${project.id}-${tag}`}
                            className="text-xs bg-muted px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContentComponent>
                  </CardComponent>
                ))}
              </div>
            </TabsContentComponent>
          </TabsComponent>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">
            What Clients Say
          </h2>

          <TabsComponent defaultValue="business" className="max-w-4xl mx-auto">
            <TabsListComponent className="grid w-full grid-cols-2 mb-8">
              <TabsTriggerComponent value="business">Business Leaders</TabsTriggerComponent>
              <TabsTriggerComponent value="tech">Tech Teams</TabsTriggerComponent>
            </TabsListComponent>

            <TabsContentComponent value="business" className="space-y-6">
              {testimonials.business.map((testimonial) => (
                <CardComponent key={testimonial.id} className="border-border">
                  <CardContentComponent className="pt-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-4 text-brand-orange">
                        {'★'.repeat(testimonial.rating)}
                      </div>
                      <p className="italic mb-6">"{testimonial.content}"</p>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                          <span className="font-medium">
                            {testimonial.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </CardContentComponent>
                </CardComponent>
              ))}
            </TabsContentComponent>

            {/* Tools Tab */}
            <TabsContentComponent value="tools">
              <CardComponent className="bg-card/80 backdrop-blur-sm border border-border">
                <CardContentComponent className="pt-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="space-y-8">
                      {tools.map((category: ToolCategory) => (
                        <div key={category.id}>
                          <h3 className="text-lg font-semibold mb-3">
                            {category.name}
                          </h3>
                          <ul className="space-y-2">
                            {category.tools.map((tool: string) => (
                              <li key={`${category.id}-${tool}`} className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-brand-orange mr-2 mt-1 flex-shrink-0" />
                                <span>{tool}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </CardContentComponent>
              </CardComponent>
            </TabsContentComponent>

            {/* Projects Tab */}
            <TabsContentComponent value="projects">
              <CardComponent className="bg-card/80 backdrop-blur-sm border border-border">
                <CardContentComponent className="pt-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="grid gap-6">
                      {projects.map((project) => (
                        <div key={project.id} className="border rounded-lg p-6">
                          <h3 className="text-xl font-semibold mb-2">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-secondary text-secondary-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </CardContentComponent>
              </CardComponent>
            </TabsContentComponent>
          </TabsComponent>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">
            What People Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {Object.values(testimonials)
              .flat()
              .map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPageClient;
