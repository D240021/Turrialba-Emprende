// src/components/EntrepreneurshipDirectory.tsx

import React, { useState, useEffect } from 'react'; // Agrega useEffect
import { EntrepreneurshipCard } from './EntrepreneurshipCard';
// import { entrepreneurships } from '../utils/data'; // <-- ¡ELIMINA ESTA LÍNEA!
import { SearchIcon } from 'lucide-react';
import { supabase } from '../utils/supabaseCliente'; // <-- Importa el cliente de Supabase
import { Entrepreneurship } from '../types'; // <-- Importa la interfaz de Emprendimiento

export function EntrepreneurshipDirectory() {
  const [allEntrepreneurships, setAllEntrepreneurships] = useState<Entrepreneurship[]>([]); // Estado para todos los emprendimientos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchAllEntrepreneurships = async () => {
      try {
        const { data, error } = await supabase
          .from('registros_negocios') // <-- ¡NOMBRE DE TU TABLA!
          .select('*'); // Selecciona todas las columnas

        if (error) {
          throw error;
        }

        if (data) {
            // Mapear los datos de Supabase a la interfaz Entrepreneurship
            const mappedData: Entrepreneurship[] = data.map(item => ({
                id: item.id, // O el nombre de tu columna ID
                name: item.nombre_negocio,
                category: item.categoria,
                description: item.descripcion,
                ownerName: item.nombre_dueno,
                email: item.correo_electronico,
                phone: item.telefono,
                address: item.direccion,
                website: item.sitio_web || '',
                hours: item.horarios || 'No especificado',
                products: item.productos || [],
                images: item.imagenes || []
                // Agrega aquí todos los mapeos de tus columnas
            }));
            setAllEntrepreneurships(mappedData);
        }
      } catch (err: any) {
        console.error('Error al cargar emprendimientos:', err.message);
        setError('No se pudieron cargar los emprendimientos.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllEntrepreneurships();
  }, []); // Se ejecuta una sola vez al montar el componente

  // Get unique categories (ahora basados en los datos cargados)
  const categories = ['Todas las categorías', ...new Set(allEntrepreneurships.map(item => item.category))];

  // Filter entrepreneurships based on search term and category
  const filteredEntrepreneurships = allEntrepreneurships.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'Todas las categorías' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <div className="text-center py-8">Cargando emprendimientos...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar emprendimientos..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
          />
        </div>
        <div>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
          >
            {categories.map((category, index) => (
              <option key={index} value={category === 'Todas las categorías' ? '' : category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      {filteredEntrepreneurships.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">
            No se encontraron emprendimientos que coincidan con tus criterios.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntrepreneurships.map(item => (
            <EntrepreneurshipCard key={item.id} entrepreneurship={item} />
          ))}
        </div>
      )}
    </div>
  );
}