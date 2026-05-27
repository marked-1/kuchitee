import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'How does Print-on-Demand work?',
    answer: 'When you place an order, we print your design specifically for you. This means no excess inventory, sustainable production, and unique items every time. Your tee is printed using DTF (Direct to Film) technology for vibrant, long-lasting colors.',
  },
  {
    question: 'What are your shipping times?',
    answer: 'Standard production time is 2-3 business days. Shipping times vary by location: India: 5-7 days, Global: 10-15 days. You\'ll receive tracking information via email once your order ships.',
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes! We ship to over 100 countries worldwide. Shipping costs and delivery times vary by location. You can see exact shipping costs at checkout.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and various local payment methods depending on your region. All transactions are secure and encrypted.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer free returns within 30 days of delivery if you\'re not satisfied with your order. Items must be unworn and in original packaging. For defective items, we\'ll replace them at no cost.',
  },
  {
    question: 'How do I find the right size?',
    answer: 'Our tees are designed with a premium oversized fit. We recommend checking the size guide on each product page. If you\'re between sizes, we suggest sizing up for the intended oversized look.',
  },
  {
    question: 'Can I track my order?',
    answer: 'Yes! Once your order ships, you\'ll receive an email with a tracking number. You can also track your order status in your account dashboard.',
  },
  {
    question: 'Do you offer wholesale or bulk orders?',
    answer: 'Yes, we offer wholesale pricing for bulk orders (10+ items). Please contact us at wholesale@kuchitee.com for custom pricing and lead times.',
  },
  {
    question: 'Are your designs original?',
    answer: 'Absolutely! All our designs are original creations, crafted by our team of designers. We\'re committed to unique, high-quality artwork that you won\'t find anywhere else.',
  },
  {
    question: 'How do I care for my KuchiTee?',
    answer: 'For best results, wash inside out in cold water. Tumble dry low or hang dry. Avoid bleach and ironing directly on the print. This will keep your tee looking fresh for years!',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left bg-card hover:bg-card/80 transition-colors"
      >
        <span className="text-white font-semibold pr-4">{question}</span>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-red-500 flex-shrink-0 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      {isOpen && (
        <div className="p-6 pt-0 text-foreground/70 bg-card">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">FAQ</h1>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Frequently asked questions about KuchiTee. Can't find what you're looking for?{' '}
              <a href="/contact" className="text-red-500 hover:underline">Contact us</a>.
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          {/* Contact CTA */}
          <Card className="bg-card border-border p-8 mt-16 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Still have questions?</h2>
            <p className="text-foreground/70 mb-6">
              Our support team is here to help. Send us a message and we'll get back to you within 24 hours.
            </p>
            <a href="/contact">
              <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors">
                Contact Support
              </button>
            </a>
          </Card>
        </div>
      </main>
    </div>
  );
}
