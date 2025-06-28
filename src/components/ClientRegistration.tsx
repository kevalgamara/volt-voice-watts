
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, Phone, Mail, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ClientRegistrationProps {
  onClientRegistered: (client: any) => void;
}

const ClientRegistration: React.FC<ClientRegistrationProps> = ({ onClientRegistered }) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const { toast } = useToast();

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/[^\d+]/g, '');
    if (cleaned && !cleaned.startsWith('+')) {
      return '+' + cleaned;
    }
    return cleaned;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\+[1-9]\d{6,14}$/;
    return phoneRegex.test(phone);
  };

  const handleRegisterClient = () => {
    if (!clientName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter the client's name",
        variant: "destructive",
      });
      return;
    }

    if (!validatePhoneNumber(clientPhone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid international phone number in E.164 format",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(clientEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    const newClient = {
      name: clientName.trim(),
      phone: clientPhone,
      email: clientEmail.trim(),
      registeredAt: new Date().toISOString(),
    };

    onClientRegistered(newClient);

    // Reset form
    setClientName('');
    setClientPhone('');
    setClientEmail('');

    toast({
      title: "Client Registered Successfully!",
      description: `${newClient.name} has been added to your solar client list`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <UserPlus className="h-5 w-5 text-green-500" />
          <span>Register New Solar Client</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-gray-500" />
            <Input
              placeholder="Client Full Name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-gray-500" />
            <Input
              placeholder="Phone: +12345678901"
              value={clientPhone}
              onChange={(e) => setClientPhone(formatPhoneNumber(e.target.value))}
              type="tel"
              className="flex-1"
            />
          </div>
          <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
            Use international format: +[country code][number]
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-gray-500" />
            <Input
              placeholder="Email Address"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              type="email"
              className="flex-1"
            />
          </div>
        </div>

        <Button 
          onClick={handleRegisterClient}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Register Solar Client
        </Button>

        <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
          <p>💡 <strong>Benefits of Client Registration:</strong></p>
          <p>• Automated follow-up calls with AI agent</p>
          <p>• Personalized solar savings calculations</p>
          <p>• WhatsApp integration for instant updates</p>
          <p>• Track conversion rates and profits</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientRegistration;
