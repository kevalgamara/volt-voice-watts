
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calculator, DollarSign, TrendingUp, Zap, Phone } from "lucide-react";

interface ProfitCalculatorProps {
  callsToday: number;
  conversions: number;
}

const ProfitCalculator: React.FC<ProfitCalculatorProps> = ({ callsToday, conversions }) => {
  const [avgDealSize, setAvgDealSize] = useState(25000);
  const [commission, setCommission] = useState(8);
  const [monthlyCalls, setMonthlyCalls] = useState(1500);
  const [agentCost, setAgentCost] = useState(299);
  const [calculations, setCalculations] = useState({
    dailyProfit: 0,
    monthlyProfit: 0,
    yearlyProfit: 0,
    roi: 0,
    profitPerCall: 0,
    netProfit: 0
  });

  useEffect(() => {
    calculateProfits();
  }, [callsToday, conversions, avgDealSize, commission, monthlyCalls, agentCost]);

  const calculateProfits = () => {
    const conversionRate = callsToday > 0 ? conversions / callsToday : 0.3;
    const profitPerDeal = (avgDealSize * commission) / 100;
    
    // Daily calculations
    const dailyConversions = callsToday * conversionRate;
    const dailyRevenue = dailyConversions * profitPerDeal;
    const dailyAgentCost = agentCost / 30; // Monthly cost divided by 30 days
    const dailyProfit = dailyRevenue - dailyAgentCost;
    
    // Monthly calculations
    const monthlyConversions = monthlyCalls * conversionRate;
    const monthlyRevenue = monthlyConversions * profitPerDeal;
    const monthlyProfit = monthlyRevenue - agentCost;
    
    // Yearly calculations
    const yearlyProfit = monthlyProfit * 12;
    
    // ROI calculation
    const totalYearlyInvestment = agentCost * 12;
    const roi = totalYearlyInvestment > 0 ? ((yearlyProfit / totalYearlyInvestment) * 100) : 0;
    
    // Profit per call
    const profitPerCall = monthlyCalls > 0 ? monthlyProfit / monthlyCalls : 0;
    
    // Net profit (after all costs)
    const netProfit = yearlyProfit - totalYearlyInvestment;

    setCalculations({
      dailyProfit: Math.round(dailyProfit),
      monthlyProfit: Math.round(monthlyProfit),
      yearlyProfit: Math.round(yearlyProfit),
      roi: Math.round(roi),
      profitPerCall: profitPerCall,
      netProfit: Math.round(netProfit)
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-green-500" />
            <span>Solar AI Agent Profit Calculator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Input Parameters */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Average Deal Size ($)</label>
              <Input
                type="number"
                value={avgDealSize}
                onChange={(e) => setAvgDealSize(Number(e.target.value))}
                placeholder="25000"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Commission (%)</label>
              <Input
                type="number"
                value={commission}
                onChange={(e) => setCommission(Number(e.target.value))}
                placeholder="8"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Monthly Calls</label>
              <Input
                type="number"
                value={monthlyCalls}
                onChange={(e) => setMonthlyCalls(Number(e.target.value))}
                placeholder="1500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Agent Cost/Month ($)</label>
              <Input
                type="number"
                value={agentCost}
                onChange={(e) => setAgentCost(Number(e.target.value))}
                placeholder="299"
              />
            </div>
          </div>

          <Button onClick={calculateProfits} className="w-full bg-gradient-to-r from-green-500 to-blue-500">
            <Calculator className="h-4 w-4 mr-2" />
            Recalculate Profits
          </Button>
        </CardContent>
      </Card>

      {/* Profit Results */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">
              ${calculations.dailyProfit.toLocaleString()}
            </div>
            <div className="text-sm text-green-600">Daily Profit</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">
              ${calculations.monthlyProfit.toLocaleString()}
            </div>
            <div className="text-sm text-blue-600">Monthly Profit</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <Zap className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">
              ${calculations.yearlyProfit.toLocaleString()}
            </div>
            <div className="text-sm text-purple-600">Yearly Profit</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4 text-center">
            <Phone className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">
              {calculations.roi}%
            </div>
            <div className="text-sm text-orange-600">ROI</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Detailed Profit Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Profit per Call:</span>
              <span className="font-medium">${calculations.profitPerCall.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Current Conversion Rate:</span>
              <span className="font-medium">
                {callsToday > 0 ? Math.round((conversions / callsToday) * 100) : 30}%
              </span>
            </div>
            <div className="flex justify-between">
              <span>Calls Today:</span>
              <span className="font-medium">{callsToday}</span>
            </div>
            <div className="flex justify-between">
              <span>Conversions Today:</span>
              <span className="font-medium">{conversions}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-semibold">Net Annual Profit:</span>
              <span className="font-bold text-green-600">
                ${calculations.netProfit.toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardContent className="p-4">
          <h4 className="font-semibold mb-2 text-orange-800">💡 Performance Insights</h4>
          <div className="text-sm text-orange-700 space-y-1">
            <p>• AI agent handles {monthlyCalls} calls/month automatically</p>
            <p>• Average solar deal: ${avgDealSize.toLocaleString()} @ {commission}% commission</p>
            <p>• Break-even point: {agentCost > 0 ? Math.ceil(agentCost / (calculations.profitPerCall || 1)) : 0} calls/month</p>
            <p>• Potential yearly income: ${(calculations.yearlyProfit + agentCost * 12).toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfitCalculator;
