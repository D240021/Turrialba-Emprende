// src/components/RegistrationForm.tsx

import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { validateForm } from '../utils/validation';
import { supabase } from '../utils/supabaseCliente';
import { FormData, FormErrors } from '../types';

const initialFormData: FormData = {
  name: '',
  ownerName: '',
  email: '',
  phone: '',
  address: '',
  category: '',
  description: '',
  website: '',
  agreeToTerms: false,
  images: [] // Inicializa el array de archivos
};

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
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [uploadProgress, setUploadProgress] = useState(0); // Para mostrar progreso de subida
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    let newValue: string | boolean | FileList; // Tipo más flexible para newValue

    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      newValue = e.target.checked;
    } else if (type === 'file' && e.target instanceof HTMLInputElement) {
      // Manejar la selección de archivos
      // Guardamos los objetos File directamente en formData.images
      newValue = e.target.files ? Array.from(e.target.files) : [];
      setFormData(prev => ({
        ...prev,
        [name]: newValue // Asigna File[] a formData.images
      }));
      // No continuar con el resto de la lógica de setFormData para files, ya que se manejó arriba.
      // Y tampoco limpiamos errores de texto para un input de tipo file de esta manera.
      return;
    } else {
      newValue = value;
    }

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name as keyof FormErrors]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    const hasErrors = Object.values(validationErrors).some(error => error !== '');

    if (!hasErrors) {
      setIsSubmitting(true);
      setSubmitSuccess(false);

      let imageUrls: string[] = []; // Para almacenar las URLs de las imágenes subidas

      try {
        // *** 1. Subir imágenes a Supabase Storage ***
        if (formData.images && formData.images.length > 0) {
          setUploading(true);
          const uploadPromises = formData.images.map(async (file) => {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`; // Nombre de archivo único
            const filePath = `${fileName}`; // Ruta dentro del bucket

            // La subida de un solo archivo
            const { data: uploadData, error: uploadError } = await supabase.storage
              .from('emprendimientos-imagenes') // <-- ¡EL NOMBRE EXACTO DE TU BUCKET!
              .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false, // No sobrescribir si ya existe
                // Puedes añadir onUploadProgress si quieres un progreso más detallado
              });

            if (uploadError) {
              throw uploadError;
            }

            // Obtener la URL pública del archivo subido
            const { data: publicUrlData } = supabase.storage
              .from('emprendimientos-imagenes')
              .getPublicUrl(filePath);

            if (!publicUrlData || publicUrlData.publicUrl === null) {
                throw new Error('No se pudo obtener la URL pública de la imagen.');
            }
            return publicUrlData.publicUrl;
          });

          imageUrls = await Promise.all(uploadPromises); // Espera a que todas las subidas terminen
          setUploading(false);
          setUploadProgress(0); // Reset progress
        }

        // *** 2. Enviar datos del formulario (incluyendo URLs de imágenes) a la base de datos de Supabase ***
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
              acepta_terminos: formData.agreeToTerms,
              imagenes: imageUrls // <-- Guarda las URLs de las imágenes aquí
              // Asegúrate de que tu tabla en Supabase tiene una columna 'imagenes' de tipo 'text[]' (array de texto)
            }
          ]);

        if (error) {
          throw error;
        }

        console.log('Datos guardados en Supabase:', data);

        // *** 3. Si el envío a Supabase fue exitoso, procede con EmailJS ***
        if (formRef.current) {
          // Si EmailJS necesita las URLs de las imágenes, tendrías que añadirlas al formulario de alguna manera
          // o pasarlas como variables directamente en emailjs.send
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

      } catch (error: any) {
        console.error('Error al enviar el formulario o subir imagen:', error.message || error);
        alert('Error al enviar el formulario, intenta más tarde.');
        setUploading(false); // Asegúrate de resetear el estado de subida en caso de error
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

      {/* Tus campos de formulario existentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del negocio *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
        {/* ... todos los demás campos (ownerName, email, phone, address, category, description, website, agreeToTerms) ... */}
        <div>
          <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del dueño *
          </label>
          <input
            type="text"
            id="ownerName"
            name="ownerName"
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
        <div>
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
        <div>
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

        {/* Campo de subida de imágenes */}
        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
            Imágenes del negocio (Máx. 3)
          </label>
          <input
            type="file"
            id="images"
            name="images"
            multiple // Permite seleccionar múltiples archivos
            accept="image/*" // Solo acepta archivos de imagen
            onChange={handleChange} // Usa el mismo handleChange
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          {formData.images.length > 0 && (
            <p className="mt-2 text-sm text-gray-500">
              Archivos seleccionados: {formData.images.map(file => file.name).join(', ')}
            </p>
          )}
          {uploading && (
            <div className="mt-2 text-sm text-green-600">
              Subiendo imágenes...
            </div>
          )}
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
            disabled={isSubmitting || uploading} // Deshabilitar si se están subiendo archivos
            className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
              isSubmitting || uploading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Enviando...' : uploading ? 'Subiendo imágenes...' : 'Enviar'}
          </button>
        </div>
        </div>
      </form>
  );
}