import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MenuIcon, XIcon } from 'lucide-react';
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <header className="bg-green-800 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="//" className="text-2xl font-bold">
            Turri Emprende
          </Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <NavLink to="/" className={({
                isActive
              }) => isActive ? 'text-yellow-300 font-medium' : 'hover:text-yellow-300'} end>
                  Inicio
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className={({
                isActive
              }) => isActive ? 'text-yellow-300 font-medium' : 'hover:text-yellow-300'}>
                  Registrarme
                </NavLink>
              </li>
            </ul>
          </nav>
          <button className="md:hidden text-white focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMenuOpen}>
            {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
        {isMenuOpen && <div className="md:hidden py-4 border-t border-green-700">
            <ul className="space-y-3">
              <li>
                <NavLink to="/" className={({
              isActive
            }) => isActive ? 'text-yellow-300 font-medium block py-2' : 'block py-2 hover:text-yellow-300'} onClick={() => setIsMenuOpen(false)} end>
                  Inicio
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className={({
              isActive
            }) => isActive ? 'text-yellow-300 font-medium block py-2' : 'block py-2 hover:text-yellow-300'} onClick={() => setIsMenuOpen(false)}>
                  Registrarme
                </NavLink>
              </li>
            </ul>
          </div>}
      </div>
    </header>;
}