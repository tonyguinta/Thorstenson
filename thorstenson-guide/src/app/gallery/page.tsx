import Image from 'next/image';
import Link from 'next/link';

export default function Gallery() {
  // Mock Instagram posts data - this would come from Instagram API
  const mockInstagramPosts = [
    {
      id: '1',
      image: '/photos/fish2.jpg',
      caption: 'What a beauty! This 36" northern pike made Tom\'s day unforgettable. Perfect weather and even better company on Shagawa Lake. 🎣 #ElyFishing #NorthernPike #BoundaryWaters',
      likes: 47,
      comments: 12,
      timestamp: '2 days ago',
      type: 'photo'
    },
    {
      id: '2', 
      image: '/photos/family1.png',
      caption: 'Family beach day! Ella loves exploring the shoreline while we scout new fishing spots. This little adventurer is going to be the best fishing buddy. 👶🏖️ #FamilyTime #ElyLife #FutureAngler',
      likes: 73,
      comments: 18,
      timestamp: '4 days ago',
      type: 'photo'
    },
    {
      id: '3',
      image: '/photos/fish3.jpg',
      caption: 'Birthday fishing trip SUCCESS! Mark caught 16 rainbow trout today - what an incredible celebration on the water! 🎂🐟 #BirthdayFishing #RainbowTrout #MemoryMaking',
      likes: 92,
      comments: 24,
      timestamp: '1 week ago',
      type: 'photo'
    },
    {
      id: '4',
      image: '/photos/james-and-britt1.png',
      caption: 'Your guides ready for another amazing season! James and I can\'t wait to share the magic of Ely with all our guests this year. Book your adventure! 💙 #GuideLife #TeamThorstenson #ElyMinnesota',
      likes: 156,
      comments: 31,
      timestamp: '1 week ago',
      type: 'photo'
    },
    {
      id: '5',
      image: '/photos/fish4.jpg',
      caption: 'Kayak fishing at its finest! Sometimes the best spots require a little extra adventure to reach. Worth every paddle stroke! 🛶 #KayakFishing #Adventure #HiddenGems',
      likes: 68,
      comments: 15,
      timestamp: '2 weeks ago',
      type: 'photo'
    },
    {
      id: '6',
      image: '/photos/britt-and-ella1.png',
      caption: 'Teaching the next generation to love the outdoors! Ella already knows the sound of the waves means adventure time. 🌊👶 #NextGeneration #OutdoorFamily #ElyKids',
      likes: 89,
      comments: 22,
      timestamp: '2 weeks ago',
      type: 'photo'
    },
    {
      id: '7',
      image: '/photos/fish1.jpg',
      caption: 'James with another beautiful walleye! This lake never disappoints when you know where to look. Another happy client, another perfect day. 🎣✨ #Walleye #PerfectDay #LocalKnowledge',
      likes: 134,
      comments: 29,
      timestamp: '3 weeks ago',
      type: 'photo'
    },
    {
      id: '8',
      image: '/photos/big-sis.png',
      caption: 'Big announcement from our little crew! Ella is going to be a big sister! Baby #2 coming this fall. Our family adventures are about to get even better! 👶👶 #BigSis #FamilyGrowing #BabyNews',
      likes: 203,
      comments: 47,
      timestamp: '1 month ago',
      type: 'photo'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/90"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Adventure Gallery</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed mb-8">
            Follow our daily adventures, client catches, and family moments in beautiful Ely, Minnesota
          </p>
          <div className="flex items-center justify-center gap-2 text-lg">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>@thorstenson_guide</span>
          </div>
        </div>
      </div>

      {/* Instagram Feed Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Feed Stats */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    TG
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Thorstenson Guide Service</h2>
                    <p className="text-gray-600">@thorstenson_guide</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">2.3k</div>
                  <div className="text-gray-600">followers</div>
                </div>
              </div>
              <p className="mt-4 text-gray-700">
                🎣 Ely, MN Fishing Guides | 🌲 Boundary Waters Adventures | 👨‍👩‍👧‍👦 Family Business | 📧 Book your trip below!
              </p>
            </div>

            {/* Instagram Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockInstagramPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Post Image */}
                  <div className="relative aspect-square">
                    <Image
                      src={post.image}
                      alt="Instagram post"
                      fill
                      className="object-cover"
                    />
                    {/* Instagram overlay icon */}
                    <div className="absolute top-3 right-3">
                      <svg className="w-6 h-6 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-4">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <span className="text-sm font-medium">{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span className="text-sm font-medium">{post.comments}</span>
                      </div>
                      <div className="ml-auto text-xs text-gray-500">{post.timestamp}</div>
                    </div>
                    
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {post.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-12 text-center bg-blue-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Follow Our Adventures</h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Stay up to date with daily catches, family moments, and behind-the-scenes glimpses 
                of life as fishing guides in beautiful Ely, Minnesota.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://instagram.com/thorstenson_guide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Follow @thorstenson_guide
                </a>
                <Link
                  href="/booking"
                  className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg border-2 border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Book Your Trip
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}