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
import { vapiService } from "../services/vapiService";

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

  const solarScript = {
    introduction: "Hi! I'm calling from SolarPro AI, your local solar energy specialist. I hope I'm catching you at a good time. We've been helping homeowners in your area save thousands on their electricity bills with solar panels. Have you ever considered going solar for your home?",
    
    benefits: [
      "Did you know that solar panels can reduce your electricity bill by up to 90%? That's potentially thousands of dollars in savings every year!",
      "Solar panels actually increase your home's value by about 15% on average. It's like getting a return on your investment while saving money monthly.",
      "With our current financing options, most homeowners start saving money from day one - no upfront costs required!",
      "Solar panels come with a 25-year warranty, so you're guaranteed decades of clean, free energy from the sun."
    ],
    
    objectionHandlers: {
      expensive: "I completely understand that concern! The great news is that solar is more affordable than ever. With federal tax credits and our financing options, most families actually save money from month one. Would you like me to calculate potential savings for your specific home?",
      maintenance: "That's a common question! Solar panels are incredibly low maintenance - they're designed to withstand all weather conditions. Most only need a simple rinse with water once or twice a year. The warranty covers everything else for 25 years!",
      cloudy: "Great question! Solar panels actually work on cloudy days too - they just produce a bit less energy. Plus, any excess energy you generate on sunny days gets stored in the grid, giving you credits for later use!"
    }
  };

  const handleStartCall = async () => {
    if (vapiApiKey && whatsappNumber) {
      try {
        vapiService.setApiKey(vapiApiKey);
        const callResponse = await vapiService.initiateCall({
          phoneNumber: whatsappNumber,
          customerName: 'Prospect',
          companyName: 'SolarPro AI'
        });
        
        setCurrentCall(callResponse);
        setIsRecording(true);
        setIsSpeaking(true);
        
        toast({
          title: "Vapi.ai Call Started",
          description: `AI agent is calling ${whatsappNumber}`,
        });
        
        // Add to call records
        const newRecord = {
          id: callResponse.id,
          clientName: 'New Prospect',
          phoneNumber: whatsappNumber,
          duration: '0:00',
          status: 'completed' as const,
          timestamp: 'Just now',
          notes: 'Vapi.ai automated call'
        };
        setCallRecords(prev => [newRecord, ...prev]);
        setCallsToday(prev => prev + 1);
        
      } catch (error) {
        console.error('Vapi.ai call failed:', error);
        toast({
          title: "Call Failed",
          description: "Please check your Vapi.ai API key and try again",
          variant: "destructive",
        });
      }
    } else {
      // Fallback to simulation
      setIsRecording(true);
      setIsSpeaking(true);
      
      toast({
        title: "AI Agent Active",
        description: "Starting solar consultation call...",
      });
      
      setTimeout(() => {
        setIsSpeaking(false);
        setCurrentMessage(solarScript.introduction);
      }, 2000);
    }
  };

  const handleEndCall = () => {
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
              <p className="text-xs text-gray-500">
                Enter your Vapi.ai API key for automated calls
              </p>
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
                <Input
                  placeholder="Prospect's WhatsApp number"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  type="tel"
                />
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
