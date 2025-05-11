'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mic, FileText, MessageSquareText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function ProofSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-muted/20">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.2)] opacity-30 blur-xl" />
            <div className="relative bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[oklch(var(--brand-orange))] flex items-center justify-center">
                    <MessageSquareText className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="font-medium">AI Assistant</div>
                    <div className="text-xs text-muted-foreground">Online</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center">
                    <Mic size={16} className="text-muted-foreground" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center">
                    <FileText size={16} className="text-muted-foreground" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="bg-muted/30 p-3 rounded-lg rounded-tl-none w-4/5">
                  <div className="h-3 bg-muted/50 rounded w-full mb-2" />
                  <div className="h-3 bg-muted/50 rounded w-3/4" />
                </div>
                
                <div className="bg-[oklch(var(--brand-orange))/15] p-3 rounded-lg rounded-tr-none w-4/5 ml-auto">
                  <div className="h-3 bg-[oklch(var(--brand-orange))/30] rounded w-full mb-2" />
                  <div className="h-3 bg-[oklch(var(--brand-orange))/30] rounded w-5/6" />
                  <div className="h-3 bg-[oklch(var(--brand-orange))/30] rounded w-4/5 mt-2" />
                </div>
                
                <div className="bg-muted/30 p-3 rounded-lg rounded-tl-none w-4/5">
                  <div className="h-3 bg-muted/50 rounded w-full mb-2" />
                  <div className="h-3 bg-muted/50 rounded w-2/3" />
                  <div className="h-3 bg-muted/50 rounded w-3/4 mt-2" />
                </div>
              </div>
              
              <div className="relative">
                <input 
                  type="text" 
                  className="w-full bg-muted/30 border border-border rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[oklch(var(--brand-orange))]" 
                  placeholder="Ask me anything..." 
                  disabled 
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[oklch(var(--brand-orange))] flex items-center justify-center">
                  <ArrowRight size={16} className="text-white" />
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl font-bold mb-6">Live Demo: This Website Runs on My AI</h2>
            <p className="text-xl mb-8 text-muted-foreground">
              This entire site is powered by my custom AI implementation. Try it yourself.
            </p>
            
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" x2="12" y1="19" y2="22" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Voice/Text Interaction</h3>
                  <p className="text-muted-foreground">Natural conversations with real-time document analysis</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] flex items-center justify-center shrink-0">
                  <FileText className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Document & PDF Analysis</h3>
                  <p className="text-muted-foreground">Upload files and get intelligent insights instantly</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Personalized Responses</h3>
                  <p className="text-muted-foreground">Tailored recommendations based on your needs</p>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-10"
            >
              <Link href="/ai-demo">
                <Button 
                  className="bg-gradient-to-r from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] text-white group flex items-center gap-2 px-6 py-6 text-lg h-auto hover:shadow-lg transition-all duration-300"
                >
                  <span>Explore the AI Assistant</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
