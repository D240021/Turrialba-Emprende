import React from 'react';
import { RegistrationForm } from '../components/RegistrationForm';
export function RegistrationPage() {
  return <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-2 text-center">
          Register Your Entrepreneurship
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Join our platform to showcase your business to visitors and locals
          alike.
        </p>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <RegistrationForm />
        </div>
      </div>
    </div>;
}