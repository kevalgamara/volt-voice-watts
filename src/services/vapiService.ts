
interface VapiCallOptions {
  phoneNumber: string;
  assistantId?: string;
  customerName?: string;
  companyName?: string;
}

interface VapiCallResponse {
  id: string;
  status: string;
  phoneNumber: string;
  duration?: number;
}

class VapiService {
  private apiKey: string | null = null;
  private baseUrl = 'https://api.vapi.ai';

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  async initiateCall(options: VapiCallOptions): Promise<VapiCallResponse> {
    if (!this.apiKey) {
      throw new Error('Vapi.ai API key not set');
    }

    console.log('Initiating Vapi.ai call with options:', options);

    const response = await fetch(`${this.baseUrl}/call`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumberId: options.phoneNumber,
        assistantId: options.assistantId || 'default-solar-assistant',
        customer: {
          name: options.customerName,
          number: options.phoneNumber,
        },
        metadata: {
          companyName: options.companyName,
          callType: 'solar-consultation',
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Vapi.ai API error: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Vapi.ai call initiated:', result);
    
    return {
      id: result.id,
      status: result.status,
      phoneNumber: options.phoneNumber,
      duration: result.duration,
    };
  }

  async getCallStatus(callId: string): Promise<VapiCallResponse> {
    if (!this.apiKey) {
      throw new Error('Vapi.ai API key not set');
    }

    const response = await fetch(`${this.baseUrl}/call/${callId}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Vapi.ai API error: ${response.statusText}`);
    }

    const result = await response.json();
    
    return {
      id: result.id,
      status: result.status,
      phoneNumber: result.customer?.number || '',
      duration: result.duration,
    };
  }

  async createAssistant(assistantConfig: any) {
    if (!this.apiKey) {
      throw new Error('Vapi.ai API key not set');
    }

    const defaultSolarAssistant = {
      name: 'Solar Consultation Assistant',
      model: {
        provider: 'openai',
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
      },
      voice: {
        provider: 'eleven-labs',
        voiceId: 'EXAVITQu4vr4xnSDxMaL', // Sarah voice
      },
      firstMessage: 'Hi! I\'m calling from SolarPro AI about solar energy solutions for your home. Do you have a few minutes to discuss how solar can save you money?',
      systemPrompt: `You are a friendly solar energy consultant. Your goal is to:
      1. Introduce yourself and SolarPro AI
      2. Ask about their current electricity costs
      3. Explain solar benefits (savings, tax credits, home value increase)
      4. Handle objections professionally
      5. Schedule a consultation if interested
      Keep conversations natural and helpful.`,
      ...assistantConfig,
    };

    const response = await fetch(`${this.baseUrl}/assistant`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(defaultSolarAssistant),
    });

    if (!response.ok) {
      throw new Error(`Vapi.ai API error: ${response.statusText}`);
    }

    return await response.json();
  }
}

export const vapiService = new VapiService();
export default VapiService;
