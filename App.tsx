
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import IntegrationCard from './components/IntegrationCard';
import RequestModal from './components/RequestModal';
import Toast from './components/Toast';
import { 
  PipedriveIcon, ZohoIcon, HubspotIcon, SalesforceIcon, ZapierIcon,
  SendsparkIcon, PitchlaneIcon, WeezlyIcon
} from './icons';
import { AlertTriangle, Headset, Zap, Bell, Plus, Info } from 'lucide-react';
import { IntegrationRequest } from './types';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const handleRequestSubmit = (data: IntegrationRequest) => {
    console.log("Submitting integration request:", data);
    // Toast is no longer needed as the modal handles success state
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-900 font-sans">
      <Sidebar />

      {/* Main Content */}
      <div className="pl-64 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-20">
          <h1 className="text-xl font-bold text-gray-800">Settings</h1>
          
          <div className="flex items-center space-x-4">
            {/* Trial Warning Banner */}
            <div className="bg-[#FFF4E5] border border-[#FFD5A1] text-[#B95000] px-4 py-1.5 rounded text-xs font-medium flex items-center">
              <AlertTriangle size={14} className="mr-2" />
              <span>Your Outreach trial expires in 7 days.</span>
              <a href="#" className="ml-1 underline hover:text-[#913e00]">Upgrade Now</a>
            </div>

            <div className="h-6 w-px bg-gray-200 mx-2"></div>
            
            <button className="text-gray-400 hover:text-gray-600"><Headset size={20} /></button>
            <button className="text-gray-400 hover:text-gray-600"><Zap size={20} /></button>
            <button className="text-gray-400 hover:text-gray-600"><Bell size={20} /></button>
            
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold border border-blue-200">
              GJ
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-8 max-w-7xl relative">
          
          {/* Native Integrations Section */}
          <section className="mb-10">
            <div className="flex items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mr-3">Native Integrations</h2>
              <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full border border-gray-200 flex items-center cursor-help">
                <Info size={12} className="mr-1" /> Know more
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <IntegrationCard 
                title="Pipedrive"
                description="Connect now to sync Pipedrive data to Saleshandy."
                icon={<PipedriveIcon />}
              />
              <IntegrationCard 
                title="Zoho"
                description="Connect now to sync Zoho data to Saleshandy."
                icon={<ZohoIcon />}
              />
              <IntegrationCard 
                title="Hubspot"
                description="Connect now to sync Hubspot data to Saleshandy."
                icon={<HubspotIcon />}
              />
              <IntegrationCard 
                title="Salesforce"
                description="Connect now to sync Salesforce data to Saleshandy."
                icon={<SalesforceIcon />}
              />
              
              {/* Request Integration Card */}
              <IntegrationCard
                title="Request Integration"
                description="Can't find the tool you use? Let us know and we'll build it."
                icon={
                  <div className="w-8 h-8 rounded bg-gray-50 border border-gray-200 flex items-center justify-center">
                    <Plus className="text-gray-500" size={18} />
                  </div>
                }
                onClick={() => setIsModalOpen(true)}
                actionLabel="Request Integration"
              />
            </div>
          </section>

          {/* Zapier Integration Section */}
          <section className="mb-10">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Integration using Zapier</h2>
              <p className="text-gray-500 text-sm mt-1">
                Connect Saleshandy to 6000+ Apps using Zapier. <a href="#" className="underline hover:text-gray-700">Learn more</a>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <IntegrationCard 
                title="Zapier"
                description="Quickly automate Saleshandy integrations with Zapier"
                icon={<ZapierIcon />}
                isZapier={true}
              />
            </div>
          </section>

          {/* Video Personalization Section */}
          <section className="mb-10">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Video Personalization</h2>
              <p className="text-gray-500 text-sm mt-1">
                Create personalized videos for your outreach campaigns to increase conversion rates. <a href="#" className="underline hover:text-gray-700">Learn more</a>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <IntegrationCard 
                title="Sendspark"
                description="Create personalized videos with Sendspark Integration."
                icon={<SendsparkIcon />}
              />
              <IntegrationCard 
                title="Pitchlane"
                description="Create personalized videos with Pitchlane Integration."
                icon={<PitchlaneIcon />}
              />
              <IntegrationCard 
                title="Weezly"
                description="Create personalized videos with Weezly Integration."
                icon={<WeezlyIcon />}
              />
            </div>
          </section>

        </main>
      </div>

      {/* Modals & Overlays */}
      <RequestModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose} 
        onSubmit={handleRequestSubmit}
      />
      
      <Toast 
        message="Thanks! We’ll review and respond within 48–72 hours."
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}

export default App;
