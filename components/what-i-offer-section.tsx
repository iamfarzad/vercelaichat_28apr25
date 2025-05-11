'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Workflow, Shield, GraduationCap, Laptop, Users } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: 'spring',
      stiffness: 100,
      damping: 15
    } 
  }
};

export function WhatIOfferSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-muted/20">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">What I Offer</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] mx-auto"></div>
        </motion.div>

        <Tabs defaultValue="consulting" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-background/50 backdrop-blur-sm">
              <TabsTrigger value="consulting" className="text-base px-6">AI Consulting</TabsTrigger>
              <TabsTrigger value="training" className="text-base px-6">Hands-On Training</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="consulting" className="mt-0">
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                  }
                }
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <motion.div variants={fadeIn}>
                <Card className="bg-card/80 backdrop-blur-sm border border-border h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] flex items-center justify-center mb-4">
                      <MessageSquare className="text-white" size={24} />
                    </div>
                    <CardTitle>Custom Copilots & Chatbots</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Tailored AI assistants that understand your business context and help your team work more efficiently.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn}>
                <Card className="bg-card/80 backdrop-blur-sm border border-border h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] flex items-center justify-center mb-4">
                      <Workflow className="text-white" size={24} />
                    </div>
                    <CardTitle>Workflow & Data Automation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Streamline repetitive tasks and processes with intelligent automation that saves time and reduces errors.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn}>
                <Card className="bg-card/80 backdrop-blur-sm border border-border h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] flex items-center justify-center mb-4">
                      <Shield className="text-white" size={24} />
                    </div>
                    <CardTitle>Private/Local AI Models</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Secure AI solutions that keep sensitive business logic and data within your control.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="training" className="mt-0">
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                  }
                }
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <motion.div variants={fadeIn}>
                <Card className="bg-card/80 backdrop-blur-sm border border-border h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] flex items-center justify-center mb-4">
                      <GraduationCap className="text-white" size={24} />
                    </div>
                    <CardTitle>Balanced Learning</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      3 hours theory + 3 hours practical implementation for a complete learning experience.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn}>
                <Card className="bg-card/80 backdrop-blur-sm border border-border h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] flex items-center justify-center mb-4">
                      <Laptop className="text-white" size={24} />
                    </div>
                    <CardTitle>Modern AI Tools</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Hands-on training with ChatGPT, Claude, Gemini, Copilot, and LangChain.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn}>
                <Card className="bg-card/80 backdrop-blur-sm border border-border h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] flex items-center justify-center mb-4">
                      <Users className="text-white" size={24} />
                    </div>
                    <CardTitle>Team-Focused</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Tailored for ops, marketing, product, and technical teams with role-specific examples.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center mt-10"
        >
          <Link 
            href="/services"
            className="group inline-flex items-center gap-1 text-foreground hover:text-[oklch(var(--brand-orange))] transition-colors"
          >
            <span>See Services</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
