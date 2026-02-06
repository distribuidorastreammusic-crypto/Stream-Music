
import React from 'react';
import { NAVIGATION_ITEMS } from '../constants';
import { Page, User as UserType } from '../types';
import { X, Music } from 'lucide-react';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  isOpen: boolean;
  onClose: () => void;
  user: UserType | null;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, isOpen, onClose, user }) => {
  // Filtrar itens de navegação se o usuário não for admin
  const filteredNavItems = NAVIGATION_ITEMS.filter(item => {
    if (item.id === 'admin' && user?.role !== 'admin') return false;
    return true;
  });

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 transition-transform duration-300 lg:translate-x-0 lg:static lg:block
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-20 flex items-center px-6 justify-between border-b border-gray-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center shadow-lg shadow-gray-200 overflow-hidden">
                <Music size={20} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xs tracking-tighter text-gray-900 uppercase leading-none mb-0.5">Stream Music</span>
                <span className="text-[8px] text-gray-400 font-black tracking-[0.2em] uppercase leading-none">Distribution</span>
              </div>
            </div>
            <button className="lg:hidden text-gray-400" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto no-scrollbar">
            {filteredNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  onClose();
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all text-[11px] font-black uppercase tracking-widest
                  ${activePage === item.id 
                    ? 'bg-black text-white shadow-xl shadow-gray-200' 
                    : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <div className={`${activePage === item.id ? 'text-white' : 'text-gray-400'}`}>
                  {item.icon}
                </div>
                {item.label}
              </button>
            ))}
          </nav>

          {/* Footer Branding */}
          <div className="p-6 border-t border-gray-50">
            <div className="p-5 bg-gray-50 rounded-[2rem] border border-gray-100/50">
              <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] font-black mb-2">Plano Atual</p>
              <p className="text-xs font-black text-gray-900 uppercase">Artist Gold Pro</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
