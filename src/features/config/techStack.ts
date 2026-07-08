import { Atom, Globe, Wind, GitBranch, Sparkles, LayoutGrid, ChartColumn, Shapes, FileCode2 } from "lucide-react";
import type { TechStack } from "../model/types";

export const techStack:TechStack[] = [
    {icon: Atom, label: "React"},
    {icon: FileCode2, label: "TypeScript"},
    {icon: Wind, label: "Tailwind CSS"},
    {icon: LayoutGrid, label: "Radix UI"},
    {icon: ChartColumn, label: "Recharts"},
    {icon: Shapes, label: "Lucide React"},
    {icon: GitBranch, label: "GitHub"},
    {icon: Sparkles, label: "Gemini API"},
    {icon: Globe, label: "Exchange API"}
    
]