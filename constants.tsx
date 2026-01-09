
import React from 'react';
import { 
  Instagram, 
  Linkedin, 
  Twitter, 
  Facebook, 
  AtSign,
  LayoutDashboard,
  Calendar,
  Library,
  Settings,
  PlusCircle,
  Sparkles
} from 'lucide-react';
import { SocialAccount, Platform } from './types';

export const PLATFORMS: Record<Platform, { name: string, color: string, icon: React.ReactNode }> = {
  instagram: { 
    name: 'Instagram', 
    color: 'bg-pink-500', 
    icon: <Instagram size={18} /> 
  },
  linkedin: { 
    name: 'LinkedIn', 
    color: 'bg-blue-600', 
    icon: <Linkedin size={18} /> 
  },
  x: { 
    name: 'X (Twitter)', 
    color: 'bg-black', 
    icon: <Twitter size={18} /> 
  },
  facebook: { 
    name: 'Facebook', 
    color: 'bg-blue-500', 
    icon: <Facebook size={18} /> 
  },
  threads: { 
    name: 'Threads', 
    color: 'bg-zinc-800', 
    icon: <AtSign size={18} /> 
  }
};

export const INITIAL_ACCOUNTS: SocialAccount[] = [
  { id: '1', platform: 'instagram', name: 'Artisan Coffee Co.', handle: '@artisan_coffee', avatar: 'https://picsum.photos/seed/coffee/100' },
  { id: '2', platform: 'instagram', name: 'Personal Brand', handle: '@johndoe_creative', avatar: 'https://picsum.photos/seed/john/100' },
  { id: '3', platform: 'linkedin', name: 'John Doe', handle: 'in/johndoe', avatar: 'https://picsum.photos/seed/john/100' },
  { id: '4', platform: 'x', name: 'Tech Insights', handle: '@tech_daily', avatar: 'https://picsum.photos/seed/tech/100' },
  { id: '5', platform: 'linkedin', name: 'Company Page', handle: 'company/nexus-labs', avatar: 'https://picsum.photos/seed/nexus/100' },
];

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'composer', label: 'Composer', icon: <PlusCircle size={20} /> },
  { id: 'planner', label: 'Planner', icon: <Calendar size={20} /> },
  { id: 'library', label: 'Library', icon: <Library size={20} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
];
