'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      category: "Booking & Pricing",
      questions: [
        {
          question: "How far in advance should I book?",
          answer: "We recommend booking 2-4 weeks in advance, especially during peak season (June-August). However, we sometimes have last-minute availability, so don't hesitate to call even for short notice trips."
        },
        {
          question: "What's included in the price?",
          answer: "All trips include professional guide service, high-quality fishing equipment, tackle, bait, safety equipment, and fish cleaning. Full-day trips also include shore lunch and cooler with ice. See our Services page for detailed inclusions."
        },
        {
          question: "Do I need to pay a deposit?",
          answer: "Yes, we require a 50% deposit to secure your booking. The remaining balance is due on the day of your trip. We accept cash, check, or card payments."
        },
        {
          question: "What's your cancellation policy?",
          answer: "We offer full refunds for cancellations made 72 hours or more before your trip. Weather-related cancellations (determined by the guide for safety) are fully refundable or can be rescheduled."
        }
      ]
    },
    {
      category: "What to Expect",
      questions: [
        {
          question: "What should I bring?",
          answer: "Bring a valid Minnesota fishing license, weather-appropriate clothing, sunglasses, sunscreen, camera, and snacks/drinks. We provide all fishing equipment. A cooler for your fish is optional - we can provide one if needed."
        },
        {
          question: "Do you provide equipment for beginners?",
          answer: "Absolutely! We provide all fishing equipment including rods, reels, tackle, and bait. James will teach you proper techniques and help you throughout the trip. No prior experience necessary."
        },
        {
          question: "What if the weather is bad?",
          answer: "Safety is our top priority. If conditions are unsafe, we'll contact you 24 hours before (or morning of) to reschedule or provide a full refund. Light rain usually doesn't stop us - fish often bite better in overcast conditions!"
        },
        {
          question: "How many people can go on one trip?",
          answer: "We limit trips to a maximum of 2 people for safety and to ensure a quality experience. Additional people can be accommodated for an extra $100/day. Children under 12 receive a 50% discount."
        }
      ]
    },
    {
      category: "Fishing Details",
      questions: [
        {
          question: "What types of fish can we catch?",
          answer: "Ely's waters are home to walleye, northern pike, bass (largemouth and smallmouth), lake trout, and various panfish. Species availability depends on season, location, and conditions. James will target species based on your preferences and current conditions."
        },
        {
          question: "What's the best time of year to fish?",
          answer: "Open water season runs May through October. June-August is peak season with warmest weather. May and September offer excellent fishing with fewer crowds. We also offer ice fishing December through March for a unique winter experience."
        },
        {
          question: "Can we keep the fish we catch?",
          answer: "Yes! We follow Minnesota fishing regulations and practice sustainable fishing. James will help you understand limits and select the best fish to keep. We provide basic fish cleaning, and full cleaning/packaging is available."
        },
        {
          question: "What if we don't catch anything?",
          answer: "While we can't guarantee fish (that's why it's called fishing, not catching!), James's local knowledge and 38+ years of experience give you the best possible chance. We focus on the complete experience - enjoying nature, learning techniques, and having fun on the water."
        }
      ]
    },
    {
      category: "Logistics",
      questions: [
        {
          question: "Where do we meet?",
          answer: "Meeting locations vary depending on which lakes we'll be fishing. James will provide specific directions and GPS coordinates when you book. Most launches are within 30 minutes of Ely."
        },
        {
          question: "Do you provide transportation?",
          answer: "Transportation to the boat launch is not included - you'll need to meet us there. However, we provide the boat, motor, fuel, and all on-water transportation during your trip."
        },
        {
          question: "What about lunch on full-day trips?",
          answer: "Full-day trips include a traditional shore lunch where we prepare your fresh-caught fish over an open fire, along with sides. It's a highlight of the experience! We can accommodate dietary restrictions with advance notice."
        },
        {
          question: "Are there bathroom facilities?",
          answer: "Most launch sites have basic facilities. During the trip, we're in wilderness areas where facilities aren't available. James will brief you on what to expect and provide guidance for longer trips."
        }
      ]
    },
    {
      category: "Special Situations",
      questions: [
        {
          question: "Can you accommodate children?",
          answer: "Absolutely! We love taking families fishing. Children under 12 receive a 50% discount. We have smaller equipment and adjust techniques for young anglers. James is experienced working with kids and making it fun for the whole family."
        },
        {
          question: "What about people with mobility issues?",
          answer: "We can accommodate many mobility needs with advance notice. Our boat has comfortable seating and we can adjust fishing techniques accordingly. Please discuss any specific needs when booking so we can ensure a great experience."
        },
        {
          question: "Do you offer gift certificates?",
          answer: "Yes! Fishing trips make great gifts for birthdays, holidays, or special occasions. Contact us to arrange gift certificates. They're valid for one year from purchase date."
        },
        {
          question: "Can we bring alcohol?",
          answer: "We don't permit alcohol during fishing trips for safety reasons. However, we're happy to celebrate your catches with photos and stories! Non-alcoholic beverages are encouraged."
        }
      ]
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/90"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about fishing with Thorstenson Guide Service
          </p>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Quick Contact */}
            <div className="bg-blue-50 rounded-xl p-6 mb-12 text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h2>
              <p className="text-gray-600 mb-4">
                We're here to help! Contact us directly for personalized answers.
              </p>
              <div className="flex justify-center space-x-4">
                <a 
                  href="tel:+1234567890" 
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  📞 Call Us
                </a>
                <a 
                  href="mailto:book@thorstenson.guide" 
                  className="inline-flex items-center px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  ✉️ Email Us
                </a>
              </div>
            </div>

            {/* FAQ Categories */}
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-200">
                  {category.category}
                </h2>
                
                <div className="space-y-4">
                  {category.questions.map((faq, questionIndex) => {
                    const globalIndex = categoryIndex * 100 + questionIndex;
                    const isOpen = openIndex === globalIndex;
                    
                    return (
                      <div key={questionIndex} className="bg-white rounded-lg shadow-sm border">
                        <button
                          onClick={() => toggleFAQ(globalIndex)}
                          className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                          <svg 
                            className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {isOpen && (
                          <div className="px-6 pb-4">
                            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Bottom CTA */}
            <div className="bg-blue-900 text-white rounded-xl p-8 text-center mt-12">
              <h2 className="text-2xl font-bold mb-4">Ready to Book Your Adventure?</h2>
              <p className="text-blue-100 mb-6">
                Don't see your question answered? We'd love to chat and help plan your perfect fishing trip.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/booking"
                  className="px-6 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Book Your Trip
                </a>
                <a
                  href="/contact"
                  className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}