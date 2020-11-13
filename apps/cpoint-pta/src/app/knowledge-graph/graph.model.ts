import { SimulationLinkDatum, SimulationNodeDatum } from 'd3';

export interface GraphData {
    nodes: GraphNode[];
    links: GraphLink[];
  }
  
  export interface GraphNode extends SimulationNodeDatum {
    id: string;
    name: string;
    label: string;
    group: number;
  }
  
  export interface GraphLink extends SimulationLinkDatum<GraphNode>  {
    source: string;
    target: string;
    value: number;
  }

  export enum GraphLabelEnum  {
    Pathway,
    Anatomy,
    PharmacologicClass,
    Gene,
    Symptom,
    BiologicalProcess,
    Disease,
    Compound,
    CellularComponent,
    SideEffect,
    MolecularFunction
  }
