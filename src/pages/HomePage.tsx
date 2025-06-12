import React from 'react';
import { Hero } from '../components/Hero';
import { InteractiveMap } from '../components/InteractiveMap';
import { EntrepreneurshipDirectory } from '../components/EntrepreneurshipDirectory';
import { CallToAction } from '../components/CallToAction';
export function HomePage() {
  return <div className="w-full">
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
            Discover Local Entrepreneurships
          </h2>
          <p className="text-lg text-center max-w-3xl mx-auto mb-8">
            Explore the diverse range of local businesses and entrepreneurs in
            Turrialba and Jiménez through our interactive map.
          </p>
          <InteractiveMap />
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
            Featured Entrepreneurships
          </h2>
          <EntrepreneurshipDirectory />
        </section>
        <CallToAction />
      </div>
    </div>;
}