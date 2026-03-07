import { NavLink, useLocation, Outlet } from 'react-router-dom';
import { Image, School, HandHeart, Phone, Camera, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

const navItems = [
  { to: '/admin/site-images', label: 'Site Images', icon: Image },
  { to: '/admin/campus', label: 'Campus Cards', icon: School },
  { to: '/admin/donors', label: 'Donors', icon: HandHeart },
  { to: '/admin/contact', label: 'Contact Info', icon: Phone },
  { to: '/admin/activities', label: 'Activities', icon: Camera },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentTitle = navItems.find(n => location.pathname.startsWith(n.to))?.label || 'Dashboard';

  const SidebarContent = () => (
    <>
      <div className="p-5 border-b border-white/10">
        <h2 className="font-heading text-lg font-bold text-white">PVET Admin</h2>
        <p className="text-xs text-white/50 mt-0.5 truncate">admin@pvet.org</p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(item => {
          const active = location.pathname.startsWith(item.to);
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${active ? 'bg-primary text-white font-medium' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="hidden lg:inline">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="p-3">
        <button onClick={logout} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/70 hover:bg-white/10 hover:text-white w-full transition-colors">
          <LogOut className="w-4 h-4" />
          <span className="hidden lg:inline">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-16 lg:w-[260px] bg-[#1a2e1f] fixed inset-y-0 left-0 z-40 transition-all">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-[260px] bg-[#1a2e1f] flex flex-col">
            <div className="flex justify-end p-2">
              <button onClick={() => setSidebarOpen(false)} className="text-white p-2"><X className="w-5 h-5" /></button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 md:ml-16 lg:ml-[260px]">
        <header className="sticky top-0 z-30 bg-white border-b border-lightgreen/30 h-14 flex items-center px-4 gap-3">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-textdark"><Menu className="w-5 h-5" /></button>
          <h1 className="font-heading font-bold text-darkgreen">{currentTitle}</h1>
        </header>
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
