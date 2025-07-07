import Image from 'next/image';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/90"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Ready to book your adventure? Have questions? We&apos;re here to help plan your perfect fishing experience.
          </p>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">Call or text for immediate response</p>
                    <a href="tel:+1234567890" className="text-blue-600 hover:underline font-medium">
                      (123) 456-7890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">Best for detailed inquiries and planning</p>
                    <a href="mailto:book@thorstenson.guide" className="text-blue-600 hover:underline font-medium">
                      book@thorstenson.guide
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Location</h3>
                    <p className="text-gray-600">Serving Ely, Minnesota and surrounding lakes</p>
                    <p className="text-gray-700 font-medium">Ely, MN 55731</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Response Time</h3>
                    <p className="text-gray-600">We typically respond within 2-4 hours</p>
                    <p className="text-gray-700 font-medium">7 AM - 8 PM Daily</p>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Planning Your Trip?</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Best times to call:</strong> Evenings after 6 PM or early mornings</li>
                  <li>• <strong>Booking lead time:</strong> 2-4 weeks recommended for peak season</li>
                  <li>• <strong>Weather updates:</strong> We&apos;ll contact you 24 hours before your trip</li>
                  <li>• <strong>Group size:</strong> Maximum 2 people per trip for optimal experience</li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Trip Type</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select a service...</option>
                    <option value="half-day">Half-Day Adventure (4 hours)</option>
                    <option value="full-day">Full-Day Expedition (8 hours)</option>
                    <option value="multi-day">Multi-Day Package</option>
                    <option value="custom">Custom / Not Sure</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Dates (if known)</label>
                  <input
                    type="text"
                    placeholder="e.g., July 15-20, 2025 or &apos;flexible&apos;"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your group size, experience level, and any special requests..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center">
                  Prefer to call? We&apos;re always happy to chat! <br/>
                  <a href="tel:+1234567890" className="text-blue-600 hover:underline font-medium">
                    (123) 456-7890
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* James & Brittney Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Meet Your Contacts</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-20 h-20 mx-auto mb-4 relative">
                  <Image
                    src="/photos/fish1.jpg"
                    alt="James Thorstenson"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">James Thorstenson</h3>
                <p className="text-blue-600 font-semibold mb-3">Your Fishing Guide</p>
                <p className="text-gray-600 text-sm">
                  James will be your guide on the water. Feel free to ask him any questions 
                  about fishing techniques, local conditions, or what to expect on your trip.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-20 h-20 mx-auto mb-4 relative">
                  <Image
                    src="/photos/britt-and-ella1.png"
                    alt="Brittney Thorstenson"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Brittney Thorstenson</h3>
                <p className="text-emerald-600 font-semibold mb-3">Booking & Operations</p>
                <p className="text-gray-600 text-sm">
                  Brittney handles all scheduling, payments, and trip coordination. 
                  She&apos;s your go-to person for booking details and any special arrangements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}