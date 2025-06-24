
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Building, Phone, Upload, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CompanyDetails {
  companyName: string;
  phoneNumber: string;
  uploadedFile?: File;
}

interface CompanyDetailBarProps {
  onSave: (details: CompanyDetails) => void;
}

const CompanyDetailBar: React.FC<CompanyDetailBarProps> = ({ onSave }) => {
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully`,
      });
    }
  };

  const handleSave = () => {
    if (!companyName || !phoneNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in both company name and phone number",
        variant: "destructive",
      });
      return;
    }

    const details: CompanyDetails = {
      companyName,
      phoneNumber,
      uploadedFile: uploadedFile || undefined,
    };

    onSave(details);
    
    toast({
      title: "Company Details Saved",
      description: "Company information has been saved successfully",
    });
  };

  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Building className="h-5 w-5" />
          <span>Company Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company-name">Company Name</Label>
            <Input
              id="company-name"
              placeholder="Enter company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone-number">Phone Number</Label>
            <Input
              id="phone-number"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="tel"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="file-upload">Upload File</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="file-upload"
              type="file"
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.txt,.csv"
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('file-upload')?.click()}
              className="flex items-center space-x-2"
            >
              <Upload className="h-4 w-4" />
              <span>{uploadedFile ? uploadedFile.name : 'Choose File'}</span>
            </Button>
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          <Save className="h-4 w-4 mr-2" />
          Save Company Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default CompanyDetailBar;
