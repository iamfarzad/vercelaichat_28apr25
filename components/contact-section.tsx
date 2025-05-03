'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="w-full py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>

        <form className="max-w-md mx-auto space-y-6" onSubmit={handleSubmit}>
          <div>
            <Input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-card/80 backdrop-blur-sm border border-border"
            />
          </div>

          <div>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-card/80 backdrop-blur-sm border border-border"
            />
          </div>

          <div>
            <Textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="bg-card/80 backdrop-blur-sm border border-border min-h-[120px]"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] text-white"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>

          {submitSuccess && (
            <div className="text-center text-green-500 dark:text-green-400">
              Message sent successfully!
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
