'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface FinalCTASectionProps {
  onButtonClick: () => void;
}

export function FinalCTASection({ onButtonClick }: FinalCTASectionProps) {
  return (
    <section className="w-full py-16 md:py-24 bg-muted/20">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to use AI that actually works?
          </h2>
          <p className="text-xl mb-10 text-muted-foreground">
            Let's identify a use case and get started with practical AI that
            delivers real results.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={onButtonClick}
              className="bg-gradient-to-r from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] text-white px-8 py-6 text-lg h-auto hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
            >
              Book Your Free Consultation
            </Button>

            <Link href="/ai-demo">
              <Button
                variant="outline"
                className="px-8 py-6 text-lg h-auto hover:bg-muted/50 transition-all duration-300 w-full sm:w-auto"
              >
                Try the AI Demo
              </Button>
            </Link>
            <Link href="/services">
              <Button
                variant="outline"
                className="px-8 py-6 text-lg h-auto hover:bg-muted/50 transition-all duration-300 w-full sm:w-auto"
              >
                See Service Plans
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
