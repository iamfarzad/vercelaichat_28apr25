'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Clock, Brain, Wrench, Bot } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

export function WhyWorkWithMeSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Why Work With Me</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] mx-auto" />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <motion.div variants={item}>
            <Card className="bg-card/80 backdrop-blur-sm border border-border h-full hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] flex items-center justify-center shrink-0">
                  <Clock className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">10,000+ Hours</h3>
                  <p className="text-muted-foreground">
                    Real-world AI implementation since 2020
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="bg-card/80 backdrop-blur-sm border border-border h-full hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] flex items-center justify-center shrink-0">
                  <Brain className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Self-taught</h3>
                  <p className="text-muted-foreground">
                    No theory, only what works in practice
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="bg-card/80 backdrop-blur-sm border border-border h-full hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] flex items-center justify-center shrink-0">
                  <Wrench className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Real Tools</h3>
                  <p className="text-muted-foreground">
                    Built for mental health, productivity, and automation
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="bg-card/80 backdrop-blur-sm border border-border h-full hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] flex items-center justify-center shrink-0">
                  <Bot className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Live Demo</h3>
                  <p className="text-muted-foreground">
                    My entire website runs on my own AI assistant—try it
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center"
        >
          <Link
            href="/about"
            className="group inline-flex items-center gap-1 text-foreground hover:text-[oklch(var(--brand-orange))] transition-colors"
          >
            <span>Read My Full Story</span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
