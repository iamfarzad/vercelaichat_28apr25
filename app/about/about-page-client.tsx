// ... existing imports and code

export function AboutPageClient(props: any) {
  return (
    <div>
      {/* Skills, Tools & Projects Tabs Section */}
      <section className="w-full py-16 md:py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">My Expertise</h2>

          <Tabs defaultValue="skills" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="skills">Skills & Expertise</TabsTrigger>
              <TabsTrigger value="tools">Tools I Work With</TabsTrigger>
              <TabsTrigger value="projects">Notable Projects</TabsTrigger>
            </TabsList>

            <TabsContent value="skills" className="space-y-4">
              <Card className="bg-card/80 backdrop-blur-sm border border-border">
                <CardContent className="pt-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ul className="space-y-3 mb-4">
                      {[
                        'AI automation & workflow design',
                        'Conversational AI (chatbots & copilots)',
                        'Local/private LLM implementation',
                        'Prompt engineering & tool integration',
                        'Vector databases & hybrid search (Chroma, Redis, Postgres)',
                        'Graph-based mindmaps & user modeling',
                        'MVP prototyping, dev team management, debugging',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-brand-orange mr-2 mt-1 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tools" className="space-y-4">
              <Card className="bg-card/80 backdrop-blur-sm border border-border">
                <CardContent className="pt-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">
                          AI Models & Platforms
                        </h3>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-brand-orange mr-2"></span>
                            OpenAI / ChatGPT (GPT-4, 4o)
                          </li>
                          <li className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-brand-orange mr-2"></span>
                            Claude (Sonnet 3.5 / 3.7)
                          </li>
                          <li className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-brand-orange mr-2"></span>
                            Google Gemini API (multimodal)
                          </li>
                          <li className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-brand-orange mr-2"></span>
                            Microsoft Copilot & Azure AI Studio
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-3">
                          Development Stack
                        </h3>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-brand-orange mr-2"></span>
                            LangChain, Chroma, Supabase
                          </li>
                          <li className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-brand-orange mr-2"></span>
                            Redis, Postgres, Vercel
                          </li>
                          <li className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-brand-orange mr-2"></span>
                            Tailwind CSS, Next.js, React
                          </li>
                          <li className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-brand-orange mr-2"></span>
                            Zapier, Make.com, LM Studio, Ollama
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="space-y-4">
              <Card className="bg-card/80 backdrop-blur-sm border border-border">
                <CardContent className="pt-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold mb-2">Talk to Eve</h3>
                        <p className="text-muted-foreground mb-2">
                          A mental wellness platform with memory, emotion
                          tracking, and mindmapping capabilities.
                        </p>
                        <div className="flex gap-2">
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">
                            LLM Integration
                          </span>
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">
                            Emotion Analysis
                          </span>
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">
                            Graph Database
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-2">iWriter.ai</h3>
                        <p className="text-muted-foreground mb-2">
                          AI-powered content generation platform with
                          industry-specific templates and tone control.
                        </p>
                        <div className="flex gap-2">
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">
                            Content Generation
                          </span>
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">
                            Custom Templates
                          </span>
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">
                            API Integration
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-2">
                          FarzadAI Assistant
                        </h3>
                        <p className="text-muted-foreground mb-2">
                          The AI assistant powering this website, with voice
                          chat, document analysis, and real-time interaction.
                        </p>
                        <div className="flex gap-2">
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">
                            Voice Interface
                          </span>
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">
                            Document Processing
                          </span>
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">
                            Multi-modal
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials Section with Tabs */}
      <section className="w-full py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">
            What Clients Say
          </h2>

          <Tabs defaultValue="business" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="business">Business Leaders</TabsTrigger>
              <TabsTrigger value="tech">Tech Teams</TabsTrigger>
              <TabsTrigger value="workshop">Workshop Attendees</TabsTrigger>
            </TabsList>

            <TabsContent value="business" className="space-y-4">
              <div className="grid grid-cols-1 gap-6">
                <Card className="bg-card/80 backdrop-blur-sm border border-border">
                  <CardContent className="p-6">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="mb-4 text-brand-orange">
                        {'★'.repeat(5)}
                      </div>
                      <p className="italic mb-6">
                        "Farzad helped us automate internal workflows in 2
                        weeks—something we couldn't get done in 3 months. His
                        approach was refreshingly direct and focused on results,
                        not buzzwords."
                      </p>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                          <span className="font-medium">JL</span>
                        </div>
                        <div>
                          <p className="font-medium">Jonas Lindberg</p>
                          <p className="text-sm text-muted-foreground">
                            CEO, NordicTech Solutions
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tech" className="space-y-4">
              <div className="grid grid-cols-1 gap-6">
                <Card className="bg-card/80 backdrop-blur-sm border border-border">
                  <CardContent className="p-6">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="mb-4 text-brand-orange">
                        {'★'.repeat(5)}
                      </div>
                      <p className="italic mb-6">
                        "We cut manual email responses by 65% using a custom
                        chatbot he built. What impressed me most was how Farzad
                        understood our technical constraints and built something
                        that actually integrated with our existing systems."
                      </p>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                          <span className="font-medium">MK</span>
                        </div>
                        <div>
                          <p className="font-medium">Maria Kovacs</p>
                          <p className="text-sm text-muted-foreground">
                            CTO, DataFlow Systems
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="workshop" className="space-y-4">
              <div className="grid grid-cols-1 gap-6">
                <Card className="bg-card/80 backdrop-blur-sm border border-border">
                  <CardContent className="p-6">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="mb-4 text-brand-orange">
                        {'★'.repeat(5)}
                      </div>
                      <p className="italic mb-6">
                        "His workshops gave our entire team clarity on how AI
                        actually works—and how to apply it. The hands-on
                        approach meant everyone left with working prototypes
                        they could immediately use in their daily work."
                      </p>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                          <span className="font-medium">AJ</span>
                        </div>
                        <div>
                          <p className="font-medium">Anders Jensen</p>
                          <p className="text-sm text-muted-foreground">
                            Head of Innovation, Scandi Financial Group
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Interactive AI Services Showcase */}
      <section className="w-full py-16 md:py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">
            AI Services Showcase
          </h2>

          <Tabs defaultValue="chatbots" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="chatbots">AI Chatbots</TabsTrigger>
              <TabsTrigger value="automation">Workflow Automation</TabsTrigger>
              <TabsTrigger value="private">Private AI Setup</TabsTrigger>
            </TabsList>

            <TabsContent value="chatbots">
              <Card className="bg-card/80 backdrop-blur-sm border border-border overflow-hidden">
                <div className="md:grid md:grid-cols-2">
                  <div className="p-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-2xl font-bold mb-4">
                        Custom AI Chatbots
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        AI assistants that understand your business documents,
                        answer customer questions, and automate support tasks.
                      </p>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-brand-orange mr-2 mt-1 shrink-0" />
                          <span>Connects to your internal knowledge base</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-brand-orange mr-2 mt-1 shrink-0" />
                          <span>Handles customer inquiries 24/7</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-brand-orange mr-2 mt-1 shrink-0" />
                          <span>Integrates with your existing systems</span>
                        </li>
                      </ul>
                      <ModernButton variant="primary" size="sm">
                        Learn More
                      </ModernButton>
                    </motion.div>
                  </div>
                  <div className="bg-muted/50 flex items-center justify-center p-6">
                    <div className="w-full max-w-xs bg-card rounded-lg shadow-lg p-4 border border-border">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">Company Assistant</h4>
                        <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-muted/50 rounded-lg p-3 text-sm">
                          How can I reset my password?
                        </div>
                        <div className="bg-brand-orange/10 rounded-lg p-3 text-sm">
                          To reset your password, go to the login page and click
                          "Forgot Password". You'll receive an email with
                          instructions to create a new password.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="automation">
              <Card className="bg-card/80 backdrop-blur-sm border border-border overflow-hidden">
                <div className="md:grid md:grid-cols-2">
                  <div className="p-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-2xl font-bold mb-4">
                        Workflow Automation
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Streamline repetitive tasks and processes with
                        AI-powered automation solutions.
                      </p>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-brand-orange mr-2 mt-1 shrink-0" />
                          <span>
                            Email categorization and response drafting
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-brand-orange mr-2 mt-1 shrink-0" />
                          <span>Document processing and data extraction</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-brand-orange mr-2 mt-1 shrink-0" />
                          <span>Content generation and approval workflows</span>
                        </li>
                      </ul>
                      <ModernButton variant="primary" size="sm">
                        Learn More
                      </ModernButton>
                    </motion.div>
                  </div>
                  <div className="bg-muted/50 flex items-center justify-center p-6">
                    <div className="w-full max-w-xs">
                      <div className="flex flex-col gap-3">
                        <div className="bg-card rounded-lg p-3 border border-border flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-brand-orange/20 flex items-center justify-center">
                            1
                          </div>
                          <div className="text-sm">Email received</div>
                        </div>
                        <div className="h-6 border-l border-dashed border-border ml-4"></div>
                        <div className="bg-card rounded-lg p-3 border border-border flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-brand-orange/20 flex items-center justify-center">
                            2
                          </div>
                          <div className="text-sm">AI categorizes content</div>
                        </div>
                        <div className="h-6 border-l border-dashed border-border ml-4"></div>
                        <div className="bg-card rounded-lg p-3 border border-border flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-brand-orange/20 flex items-center justify-center">
                            3
                          </div>
                          <div className="text-sm">Response drafted</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="private">
              <Card className="bg-card/80 backdrop-blur-sm border border-border overflow-hidden">
                <div className="md:grid md:grid-cols-2">
                  <div className="p-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-2xl font-bold mb-4">
                        Private AI Setup
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Secure, on-premises AI solutions for sensitive data and
                        compliance requirements.
                      </p>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-brand-orange mr-2 mt-1 shrink-0" />
                          <span>
                            Local LLM deployment with no data leaving your
                            network
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-brand-orange mr-2 mt-1 shrink-0" />
                          <span>GDPR and regulatory compliance</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-brand-orange mr-2 mt-1 shrink-0" />
                          <span>
                            Custom security policies and access controls
                          </span>
                        </li>
                      </ul>
                      <ModernButton variant="primary" size="sm">
                        Learn More
                      </ModernButton>
                    </motion.div>
                  </div>
                  <div className="bg-muted/50 flex items-center justify-center p-6">
                    <div className="w-full max-w-xs bg-card rounded-lg shadow-lg p-4 border border-border">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">Private AI Server</div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-2 text-xs font-mono">
                          <div>Status: Running</div>
                          <div>Model: Mistral-7B</div>
                          <div>Security: Enabled</div>
                          <div>Data Retention: Local Only</div>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="w-2 h-2 rounded-full bg-green-500"></span>
                          <span>Secure Connection</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
