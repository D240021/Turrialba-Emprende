import React from 'react';
import { Modal } from './Modal';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-[#166534] text-white border border-white w-[538px] h-[575px] p-5 rounded-sm relative flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-center w-full font-bold text-lg">
            Políticas de privacidad
          </h2>
          <button
            onClick={onClose}
            className="absolute right-3 top-3 text-white text-xl hover:text-gray-300"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>
        <div className="border border-white p-6 flex-1 flex items-center justify-center">
          <p className="text-left text-2xl leading-relaxed">
            Recopilamos datos como nombre y correo solo con tu consentimiento. Usamos esta información para mejorar el sitio y enviarte contenido útil. No compartimos tus datos sin permiso. Puedes solicitar su eliminación en cualquier momento.
          </p>
        </div>
      </div>
    </Modal>
  );
}
