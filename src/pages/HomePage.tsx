import React from 'react';
import { Hero } from '../components/Hero';
import { InteractiveMap } from '../components/InteractiveMap';
import { EntrepreneurshipDirectory } from '../components/EntrepreneurshipDirectory';
import { CallToAction } from '../components/CallToAction';
export function HomePage() {
  return <div className="w-full">
    <Hero />
    <div className="container mx-auto px-4 py-8">
      <section id="descubrir" className="mb-12">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
          Descubre emprendimientos locales
        </h2>
        <p className="text-lg text-center max-w-3xl mx-auto mb-8">
          Explora la diversa gama de negocios y emprendedores locales en Turrialba y Jiménez a través de nuestro mapa interactivo.
        </p>
        <InteractiveMap />
      </section>
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
          Emprendimientos destacados
        </h2>
        <EntrepreneurshipDirectory />
      </section>
      <CallToAction />
    </div>
  </div>;
}