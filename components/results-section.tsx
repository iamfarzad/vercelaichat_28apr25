'use client';

import { motion } from 'framer-motion';
import { Clock, TrendingUp, BarChart3 } from 'lucide-react';

export function ResultsSection() {
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
          <h2 className="text-3xl font-bold mb-4">
            Results From Real Projects
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.2)] opacity-30 blur-xl"></div>
            <div className="relative bg-card/80 backdrop-blur-sm border border-border rounded-xl p-8 h-full flex flex-col">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] flex items-center justify-center mb-6">
                <Clock className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Response time dropped 65%
              </h3>
              <p className="text-muted-foreground flex-grow">
                Customer service team implemented a custom chatbot that handles
                routine inquiries automatically.
              </p>
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Before</span>
                  <span className="text-sm text-muted-foreground">After</span>
                </div>
                <div className="relative h-2 bg-muted/50 rounded-full mt-2 overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-[oklch(var(--brand-orange))]"
                    initial={{ width: '0%' }}
                    whileInView={{ width: '35%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1 }}
                  ></motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.2)] opacity-30 blur-xl"></div>
            <div className="relative bg-card/80 backdrop-blur-sm border border-border rounded-xl p-8 h-full flex flex-col">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] flex items-center justify-center mb-6">
                <BarChart3 className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Financial reports in 30 seconds
              </h3>
              <p className="text-muted-foreground flex-grow">
                Automated data processing and report generation that previously
                took 3 days of manual work.
              </p>
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">3 days</span>
                  <span className="text-sm text-muted-foreground">30 sec</span>
                </div>
                <div className="relative h-2 bg-muted/50 rounded-full mt-2 overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-[oklch(var(--brand-orange))]"
                    initial={{ width: '0%' }}
                    whileInView={{ width: '99.5%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1 }}
                  ></motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.2)] opacity-30 blur-xl"></div>
            <div className="relative bg-card/80 backdrop-blur-sm border border-border rounded-xl p-8 h-full flex flex-col">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] flex items-center justify-center mb-6">
                <TrendingUp className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Conversion rates up 40%
              </h3>
              <p className="text-muted-foreground flex-grow">
                Marketing team implemented AI-driven content optimization and
                personalized recommendations.
              </p>
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Before</span>
                  <span className="text-sm text-muted-foreground">After</span>
                </div>
                <div className="relative h-2 bg-muted/50 rounded-full mt-2 overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-[oklch(var(--brand-orange))]"
                    initial={{ width: '0%' }}
                    whileInView={{ width: '40%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1 }}
                  ></motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
