import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/90"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Meet the Thorstensons</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Your guides to the pristine waters of Ely, Minnesota and the Boundary Waters Canoe Area
          </p>
        </div>
      </div>

      {/* Jamie's Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">James &quot;Jamie&quot; Thorstenson</h2>
              <h3 className="text-xl text-blue-700 font-semibold mb-6">Your Fishing Guide & Local Expert</h3>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  At 38, James has spent his entire life connected to the waters of northern Minnesota. 
                  What started as childhood fishing trips has evolved into a deep passion for sharing 
                  the magic of Ely&apos;s pristine lakes with visitors from around the world.
                </p>
                
                <p>
                  For over 5 years, James has called Ely home, establishing himself not just as a 
                  fishing guide but as a pillar of the community through his contracting business, 
                  &quot;James of All Trades.&quot; His dual expertise in construction and guiding gives him 
                  unique insights into both the natural and built environments of the area.
                </p>
                
                <p>
                  When James takes you out on the water, you&apos;re getting more than just a fishing 
                  trip. You&apos;re experiencing the lakes through the eyes of someone who understands 
                  every seasonal change, every hidden spot, and every technique that makes the 
                  difference between a good day and an unforgettable adventure.
                </p>
                
                <p>
                  Beyond fishing, James is an avid bow hunter and outdoor enthusiast who believes 
                  in living naturally and sustainably. His authentic approach to wilderness living 
                  and deep respect for the environment shine through in every guided experience.
                </p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative">
                <Image
                  src="/photos/fish1.jpg"
                  alt="James Thorstenson with a beautiful walleye catch"
                  width={600}
                  height={700}
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-blue-700 text-white p-4 rounded-lg shadow-lg max-w-xs">
                  <p className="text-sm font-medium">
                    &quot;Every cast tells a story, every catch creates a memory&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brittney's Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <div className="relative">
                <Image
                  src="/photos/britt-and-ella1.png"
                  alt="Brittney Thorstenson with daughter Ella on the beach"
                  width={600}
                  height={700}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-emerald-700 text-white p-4 rounded-lg shadow-lg max-w-xs">
                  <p className="text-sm font-medium">
                    &quot;Behind every great adventure is great planning&quot;
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Brittney Thorstenson</h2>
              <h3 className="text-xl text-emerald-700 font-semibold mb-6">Operations Manager & Adventure Partner</h3>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Brittney is the organizational force behind Thorstenson Guide Service, handling 
                  everything from scheduling and finances to ensuring every detail of your trip 
                  is perfectly planned. Her attention to detail and warm communication style make 
                  booking your adventure as smooth as the calm morning waters of Ely.
                </p>
                
                <p>
                  But Brittney is far more than just the business manager—she&apos;s James&apos;s true 
                  adventure partner. Whether it&apos;s exploring new fishing spots, hiking remote 
                  trails, or discovering hidden gems throughout northern Minnesota, Brittney shares 
                  Jamie&apos;s passion for the outdoors and authentic wilderness experiences.
                </p>
                
                <p>
                  As a devoted mother to 22-month-old Ella (with baby number two on the way in 
                  October), Brittney understands the importance of creating family memories in 
                  nature. She brings a unique perspective to family-friendly trip planning and 
                  knows exactly how to make outdoor adventures accessible and enjoyable for all ages.
                </p>
                
                <p>
                  When you contact Thorstenson Guide Service, you&apos;ll likely speak with Brittney 
                  first. Her insider knowledge of the area, combined with her talent for matching 
                  the perfect trip to your interests and experience level, ensures your Ely 
                  adventure exceeds expectations from the very first conversation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Family Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">The Thorstenson Family</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="relative">
                <Image
                  src="/photos/family1.png"
                  alt="The Thorstenson family enjoying the beach together"
                  width={500}
                  height={600}
                  className="rounded-lg shadow-xl"
                />
              </div>
              <div className="relative">
                <Image
                  src="/photos/big-sis.png"
                  alt="Family announcement photo with Ella as big sister"
                  width={500}
                  height={600}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-8 text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Our Promise to You</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                As a family business rooted in the Ely community, we understand that your fishing 
                trip is more than just a day on the water—it&apos;s an investment in memories that will 
                last a lifetime. We treat every guest like family because we know that the best 
                adventures happen when you feel truly welcome and cared for.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Whether you&apos;re a seasoned angler looking to land the fish of a lifetime, a family 
                wanting to introduce kids to the magic of fishing, or someone seeking the peace and 
                beauty of Minnesota&apos;s wilderness, we&apos;re here to make it happen. Our local expertise, 
                genuine hospitality, and passion for these waters ensure that your time with us will 
                be everything you hoped for and more.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}