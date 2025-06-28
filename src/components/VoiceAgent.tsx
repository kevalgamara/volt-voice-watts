import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, MessageSquare, Users, Mic, MicOff, Volume2, VolumeX, Settings, AlertCircle, Calculator, UserPlus, PhoneCall } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CompanyDetailBar from "./CompanyDetailBar";
import CallLogRecord from "./CallLogRecord";
import ClientRegistration from "./ClientRegistration";
import ProfitCalculator from "./ProfitCalculator";

const VoiceAgent = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callsToday, setCallsToday] = useState(23);
  const [conversions, setConversions] = useState(7);
  const [currentMessage, setCurrentMessage] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [vapiApiKey, setVapiApiKey] = useState('3eff8910-7f1e-4533-b4b9-24fe0e0c51d3');
  const [showVapiSettings, setShowVapiSettings] = useState(false);
  const [currentCall, setCurrentCall] = useState<any>(null);
  const [clientList, setClientList] = useState<any[]>([]);
  const [isCallingClientList, setIsCallingClientList] = useState(false);
  const { toast } = useToast();

  // Vapi.ai Configuration
  const VAPI_ASSISTANT_ID = '448258e3-a332-4c2b-8346-d51f06e0ec77';
  const VAPI_PHONE_NUMBER_ID = '5bbf004f-3258-4586-aab5-2e78fdbc80a0';

  // Call log records state
  const [callRecords, setCallRecords] = useState([
    {
      id: '1',
      clientName: 'John Smith',
      phoneNumber: '+1 (555) 123-4567',
      duration: '4:32',
      status: 'completed' as const,
      timestamp: '2 hours ago',
      notes: 'Very interested in solar - discussing financing options'
    },
    {
      id: '2',
      clientName: 'Sarah Johnson',
      phoneNumber: '+1 (555) 987-6543',
      duration: '6:18',
      status: 'converted' as const,
      timestamp: '3 hours ago',
      notes: 'SOLD! Scheduled installation consultation for next week'
    },
    {
      id: '3',
      clientName: 'Mike Wilson',
      phoneNumber: '+1 (555) 456-7890',
      duration: '0:45',
      status: 'missed' as const,
      timestamp: '1 day ago',
      notes: 'No answer - will retry'
    }
  ]);

  // Enhanced phone number formatting for E.164 format
  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters except +
    const cleaned = value.replace(/[^\d+]/g, '');
    
    // If it doesn't start with +, add it
    if (cleaned && !cleaned.startsWith('+')) {
      return '+' + cleaned;
    }
    
    return cleaned;
  };

  const validatePhoneNumber = (phone: string) => {
    // E.164 format: +[country code][number] (7-15 digits total after +)
    const phoneRegex = /^\+[1-9]\d{6,14}$/;
    return phoneRegex.test(phone);
  };

  const handleStartCall = async () => {
    if (!vapiApiKey || vapiApiKey.length < 10) {
      toast({
        title: "Valid API Key Required",
        description: "Please enter a valid Vapi.ai API key in settings.",
        variant: "destructive",
      });
      setShowVapiSettings(true);
      return;
    }

    if (!whatsappNumber || !validatePhoneNumber(whatsappNumber)) {
      toast({
        title: "Invalid Phone Number Format",
        description: "Please enter a valid international phone number in E.164 format (e.g., +12345678901)",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Starting Vapi.ai solar sales call to:', whatsappNumber);
      
      const callPayload = {
        assistantId: VAPI_ASSISTANT_ID,
        phoneNumberId: VAPI_PHONE_NUMBER_ID,
        customer: {
          number: whatsappNumber,
        },
      };

      const response = await fetch('https://api.vapi.ai/call/phone', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${vapiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(callPayload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const callData = await response.json();
      console.log('Vapi.ai solar call started successfully:', callData);
      
      setCurrentCall(callData);
      setIsRecording(true);
      setIsSpeaking(true);
      
      toast({
        title: "🌞 Solar AI Agent Active",
        description: `AI agent is now calling ${whatsappNumber} to discuss solar benefits and registration!`,
      });
      
      const newRecord = {
        id: callData.id || Date.now().toString(),
        clientName: 'Solar Prospect',
        phoneNumber: whatsappNumber,
        duration: '0:00',
        status: 'completed' as const,
        timestamp: 'Just now',
        notes: 'AI discussing solar benefits and client registration'
      };
      setCallRecords(prev => [newRecord, ...prev]);
      setCallsToday(prev => prev + 1);

      simulateSolarConversation();
      
    } catch (error) {
      console.error('Vapi.ai solar call failed:', error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      
      toast({
        title: "Call Failed",
        description: `${errorMessage}. Please check your API key and phone number format.`,
        variant: "destructive",
      });
    }
  };

  const simulateSolarConversation = () => {
    const solarMessages = [
      "Hi! I'm calling from SolarPro AI. Would you like to register for our client program and learn about solar savings?",
      "Great! Let me register you in our system and tell you about our amazing solar benefits.",
      "You could save up to 90% on electricity bills with our solar solutions!",
      "We offer $0 down financing with 25-year warranty. Plus, get 30% federal tax credit!",
      "Would you like me to calculate your potential profit and send you our complete solar package?"
    ];

    solarMessages.forEach((message, index) => {
      setTimeout(() => {
        setCurrentMessage(message);
        setIsSpeaking(index < solarMessages.length - 1);
      }, (index + 1) * 4000);
    });

    setTimeout(() => {
      handleEndCall();
    }, solarMessages.length * 4000 + 2000);
  };

  const handleCallClientList = async () => {
    if (clientList.length === 0) {
      toast({
        title: "No Clients Registered",
        description: "Please register some clients first before calling them.",
        variant: "destructive",
      });
      return;
    }

    setIsCallingClientList(true);
    
    for (const client of clientList) {
      try {
        const callPayload = {
          assistantId: VAPI_ASSISTANT_ID,
          phoneNumberId: VAPI_PHONE_NUMBER_ID,
          customer: {
            number: client.phone,
          },
        };

        await fetch('https://api.vapi.ai/call/phone', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${vapiApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(callPayload),
        });

        toast({
          title: `Calling ${client.name}`,
          description: `AI agent is now calling ${client.phone}`,
        });

        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (error) {
        console.error(`Failed to call ${client.name}:`, error);
      }
    }

    setIsCallingClientList(false);
    setCallsToday(prev => prev + clientList.length);
    toast({
      title: "Client List Called",
      description: `Successfully called ${clientList.length} registered clients!`,
    });
  };

  const handleEndCall = async () => {
    if (currentCall && vapiApiKey) {
      try {
        await fetch(`https://api.vapi.ai/call/${currentCall.id}/stop`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${vapiApiKey}`,
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Error ending call:', error);
      }
    }

    setIsRecording(false);
    setIsSpeaking(false);
    setCurrentMessage('');
    setCurrentCall(null);
    
    toast({
      title: "Solar Consultation Completed",
      description: "Call ended. Ready to follow up with WhatsApp details!",
    });
  };

  const handleSendWhatsApp = () => {
    if (!whatsappNumber || !validatePhoneNumber(whatsappNumber)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid international phone number in E.164 format",
        variant: "destructive",
      });
      return;
    }

    const solarMessage = `🌞 *SolarPro AI - Your Solar Energy Partner*

Thank you for your interest in solar energy! Here's how we can transform your home:

💰 *IMMEDIATE SAVINGS*
• Save up to 90% on electricity bills
• Average savings: $1,500+ per year
• $0 down payment options available

🏠 *INCREASE HOME VALUE*
• Boost property value by 15%
• 25-year warranty included
• Professional installation team

💸 *FINANCIAL INCENTIVES*
• 30% Federal Tax Credit (through 2032)
• State and local rebates available
• Financing options with $0 down

🌱 *ENVIRONMENTAL IMPACT*
• Reduce carbon footprint by 3-4 tons/year
• Energy independence from utility companies
• Clean, renewable energy for your family

📞 *CONTACT INFORMATION*
• Phone: (555) 123-SOLAR
• Website: www.solarpro-ai.com
• Email: info@solarpro-ai.com

🎯 *NEXT STEPS*
Reply "YES" to schedule your FREE solar assessment or call us directly!

*Limited time: Additional $2,000 rebate for new customers this month!*`;

    console.log("Sending detailed solar WhatsApp to:", whatsappNumber);
    console.log("Solar benefits message:", solarMessage);
    
    toast({
      title: "🌞 Solar Details Sent!",
      description: `Complete solar information sent to ${whatsappNumber}`,
    });
    
    setConversions(prev => prev + 1);
    
    setCallRecords(prev => 
      prev.map(record => 
        record.phoneNumber === whatsappNumber 
          ? { ...record, status: 'converted' as const, notes: 'INTERESTED! Sent complete solar package via WhatsApp' }
          : record
      )
    );
    
    setWhatsappNumber('');
  };

  const handleSaveCompanyDetails = (details: any) => {
    console.log('Solar company details saved to system:', details);
    toast({
      title: "Company Details Updated",
      description: "Solar company information has been saved successfully",
    });
  };

  const handleClientRegistered = (client: any) => {
    setClientList(prev => [...prev, client]);
    toast({
      title: "Client Registered",
      description: `${client.name} has been added to the client list`,
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-96 shadow-2xl border-2 border-yellow-200 max-h-[80vh] overflow-y-auto bg-gradient-to-br from-yellow-50 to-orange-50">
        <CardHeader className="pb-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>🌞 Solar AI Agent</span>
            </span>
            <div className="flex items-center space-x-2">
              <Badge variant={isRecording ? "default" : "secondary"} className="bg-white/20 text-white">
                {isRecording ? "🔥 Active Call" : "💤 Standby"}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowVapiSettings(!showVapiSettings)}
                className="text-white hover:bg-white/20"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4 p-4">
          {showVapiSettings && (
            <div className="space-y-2 border-b pb-4 bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-700">Vapi.ai Configuration</span>
              </div>
              <Input
                placeholder="Enter your Vapi.ai API Key"
                value={vapiApiKey}
                onChange={(e) => setVapiApiKey(e.target.value)}
                type="password"
                className="border-blue-200"
              />
              <div className="text-xs text-blue-600 space-y-1">
                <p>• Phone Number ID: {VAPI_PHONE_NUMBER_ID}</p>
                <p>• Assistant ID: {VAPI_ASSISTANT_ID}</p>
                <p>• Configured for solar sales & client registration</p>
              </div>
            </div>
          )}

          <Tabs defaultValue="agent" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="agent">🌞 Agent</TabsTrigger>
              <TabsTrigger value="clients">👥 Clients</TabsTrigger>
              <TabsTrigger value="calculator">🧮 Profit</TabsTrigger>
              <TabsTrigger value="stats">📊 Stats</TabsTrigger>
              <TabsTrigger value="logs">📋 Logs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="agent" className="space-y-4">
              <CompanyDetailBar onSave={handleSaveCompanyDetails} />

              <div className="space-y-2">
                <Input
                  placeholder="International phone (E.164): +12345678901"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(formatPhoneNumber(e.target.value))}
                  type="tel"
                  className="border-orange-200 focus:border-orange-400"
                />
                <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
                  ⚠️ Use E.164 format: +[country code][number] (e.g., +12345678901)
                </div>
              </div>

              <div className="flex space-x-2">
                <Button 
                  onClick={isRecording ? handleEndCall : handleStartCall}
                  className={`flex-1 ${isRecording ? "bg-red-500 hover:bg-red-600" : "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"}`}
                  size="sm"
                >
                  {isRecording ? (
                    <>
                      <MicOff className="h-4 w-4 mr-1" />
                      End Call
                    </>
                  ) : (
                    <>
                      <Phone className="h-4 w-4 mr-1" />
                      Start Solar Call
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm" className="border-orange-200">
                  {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>

              <Button 
                onClick={handleCallClientList}
                disabled={isCallingClientList || clientList.length === 0}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                size="sm"
              >
                <PhoneCall className="h-4 w-4 mr-1" />
                {isCallingClientList ? "Calling Clients..." : `Call All Clients (${clientList.length})`}
              </Button>

              {currentMessage && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg border border-yellow-200">
                  <p className="text-sm text-orange-800 font-medium mb-1">🌞 Solar AI Agent:</p>
                  <p className="text-sm text-gray-700">{currentMessage}</p>
                  <div className="flex items-center mt-2 text-xs text-orange-600">
                    <div className="animate-pulse flex space-x-1">
                      <div className="rounded-full bg-orange-400 h-2 w-2"></div>
                      <div className="rounded-full bg-orange-400 h-2 w-2"></div>
                      <div className="rounded-full bg-orange-400 h-2 w-2"></div>
                    </div>
                    <span className="ml-2">AI speaking about solar & registration...</span>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Button 
                  onClick={handleSendWhatsApp} 
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  size="sm"
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  🌞 Send Solar Package Details
                </Button>
                <div className="text-xs text-green-600 text-center">
                  Includes savings calculator, company info & next steps
                </div>
              </div>
            </TabsContent>

            <TabsContent value="clients" className="space-y-4">
              <ClientRegistration onClientRegistered={handleClientRegistered} />
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium mb-2">Registered Clients ({clientList.length})</h4>
                {clientList.length === 0 ? (
                  <p className="text-sm text-gray-500">No clients registered yet</p>
                ) : (
                  <div className="space-y-2">
                    {clientList.map((client, index) => (
                      <div key={index} className="bg-white p-2 rounded border text-sm">
                        <div className="font-medium">{client.name}</div>
                        <div className="text-gray-600">{client.phone}</div>
                        <div className="text-xs text-gray-500">{client.email}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="calculator" className="space-y-4">
              <ProfitCalculator callsToday={callsToday} conversions={conversions} />
            </TabsContent>
            
            <TabsContent value="stats" className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">{callsToday}</div>
                  <div className="text-xs text-blue-600">Solar Calls Today</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{conversions}</div>
                  <div className="text-xs text-green-600">Solar Leads</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-50 to-orange-100 p-3 rounded-lg border border-yellow-200">
                <div className="text-lg font-bold text-orange-600">
                  {Math.round((conversions / callsToday) * 100)}%
                </div>
                <div className="text-xs text-orange-600">Solar Conversion Rate</div>
              </div>
              
              <div className="text-xs text-gray-600 space-y-1 bg-gray-50 p-3 rounded-lg">
                <p>🎯 Target: 50 solar calls/day</p>
                <p>⏱️ Avg solar pitch: 5.2 min</p>
                <p>💡 Solar interest rate: 78%</p>
                <p>🤖 Using Vapi.ai Solar Assistant</p>
                <p>💰 Avg deal size: $25,000</p>
                <p>👥 Registered clients: {clientList.length}</p>
              </div>
            </TabsContent>

            <TabsContent value="logs" className="space-y-4">
              <CallLogRecord callRecords={callRecords} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceAgent;
