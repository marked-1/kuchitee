import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Mail, MessageCircle, Clock, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to a backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <Card className="bg-card border-border p-6 text-center">
              <Mail className="w-10 h-10 text-red-500 mx-auto mb-4" />
              <h3 className="text-white font-bold mb-2">Email</h3>
              <p className="text-foreground/60 text-sm">support@kuchitee.com</p>
            </Card>

            <Card className="bg-card border-border p-6 text-center">
              <MessageCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
              <h3 className="text-white font-bold mb-2">Live Chat</h3>
              <p className="text-foreground/60 text-sm">Available 24/7</p>
            </Card>

            <Card className="bg-card border-border p-6 text-center">
              <Clock className="w-10 h-10 text-red-500 mx-auto mb-4" />
              <h3 className="text-white font-bold mb-2">Response Time</h3>
              <p className="text-foreground/60 text-sm">Within 24 hours</p>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-card border-border p-8 mt-12">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Message Sent!</h2>
                <p className="text-foreground/70">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-white mb-2 block">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-background border-border text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white mb-2 block">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-background border-border text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-white mb-2 block">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="bg-background border-border text-white"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-white mb-2 block">Message</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-background border-border text-white"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-bold"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}
