import { Heart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onNavigate?: (view: 'landing' | 'dashboard') => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-white sticky top-0 z-50">
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={() => onNavigate?.('landing')}
      >
        <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white shadow-lg">
          <Heart fill="currentColor" size={24} />
        </div>
        <span className="text-2xl font-bold tracking-tight text-pink-600">mumsy.ai</span>
      </div>
      
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
        <button onClick={() => onNavigate?.('landing')} className="hover:text-pink-600 transition-colors">Home</button>
        <button onClick={() => onNavigate?.('dashboard')} className="hover:text-pink-600 transition-colors">Tracker</button>
        <a href="#" className="hover:text-pink-600 transition-colors">Community</a>
        <a href="#" className="hover:text-pink-600 transition-colors">Resources</a>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu size={24} />
        </Button>
      </div>
    </nav>
  );
}
