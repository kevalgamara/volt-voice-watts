
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, MessageSquare, Users, Mic, MicOff, Volume2, VolumeX, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CompanyDetailBar from "./CompanyDetailBar";
import CallLogRecord from "./CallLogRecord";

const VoiceAgent = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callsToday, setCallsToday] = useState(23);
  const [conversions, setConversions] = useState(7);
  const [currentMessage, setCurrentMessage] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [vapiApiKey, setVapiApiKey] = useState('');
  const [showVapiSettings, setShowVapiSettings] = useState(false);
  const [currentCall, setCurrentCall] = useState<any>(null);
  const { toast } = useToast();

  // Vapi.ai Assistant ID
  const VAPI_ASSISTANT_ID = '448258e3-a332-4c2b-8346-d51f06e0ec77';

  // Call log records state
  const [callRecords, setCallRecords] = useState([
    {
      id: '1',
      clientName: 'John Smith',
      phoneNumber: '+1 (555) 123-4567',
      duration: '4:32',
      status: 'completed' as const,
      timestamp: '2 hours ago',
      notes: 'Interested in solar installation'
    },
    {
      id: '2',
      clientName: 'Sarah Johnson',
      phoneNumber: '+1 (555) 987-6543',
      duration: '2:18',
      status: 'converted' as const,
      timestamp: '5 hours ago',
      notes: 'Scheduled consultation'
    },
    {
      id: '3',
      clientName: 'Mike Wilson',
      phoneNumber: '+1 (555) 456-7890',
      duration: '0:45',
      status: 'missed' as const,
      timestamp: '1 day ago',
      notes: 'No answer'
    }
  ]);

  const handleStartCall = async () => {
    if (!vapiApiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Vapi.ai API key in settings",
        variant: "destructive",
      });
      return;
    }

    if (!whatsappNumber) {
      toast({
        title: "Phone Number Required",
        description: "Please enter the prospect's phone number",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Starting Vapi.ai call with assistant:', VAPI_ASSISTANT_ID);
      
      const callPayload = {
        assistantId: VAPI_ASSISTANT_ID,
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
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to start call');
      }

      const callData = await response.json();
      console.log('Vapi.ai call started:', callData);
      
      setCurrentCall(callData);
      setIsRecording(true);
      setIsSpeaking(true);
      
      toast({
        title: "Vapi.ai Call Started",
        description: `Solar AI agent is calling ${whatsappNumber}`,
      });
      
      // Add to call records
      const newRecord = {
        id: callData.id || Date.now().toString(),
        clientName: 'New Prospect',
        phoneNumber: whatsappNumber,
        duration: '0:00',
        status: 'completed' as const,
        timestamp: 'Just now',
        notes: 'Vapi.ai automated solar consultation'
      };
      setCallRecords(prev => [newRecord, ...prev]);
      setCallsToday(prev => prev + 1);

      // Monitor call status
      monitorCallStatus(callData.id);
      
    } catch (error) {
      console.error('Vapi.ai call failed:', error);
      toast({
        title: "Call Failed",
        description: error instanceof Error ? error.message : "Please check your API key and try again",
        variant: "destructive",
      });
    }
  };

  const monitorCallStatus = async (callId: string) => {
    // Simulate call monitoring
    setTimeout(() => {
      setCurrentMessage("Hello! I'm calling from SolarPro AI about solar energy solutions for your home...");
    }, 3000);

    setTimeout(() => {
      setIsSpeaking(false);
      setCurrentMessage("Call in progress - discussing solar benefits and savings...");
    }, 8000);

    setTimeout(() => {
      handleEndCall();
    }, 30000); // Auto-end after 30 seconds for demo
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
      title: "Call Ended",
      description: "Solar consultation completed",
    });
  };

  const handleSendWhatsApp = () => {
    if (!whatsappNumber) {
      toast({
        title: "Phone Number Required",
        description: "Please enter the prospect's WhatsApp number",
        variant: "destructive",
      });
      return;
    }

    const message = `Hi! Thank you for your interest in solar energy. Here are our company details:

🌞 SolarPro AI - Your Solar Energy Partner
📞 Call us: (555) 123-SOLAR
🌐 Website: www.solarpro-ai.com
📍 Local installation team in your area

💰 Benefits we discussed:
• Save up to 90% on electricity bills
• $0 down financing available
• 25-year warranty included
• Increase home value by 15%

Ready to start your solar journey? Reply to schedule your free home assessment!`;

    console.log("Sending WhatsApp to:", whatsappNumber);
    console.log("Message:", message);
    
    toast({
      title: "WhatsApp Sent!",
      description: `Company details sent to ${whatsappNumber}`,
    });
    
    setConversions(prev => prev + 1);
    setWhatsappNumber('');
  };

  const handleSaveCompanyDetails = (details: any) => {
    console.log('Company details saved:', details);
    // Here you would typically save to a database
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-96 shadow-2xl border-2 border-blue-200 max-h-[80vh] overflow-y-auto">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-blue-500" />
              <span>Solar AI Agent</span>
            </span>
            <div className="flex items-center space-x-2">
              <Badge variant={isRecording ? "default" : "secondary"}>
                {isRecording ? "Active" : "Standby"}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowVapiSettings(!showVapiSettings)}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Vapi.ai Settings */}
          {showVapiSettings && (
            <div className="space-y-2 border-b pb-4">
              <Input
                placeholder="Enter Vapi.ai API Key"
                value={vapiApiKey}
                onChange={(e) => setVapiApiKey(e.target.value)}
                type="password"
              />
              <div className="text-xs text-gray-500 space-y-1">
                <p>Assistant ID: {VAPI_ASSISTANT_ID}</p>
                <p>Enter your Vapi.ai API key for automated calls</p>
                <a 
                  href={`https://dashboard.vapi.ai/assistants/${VAPI_ASSISTANT_ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline block"
                >
                  View Assistant Dashboard →
                </a>
              </div>
            </div>
          )}

          <Tabs defaultValue="agent" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="agent">Agent</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="agent" className="space-y-4">
              {/* Company Details Bar */}
              <CompanyDetailBar onSave={handleSaveCompanyDetails} />

              {/* Phone Number Input */}
              <div className="space-y-2">
                <Input
                  placeholder="Prospect's phone number (e.g., +1234567890)"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  type="tel"
                />
              </div>

              {/* Call Controls */}
              <div className="flex space-x-2">
                <Button 
                  onClick={isRecording ? handleEndCall : handleStartCall}
                  className={`flex-1 ${isRecording ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
                  size="sm"
                >
                  {isRecording ? (
                    <>
                      <MicOff className="h-4 w-4 mr-1" />
                      End Call
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4 mr-1" />
                      Start Call
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm">
                  {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>

              {/* Current Message */}
              {currentMessage && (
                <div className="bg-blue-50 p-3 rounded-lg border">
                  <p className="text-sm text-blue-800 font-medium mb-1">AI Agent:</p>
                  <p className="text-sm text-gray-700">{currentMessage}</p>
                </div>
              )}

              {/* WhatsApp Integration */}
              <div className="space-y-2">
                <Button 
                  onClick={handleSendWhatsApp} 
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Send Company Details
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="stats" className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{callsToday}</div>
                  <div className="text-xs text-gray-600">Calls Today</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{conversions}</div>
                  <div className="text-xs text-gray-600">Conversions</div>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="text-lg font-bold text-yellow-600">
                  {Math.round((conversions / callsToday) * 100)}%
                </div>
                <div className="text-xs text-gray-600">Conversion Rate</div>
              </div>
              
              <div className="text-xs text-gray-500 space-y-1">
                <p>• Target: 50 calls/day</p>
                <p>• Average talk time: 4.2 min</p>
                <p>• Interest rate: 68%</p>
                <p>• Using Vapi.ai Assistant</p>
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
