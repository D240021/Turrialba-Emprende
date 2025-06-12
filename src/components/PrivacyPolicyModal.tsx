import React from 'react';
import { Modal } from './Modal';
interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export function PrivacyPolicyModal({
  isOpen,
  onClose
}: PrivacyPolicyModalProps) {
  return <Modal isOpen={isOpen} onClose={onClose} title="Privacy Policy">
      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-semibold mb-2">Introduction</h3>
          <p className="text-gray-700">
            At Turrialba Entrepreneurs, we take your privacy seriously. This
            policy describes how we collect, use, and protect your personal
            information.
          </p>
        </section>
        <section>
          <h3 className="text-lg font-semibold mb-2">Information We Collect</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Business information (name, address, category)</li>
            <li>Contact details (email, phone number)</li>
            <li>Owner information</li>
            <li>Website and social media links (if provided)</li>
          </ul>
        </section>
        <section>
          <h3 className="text-lg font-semibold mb-2">
            How We Use Your Information
          </h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>To display your business in our directory</li>
            <li>To contact you about your registration</li>
            <li>To improve our services</li>
            <li>To send important updates about our platform</li>
          </ul>
        </section>
        <section>
          <h3 className="text-lg font-semibold mb-2">Data Protection</h3>
          <p className="text-gray-700">
            We implement various security measures to maintain the safety of
            your personal information. Your data is stored securely and is only
            accessible to authorized personnel.
          </p>
        </section>
        <section>
          <h3 className="text-lg font-semibold mb-2">Your Rights</h3>
          <p className="text-gray-700">
            You have the right to access, correct, or delete your personal
            information at any time. Contact us at
            contact@turrialbaentrepreneurs.org for any privacy-related concerns.
          </p>
        </section>
        <section>
          <h3 className="text-lg font-semibold mb-2">Updates to This Policy</h3>
          <p className="text-gray-700">
            We may update this privacy policy from time to time. We will notify
            you of any changes by posting the new policy on this page.
          </p>
        </section>
        <p className="text-sm text-gray-500 mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </Modal>;
}