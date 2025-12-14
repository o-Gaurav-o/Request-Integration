
import React, { useState } from 'react';

// Robust Logo Component that tries Clearbit first, then Google Favicon
export const BrandLogo = ({ domain, name, className = "w-8 h-8" }: { domain: string, name: string, className?: string }) => {
  const [src, setSrc] = useState(`https://logo.clearbit.com/${domain}`);
  const [error, setError] = useState(false);

  const handleError = () => {
    // If Clearbit fails, try Google Favicon service which is very reliable
    if (src.startsWith('https://logo.clearbit.com')) {
      setSrc(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
    } else {
      setError(true);
    }
  };

  if (error) {
    return (
      <div className={`${className} bg-gray-100 rounded flex items-center justify-center text-gray-500 font-bold text-[10px] border border-gray-200 uppercase tracking-tighter`}>
        {name.substring(0, 2)}
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={`${name} logo`} 
      className={`${className} object-contain`} 
      onError={handleError}
    />
  );
};

export const PipedriveIcon = ({ className }: { className?: string }) => <BrandLogo domain="pipedrive.com" name="Pipedrive" className={className} />;
export const ZohoIcon = ({ className }: { className?: string }) => <BrandLogo domain="zoho.com" name="Zoho" className={className} />;
export const HubspotIcon = ({ className }: { className?: string }) => <BrandLogo domain="hubspot.com" name="HubSpot" className={className} />;
export const SalesforceIcon = ({ className }: { className?: string }) => <BrandLogo domain="salesforce.com" name="Salesforce" className={className} />;
export const ZapierIcon = ({ className }: { className?: string }) => <BrandLogo domain="zapier.com" name="Zapier" className={className} />;
export const OutreachIcon = ({ className }: { className?: string }) => <BrandLogo domain="outreach.io" name="Outreach" className={className} />;
export const SalesloftIcon = ({ className }: { className?: string }) => <BrandLogo domain="salesloft.com" name="Salesloft" className={className} />;
export const SlackIcon = ({ className }: { className?: string }) => <BrandLogo domain="slack.com" name="Slack" className={className} />;
export const AsanaIcon = ({ className }: { className?: string }) => <BrandLogo domain="asana.com" name="Asana" className={className} />;
export const MondayIcon = ({ className }: { className?: string }) => <BrandLogo domain="monday.com" name="Monday.com" className={className} />;

// Video Personalization Icons
export const SendsparkIcon = ({ className }: { className?: string }) => <BrandLogo domain="sendspark.com" name="Sendspark" className={className} />;
export const PitchlaneIcon = ({ className }: { className?: string }) => <BrandLogo domain="pitchlane.com" name="Pitchlane" className={className} />;
export const WeezlyIcon = ({ className }: { className?: string }) => <BrandLogo domain="weezly.com" name="Weezly" className={className} />;
