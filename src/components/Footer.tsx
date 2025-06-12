import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, MailIcon, PhoneIcon, FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-react';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';
export function Footer() {
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  return <footer className="bg-green-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Turrialba Entrepreneurs</h3>
            <p className="mb-4">
              A platform to showcase and promote local entrepreneurships from
              Turrialba and Jiménez driven by the D-HOPE methodology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-yellow-300" aria-label="Facebook">
                <FacebookIcon className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-yellow-300" aria-label="Instagram">
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-yellow-300" aria-label="Twitter">
                <TwitterIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-yellow-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-yellow-300 transition-colors">
                  Register Your Business
                </Link>
              </li>
              <li>
                <button onClick={() => setIsPrivacyPolicyOpen(true)} className="hover:text-yellow-300 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPinIcon className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>Turrialba City Center, Cartago Province, Costa Rica</span>
              </li>
              <li className="flex items-center">
                <MailIcon className="w-5 h-5 mr-2 flex-shrink-0" />
                <a href="mailto:contact@turrialbaentrepreneurs.org" className="hover:text-yellow-300 transition-colors">
                  contact@turrialbaentrepreneurs.org
                </a>
              </li>
              <li className="flex items-center">
                <PhoneIcon className="w-5 h-5 mr-2 flex-shrink-0" />
                <a href="tel:+50612345678" className="hover:text-yellow-300 transition-colors">
                  +506 1234-5678
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-green-800 mt-8 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Turrialba Entrepreneurs. All
            rights reserved.
          </p>
          <p className="mt-2">
            Developed in support of local economic development in Turrialba and
            Jiménez regions.
          </p>
        </div>
      </div>
      <PrivacyPolicyModal isOpen={isPrivacyPolicyOpen} onClose={() => setIsPrivacyPolicyOpen(false)} />
    </footer>;
}