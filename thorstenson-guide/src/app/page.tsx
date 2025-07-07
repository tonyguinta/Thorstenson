import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-lake-blue-50">
        <div className="absolute inset-0">
          <Image
            src="/photos/fish1.jpg"
            alt="James fishing on pristine Minnesota lake"
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
        
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="flex flex-col justify-end min-h-[70vh]">
            <div className="text-center text-white px-4 max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
                Discover Ely&apos;s Best Fishing
              </h1>
              <p className="text-lg leading-8 mb-8 text-gray-100 lg:text-xl">
                Experience world-class fishing in Minnesota&apos;s Boundary Waters with expert guide James Thorstenson. 
                From walleye to northern pike, create memories that last a lifetime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/booking"
                  className="rounded-md bg-lake-blue-600 px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-lake-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-blue-600"
                >
                  Book Your Trip
                </Link>
                <Link
                  href="/about"
                  className="text-base font-semibold leading-6 text-white hover:text-lake-blue-200 flex items-center justify-center"
                >
                  Meet Your Guide <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smooth transition */}
      <div className="h-24 bg-gradient-to-b from-lake-blue-50 to-white"></div>

      {/* Features Section */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose Tiller Bros Guide Service?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Five years of local expertise combined with a lifetime of fishing passion
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-lake-blue-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  Local Knowledge
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  James knows the best spots and signs for catching walleye, northern pike, and everything in between. 
                  Five years in Ely means he knows where the fish are hiding.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-forest-green-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
                    </svg>
                  </div>
                  All-Weather Experience
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  No weather can stop this family. From ice fishing in winter to perfect summer days, 
                  James knows how to find fish in any conditions.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-earth-tone-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>
                  </div>
                  Lifetime of Fishing
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Fishing since childhood with his parents, James brings decades of experience and 
                  genuine passion for the sport to every trip.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-lake-blue-900">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  Community Focused
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  As owner of James of All Trades contracting, James is invested in the community 
                  and dedicated to making a difference for families in Ely.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Photo Gallery Preview */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Recent Catches
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              See what our clients have been catching in Ely&apos;s pristine waters
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80">
              <Image
                src="/photos/fish2.jpg"
                alt="Huge northern pike catch"
                fill
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="bg-black/60 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                  Trophy Northern Pike
                </h3>
                <p className="text-sm leading-6 text-gray-200">
                  This beauty was caught on a perfect summer day
                </p>
              </div>
            </div>
            <div className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80">
              <Image
                src="/photos/fish3.jpg"
                alt="Happy client with rainbow trout"
                fill
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="bg-black/60 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                  Beautiful Rainbow Trout
                </h3>
                <p className="text-sm leading-6 text-gray-200">
                  Birthday boy caught 16 rainbows yesterday!
                </p>
              </div>
            </div>
            <div className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80">
              <Image
                src="/photos/fish4.jpg"
                alt="James kayak fishing"
                fill
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="bg-black/60 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                  Multiple Fishing Methods
                </h3>
                <p className="text-sm leading-6 text-gray-200">
                  From boats to kayaks, we adapt to your style
                </p>
              </div>
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="/gallery"
              className="rounded-md bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
            >
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white border-t border-gray-200">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready for Your Next Adventure?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Book your guided fishing trip today and experience the best that Ely, Minnesota has to offer.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/booking"
                className="rounded-md bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
              >
                Book Now
              </Link>
              <Link
                href="/contact"
                className="text-base font-semibold leading-6 text-gray-900 hover:text-lake-blue-600"
              >
                Contact Us <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
