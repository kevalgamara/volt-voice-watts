
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sun, Phone, MessageSquare, Users, Zap, DollarSign, Leaf, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AuthModal from "@/components/AuthModal";
import VoiceAgent from "@/components/VoiceAgent";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const { toast } = useToast();

  const solarBenefits = [
    {
      icon: <DollarSign className="h-8 w-8 text-yellow-500" />,
      title: "Save Money",
      description: "Reduce your electricity bills by up to 90% and lock in energy costs for 25+ years"
    },
    {
      icon: <Leaf className="h-8 w-8 text-green-500" />,
      title: "Go Green",
      description: "Reduce your carbon footprint and contribute to a cleaner environment"
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      title: "Energy Independence",
      description: "Generate your own clean energy and reduce dependence on the grid"
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-500" />,
      title: "Increase Home Value",
      description: "Solar panels can increase your property value by up to 15%"
    }
  ];

  const handleGetStarted = () => {
    setShowAuth(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Sun className="h-8 w-8 text-yellow-500" />
            <span className="text-2xl font-bold text-gray-800">SolarPro AI</span>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Phone className="h-4 w-4 mr-1" />
              AI Agent Active
            </Badge>
            <Button onClick={handleGetStarted} className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent">
            Transform Your Home with Solar Energy
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Our AI-powered solar consultants are ready to help you save thousands on electricity bills 
            while contributing to a sustainable future. Get personalized recommendations 24/7.
          </p>
          <div className="flex justify-center space-x-4 mb-12">
            <Button size="lg" onClick={handleGetStarted} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
              <MessageSquare className="mr-2 h-5 w-5" />
              Talk to AI Agent
            </Button>
            <Button size="lg" variant="outline" onClick={handleGetStarted}>
              <Phone className="mr-2 h-5 w-5" />
              Schedule Call
            </Button>
          </div>
        </div>
      </section>

      {/* Solar Benefits */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Solar Energy?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solarBenefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">{benefit.icon}</div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Agent Features */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-yellow-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">AI-Powered Solar Consultation</h2>
            <p className="text-xl text-gray-600">Our intelligent agent provides personalized solar solutions</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Phone className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <CardTitle>Smart Calling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">AI agent makes up to 50 calls daily, engaging prospects with friendly, human-like conversations</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <CardTitle>WhatsApp Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Interested prospects receive company details and consultation booking via WhatsApp</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <CardTitle>Human-like Interaction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Natural conversations that educate prospects about solar benefits and financing options</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our AI Agent Results</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Daily Calls</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">85%</div>
              <div className="text-gray-600">Engagement Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-600 mb-2">30%</div>
              <div className="text-gray-600">Conversion Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-yellow-500 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Saving with Solar?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of homeowners who have reduced their electricity bills by up to 90%
          </p>
          <Button size="lg" onClick={handleGetStarted} className="bg-white text-blue-600 hover:bg-gray-100">
            Start Your Solar Journey
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sun className="h-6 w-6 text-yellow-500" />
            <span className="text-xl font-bold">SolarPro AI</span>
          </div>
          <p className="text-gray-400 mb-4">Powering homes with clean, affordable solar energy</p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <span>AI-Powered Consultations</span>
            <span>•</span>
            <span>24/7 Support</span>
            <span>•</span>
            <span>Free Solar Analysis</span>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuth && (
        <AuthModal 
          isOpen={showAuth} 
          onClose={() => setShowAuth(false)}
          onAuthenticated={() => {
            setIsAuthenticated(true);
            setShowAuth(false);
          }}
        />
      )}

      {/* Voice Agent */}
      {isAuthenticated && <VoiceAgent />}
    </div>
  );
};

export default Index;
