"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Connection,
  Edge,
  Node,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Play, Save, Settings, Plus, TerminalSquare, Bot, KeyRound, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

// Custom Nodes imports
import InputNode from "@/components/nodes/InputNode";
import LLMNode from "@/components/nodes/LLMNode";
import ToolNode from "@/components/nodes/ToolNode";

const nodeTypes = {
  inputNode: InputNode,
  llmNode: LLMNode,
  toolNode: ToolNode,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export default function AutomationPipeline() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowInstance) return;

      const type = event.dataTransfer.getData("application/reactflow");
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground overflow-hidden">
      {/* Top Navbar */}
      <header className="flex h-14 items-center justify-between border-b border-border px-4 lg:px-6">
        <div className="flex items-center gap-2">
          <TerminalSquare className="h-6 w-6" />
          <span className="font-semibold tracking-tight text-lg">Automation Pipeline</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Save className="h-4 w-4" /> Save
          </Button>
          <Button variant="default" size="sm" className="gap-2">
            <Play className="h-4 w-4 fill-current" /> Run Pipeline
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar Toolbar */}
        <aside className="w-64 border-r border-border bg-card/50 p-4 flex flex-col gap-6 overflow-y-auto">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">General</h3>
            <div className="grid gap-2">
              <div
                className="flex items-center gap-3 p-3 rounded-md border border-border bg-background cursor-grab hover:border-foreground/50 transition-colors"
                onDragStart={(event) => {
                  event.dataTransfer.setData("application/reactflow", "inputNode");
                  event.dataTransfer.effectAllowed = "move";
                }}
                draggable
              >
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm font-medium">Input</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">LLMs</h3>
            <div className="grid gap-2">
              <div
                className="flex items-center gap-3 p-3 rounded-md border border-border bg-background cursor-grab hover:border-foreground/50 transition-colors"
                onDragStart={(event) => {
                  event.dataTransfer.setData("application/reactflow", "llmNode");
                  event.dataTransfer.effectAllowed = "move";
                }}
                draggable
              >
                <Bot className="h-4 w-4" />
                <span className="text-sm font-medium">LLM Request</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Integrations</h3>
            <div className="grid gap-2">
              <div
                className="flex items-center gap-3 p-3 rounded-md border border-border bg-background cursor-grab hover:border-foreground/50 transition-colors"
                onDragStart={(event) => {
                  event.dataTransfer.setData("application/reactflow", "toolNode");
                  event.dataTransfer.effectAllowed = "move";
                }}
                draggable
              >
                <KeyRound className="h-4 w-4" />
                <span className="text-sm font-medium">Google Docs</span>
              </div>
              <div
                className="flex items-center gap-3 p-3 rounded-md border border-border bg-background cursor-grab hover:border-foreground/50 transition-colors"
                onDragStart={(event) => {
                  event.dataTransfer.setData("application/reactflow", "toolNode");
                  event.dataTransfer.effectAllowed = "move";
                }}
                draggable
              >
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm font-medium">Discord</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Canvas Area */}
        <main className="flex-1 relative" ref={reactFlowWrapper}>
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
              fitView
              className="bg-background"
              proOptions={{ hideAttribution: true }}
            >
              <Background color="oklch(0.5 0 0)" gap={24} size={1} />
              <Controls className="fill-foreground text-foreground" />
            </ReactFlow>
          </ReactFlowProvider>
        </main>
      </div>
    </div>
  );
}
