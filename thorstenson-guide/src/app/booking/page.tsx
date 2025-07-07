'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Booking() {
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Mock available dates and times
  const availableDates = [
    '2025-01-15', '2025-01-16', '2025-01-18', '2025-01-20', '2025-01-22',
    '2025-01-25', '2025-01-27', '2025-01-29', '2025-02-01', '2025-02-03'
  ];

  const availableTimes = ['6:00 AM', '7:00 AM', '8:00 AM', '1:00 PM', '2:00 PM'];

  const services = [
    { id: 'half-day', name: 'Half-Day Adventure (4 hours)', price: '$350' },
    { id: 'full-day', name: 'Full-Day Expedition (8 hours)', price: '$650' },
    { id: 'multi-day', name: 'Multi-Day Package', price: '$1,200/day' }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/90"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Book Your Adventure</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Schedule your guided fishing experience in beautiful Ely, Minnesota
          </p>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Booking Process Steps */}
            <div className="mb-12">
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                    <span className="ml-2 text-sm font-medium">Choose Service</span>
                  </div>
                  <div className="w-8 h-px bg-gray-300"></div>
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${selectedService ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>2</div>
                    <span className="ml-2 text-sm font-medium">Select Date & Time</span>
                  </div>
                  <div className="w-8 h-px bg-gray-300"></div>
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${selectedDate && selectedTime ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>3</div>
                    <span className="ml-2 text-sm font-medium">Contact Details</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Selection */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 1: Choose Your Service</h2>
              <div className="grid gap-4">
                {services.map((service) => (
                  <label key={service.id} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="service"
                      value={service.id}
                      checked={selectedService === service.id}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900">{service.name}</span>
                        <span className="text-blue-600 font-semibold">{service.price}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-4">
                <Link href="/services" className="text-blue-600 hover:underline">
                  View detailed service information and what&apos;s included
                </Link>
              </p>
            </div>

            {/* Date & Time Selection */}
            {selectedService && (
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 2: Select Date & Time</h2>
                
                {/* Calendar Mock */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Dates</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {availableDates.map((date) => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`p-3 text-sm rounded-lg border text-center transition-colors ${
                          selectedDate === date 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                        }`}
                      >
                        <div className="font-semibold">{new Date(date).getDate()}</div>
                        <div className="text-xs">{new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short' })}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Times for {formatDate(selectedDate)}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {availableTimes.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 text-sm rounded-lg border text-center transition-colors ${
                            selectedTime === time 
                              ? 'bg-blue-600 text-white border-blue-600' 
                              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Contact Form */}
            {selectedService && selectedDate && selectedTime && (
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 3: Contact Information</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of People</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>1 person</option>
                      <option>2 people</option>
                      <option>3 people (+$100)</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests or Questions</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Any special requirements, experience level, or questions for James?"
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* Booking Summary & Payment */}
            {selectedService && selectedDate && selectedTime && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Summary</h2>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Service:</span>
                      <span>{services.find(s => s.id === selectedService)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Date:</span>
                      <span>{formatDate(selectedDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Time:</span>
                      <span>{selectedTime}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-blue-600">{services.find(s => s.id === selectedService)?.price}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    <strong>Deposit Required:</strong> A 50% deposit is required to secure your booking. 
                    The remaining balance is due on the day of your trip.
                  </p>
                </div>

                <div className="space-y-4">
                  <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Proceed to Payment
                  </button>
                  
                  <div className="text-center text-sm text-gray-600">
                    <p>Or contact us directly:</p>
                    <div className="flex justify-center space-x-4 mt-2">
                      <a href="tel:+1234567890" className="text-blue-600 hover:underline">
                        📞 (123) 456-7890
                      </a>
                      <a href="mailto:book@thorstenson.guide" className="text-blue-600 hover:underline">
                        ✉️ book@thorstenson.guide
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Integration Notice */}
            <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Coming Soon: Full Online Booking</h3>
              <p className="text-yellow-700">
                This booking form is currently in development. For now, please contact us directly to check availability 
                and make your reservation. We&apos;ll have full online booking with payment processing available soon!
              </p>
              <div className="mt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-4 py-2 bg-yellow-200 text-yellow-800 rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  Contact Us to Book
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}