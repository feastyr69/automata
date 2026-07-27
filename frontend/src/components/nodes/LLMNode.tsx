import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bot } from "lucide-react";

export default function LLMNode({ data }: { data: any }) {
  return (
    <Card className="w-80 border-border bg-card text-card-foreground shadow-sm">
      <CardHeader className="flex flex-row items-center space-y-0 p-4 pb-2">
        <Bot className="h-4 w-4 mr-2" />
        <CardTitle className="text-sm font-medium">LLM Request</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2 grid gap-4">
        <div className="grid gap-2">
          <Label className="text-xs text-muted-foreground">Provider</Label>
          <Select defaultValue="groq">
            <SelectTrigger className="h-8 text-sm">
              <SelectValue placeholder="Select provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="groq">Groq (Llama 3)</SelectItem>
              <SelectItem value="gemini">Google AI Studio (Gemini)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label className="text-xs text-muted-foreground">System Prompt</Label>
          <Input placeholder="You are a helpful assistant..." className="h-8 text-sm" />
        </div>
      </CardContent>
      {/* Both input and output handles */}
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-primary" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-primary" />
    </Card>
  );
}
