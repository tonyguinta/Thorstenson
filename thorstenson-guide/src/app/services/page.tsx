import Image from 'next/image';
import Link from 'next/link';

export default function Services() {
  const services = [
    {
      name: "Half-Day Adventure",
      duration: "4 hours",
      price: "$350",
      priceNote: "for 1-2 people",
      description: "Perfect for beginners or those with limited time. Experience Ely&apos;s best fishing spots with professional guidance.",
      includes: [
        "Professional guide (James)",
        "Fishing equipment & tackle",
        "Bait and lures",
        "Basic fish cleaning",
        "Safety equipment",
        "Local knowledge & techniques"
      ],
      bestFor: "Beginners, families with young kids, time-constrained visitors",
      image: "/photos/fish3.jpg"
    },
    {
      name: "Full-Day Expedition",
      duration: "8 hours",
      price: "$650",
      priceNote: "for 1-2 people",
      description: "The complete Ely fishing experience. Explore multiple prime locations and target various species throughout the day.",
      includes: [
        "Professional guide (James)",
        "All fishing equipment & premium tackle",
        "Variety of baits and lures",
        "Shore lunch (fresh catch prepared lakeside)",
        "Complete fish cleaning & packaging",
        "Safety equipment & first aid",
        "Boat, motor & fuel",
        "Cooler with ice"
      ],
      bestFor: "Serious anglers, groups wanting full experience, trophy hunters",
      image: "/photos/fish1.jpg",
      popular: true
    },
    {
      name: "Multi-Day Package",
      duration: "2-3 days",
      price: "$1,200",
      priceNote: "per day (1-2 people)",
      description: "Immerse yourself in the Boundary Waters experience with consecutive days of guided fishing across different lakes.",
      includes: [
        "Daily professional guiding",
        "Premium equipment for entire stay",
        "Multiple lake access",
        "Daily shore lunch",
        "Fish cleaning & packaging",
        "Lodging recommendations",
        "Trip planning & coordination"
      ],
      bestFor: "Fishing enthusiasts, special occasions, ultimate wilderness experience",
      image: "/photos/fish2.jpg"
    }
  ];

  const additionalServices = [
    {
      title: "Ice Fishing (Winter)",
      price: "$400/day",
      description: "Experience Minnesota winter fishing at its finest with heated shelters and specialized equipment."
    },
    {
      title: "Family Packages",
      price: "Custom pricing",
      description: "Specially designed trips for families with children, including kid-friendly equipment and techniques."
    },
    {
      title: "Corporate Groups",
      price: "Group rates available",
      description: "Team building and corporate outings with customized packages for larger groups."
    },
    {
      title: "Photography Trips",
      price: "+$100",
      description: "Capture your adventure with professional guidance for the best fishing photography opportunities."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/90"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Fishing Guide Services</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Professional guided fishing experiences in Ely, Minnesota and the Boundary Waters Canoe Area
          </p>
        </div>
      </div>

      {/* Main Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Adventure</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                From quick half-day trips to multi-day expeditions, we have the perfect fishing experience for every angler.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className={`bg-white rounded-xl shadow-lg overflow-hidden ${service.popular ? 'ring-2 ring-blue-500 relative' : ''}`}>
                  {service.popular && (
                    <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="relative h-48">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-2xl font-bold text-blue-600">{service.price}</span>
                        <span className="text-gray-500 text-sm">{service.priceNote}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{service.duration} • {service.bestFor}</p>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{service.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">What&apos;s Included:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {service.includes.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Link
                      href="/booking"
                      className={`w-full inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold transition-colors ${
                        service.popular 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      Book This Trip
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional Services</h2>
              <p className="text-gray-600">
                Specialized trips and add-ons to enhance your fishing experience
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {additionalServices.map((service, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                    <span className="text-blue-600 font-semibold">{service.price}</span>
                  </div>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Equipment & Policies */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            
            {/* Equipment */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Equipment & Gear</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Provided Equipment</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• High-quality rods and reels</li>
                    <li>• Tackle box with variety of lures</li>
                    <li>• Live bait and artificial baits</li>
                    <li>• Landing nets and tools</li>
                    <li>• Safety equipment and life jackets</li>
                    <li>• Boat, motor, and fuel</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">What to Bring</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Valid Minnesota fishing license</li>
                    <li>• Weather-appropriate clothing</li>
                    <li>• Sunglasses and sunscreen</li>
                    <li>• Camera for your catches</li>
                    <li>• Snacks and drinks</li>
                    <li>• Cooler for your fish (optional)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Policies */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Policies & Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Booking & Cancellation</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• 50% deposit required to secure booking</li>
                    <li>• 72-hour cancellation for full refund</li>
                    <li>• Weather cancellations fully refundable</li>
                    <li>• Rescheduling available based on availability</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Group Size & Pricing</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Maximum 2 people per trip (safety & quality)</li>
                    <li>• Additional person: +$100/day</li>
                    <li>• Children under 12: 50% discount</li>
                    <li>• Group discounts for 3+ day packages</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Season & Availability</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Open water: May through October</li>
                    <li>• Ice fishing: December through March</li>
                    <li>• Peak season: June through August</li>
                    <li>• Advanced booking recommended</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Book Your Adventure?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Contact us to check availability and secure your guided fishing experience in beautiful Ely, Minnesota.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="px-8 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Book Online
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}