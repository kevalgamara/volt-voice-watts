
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sun, DollarSign, Leaf, Zap, Shield, TrendingUp } from "lucide-react";

const SolarBenefitsAgent = () => {
  const [currentBenefit, setCurrentBenefit] = useState(0);
  const [isPresenting, setIsPresenting] = useState(false);

  const solarBenefits = [
    {
      icon: <DollarSign className="h-8 w-8 text-green-500" />,
      title: "Massive Savings",
      script: "Let me tell you about the incredible savings solar can bring to your home. The average homeowner saves between $1,000 to $1,500 per year on electricity bills. Over 20 years, that's $20,000 to $30,000 in your pocket instead of the utility company's!",
      stats: "Average annual savings: $1,200-$1,500"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
      title: "Home Value Increase",
      script: "Did you know that solar panels increase your home's value? Studies show that homes with solar panels sell for about 4% more than comparable homes without solar. For a $400,000 home, that's an additional $16,000 in value!",
      stats: "Property value increase: 4-15%"
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-500" />,
      title: "Energy Security",
      script: "With solar panels, you're protecting yourself from rising electricity rates. While utility rates increase by 3-5% annually, your solar energy is locked in at the same rate for 25+ years. It's like having a hedge against inflation!",
      stats: "Rate lock: 25+ years guaranteed"
    },
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      title: "Environmental Impact",
      script: "By going solar, you're making a real difference for the environment. A typical home solar system eliminates 3-4 tons of carbon emissions annually - equivalent to planting over 100 trees every year!",
      stats: "CO2 reduction: 3-4 tons annually"
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "Government Incentives",
      script: "Right now is the best time to go solar! The federal solar tax credit allows you to deduct 30% of the cost of installing a solar energy system from your federal taxes. Plus, many states offer additional rebates and incentives.",
      stats: "Federal tax credit: 30% through 2032"
    }
  ];

  const handleStartPresentation = () => {
    setIsPresenting(true);
    setCurrentBenefit(0);
  };

  const handleNextBenefit = () => {
    if (currentBenefit < solarBenefits.length - 1) {
      setCurrentBenefit(prev => prev + 1);
    } else {
      setIsPresenting(false);
      setCurrentBenefit(0);
    }
  };

  const getCurrentBenefit = () => solarBenefits[currentBenefit];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Sun className="h-6 w-6 text-yellow-500" />
          <span>Solar Benefits Presentation</span>
          {isPresenting && (
            <Badge variant="default">
              {currentBenefit + 1} of {solarBenefits.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {!isPresenting ? (
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Ready to learn about the amazing benefits of solar energy? 
              Our AI agent will walk you through the top 5 reasons why solar is perfect for your home.
            </p>
            <Button onClick={handleStartPresentation} size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500">
              Start Solar Benefits Tour
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Current Benefit Display */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                {getCurrentBenefit().icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                {getCurrentBenefit().title}
              </h3>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-gray-700 leading-relaxed">
                  {getCurrentBenefit().script}
                </p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {getCurrentBenefit().stats}
              </Badge>
            </div>

            {/* Progress Indicator */}
            <div className="flex space-x-2 justify-center">
              {solarBenefits.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-8 rounded-full ${
                    index <= currentBenefit ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-center">
              <Button onClick={handleNextBenefit} size="lg">
                {currentBenefit === solarBenefits.length - 1 ? 'Complete Tour' : 'Next Benefit'}
              </Button>
            </div>
          </div>
        )}

        {/* Quick Benefits Summary */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-gray-800">Quick Solar Benefits:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              <span>Save $1,200+ annually</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <span>Increase home value 4-15%</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-purple-500" />
              <span>25-year rate protection</span>
            </div>
            <div className="flex items-center space-x-2">
              <Leaf className="h-4 w-4 text-green-600" />
              <span>Eliminate 3-4 tons CO2/year</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SolarBenefitsAgent;
