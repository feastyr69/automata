import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MessageSquare } from "lucide-react";

export default function InputNode({ data }: { data: any }) {
  return (
    <Card className="w-80 border-border bg-card text-card-foreground shadow-sm">
      <CardHeader className="flex flex-row items-center space-y-0 p-4 pb-2">
        <MessageSquare className="h-4 w-4 mr-2" />
        <CardTitle className="text-sm font-medium">Input Node</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="grid gap-2">
          <Label htmlFor="input-field" className="text-xs text-muted-foreground">User Query</Label>
          <Input id="input-field" placeholder="Enter the starting prompt..." className="h-8 text-sm" />
        </div>
      </CardContent>
      {/* Output handle only since it's the start of the pipeline */}
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-primary" />
    </Card>
  );
}
