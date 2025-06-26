// src/components/RegistrationForm.tsx

import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { validateForm } from '../utils/validation';
import { supabase } from '../utils/supabaseCliente'; 
import { FormData, FormErrors } from '../types'; // <-- ¡Importa tus tipos aquí!

// Asegúrate de que initialFormData use el tipo FormData
const initialFormData: FormData = {
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

// Asegúrate de que initialErrors use el tipo FormErrors
const initialErrors: FormErrors = {
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
  const [formData, setFormData] = useState<FormData>(initialFormData); // Tipado para useState
  const [errors, setErrors] = useState<FormErrors>(initialErrors); // Tipado para useState
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Tipado del evento handleChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Limpiar error cuando el usuario empieza a escribir (con tipado de clave)
    if (errors[name as keyof FormErrors]) { // Usamos FormErrors aquí
      setErrors(prev => ({
        ...prev,
        [name as keyof FormErrors]: '' // Usamos FormErrors aquí
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => { // Tipado del evento handleSubmit
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    const hasErrors = Object.values(validationErrors).some(error => error !== '');

    if (!hasErrors) {
      setIsSubmitting(true);
      setSubmitSuccess(false); // Reinicia el estado de éxito

      try {
        // 1. Enviar datos a Supabase
        const { data, error } = await supabase
          .from('registros_negocios') // ¡Asegúrate de que este es el nombre EXACTO de tu tabla en Supabase!
          .insert([
            {
              nombre_negocio: formData.name,
              nombre_dueno: formData.ownerName,
              correo_electronico: formData.email,
              telefono: formData.phone,
              direccion: formData.address,
              categoria: formData.category,
              descripcion: formData.description,
              sitio_web: formData.website,
              acepta_terminos: formData.agreeToTerms
            }
          ]);

        if (error) {
          throw error; // Propagar el error si Supabase falla
        }

        console.log('Datos guardados en Supabase:', data);

        // 2. Si el envío a Supabase fue exitoso, procede con EmailJS
        if (formRef.current) {
          // Nota: El error 'EmailJSResponseStatus {status: 400, text: 'The template ID not found.'}'
          // o 'Variables size limit. The maximum allowed variables size is 50Kb'
          // significa que debes revisar tu configuración de EmailJS.
          // Si el EmailJS falla, pero Supabase no, los datos ya estarán guardados.
          await emailjs.sendForm(
            'service_a1dy6pm',
            'template_3nmnw0p',
            formRef.current,
            'XUyBC_SC32W8F5jkY'
          );
          console.log('Correo enviado con EmailJS');
        }

        setSubmitSuccess(true);
        setFormData(initialFormData); // Limpia el formulario
        setErrors(initialErrors); // Limpia los errores

        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);

      } catch (error: any) { // Captura el error y tipa como 'any' para acceder a 'message'
        console.error('Error al enviar el formulario:', error.message || error);
        alert('Error al enviar el formulario, intenta más tarde.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {submitSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">¡Éxito! </strong>
          <span className="block sm:inline">
            Tu registración fue exitosa. Prontamente te contactaremos.
          </span>
        </div>
      )}

      {/* Tus campos de formulario aquí */}
      {/* Asegúrate de que los atributos 'name' en tus inputs coincidan exactamente con las claves en FormData */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del negocio *
          </label>
          <input
            type="text"
            id="name"
            name="name" // <-- ¡Importante! Coincide con 'name' en FormData
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del dueño *
          </label>
          <input
            type="text"
            id="ownerName"
            name="ownerName" // <-- ¡Importante! Coincide con 'ownerName' en FormData
            value={formData.ownerName}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.ownerName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.ownerName && <p className="mt-1 text-sm text-red-600">{errors.ownerName}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Dirección de correo *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Número telefónico *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Dirección del negocio *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Categoria del negocio *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
          >
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
      </div> {/* This div closes the grid-cols-1 md:grid-cols-2 div */}
      <div> {/* This div starts the description field */}
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Descripción del negocio *
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>
      <div> {/* This div starts the website field */}
        <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
          Página Web/Red Social (Opcional)
        </label>
        <input
          type="url"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="agreeToTerms"
            name="agreeToTerms"
            type="checkbox"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
            Estoy de acuerdo con los{' '}
            <a href="#" className="text-green-600 hover:text-green-800">
              términos y condiciones
            </a>{' '}
            *
          </label>
          {errors.agreeToTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>}
        </div>
      </div>
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
    </form>
  );
}