import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, PhoneIcon } from 'lucide-react';
export function EntrepreneurshipCard({
  entrepreneurship
}) {
  return <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden">
        <img src={entrepreneurship.images[0]} alt={entrepreneurship.name} className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" />
      </div>
      <div className="p-4">
        <span className="inline-block px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full mb-2">
          {entrepreneurship.category}
        </span>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {entrepreneurship.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {entrepreneurship.description}
        </p>
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPinIcon className="w-4 h-4 mr-1" />
          <span className="truncate">{entrepreneurship.address}</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <PhoneIcon className="w-4 h-4 mr-1" />
          <span>{entrepreneurship.phone}</span>
        </div>
        <Link to={`/entrepreneurship/${entrepreneurship.id}`} className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded transition-colors">
          Ver detalles
        </Link>
      </div>
    </div>;
}