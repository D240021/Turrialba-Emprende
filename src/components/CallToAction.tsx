import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, UserPlusIcon } from 'lucide-react';
export function CallToAction() {
  return <section className="py-12 bg-green-50 rounded-xl">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold text-green-800 mb-4">
            Únete a nuestra red de Emprendedores locales
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Eres un emprendedor local de Turrialba o Jiménez? Registra tu negocio y forma parte de nuestra comunidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/register" className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              <UserPlusIcon className="w-5 h-5 mr-2" />
              Registrar tu negocio
            </Link>
            <Link to="/" className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-green-800 font-bold py-3 px-6 rounded-lg border border-green-600 transition-colors">
              <MapPinIcon className="w-5 h-5 mr-2" />
              Explorar Mapa
            </Link>
          </div>
        </div>
        <div className="md:text-right">
          <img src="https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="Local entrepreneur in Turrialba" className="rounded-lg shadow-md inline-block max-w-full" />
        </div>
      </div>
    </div>
  </section>;
}