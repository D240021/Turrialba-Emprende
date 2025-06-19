import React, { useState } from 'react';
import { validateForm } from '../utils/validation';
const initialFormData = {
  name: '',
  ownerName: '',
  email: '',
  phone: '',
  address: '',
  category: '',
  description: '',
  website: '',
  agreeToTerms: false
};
const initialErrors = {
  name: '',
  ownerName: '',
  email: '',
  phone: '',
  address: '',
  category: '',
  description: '',
  agreeToTerms: ''
};
export function RegistrationForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const handleChange = e => {
    const {
      name,
      value,
      type,
      checked
    } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    // Validate form
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    // Check if there are any errors
    const hasErrors = Object.values(validationErrors).some(error => error !== '');
    if (!hasErrors) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', formData);
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData(initialFormData);
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      }, 1500);
    }
  };
  return <form onSubmit={handleSubmit} className="space-y-6">
      {submitSuccess && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Success! </strong>
          <span className="block sm:inline">
            Tu registración fue exitosa! Prontamente te contactaremos
          </span>
        </div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del negocio *
          </label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.name ? 'border-red-500' : 'border-gray-300'}`} />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del dueño *
          </label>
          <input type="text" id="ownerName" name="ownerName" value={formData.ownerName} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.ownerName ? 'border-red-500' : 'border-gray-300'}`} />
          {errors.ownerName && <p className="mt-1 text-sm text-red-600">{errors.ownerName}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Dirección de correo *
          </label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Número telefónico *
          </label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Dirección del negocio *
          </label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.address ? 'border-red-500' : 'border-gray-300'}`} />
          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Categoria del negocio *
          </label>
          <select id="category" name="category" value={formData.category} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.category ? 'border-red-500' : 'border-gray-300'}`}>
            <option value="">Selecciona una categoría</option>
            <option value="Comida y Bebida">Comida y Bebida</option>
            <option value="Artesanía">Artesanía</option>
            <option value="Turismo y Aventura">Turismo y Aventura</option>
            <option value="Agricultura">Agricultura</option>
            <option value="Alojamiento">Alojamiento</option>
            <option value="Otros">Otros</option>
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Descripción del negocio *
        </label>
        <textarea id="description" name="description" rows={4} value={formData.description} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.description ? 'border-red-500' : 'border-gray-300'}`} />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>
      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
          Página Web/Red Social (Opcional)
        </label>
        <input type="url" id="website" name="website" value={formData.website} onChange={handleChange} placeholder="https://..." className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" />
      </div>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input id="agreeToTerms" name="agreeToTerms" type="checkbox" checked={formData.agreeToTerms} onChange={handleChange} className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded" />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
            Estoy de acuerdo con los {' '}
            <a href="#" className="text-green-600 hover:text-green-800">
              términos y condiciones
            </a>{' '}
            *
          </label>
          {errors.agreeToTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>}
        </div>
      </div>
      <div>
        <button type="submit" disabled={isSubmitting} className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
          {isSubmitting ? 'Submitting...' : 'Submit Registration'}
        </button>
      </div>
    </form>;
}