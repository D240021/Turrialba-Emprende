// src/pages/EntrepreneurshipDetailsPage.tsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from 'lucide-react';
// import { entrepreneurships } from '../utils/data'; // <-- ¡ELIMINA ESTA LÍNEA!
import { ImageGallery } from '../components/ImageGallery';
import { InteractiveMap } from '../components/InteractiveMap';
import { supabase } from '../utils/supabaseCliente'; // <-- Importa el cliente de Supabase
import { Entrepreneurship } from '../types'; // <-- Importa la interfaz de Emprendimiento

export function EntrepreneurshipDetailsPage() {
  const { id } = useParams<{ id: string }>(); // Tipar `id` como string
  const [entrepreneurship, setEntrepreneurship] = useState<Entrepreneurship | null>(null); // Tipar el estado
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntrepreneurship = async () => {
      if (!id) {
        setError('ID de emprendimiento no proporcionado.');
        setLoading(false);
        return;
      }
      try {
        // Consulta a Supabase para obtener un emprendimiento por ID
        const { data, error } = await supabase
          .from('registros_negocios') // <-- ¡EL NOMBRE EXACTO DE TU TABLA EN SUPABASE!
          .select('*') // Selecciona todas las columnas
          .eq('id', id) // Filtra por la columna 'id' (ajusta si tu columna ID tiene otro nombre)
          .single(); // Espera un solo registro

        if (error) {
          throw error;
        }

        if (data) {
            // Aquí podrías necesitar mapear los nombres de las columnas de Supabase
            // a los nombres de las propiedades que esperas en tu interfaz Entrepreneurship
            // Por ejemplo, si Supabase tiene 'nombre_negocio' y tu interfaz espera 'name':
            const mappedData: Entrepreneurship = {
                id: data.id, // O el nombre de tu columna ID
                name: data.nombre_negocio,
                category: data.categoria,
                description: data.descripcion,
                ownerName: data.nombre_dueno,
                email: data.correo_electronico,
                phone: data.telefono,
                address: data.direccion,
                website: data.sitio_web || '', // Si es opcional
                hours: data.horarios || 'No especificado', // Si tienes esta columna
                products: data.productos || [], // Asumiendo que es un array
                images: data.imagenes || [] // Asumiendo que es un array de URLs
                // Agrega aquí todos los mapeos de tus columnas
            };
            setEntrepreneurship(mappedData);
        } else {
            setEntrepreneurship(null); // No se encontró el emprendimiento
        }
      } catch (err: any) {
        console.error('Error al cargar el emprendimiento:', err.message);
        setError('No se pudo cargar la información del emprendimiento.');
      } finally {
        setLoading(false);
      }
    };

    fetchEntrepreneurship();
  }, [id]); // El efecto se ejecuta cuando cambia el ID

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

  // Resto del JSX permanece igual, ya que `entrepreneurship` ahora está tipado
  // y contiene las propiedades que esperas.
  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/directory" className="text-green-600 hover:text-green-800 inline-flex items-center mb-6">
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
                {entrepreneurship.hours && ( // Mostrar solo si hay horarios
                  <p className="flex items-center text-gray-700">
                    <ClockIcon className="w-5 h-5 mr-2 text-green-600" />{' '}
                    {entrepreneurship.hours}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg mb-2">
                Productos y Servicios
              </h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {entrepreneurship.products && entrepreneurship.products.map((product, index) => (
                  <li key={index}>{product}</li>
                ))}
              </ul>
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