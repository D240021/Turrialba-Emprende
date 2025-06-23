// src/utils/validation.ts
import { FormData, FormErrors } from '../types'; // <-- Importa las interfaces aquí

export const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {
    name: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    category: '',
    description: '',
    agreeToTerms: ''
  };

  // Business Name validation
  if (!formData.name.trim()) {
    errors.name = 'Business name is required';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Business name must be at least 2 characters';
  }
  // Owner Name validation
  if (!formData.ownerName.trim()) {
    errors.ownerName = 'Owner name is required';
  } else if (formData.ownerName.trim().length < 2) {
    errors.ownerName = 'Owner name must be at least 2 characters';
  }
  // Email validation
  if (!formData.email.trim()) {
    errors.email = 'Email address is required';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
  }
  // Phone validation
  if (!formData.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else {
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    if (!phoneRegex.test(formData.phone.replace(/[\s()-]/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }
  }
  // Address validation
  if (!formData.address.trim()) {
    errors.address = 'Business address is required';
  } else if (formData.address.trim().length < 5) {
    errors.address = 'Please enter a complete address';
  }
  // Category validation
  if (!formData.category) {
    errors.category = 'Please select a business category';
  }
  // Description validation
  if (!formData.description.trim()) {
    errors.description = 'Business description is required';
  } else if (formData.description.trim().length < 20) {
    errors.description = 'Description must be at least 20 characters';
  }
  // Terms agreement validation
  if (!formData.agreeToTerms) {
    errors.agreeToTerms = 'You must agree to the terms and conditions';
  }
  return errors;
};