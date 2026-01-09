
export enum View {
  DASHBOARD = 'dashboard',
  MAPS_SCRAPER = 'maps_scraper',
  SOCIAL_AUTOMATION = 'social_automation',
  WHATSAPP_MODULE = 'whatsapp_module',
  AI_CHATBOT = 'ai_chatbot',
  SETTINGS = 'settings'
}

export interface BusinessLead {
  id: string;
  name: string;
  phone: string;
  address: string;
  rating?: number;
  status: 'new' | 'contacted' | 'interested' | 'rejected';
  source: 'google_maps' | 'facebook' | 'whatsapp';
}

export interface MessageLog {
  id: string;
  recipient: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'failed';
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
