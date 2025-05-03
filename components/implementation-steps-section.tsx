'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PhoneCall, CheckSquare, Rocket } from 'lucide-react';

export function ImplementationStepsSection() {
  return (
    <section id="process" className="w-full py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Implementation Steps
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card/80 backdrop-blur-sm border border-border hover:translate-y-[-8px] transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] flex items-center justify-center mb-4">
                <PhoneCall className="text-white" size={24} />
              </div>
              <CardTitle>1. Book Call</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Free 30-min chat to map goals.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border border-border hover:translate-y-[-8px] transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] flex items-center justify-center mb-4">
                <CheckSquare className="text-white" size={24} />
              </div>
              <CardTitle>2. Execute Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We work together on a fixed plan.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border border-border hover:translate-y-[-8px] transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] flex items-center justify-center mb-4">
                <Rocket className="text-white" size={24} />
              </div>
              <CardTitle>3. Start New Workflow</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Team uses AI in daily work.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
