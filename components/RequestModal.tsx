
import React, { useState, useEffect, useRef } from 'react';
import { X, Loader2, Search, Plus, Check } from 'lucide-react';
import { IntegrationRequest } from '../types';
import { BrandLogo } from '../icons';

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IntegrationRequest) => void;
}

interface ToolOption {
  name: string;
  domain: string;
}

// Comprehensive list of popular SaaS tools with domains for logo fetching
const POPULAR_TOOLS: ToolOption[] = [
  { name: "ActiveCampaign", domain: "activecampaign.com" },
  { name: "Airtable", domain: "airtable.com" },
  { name: "Amplitude", domain: "amplitude.com" },
  { name: "Apollo.io", domain: "apollo.io" },
  { name: "Asana", domain: "asana.com" },
  { name: "Attio", domain: "attio.com" },
  { name: "BambooHR", domain: "bamboohr.com" },
  { name: "Basecamp", domain: "basecamp.com" },
  { name: "BigCommerce", domain: "bigcommerce.com" },
  { name: "Box", domain: "box.com" },
  { name: "Brevo", domain: "brevo.com" },
  { name: "Calendly", domain: "calendly.com" },
  { name: "Campaign Monitor", domain: "campaignmonitor.com" },
  { name: "Chargebee", domain: "chargebee.com" },
  { name: "Chili Piper", domain: "chilipiper.com" },
  { name: "Chorus.ai", domain: "chorus.ai" },
  { name: "ClickUp", domain: "clickup.com" },
  { name: "Close", domain: "close.com" },
  { name: "Constant Contact", domain: "constantcontact.com" },
  { name: "Copper", domain: "copper.com" },
  { name: "Customer.io", domain: "customer.io" },
  { name: "DealCloud", domain: "dealcloud.com" },
  { name: "Docusign", domain: "docusign.com" },
  { name: "Drift", domain: "drift.com" },
  { name: "Dropbox", domain: "dropbox.com" },
  { name: "Dynamics 365", domain: "dynamics.microsoft.com" },
  { name: "FreshBooks", domain: "freshbooks.com" },
  { name: "Freshdesk", domain: "freshdesk.com" },
  { name: "Freshsales", domain: "freshworks.com" },
  { name: "Front", domain: "front.com" },
  { name: "GitHub", domain: "github.com" },
  { name: "GitLab", domain: "gitlab.com" },
  { name: "Gong", domain: "gong.io" },
  { name: "Google Ads", domain: "ads.google.com" },
  { name: "Google Analytics", domain: "analytics.google.com" },
  { name: "Google Calendar", domain: "calendar.google.com" },
  { name: "Google Drive", domain: "drive.google.com" },
  { name: "Google Meet", domain: "meet.google.com" },
  { name: "Google Sheets", domain: "sheets.google.com" },
  { name: "Gusto", domain: "gusto.com" },
  { name: "Help Scout", domain: "helpscout.com" },
  { name: "HubSpot", domain: "hubspot.com" },
  { name: "Insightly", domain: "insightly.com" },
  { name: "Intercom", domain: "intercom.com" },
  { name: "Jira", domain: "atlassian.com" },
  { name: "Keap", domain: "keap.com" },
  { name: "Klaviyo", domain: "klaviyo.com" },
  { name: "Lemlist", domain: "lemlist.com" },
  { name: "Linear", domain: "linear.app" },
  { name: "LinkedIn", domain: "linkedin.com" },
  { name: "Magento", domain: "magento.com" },
  { name: "Mailchimp", domain: "mailchimp.com" },
  { name: "Marketo", domain: "marketo.com" },
  { name: "Microsoft Teams", domain: "teams.microsoft.com" },
  { name: "Mixpanel", domain: "mixpanel.com" },
  { name: "Monday.com", domain: "monday.com" },
  { name: "NetSuite", domain: "netsuite.com" },
  { name: "Notion", domain: "notion.so" },
  { name: "Oracle CX", domain: "oracle.com" },
  { name: "Outreach", domain: "outreach.io" },
  { name: "PandaDoc", domain: "pandadoc.com" },
  { name: "Pardot", domain: "pardot.com" },
  { name: "PayPal", domain: "paypal.com" },
  { name: "Pipedrive", domain: "pipedrive.com" },
  { name: "QuickBooks", domain: "quickbooks.intuit.com" },
  { name: "Recurly", domain: "recurly.com" },
  { name: "Sage", domain: "sage.com" },
  { name: "Salesforce", domain: "salesforce.com" },
  { name: "Salesloft", domain: "salesloft.com" },
  { name: "Segment", domain: "segment.com" },
  { name: "SendGrid", domain: "sendgrid.com" },
  { name: "ServiceNow", domain: "servicenow.com" },
  { name: "Shopify", domain: "shopify.com" },
  { name: "Slack", domain: "slack.com" },
  { name: "Snowflake", domain: "snowflake.com" },
  { name: "Square", domain: "squareup.com" },
  { name: "Stripe", domain: "stripe.com" },
  { name: "SugarCRM", domain: "sugarcrm.com" },
  { name: "SurveyMonkey", domain: "surveymonkey.com" },
  { name: "Tableau", domain: "tableau.com" },
  { name: "Todoist", domain: "todoist.com" },
  { name: "Trello", domain: "trello.com" },
  { name: "Twilio", domain: "twilio.com" },
  { name: "Typeform", domain: "typeform.com" },
  { name: "WooCommerce", domain: "woocommerce.com" },
  { name: "Workday", domain: "workday.com" },
  { name: "Wrike", domain: "wrike.com" },
  { name: "Xero", domain: "xero.com" },
  { name: "Zendesk", domain: "zendesk.com" },
  { name: "Zoho CRM", domain: "zoho.com" },
  { name: "Zoom", domain: "zoom.us" },
  { name: "ZoomInfo", domain: "zoominfo.com" },
  { name: "Zuora", domain: "zuora.com" }
].sort((a, b) => a.name.localeCompare(b.name));

const RequestModal: React.FC<RequestModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [toolInput, setToolInput] = useState('');
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Autocomplete state
  const [suggestions, setSuggestions] = useState<ToolOption[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setToolInput('');
      setSelectedTools([]);
      setReason('');
      setIsSuccess(false);
      setIsSubmitting(false);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setToolInput(value);

    if (value.trim().length > 0) {
      const filtered = POPULAR_TOOLS.filter(tool => 
        tool.name.toLowerCase().includes(value.toLowerCase()) && 
        !selectedTools.map(t => t.toLowerCase()).includes(tool.name.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (toolName: string) => {
    if (!selectedTools.includes(toolName)) {
      setSelectedTools(prev => [...prev, toolName]);
    }
    setToolInput('');
    setShowSuggestions(false);
  };

  const addCustomTool = () => {
    const trimmed = toolInput.trim();
    if (trimmed && !selectedTools.includes(trimmed)) {
      setSelectedTools(prev => [...prev, trimmed]);
      setToolInput('');
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomTool();
    }
  };

  const removeTool = (toolToRemove: string) => {
    setSelectedTools(prev => prev.filter(t => t !== toolToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If user typed something but didn't press enter, add it on submit
    let finalTools = [...selectedTools];
    if (toolInput.trim() && !selectedTools.includes(toolInput.trim())) {
      finalTools.push(toolInput.trim());
    }

    if (finalTools.length === 0) {
      return; 
    }

    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      onSubmit({
        toolNames: finalTools,
        reason: reason,
      });
      setIsSubmitting(false);
      setIsSuccess(true); // Show success view
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm transition-opacity">
      <div 
        className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden transform transition-all scale-100"
        role="dialog"
        aria-modal="true"
      >
        {isSuccess ? (
          <div className="p-8 flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
              <Check size={32} className="text-green-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Request Submitted</h2>
            <p className="text-gray-500 text-sm mb-6 max-w-xs">
              Thank you for your suggestion. We have received your integration request.
            </p>
            <button
              onClick={onClose}
              className="w-full px-4 py-2 text-sm font-bold text-white bg-[#0052cc] rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Request Integration</h2>
              <button 
                onClick={onClose} 
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              
              {/* Tool Name with Autocomplete */}
              <div ref={wrapperRef} className="relative">
                <label htmlFor="toolInput" className="block text-sm font-medium text-gray-700 mb-1">
                  Tool Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="toolInput"
                    name="toolInput"
                    autoComplete="off"
                    placeholder="e.g. DealCloud, Asana"
                    value={toolInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-shadow bg-white text-gray-900"
                  />
                  {/* Autocomplete Dropdown */}
                  {showSuggestions && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-b-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                      {suggestions.map((tool, index) => (
                        <li 
                          key={index}
                          onClick={() => handleSuggestionClick(tool.name)}
                          className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 flex items-center group transition-colors"
                        >
                          {/* Official Logo Container */}
                          <div className="w-8 h-8 mr-3 flex-shrink-0 flex items-center justify-center bg-white rounded border border-gray-100 p-1 shadow-sm">
                            <BrandLogo domain={tool.domain} name={tool.name} className="w-full h-full" />
                          </div>
                          
                          <span className="font-medium text-gray-900">{tool.name}</span>
                        </li>
                      ))}
                      {/* Custom Option */}
                      {toolInput.trim() && !suggestions.some(s => s.name.toLowerCase() === toolInput.trim().toLowerCase()) && (
                        <li 
                          onClick={addCustomTool}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm text-blue-600 flex items-center font-medium border-t border-gray-50"
                        >
                          <div className="w-8 h-8 mr-3 flex items-center justify-center bg-blue-50 rounded border border-blue-100">
                            <Plus size={16} className="text-blue-500" />
                          </div>
                          Add "{toolInput}" manually
                        </li>
                      )}
                    </ul>
                  )}
                </div>
                
                {/* Selected Tools Bubbles */}
                {selectedTools.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedTools.map((tool, index) => {
                      const toolInfo = POPULAR_TOOLS.find(t => t.name === tool);
                      return (
                        <div key={index} className="flex items-center bg-blue-50 text-blue-800 text-sm font-medium pl-1 pr-2 py-1 rounded-full border border-blue-100 transition-all hover:bg-blue-100 hover:border-blue-200">
                          {toolInfo ? (
                            <div className="w-5 h-5 mr-2 rounded-full bg-white flex items-center justify-center overflow-hidden border border-blue-100">
                              <BrandLogo domain={toolInfo.domain} name={toolInfo.name} className="w-3.5 h-3.5" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 mr-2 rounded-full bg-white flex items-center justify-center overflow-hidden border border-blue-100 text-[10px] font-bold text-gray-400">
                              <Search size={10} />
                            </div>
                          )}
                          {tool}
                          <button
                            type="button"
                            onClick={() => removeTool(tool)}
                            className="ml-2 text-blue-400 hover:text-red-500 focus:outline-none transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Reason */}
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                  What specific purpose or features of this tool are you requesting it for? <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  required
                  rows={4}
                  placeholder="e.g. It helps us manage investor pipeline..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-shadow resize-none bg-white text-gray-900"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg mr-3 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || (selectedTools.length === 0 && !toolInput.trim())}
                  className="px-4 py-2 text-sm font-bold text-white bg-[#0052cc] rounded-lg hover:bg-blue-700 transition-colors flex items-center shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting && <Loader2 size={16} className="animate-spin mr-2" />}
                  Submit Request
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RequestModal;
