// src/pages/EntrepreneurshipDetailsPage.tsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from 'lucide-react';
import { InteractiveMap } from '../components/InteractiveMap';
import { Entrepreneurship } from '../types'; // Asegúrate de que esta interfaz es correcta
import rawEntrepreneurshipData from '../emprendimientos.json'; // ¡Importa tu JSON!

export function EntrepreneurshipDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [entrepreneurship, setEntrepreneurship] = useState<Entrepreneurship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('ID de emprendimiento no proporcionado.');
      setLoading(false);
      return;
    }
    try {
      // Buscar el emprendimiento por ID en los datos del JSON
      const foundEntrepreneurship = (rawEntrepreneurshipData as Entrepreneurship[]).find(
        (e) => e.id === id
      );

      if (foundEntrepreneurship) {
        setEntrepreneurship(foundEntrepreneurship);
      } else {
        setEntrepreneurship(null); // Emprendimiento no encontrado
      }
      setLoading(false);
    } catch (err: any) {
      console.error('Error al cargar el emprendimiento desde el JSON:', err.message);
      setError('No se pudo cargar la información del emprendimiento.');
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-16 text-center">Cargando...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-16 text-center text-red-600">{error}</div>;
  }

  if (!entrepreneurship) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Emprendimiento no encontrado</h2>
        <Link to="/directory" className="text-green-600 hover:text-green-800 inline-flex items-center">
          <ArrowLeftIcon className="w-4 h-4 mr-2" /> Volver al Directorio
        </Link>
      </div>
    );
  }

  // Define la URL de la imagen principal o un placeholder
  const imageUrl = entrepreneurship.images && entrepreneurship.images.length > 0
    ? entrepreneurship.images[0] // Toma la primera imagen del array del JSON
    : 'https://via.placeholder.com/400x300?text=No+Imagen+Disponible';

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/directory" className="text-green-600 hover:text-green-800 inline-flex items-center mb-6">
        <ArrowLeftIcon className="w-4 h-4 mr-2" /> Volver a los emprendimientos
      </Link>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={imageUrl}
              alt={entrepreneurship.name || 'Imagen del emprendimiento'}
              className="w-full h-96 object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Error+Loading+Image';
                console.error(`Error al cargar imagen: ${imageUrl}`);
              }}
            />
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
                {entrepreneurship.hours && (
                  <p className="flex items-center text-gray-700">
                    <ClockIcon className="w-5 h-5 mr-2 text-green-600" />{' '}
                    {entrepreneurship.hours}
                  </p>
                )}
                {entrepreneurship.website && (
                  <p className="flex items-center text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe w-5 h-5 mr-2 text-green-600 inline-block align-middle"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                    <a href={entrepreneurship.website} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
                      {entrepreneurship.website}
                    </a>
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg mb-2">
                Productos y Servicios
              </h3>
              {entrepreneurship.products && entrepreneurship.products.length > 0 ? (
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {entrepreneurship.products.map((product, index) => <li key={index}>{product}</li>)}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No se han listado productos o servicios.</p>
              )}
            </div>
          </div>
        </div>
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-4">Ubicación</h3>
          <div className="h-64">
            <InteractiveMap selectedId={entrepreneurship.id} />
          </div>
        </div>
      </div>
    </div>
  );
}