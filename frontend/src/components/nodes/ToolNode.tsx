import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { KeyRound, CheckCircle2 } from "lucide-react";

export default function ToolNode({ data }: { data: any }) {
  // A mock state for authentication to demonstrate the UI
  const isAuthenticated = false;

  return (
    <Card className="w-80 border-border bg-card text-card-foreground shadow-sm">
      <CardHeader className="flex flex-row items-center space-y-0 p-4 pb-2">
        <KeyRound className="h-4 w-4 mr-2" />
        <CardTitle className="text-sm font-medium">Integration Tool</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2 grid gap-4">
        {isAuthenticated ? (
          <div className="flex items-center text-xs text-green-500">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Authenticated
          </div>
        ) : (
          <Button variant="outline" size="sm" className="w-full text-xs h-8">
            Authenticate
          </Button>
        )}
        <div className="grid gap-2">
          <Label className="text-xs text-muted-foreground">Document / Channel ID</Label>
          <Input placeholder="Enter ID..." className="h-8 text-sm" />
        </div>
      </CardContent>
      {/* Input handle since it receives data to process or send to the tool */}
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-primary" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-primary" />
    </Card>
  );
}
