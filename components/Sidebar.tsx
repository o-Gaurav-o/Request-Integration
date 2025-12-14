import React from 'react';
import { 
  User, Mail, Calendar, Coffee, Users, Search, 
  BarChart2, Link2, Webhook, Code, Globe, 
  List, Shield, CreditCard, ChevronDown, CheckSquare, FileText
} from 'lucide-react';

// Using a placeholder logo since we can't use external images easily
const Logo = () => (
  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-lg">
    S
  </div>
);

const SidebarItem = ({ icon: Icon, label, isActive = false, isNew = false }: { icon: any, label: string, isActive?: boolean, isNew?: boolean }) => (
  <div className={`
    flex items-center px-4 py-2 my-0.5 text-sm font-medium rounded-r-full mr-2 cursor-pointer transition-colors relative
    ${isActive 
      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600 pl-3' 
      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent pl-3'}
  `}>
    <Icon size={18} className={`mr-3 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
    <span>{label}</span>
    {isNew && (
      <span className="ml-2 px-1.5 py-0.5 text-[10px] font-bold text-white bg-orange-400 rounded">New</span>
    )}
  </div>
);

const Sidebar = () => {
  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col fixed left-0 top-0 overflow-y-auto hide-scrollbar z-10">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <Logo />
      </div>

      <div className="flex-1 py-6">
        {/* User Settings Group */}
        <div className="mb-8">
          <h3 className="px-6 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">User Settings</h3>
          <SidebarItem icon={User} label="My Profile" />
          <SidebarItem icon={Mail} label="Email Accounts" />
          <SidebarItem icon={Calendar} label="Schedules" />
          <SidebarItem icon={Coffee} label="Out of Office" />
        </div>

        {/* Company Settings Group */}
        <div>
          <h3 className="px-6 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Company Settings</h3>
          <SidebarItem icon={Users} label="Users & Teams" />
          <SidebarItem icon={CheckSquare} label="Prospect Fields" />
          <SidebarItem icon={FileText} label="Prospect Outcomes" />
          
          <SidebarItem icon={Link2} label="Integrations" isActive={true} />
          
          <SidebarItem icon={Webhook} label="Webhook" />
          <SidebarItem icon={Code} label="API Key" />
          <SidebarItem icon={Globe} label="Custom Tracking Domain" />
          <SidebarItem icon={List} label="Admin Settings" />
          <SidebarItem icon={Shield} label="Do Not Contact List" />
          <SidebarItem icon={Search} label="Whitelabel" />
          <SidebarItem icon={CreditCard} label="Billing & Subscription" />
        </div>
      </div>
      
      {/* User Profile Bottom */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center">
           <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
             GJ
           </div>
           <div className="ml-3">
             <p className="text-sm font-medium text-gray-700">Gregory J.</p>
           </div>
           <ChevronDown size={14} className="ml-auto text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;