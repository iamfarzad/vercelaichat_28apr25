'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function FearsAndSolutionsSection() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Common AI Fears
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-card/80 backdrop-blur-sm border border-border">
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                "How do we protect our documents?"
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border border-border">
            <CardHeader>
              <CardTitle>Getting it right</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                "What if we set it up wrong?"
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border border-border">
            <CardHeader>
              <CardTitle>ROI</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                "What if it doesn't pay off?"
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border border-border">
            <CardHeader>
              <CardTitle>Know-how</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                "We don't know enough to start."
              </p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-3xl font-bold text-center mb-8">Our Solution</h2>

        <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto">
          A simple, secure, step-by-step process. Personal advisor, clear plan,
          proper training, ongoing support.
        </p>
      </div>
    </section>
  );
}
