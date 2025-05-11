'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Clock, Zap, Presentation } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function FreeWorkshopSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Free Digital Workshop</h2>
            <p className="text-xl mb-8 text-muted-foreground">
              Get a real taste of how AI can help your business – in 30 minutes.
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
                  <Presentation className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Learn what AI can/can't do</h3>
                  <p className="text-muted-foreground">Realistic assessment for your specific business needs</p>
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
                  <Zap className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Automate one real task</h3>
                  <p className="text-muted-foreground">Using ChatGPT or Claude with your actual workflow</p>
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
                  <Clock className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">No slides, no fluff</h3>
                  <p className="text-muted-foreground">Just working examples you can use immediately</p>
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
              <Link href="/workshop">
                <Button 
                  className="bg-gradient-to-r from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] text-white group flex items-center gap-2 px-6 py-6 text-lg h-auto hover:shadow-lg transition-all duration-300"
                >
                  <span>Join Free Workshop</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.2)] opacity-30 blur-xl" />
            <div className="relative bg-card/80 backdrop-blur-sm border border-border rounded-xl p-8 shadow-xl">
              <div className="aspect-video bg-muted/50 rounded-lg mb-6 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[oklch(var(--brand-orange))] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-muted/50 rounded w-3/4" />
                <div className="h-4 bg-muted/50 rounded w-full" />
                <div className="h-4 bg-muted/50 rounded w-5/6" />
                <div className="h-4 bg-muted/50 rounded w-4/6" />
              </div>
              <div className="mt-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted/50" />
                  <div className="h-3 bg-muted/50 rounded w-20" />
                </div>
                <div className="h-8 bg-[oklch(var(--brand-orange))] rounded w-24" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
