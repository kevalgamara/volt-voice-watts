
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageSquare, Users, Zap, DollarSign, Leaf, Shield, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AuthModal from "@/components/AuthModal";
import VoiceAgent from "@/components/VoiceAgent";
import Logo from "@/components/Logo";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const { toast } = useToast();

  const solarBenefits = [
    {
      icon: <Leaf className="h-8 w-8 text-green-500" />,
      title: "Go Green",
      description: "Reduce your carbon footprint and contribute to a cleaner environment"
    },
    {
      icon: <DollarSign className="h-8 w-8 text-yellow-500" />,
      title: "Save Money",
      description: "Reduce your electricity bills by up to 90% and lock in energy costs for 25+ years"
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-500" />,
      title: "Increase Home Value",
      description: "Solar panels can increase your property value by up to 15%"
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      title: "Energy Independence",
      description: "Generate your own clean energy and reduce dependence on the grid"
    }
  ];

  const handleGetStarted = () => {
    setShowAuth(true);
  };

  const handleDownloadAPK = () => {
    toast({
      title: "APK Download",
      description: "To generate the APK, please export this project to GitHub, then follow the mobile app setup instructions.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo size="md" />
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Phone className="h-4 w-4 mr-1" />
              AI Agent Active
            </Badge>
            <Button onClick={handleDownloadAPK} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Get APK
            </Button>
            <Button onClick={handleGetStarted} className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Stats Section - Moved to top */}
      <section className="py-12 px-4 bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Our AI Agent Performance</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-sm opacity-90">Daily Calls</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-2">85%</div>
              <div className="text-sm opacity-90">Engagement Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-2">30%</div>
              <div className="text-sm opacity-90">Conversion Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-90">Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section - Shuffled */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <Logo size="lg" showText={false} className="justify-center mb-4" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-500 bg-clip-text text-transparent">
            AI-Powered Solar Revolution
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your home with intelligent solar solutions. Our AI consultants provide 24/7 personalized 
            recommendations to help you save thousands while building a sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button size="lg" onClick={handleGetStarted} className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
              <MessageSquare className="mr-2 h-5 w-5" />
              Start AI Consultation
            </Button>
            <Button size="lg" variant="outline" onClick={handleGetStarted}>
              <Phone className="mr-2 h-5 w-5" />
              Book Expert Call
            </Button>
          </div>
        </div>
      </section>

      {/* AI Agent Features - Shuffled position */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Intelligent Solar Assistant</h2>
            <p className="text-xl text-gray-600">Advanced AI technology meets renewable energy expertise</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <CardTitle>Smart Conversations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">WhatsApp integration for seamless communication and instant solar consultations</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Phone className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <CardTitle>Automated Outreach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">AI makes up to 50 daily calls with natural, engaging conversations</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <CardTitle>Human-Like Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Natural interactions that educate about solar benefits and financing</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solar Benefits - Reordered */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Solar Energy Wins</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solarBenefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
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

      {/* CTA Section - Enhanced */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-blue-500 text-white">
        <div className="container mx-auto text-center">
          <Logo size="lg" showText={false} className="justify-center mb-6" />
          <h2 className="text-4xl font-bold mb-6">Ready to Go Solar?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of homeowners saving up to 90% on electricity bills
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" onClick={handleGetStarted} className="bg-white text-green-600 hover:bg-gray-100">
              Start Your Solar Journey
            </Button>
            <Button size="lg" onClick={handleDownloadAPK} variant="outline" className="border-white text-white hover:bg-white/10">
              <Download className="mr-2 h-5 w-5" />
              Download Mobile App
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <Logo size="sm" className="justify-center mb-4" />
          <p className="text-gray-400 mb-4">Powering homes with intelligent solar solutions</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <span>AI-Powered Consultations</span>
            <span>•</span>
            <span>24/7 Support</span>
            <span>•</span>
            <span>Free Solar Analysis</span>
            <span>•</span>
            <span>Mobile App Available</span>
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
