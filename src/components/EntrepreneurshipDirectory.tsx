// src/pages/EntrepreneurshipDirectory.tsx

import React, { useState, useEffect } from 'react';
import { EntrepreneurshipCard } from '../components/EntrepreneurshipCard';
import { Entrepreneurship } from '../types'; // Asumiendo que tu interfaz Entrepreneurship está aquí
import rawEntrepreneurshipData from '../emprendimientos.json'; // ¡Importa tu JSON!

export function EntrepreneurshipDirectory() {
  const [entrepreneurships, setEntrepreneurships] = useState<Entrepreneurship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Directamente usamos los datos importados del JSON
      setEntrepreneurships(rawEntrepreneurshipData as Entrepreneurship[]);
      setLoading(false);
    } catch (err) {
      console.error('Error al cargar los emprendimientos desde el JSON:', err);
      setError('No se pudieron cargar los emprendimientos. Intenta más tarde.');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 py-16 text-center">Cargando emprendimientos...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-16 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {entrepreneurships.map((entrepreneurship) => (
          <EntrepreneurshipCard key={entrepreneurship.id} entrepreneurship={entrepreneurship} />
        ))}
      </div>
    </div>
  );
}