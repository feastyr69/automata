from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Automation Pipeline API")

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For development, allow all. In production, restrict to frontend domain.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NodeData(BaseModel):
    label: str
    systemPrompt: Optional[str] = None
    query: Optional[str] = None
    provider: Optional[str] = None
    model: Optional[str] = None
    temperature: Optional[float] = None
    maxTokens: Optional[int] = None

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: NodeData
    measured: Optional[Dict[str, float]] = None

class Edge(BaseModel):
    id: str
    source: str
    target: str

class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.post("/api/run-pipeline")
async def run_pipeline(request: PipelineRequest):
    print(f"Received pipeline execution request with {len(request.nodes)} nodes and {len(request.edges)} edges.")
    
    # Placeholder for actual graph traversal and execution
    # In Phase 3, this will be replaced with LangGraph logic
    
    return {
        "status": "success",
        "message": "Pipeline execution started successfully (Mock).",
        "nodes_received": len(request.nodes),
        "edges_received": len(request.edges)
    }

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}
