'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, GraduationCap, Wrench } from 'lucide-react';

export function ServicesSection() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Services at a Glance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card/80 backdrop-blur-sm border border-border hover:translate-y-[-8px] transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] flex items-center justify-center mb-4">
                <MessageSquare className="text-white" size={24} />
              </div>
              <CardTitle>Secure AI Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Own AI chat for your staff. Norwegian-level security. Bring your
                documents for sharper answers.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border border-border hover:translate-y-[-8px] transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] flex items-center justify-center mb-4">
                <GraduationCap className="text-white" size={24} />
              </div>
              <CardTitle>AI Training</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Clear courses for teams and leaders. From beginner to skilled
                user. Personal instructor included.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border border-border hover:translate-y-[-8px] transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] flex items-center justify-center mb-4">
                <Wrench className="text-white" size={24} />
              </div>
              <CardTitle>AI Start Package</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Step-by-step company rollout plus staff courses. Structured,
                secure, and fast.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
