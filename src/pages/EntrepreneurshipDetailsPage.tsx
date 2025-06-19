import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from 'lucide-react';
import { entrepreneurships } from '../utils/data';
import { ImageGallery } from '../components/ImageGallery';
import { InteractiveMap } from '../components/InteractiveMap';
export function EntrepreneurshipDetailsPage() {
  const {
    id
  } = useParams();
  const [entrepreneurship, setEntrepreneurship] = useState(null);
  useEffect(() => {
    // In a real application, this would fetch from an API
    const foundEntrepreneurship = entrepreneurships.find(e => e.id === id);
    setEntrepreneurship(foundEntrepreneurship);
  }, [id]);
  if (!entrepreneurship) {
    return <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Emprendimiento no encontrado</h2>
        <Link to="/" className="text-green-600 hover:text-green-800 inline-flex items-center">
          <ArrowLeftIcon className="w-4 h-4 mr-2" /> Volver al inicio
        </Link>
      </div>;
  }
  return <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-green-600 hover:text-green-800 inline-flex items-center mb-6">
        <ArrowLeftIcon className="w-4 h-4 mr-2" /> Volver a los emprendimientos
      </Link>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <ImageGallery images={entrepreneurship.images} />
          </div>
          <div className="p-6 md:w-1/2">
            <h1 className="text-3xl font-bold text-green-800 mb-2">
              {entrepreneurship.name}
            </h1>
            <p className="text-gray-600 mb-4">{entrepreneurship.category}</p>
            <div className="border-t border-b border-gray-200 py-4 my-4">
              <p className="text-gray-700 mb-4">
                {entrepreneurship.description}
              </p>
              <h3 className="font-semibold text-lg mb-2">
                Información de contacto
              </h3>
              <div className="space-y-2">
                <p className="flex items-center text-gray-700">
                  <PhoneIcon className="w-5 h-5 mr-2 text-green-600" />{' '}
                  {entrepreneurship.phone}
                </p>
                <p className="flex items-center text-gray-700">
                  <MailIcon className="w-5 h-5 mr-2 text-green-600" />{' '}
                  {entrepreneurship.email}
                </p>
                <p className="flex items-center text-gray-700">
                  <MapPinIcon className="w-5 h-5 mr-2 text-green-600" />{' '}
                  {entrepreneurship.address}
                </p>
                <p className="flex items-center text-gray-700">
                  <ClockIcon className="w-5 h-5 mr-2 text-green-600" />{' '}
                  {entrepreneurship.hours}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg mb-2">
                Productos y Servicios
              </h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {entrepreneurship.products.map((product, index) => <li key={index}>{product}</li>)}
              </ul>
            </div>
          </div>
        </div>
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-4">Location</h3>
          <div className="h-64">
            <InteractiveMap selectedId={entrepreneurship.id} />
          </div>
        </div>
      </div>
    </div>;
}