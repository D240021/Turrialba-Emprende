import React from 'react';
import { RegistrationForm } from '../components/RegistrationForm';
export function RegistrationPage() {
  return <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-2 text-center">
          Registra tu emprendimiento
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Únete a nuestra plataforma para mostrar tu negocio tanto a visitantes como a locales.
        </p>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <RegistrationForm />
        </div>
      </div>
    </div>;
}