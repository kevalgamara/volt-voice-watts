
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Phone, Clock, User, CheckCircle, XCircle } from "lucide-react";

interface CallRecord {
  id: string;
  clientName: string;
  phoneNumber: string;
  duration: string;
  status: 'completed' | 'missed' | 'converted';
  timestamp: string;
  notes?: string;
}

interface CallLogRecordProps {
  callRecords: CallRecord[];
}

const CallLogRecord: React.FC<CallLogRecordProps> = ({ callRecords }) => {
  const getStatusIcon = (status: CallRecord['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'converted':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'missed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Phone className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: CallRecord['status']) => {
    const variants = {
      completed: 'default',
      converted: 'default',
      missed: 'destructive'
    } as const;

    return (
      <Badge variant={variants[status]} className="capitalize">
        {status}
      </Badge>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Phone className="h-5 w-5" />
          <span>Call Log Records</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {callRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span>{record.clientName}</span>
                </TableCell>
                <TableCell>{record.phoneNumber}</TableCell>
                <TableCell className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{record.duration}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(record.status)}
                    {getStatusBadge(record.status)}
                  </div>
                </TableCell>
                <TableCell>{record.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {callRecords.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No call records found
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CallLogRecord;
