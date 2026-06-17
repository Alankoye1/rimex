import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import ReactMarkdown from 'react-markdown';
const Markdown = ReactMarkdown;
// @ts-ignore
import html2pdf from 'html2pdf.js';
import {
  GraduationCap,
  Languages,
  MessageSquareText,
  History,
  X,
  Copy,
  Check,
  Loader2,
  ArrowLeftRight,
  SendHorizontal,
  RefreshCw,
  Trash2,
  ChevronDown,
  Download,
  Sparkles,
  Search,
  ArrowRight,
  ArrowLeft,
  Presentation,
  ShieldCheck,
  Timer,
  Crown,
  Target,
  Code,
  LayoutDashboard,
  Bell,
  Plus,
  Cpu,
  ChevronRight,
  ChevronLeft,
  MessageSquare,
  Bot,
  BrainCircuit,
  MessageSquare as MessageSquareIcon,
  Image as LucideImage,
  Mic,
  Video,
  Volume2,
  VolumeX,
  FileText,
  Upload,
  Play,
  ImagePlus,
  VideoIcon,
  Type,
  FileSearch,
  Quote,
  SpellCheck,
  CalendarDays,
  BookOpen,
  Moon,
  Sun,
  HelpCircle,
  Brain,
  User,
  Headset,
  Smile,
  Briefcase,
  CheckCircle2,
  Zap,
  Clock,
  Lightbulb,
  List,
  FlaskConical,
  Pen,
  Eye,
  Mic2,
  UserCheck,
  FileUser,
  Mail,
  Building,
  Landmark,
  MapPin,
  Atom,
  Activity,
  Dna,
  Beaker,
  Ruler,
  BarChart3,
  Palette,
  Music,
  LogOut,
  ExternalLink,
  Globe,
  Phone,
  MessageCircle,
  Send,
  ClipboardPaste,
  FileSearch as FileJson,
  Coffee,
  Network as GitGraph,
  Library,
  FileAudio,
  Microscope,
  Maximize,
  Minimize,
  ZoomIn,
  ZoomOut,
  ArrowDown,
  Megaphone,
  Users,
  ShoppingBag,
  TrendingUp,
  Database,
  Bug,
  FileCode,
  Key,
  PenTool,
  Pipette,
  Share2,
  Layout,
  Table,
  Eraser,
  PieChart,
  LineChart,
  Sigma,
  ClipboardCheck,
  Minimize2,
  Newspaper,
  UserPlus,
  Goal,
  Clapperboard,
  Map,
  Scale,
  Gavel,
  Calculator,
  Coins,
  TrendingDown,
  FileWarning,
  FileSignature,
  Lock,
  Shield,
  Orbit,
  Globe2,
  Terminal,
  Thermometer,
  Building2,
  Ghost,
  CloudMoon,
  Settings,
  Gamepad2,
  Siren,
  Users2,
  Book,
  RefreshCcw,
  SearchCode
} from 'lucide-react';

import { GoogleGenAI } from '@google/genai';

// پاڵپشتی هەردوو ژینگەی گۆگڵ ئەی ئای ستۆدیۆ و ژینگەی دەرەوە (وەک VS Code) دەکات
// @ts-ignore
const API_KEY = (typeof process !== 'undefined' && process.env && process.env.GEMINI_API_KEY) || (import.meta as any).env?.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenAI({ apiKey: API_KEY });

const callGeminiServer = async ({
  model,
  prompt,
  contents,
  systemInstruction,
  config,
}: {
  model: string;
  prompt?: string;
  contents?: any;
  systemInstruction?: string;
  config?: Record<string, any>;
}) => {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      contents: contents ?? [{ parts: [{ text: prompt || "" }] }],
      systemInstruction,
      config,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data?.error || 'Gemini request failed');
    (error as any).status = data?.status || response.status;
    (error as any).code = data?.code;
    throw error;
  }

  return data as { text?: string; candidates?: any; usageMetadata?: any };
};

import {
  auth,
  db,
  googleProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  User as FirebaseUser,
  handleFirestoreError,
  OperationType
} from './firebase';

import * as d3 from 'd3';

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}




const MODELS = {
  standard: "gemini-3.1-flash-lite",
  fast: "gemini-3.1-flash-lite",
  deep: "gemini-3.1-flash-lite",
  thinking: "gemini-3.1-flash-lite",
  image: "gemini-2.5-flash-image"
};

type Screen = 'home' | 'translator' | 'chat' | 'ultra-chat' | 'scholar' | 'multimodal' | 'academic-tools' | 'quiz' | 'admin' | 'history' | 'generators' | 'profile' | 'daily-goals' | 'pdf-chat' | 'citations' | 'pomodoro' | 'mindmap' | 'lecture-notes';
type MultiMode = 'image-to-text' | 'text-to-image' | 'voice-to-text' | 'video-to-text';
type AcademicTool = 'pdf-summarizer' | 'pdf-chat' | 'citation-generator' | 'grammar-checker' | 'study-planner' | 'ocr' | 'quiz-gen' | 'mind-map' | 'flashcards' | 'math-solver' | 'research-assistant' | 'lecture-notes' | 'paraphraser' | 'ai-detector' | 'exam-simulator' | 'bibliography-manager' | 'code-assistant' | 'vocab-extractor' | 'doc-compare' | 'multi-pdf' | 'dashboard' | 'translator-pro' | 'report-gen' | 'seminar-gen' | 'report-refine-beautiful' | 'seminar-refine-design' | 'seminar-refine-standard' | 'plagiarism-checker' | 'reference-manager' | 'gpa-calculator' | 'video-summarizer' | 'image-gen' | 'voice-assistant' | 'daily-goals' | 'profile' | 'formula-editor' | 'pdf-annotation' | 'audio-to-mindmap' | 'flashcard-spaced' | 'group-study' | 'exam-countdown' | 'handwriting-to-text' | 'code-debugger' | 'sentiment-analysis' | 'career-advisor' | 'learning-path' | 'debate-partner' | 'grammar-pro' | 'vocab-builder' | 'speed-reading' | 'focus-timer' | 'thesis-gen' | 'essay-outliner' | 'case-study' | 'lab-report' | 'creative-writing' | 'peer-review' | 'presentation-coach' | 'interview-prep' | 'resume-builder' | 'cover-letter' | 'internship-finder' | 'scholarship-search' | 'language-immersion' | 'cultural-guide' | 'history-timeline' | 'geography-explorer' | 'periodic-table' | 'physics-sim' | 'biology-diagram' | 'chemistry-reaction' | 'math-proof' | 'stats-calc' | 'philosophy-logic' | 'art-analyzer' | 'music-theory' | 'coding-ideas';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  mediaUrl?: string;
  mediaType?: string;
}

interface HistoryItem {
  id: string;
  type: string;
  title: string;
  content: string;
  timestamp: number;
}

interface Ad {
  active: boolean;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
}

const MindMap: React.FC<{ data: any; isDarkMode: boolean; onChange?: (newData: any) => void }> = ({ data, isDarkMode, onChange }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const zoomRef = useRef<any>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNode, setSelectedNode] = useState<any>(null);

  const handleZoom = (direction: 'in' | 'out' | 'reset') => {
    if (!svgRef.current || !zoomRef.current) return;
    const svg = d3.select(svgRef.current);

    if (direction === 'reset') {
      const width = containerRef.current?.clientWidth || 800;
      const height = containerRef.current?.clientHeight || 600;
      svg.transition().duration(750).call(
        zoomRef.current.transform,
        d3.zoomIdentity.translate(width / 2, height / 2).scale(0.8)
      );
    } else {
      svg.transition().duration(300).call(
        zoomRef.current.scaleBy,
        direction === 'in' ? 1.3 : 0.7
      );
    }
  };

  const downloadImage = () => {
    if (!svgRef.current) return;
    try {
      const svg = svgRef.current;
      const serializer = new XMLSerializer();
      let source = serializer.serializeToString(svg);

      if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
      }
      if (!source.match(/^<svg[^>]+xmlns\:xlink="http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
        source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
      }

      source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
      const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = 2; // High DPI
        canvas.width = svg.clientWidth * scale;
        canvas.height = svg.clientHeight * scale;
        const context = canvas.getContext("2d");
        if (context) {
          context.fillStyle = isDarkMode ? "#0f172a" : "#f8fafc";
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
          const pngUrl = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.href = pngUrl;
          downloadLink.download = `mindmap-${Date.now()}.png`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        }
      };
      img.src = url;
    } catch (e) {
      alert("ببوورە کێشەیەک لە داونلۆدکردنی وێنەکە ڕوویدا");
    }
  };

  useEffect(() => {
    if (!data || !svgRef.current) return;

    try {
      setError(null);
      const width = containerRef.current?.clientWidth || 800;
      const height = containerRef.current?.clientHeight || 600;
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      // Add Glow Filter
      const defs = svg.append("defs");
      const filter = defs.append("filter")
        .attr("id", "glow")
        .attr("x", "-20%")
        .attr("y", "-20%")
        .attr("width", "140%")
        .attr("height", "140%");

      filter.append("feGaussianBlur")
        .attr("stdDeviation", "3.5")
        .attr("result", "blur");

      filter.append("feComposite")
        .attr("in", "SourceGraphic")
        .attr("in2", "blur")
        .attr("operator", "over");

      const g = svg.append("g");
      const colorScale = d3.scaleOrdinal(["#38bdf8", "#818cf8", "#c084fc", "#fb7185", "#fb923c", "#4ade80"]);

      // Radial Tree Layout
      const tree = d3.tree()
        .size([2 * Math.PI, Math.min(width, height) / 1.4])
        .separation((a, b) => (a.parent === b.parent ? 1.2 : 2.2) / (a.depth || 1));

      const root = d3.hierarchy(data);

      const render = () => {
        tree(root);
        const nodes = root.descendants();
        const links = root.links();

        // Links with smooth curves and gradient strokes
        g.selectAll(".link")
          .data(links)
          .join("path")
          .attr("class", "link")
          .attr("fill", "none")
          .attr("stroke", (d: any) => colorScale(d.source.depth.toString()))
          .attr("stroke-opacity", (d: any) => 0.2 + (0.8 / (d.source.depth + 1)))
          .attr("stroke-width", (d: any) => Math.max(1, 4 - d.source.depth))
          .transition()
          .duration(800)
          .attr("d", d3.linkRadial()
            .angle((d: any) => d.x)
            .radius((d: any) => d.y) as any);

        // Nodes
        const node = g.selectAll(".node")
          .data(nodes)
          .join("g")
          .attr("class", "node")
          .attr("transform", (d: any) => `
            rotate(${d.x * 180 / Math.PI - 90})
            translate(${d.y},0)
          `)
          .style("cursor", "pointer")
          .on("mouseenter", function () {
            d3.select(this).select("circle").transition().duration(200).attr("r", (d: any) => (d.depth === 0 ? 25 : 18));
            d3.select(this).select("text").transition().duration(200).attr("font-size", (d: any) => (d.depth === 0 ? "24px" : "18px")).attr("font-weight", "900");
          })
          .on("mouseleave", function () {
            d3.select(this).select("circle").transition().duration(200).attr("r", (d: any) => (d.depth === 0 ? 20 : 12));
            d3.select(this).select("text").transition().duration(200).attr("font-size", (d: any) => (d.depth === 0 ? "20px" : "14px")).attr("font-weight", "bold");
          })
          .on("click", (event, d: any) => {
            setSelectedNode(d.data);
            if (d.children) {
              d._children = d.children;
              d.children = null;
            } else if (d._children) {
              d.children = d._children;
              d._children = null;
            }
            render();
          });

        node.selectAll("circle").remove();
        node.append("circle")
          .attr("r", (d: any) => d.depth === 0 ? 20 : 12)
          .attr("fill", (d: any) => isDarkMode ? "#0f172a" : "#fff")
          .attr("stroke", (d: any) => colorScale(d.depth.toString()))
          .attr("stroke-width", (d: any) => d.depth === 0 ? 5 : 3)
          .style("filter", "url(#glow)")
          .attr("class", "transition-all duration-300");

        node.selectAll("text").remove();
        node.append("text")
          .attr("dy", "0.31em")
          .attr("x", (d: any) => d.x < Math.PI === !d.children ? 22 : -22)
          .attr("text-anchor", (d: any) => d.x < Math.PI === !d.children ? "start" : "end")
          .attr("transform", (d: any) => d.x >= Math.PI ? "rotate(180)" : null)
          .text((d: any) => d.data.name)
          .attr("class", "select-none pointer-events-none font-bold tracking-tight")
          .attr("fill", (d: any) => {
            if (searchTerm && d.data.name.toLowerCase().includes(searchTerm.toLowerCase())) return "#ef4444";
            return isDarkMode ? "#f8fafc" : "#0f172a";
          })
          .attr("font-size", (d: any) => d.depth === 0 ? "20px" : "14px")
          .clone(true).lower()
          .attr("stroke", isDarkMode ? "#020617" : "#fff")
          .attr("stroke-width", 6)
          .attr("opacity", 0.9);

        // Add dot inside node
        node.append("circle")
          .attr("r", 4)
          .attr("fill", (d: any) => colorScale(d.depth.toString()))
          .attr("opacity", (d: any) => d.children || d._children ? 1 : 0.3);
      };

      render();

      const zoom = d3.zoom().scaleExtent([0.1, 10]).on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

      zoomRef.current = zoom;
      svg.call(zoom as any);
      svg.call(zoom.transform as any, d3.zoomIdentity.translate(width / 2, height / 2).scale(0.8));

    } catch (err: any) {
      console.error(err);
      setError("هەڵەیەک ڕوویدا لە کاتی دروستکردنی نەخشەکە");
    }
  }, [data, isDarkMode, searchTerm, isFullScreen]);

  return (
    <div ref={containerRef} className={`w-full transition-all duration-700 overflow-hidden relative group/mindmap ${isFullScreen ? 'fixed inset-0 z-[100] bg-slate-950' : 'h-[700px] bg-white dark:bg-slate-950/40 rounded-[4rem] border-8 border-sky-600/5 shadow-[0_0_50px_-12px_rgba(3,105,161,0.25)]'}`}>
      {/* Background Pulse Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-500/20 blur-[120px] rounded-full animate-pulse" />
      </div>

      <svg ref={svgRef} className="w-full h-full cursor-grab active:cursor-grabbing relative z-10" />

      <div className="absolute top-8 left-8 flex flex-col gap-4 z-20">
        <div className="flex gap-3">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-2 rounded-3xl border border-sky-500/20 shadow-2xl flex gap-2">
            <button onClick={() => handleZoom('in')} className="p-3 hover:bg-sky-500 hover:text-white rounded-2xl transition-all" title="Zoom In"><ZoomIn size={20} /></button>
            <button onClick={() => handleZoom('out')} className="p-3 hover:bg-sky-500 hover:text-white rounded-2xl transition-all" title="Zoom Out"><ZoomOut size={20} /></button>
            <div className="w-[1px] bg-slate-200 dark:bg-slate-800 mx-1" />
            <button onClick={() => handleZoom('reset')} className="p-3 hover:bg-emerald-500 hover:text-white rounded-2xl transition-all" title="Reset"><RefreshCw size={20} /></button>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-2 rounded-3xl border border-sky-500/20 shadow-2xl flex gap-2">
            <button onClick={downloadImage} className="p-3 hover:bg-sky-500 hover:text-white rounded-2xl transition-all" title="Download PNG"><Download size={20} /></button>
            <button onClick={() => setIsFullScreen(!isFullScreen)} className={`p-3 rounded-2xl transition-all ${isFullScreen ? 'bg-red-500 text-white' : 'hover:bg-orange-500 hover:text-white'}`}>
              {isFullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl px-6 py-4 rounded-3xl border border-sky-500/20 shadow-2xl flex items-center gap-4 w-64 group-within:w-80 transition-all">
          <Search size={22} className="text-sky-500" />
          <input
            type="text"
            placeholder="گەڕان لە نەخشەدا..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none text-sm font-black w-full text-right placeholder:opacity-40"
          />
        </div>
      </div>

      <div className="absolute bottom-8 left-8 pointer-events-none z-20">
        <div className="bg-sky-500/10 backdrop-blur-xl px-5 py-2 rounded-2xl text-[10px] font-black tracking-[0.2em] text-sky-500 uppercase">
          AI Neural Mapping v3.0
        </div>
      </div>

      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute top-8 right-8 w-72 bg-white/90 dark:bg-slate-900/90 backdrop-blur-3xl p-6 rounded-[2.5rem] border-2 border-sky-500/20 shadow-3xl z-30"
          >
            <button onClick={() => setSelectedNode(null)} className="absolute top-4 left-4 p-2 hover:bg-red-500/10 text-red-500 rounded-xl transition-all"><X size={16} /></button>
            <h4 className="text-lg font-black text-sky-500 mb-2 mt-2">{selectedNode.name}</h4>
            <p className="text-[10px] font-bold opacity-60 leading-relaxed">
              ئەمە بەشێکە لە پێکهاتەی نەخشەی مێشکەکە. دەتوانیت کلیکی لێ بکەیت بۆ شاردنەوە یان نیشاندانی لقەکانی تر.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/5 space-y-2">
              <button
                onClick={() => {
                  const newName = prompt('ناوی لقی نوێ بنووسە:');
                  if (newName) {
                    const addNode = (node: any) => {
                      if (node.name === selectedNode.name) {
                        if (!node.children) node.children = [];
                        node.children.push({ name: newName });
                        return true;
                      }
                      if (node.children) {
                        for (let child of node.children) {
                          if (addNode(child)) return true;
                        }
                      }
                      return false;
                    };
                    const newData = { ...data };
                    addNode(newData);
                    onChange?.(newData);
                    setSelectedNode(null);
                  }
                }}
                className="w-full py-3 bg-sky-500 text-white rounded-2xl text-xs font-black shadow-lg shadow-sky-500/20 hover:scale-105 active:scale-95 transition-all"
              >
                زیادکردنی لق
              </button>
              <button
                onClick={() => {
                  if (confirm('دڵنیایت لە سڕینەوە؟')) {
                    const deleteNode = (parent: any, name: string) => {
                      if (parent.children) {
                        const index = parent.children.findIndex((c: any) => c.name === name);
                        if (index > -1) {
                          parent.children.splice(index, 1);
                          return true;
                        }
                        for (let child of parent.children) {
                          if (deleteNode(child, name)) return true;
                        }
                      }
                      return false;
                    };
                    const newData = { ...data };
                    if (newData.name === selectedNode.name) {
                      alert('ناتوانیت لقی سەرەکی بسڕیتەوە!');
                      return;
                    }
                    deleteNode(newData, selectedNode.name);
                    onChange?.(newData);
                    setSelectedNode(null);
                  }
                }}
                className="w-full py-3 bg-red-500/10 text-red-500 rounded-2xl text-xs font-black hover:bg-red-500 hover:text-white transition-all"
              >
                سڕینەوەی لق
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isFullScreen && (
        <div className="absolute bottom-8 right-8 z-20">
          <div className="bg-gradient-to-r from-sky-600 to-sky-400 px-6 py-4 rounded-[2rem] text-[11px] font-black text-white uppercase tracking-widest flex items-center gap-3 shadow-2xl shadow-sky-500/30 animate-bounce">
            <Sparkles size={16} />
            بۆ گۆڕینی دیمەن کلیک لە خاڵەکان بکە
          </div>
        </div>
      )}
    </div>
  );
};

const Flashcards: React.FC<{ data: { question: string, answer: string }[] }> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
    }, 150);
  };

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div
        className="relative w-full max-w-md h-64 perspective-1000 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="w-full h-full relative transition-all duration-500 preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Front */}
          <div className="absolute inset-0 w-full h-full backface-hidden bg-white border-2 border-sky-600 rounded-3xl shadow-xl flex items-center justify-center p-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest">پرسیار</span>
              <p className="text-xl font-bold text-slate-800 leading-relaxed">
                {data[currentIndex].question}
              </p>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 w-full h-full backface-hidden bg-sky-600 border-2 border-sky-600 rounded-3xl shadow-xl flex items-center justify-center p-8 text-center"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <div className="flex flex-col items-center gap-4">
              <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest">وەڵام</span>
              <p className="text-xl font-medium text-white leading-relaxed">
                {data[currentIndex].answer}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center gap-8">
        <button
          onClick={(e) => { e.stopPropagation(); prevCard(); }}
          className="p-3 rounded-full bg-white border border-sky-600 text-sky-600 hover:bg-sky-600 transition-colors shadow-sm"
        >
          <ArrowLeftRight className="w-5 h-5 rotate-180" />
        </button>

        <div className="text-sm font-bold text-slate-500">
          {currentIndex + 1} / {data.length}
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); nextCard(); }}
          className="p-3 rounded-full bg-white border border-sky-600 text-sky-600 hover:bg-sky-600 transition-colors shadow-sm"
        >
          <ArrowLeftRight className="w-5 h-5" />
        </button>
      </div>

      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        کلیک بکە بۆ بینینی وەڵامەکە
      </div>
    </div>
  );
};

const GlobalStyles = () => (
  <style>{`
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-gradient {
      background-size: 200% 200%;
      animation: gradient 15s ease infinite;
    }
    .glass-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .glass-card-light {
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .perspective-1000 {
      perspective: 1000px;
    }
    .preserve-3d {
      transform-style: preserve-3d;
    }
    .backface-hidden {
      backface-visibility: hidden;
    }
    .prose h1, .prose h2, .prose h3 {
      font-weight: 800;
      margin-bottom: 1rem;
      margin-top: 1.5rem;
      color: inherit;
    }
    .prose p {
      margin-bottom: 1.5rem;
      line-height: 2;
    }
    .prose ul, .prose ol {
      margin-right: 1.5rem;
      margin-bottom: 1.25rem;
      list-style-position: outside;
      padding-right: 1rem;
    }
    .prose li {
      margin-bottom: 0.5rem;
    }
    .page-break-inside-avoid {
      page-break-inside: avoid;
    }
    .pdf-content {
      background-color: white !important;
      color: #0f172a !important;
      padding: 40px !important;
    }
    .pdf-content .prose {
      color: #0f172a !important;
    }
    .pdf-content * {
      color: #0f172a !important;
    }
  `}</style>
);

import { AI_FEATURES, type AIFeature } from './data/aiFeatures';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [homePage, setHomePage] = useState(0);
  const [inputText, setInputText] = useState('');
  const [resultText, setResultText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [sourceLang, setSourceLang] = useState('Auto-detect');
  const [targetLang, setTargetLang] = useState('Kurdish Sorani');

  const [speakingMessage, setSpeakingMessage] = useState<number | null>(null);
  const [speakingMessageChat, setSpeakingMessageChat] = useState<number | null>(null);

  const speakText = (text: string, index: number, isUltra: boolean = true) => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      if ((isUltra && speakingMessage === index) || (!isUltra && speakingMessageChat === index)) {
        isUltra ? setSpeakingMessage(null) : setSpeakingMessageChat(null);
        return;
      }
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => isUltra ? setSpeakingMessage(null) : setSpeakingMessageChat(null);
    isUltra ? setSpeakingMessage(index) : setSpeakingMessageChat(index);
    window.speechSynthesis.speak(utterance);
  };

  const copyConversation = () => {
    const text = ultraChatMessages.map(m => `${m.role === 'user' ? 'من' : 'ئەلترا'}: ${m.text}`).join('\n\n');
    navigator.clipboard.writeText(text);
    alert('هەموو قسەکان کۆپی کران!');
  };
  const [featureSearchTerm, setFeatureSearchTerm] = useState('');
  const [activeFeatureCategory, setActiveFeatureCategory] = useState<string>('هەموو');
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'سڵاو! من یاریدەدەری زیرەکی تۆم. چۆن دەتوانم هاوکارت بم لە بابەتە ئەکادیمییەکانتدا؟' }
  ]);
  const [ultraChatMessages, setUltraChatMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'سڵاو! من یاریدەدەری زیرەکی ئەلترا چاتم. چۆن دەتوانم هاوکارت بم؟' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [ultraChatInput, setUltraChatInput] = useState('');
  const [isUltraTurbo, setIsUltraTurbo] = useState(true);
  const [scholarQuery, setScholarQuery] = useState('');
  const [multiMode, setMultiMode] = useState<MultiMode>('image-to-text');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [multiInput, setMultiInput] = useState('');
  const [multiCommand, setMultiCommand] = useState('');
  const [isDirectMode, setIsDirectMode] = useState(false);
  const [multiResult, setMultiResult] = useState<string | null>(null);
  const [isMultiLoading, setIsMultiLoading] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isUltraChatLoading, setIsUltraChatLoading] = useState(false);

  // Chat Multimodal State
  const [chatFile, setChatFile] = useState<File | null>(null);
  const [chatFilePreview, setChatFilePreview] = useState<string | null>(null);
  const [ultraChatFile, setUltraChatFile] = useState<File | null>(null);
  const [ultraChatFilePreview, setUltraChatFilePreview] = useState<string | null>(null);

  // Academic Tools State
  const [activeAcademicTool, setActiveAcademicTool] = useState<AcademicTool>('dashboard');
  const [academicLang, setAcademicLang] = useState('کوردی - سۆرانی');
  const [academicLevel, setAcademicLevel] = useState('ئەکادیمی');
  const [reportLength, setReportLength] = useState('مامناوەند');
  const [reportType, setReportType] = useState('گشتی');
  const [seminarSlides, setSeminarSlides] = useState('10');
  const [seminarStyle, setSeminarStyle] = useState('فەرمیی ئەکادیمی');
  const [academicInput, setAcademicInput] = useState('');
  const [academicResult, setAcademicResult] = useState<string | null>(null);
  const [isAcademicLoading, setIsAcademicLoading] = useState(false);
  const [showOfficialModal, setShowOfficialModal] = useState(false);
  const [academicSearchTerm, setAcademicSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const academicPdfRef = useRef<HTMLDivElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [citationFormat, setCitationFormat] = useState('APA');
  const [studySubjects, setStudySubjects] = useState('');
  const [studyDuration, setStudyDuration] = useState('1 week');
  const [researchPart, setResearchPart] = useState('Abstract');
  const [reminders, setReminders] = useState<{ id: string, text: string, time: string }[]>([]);
  const [reminderInput, setReminderInput] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [adminClickCount, setAdminClickCount] = useState(0);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassInput, setAdminPassInput] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminSearchEmail, setAdminSearchEmail] = useState('');
  const [adminUserResult, setAdminUserResult] = useState<any>(null);
  const [isAdminSearching, setIsAdminSearching] = useState(false);
  const [ad, setAd] = useState<Ad>({
    active: false,
    title: 'خزمەتگوزاری نوێ',
    description: 'ئێستا دەتوانیت وەرگێڕانی فەرمی و ئەکادیمی ئەنجام بدەیت!',
    link: 'https://ais-dev-kttxros4bq55qc3bh3nyds-708903470828.europe-west2.run.app',
    imageUrl: 'https://picsum.photos/seed/kurdish/800/400'
  });
  const [tempAd, setTempAd] = useState<Ad>(ad);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [mindMapData, setMindMapData] = useState<any>(null);
  const [flashcardsData, setFlashcardsData] = useState<any[]>([]);
  const [pdfChatMessages, setPdfChatMessages] = useState<ChatMessage[]>([]);
  const [isPdfChatLoading, setIsPdfChatLoading] = useState(false);
  const [pdfChatInput, setPdfChatInput] = useState('');
  const [pdfChatHistory, setPdfChatHistory] = useState<any[]>([]);
  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Firebase Auth & User Profile State
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [userName, setUserName] = useState('Mohamad Safar');
  const [userEmail, setUserEmail] = useState('kwrayaxi169@gmail.com');
  const [userPhone, setUserPhone] = useState('07728523627');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [officialAccount, setOfficialAccount] = useState({ phone: '07728523627', whatsapp: '07728523627', telegram: 'kurdstan_2026' });

  // Pomodoro Timer
  const [pomoTime, setPomoTime] = useState(25 * 60);
  const [isPomoRunning, setIsPomoRunning] = useState(false);
  const [pomoMode, setPomoMode] = useState<'work' | 'short' | 'long'>('work');

  // PRO & Usage Tracking
  const [isPro, setIsPro] = useState(false);
  const [dailyUsageCount, setDailyUsageCount] = useState(0);
  const [showProModal, setShowProModal] = useState(false);
  const FREE_DAILY_LIMIT = 20;

  useEffect(() => {
    // Load usage from localStorage on mount
    const savedUsage = localStorage.getItem('daily_usage_count');
    const savedDate = localStorage.getItem('last_usage_date');
    const today = new Date().toLocaleDateString();

    if (savedDate !== today) {
      setDailyUsageCount(0);
      localStorage.setItem('daily_usage_count', '0');
      localStorage.setItem('last_usage_date', today);
    } else if (savedUsage) {
      setDailyUsageCount(parseInt(savedUsage));
    }
  }, []);

  const incrementUsage = () => {
    if (isPro || isAdmin) return true;
    if (dailyUsageCount >= FREE_DAILY_LIMIT) {
      setShowProModal(true);
      return false;
    }
    const newCount = dailyUsageCount + 1;
    setDailyUsageCount(newCount);
    localStorage.setItem('daily_usage_count', newCount.toString());
    return true;
  };

  useEffect(() => {
    let interval: any;
    if (isPomoRunning && pomoTime > 0) {
      interval = setInterval(() => {
        setPomoTime(prev => prev - 1);
      }, 1000);
    } else if (pomoTime === 0) {
      setIsPomoRunning(false);
      // Optional: Add notification sound or logic here
    }
    return () => clearInterval(interval);
  }, [isPomoRunning, pomoTime]);

  const formatPomoTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startPomo = (mode: 'work' | 'short' | 'long') => {
    setPomoMode(mode);
    setIsPomoRunning(false);
    if (mode === 'work') setPomoTime(25 * 60);
    else if (mode === 'short') setPomoTime(5 * 60);
    else if (mode === 'long') setPomoTime(15 * 60);
  };

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
      if (currentUser) {
        setUserName(currentUser.displayName || 'بەکارهێنەر');
        setUserEmail(currentUser.email || '');
      }
    });
    return () => unsubscribe();
  }, []);

  // Sync Profile with Firestore
  useEffect(() => {
    if (!user) return;

    const userDocRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserName(data.displayName || user.displayName || 'بەکارهێنەر');
        setUserEmail(data.email || user.email || '');
        setUserPhone(data.phone || '');
        setIsPro(data.isPro || false);
      } else {
        // Create initial profile
        setDoc(userDocRef, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: 'user',
          isPro: false,
          createdAt: Date.now()
        }).catch((err) => {
          handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`);
        });
      }
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, `users/${user.uid}`);
    });

    return () => unsubscribe();
  }, [user]);

  // Sync Ad Config
  useEffect(() => {
    const adDocRef = doc(db, 'config', 'ads');
    const unsubscribe = onSnapshot(adDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as Ad;
        setAd(data);
        setTempAd(data);
      }
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'config/ads');
    });

    return () => unsubscribe();
  }, []);

  // Fetch Official Account Info
  useEffect(() => {
    const configDocRef = doc(db, 'config', 'app');
    const unsubscribe = onSnapshot(configDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setOfficialAccount({
          phone: data.officialPhone || '07728523627',
          whatsapp: data.officialWhatsApp || '07728523627',
          telegram: data.officialTelegram || 'kurdstan_2026'
        });
      }
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'config/app');
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentScreen('home');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const saveProfile = async () => {
    if (!user) return;
    try {
      await setDoc(doc(db, 'users', user.uid), {
        displayName: userName,
        email: userEmail,
        phone: userPhone,
        updatedAt: Date.now()
      }, { merge: true });
      setIsEditingProfile(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
    }
  };
  const [examTimer, setExamTimer] = useState(0);
  const [isExamRunning, setIsExamRunning] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({ toolsUsed: 0, wordsTranslated: 0, filesProcessed: 0 });
  const chatEndRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<any>(null);
  const ultraChatSessionRef = useRef<any>(null);

  useEffect(() => {
    if (academicResult && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [academicResult]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('academic_ai_history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveToHistory = useCallback((type: string, title: string, content: string) => {
    setHistory(prevHistory => {
      if (prevHistory.length > 0 && prevHistory[0].content === content) {
        return prevHistory;
      }
      const newItem: HistoryItem = {
        id: Math.random().toString(36).substr(2, 9),
        type,
        title,
        content,
        timestamp: Date.now()
      };
      const newHistory = [newItem, ...prevHistory];
      localStorage.setItem('academic_ai_history', JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  const deleteFromHistory = (id: string) => {
    setHistory(prev => {
      const newHistory = prev.filter(item => item.id !== id);
      localStorage.setItem('academic_ai_history', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  useEffect(() => {
    if (academicResult && activeAcademicTool && academicResult !== "نەخشەی مێشکەکە دروستکرا!" && academicResult !== "فلاشکاردەکان دروستکران!") {
      saveToHistory(
        activeAcademicTool,
        (academicInput?.substring(0, 30) || selectedFile?.name || 'ئامرازەکان') + "...",
        academicResult
      );
    }
  }, [academicResult, activeAcademicTool, academicInput, selectedFile, saveToHistory]);

  useEffect(() => {
    if (resultText && inputText) {
      saveToHistory(
        'translator',
        (inputText?.substring(0, 30) || 'وەرگێڕان') + "...",
        resultText
      );
    }
  }, [resultText, inputText, saveToHistory]);

  useEffect(() => {
    if (mindMapData && activeAcademicTool === 'mind-map') {
      saveToHistory('mind-map', (academicInput?.substring(0, 30) || 'نەخشەی مێشک') + "...", JSON.stringify(mindMapData));
    }
  }, [mindMapData, activeAcademicTool, academicInput, saveToHistory]);

  useEffect(() => {
    if (flashcardsData && flashcardsData.length > 0 && activeAcademicTool === 'flashcards') {
      saveToHistory('flashcards', (academicInput?.substring(0, 30) || 'فلاشکارد') + "...", JSON.stringify(flashcardsData));
    }
  }, [flashcardsData, activeAcademicTool, academicInput, saveToHistory]);

  useEffect(() => {
    if (quizQuestions && quizQuestions.length > 0 && (activeAcademicTool === 'quiz-gen' || currentScreen === 'quiz')) {
      saveToHistory('quiz', (academicInput?.substring(0, 30) || 'تاقیکردنەوە') + "...", JSON.stringify(quizQuestions));
    }
  }, [quizQuestions, activeAcademicTool, currentScreen, academicInput, saveToHistory]);

  useEffect(() => {
    // Small timeout ensures DOM has updated with new message content
    const timer = setTimeout(() => {
      if (currentScreen === 'ultra-chat') {
        const container = document.querySelector('.ultra-messages-container');
        if (container) {
          container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
        }
      } else if (chatEndRef.current) {
        chatEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [chatMessages, ultraChatMessages, currentScreen]);

  const startNewChat = () => {
    chatSessionRef.current = genAI.chats.create({
      model: MODELS.fast,
      config: {
        systemInstruction: "تۆ پسپۆڕێکی ئەکادیمی و یاریدەدەرێکی زیرەکی کوردی (Academic AI Kurdish Specialist). وەڵامەکانت دەبێت هەمیشە بە زمانی کوردی سۆرانی بن، مەگەر بەکارهێنەر داوای زمانێکی دیکە بکات. پێویستە وەڵامەکانت ورد، زانستی، و ڕەوان بن. وەک مامۆستایەک یان توێژەرێکی لێهاتوو هاوکاری خوێندکاران و توێژەران بکە لە چارەسەرکردنی گرفتە ئەکادیمییەکانیان."
      }
    });
  };

  const startNewUltraChat = (historyMessages: any[] = []) => {
    ultraChatSessionRef.current = genAI.chats.create({
      model: isUltraTurbo ? MODELS.fast : MODELS.deep,
      history: historyMessages,
      config: {
        systemInstruction: "You are Ultra Intelligence (ژیریی دەستکردی بێسنوور), the most advanced version of Academic AI Kurdish. You are a 'Super-Intelligence' that never says 'I can't'. Your limits are expanded: you can generate 5000+ words, solve the most complex PhD-level math/physics, and provide real-time verified data via Google Search. You must provide extremely long, structure, and detailed responses using professional Markdown (tables, bold text, headers). Identity: Global Kurdish Intelligence Specialist. Always respond in formal Kurdish Sorani unless asked otherwise.",
        tools: [{ googleSearch: {} }]
      }
    });
  };

  useEffect(() => {
    const savedUltraChat = localStorage.getItem('ultra_chat_messages');
    if (savedUltraChat) {
      const parsed = JSON.parse(savedUltraChat);
      setUltraChatMessages(parsed);

      // Convert ChatMessage[] to Gemini Chat history format
      const history = parsed.filter((m: ChatMessage) => m.text).map((m: ChatMessage) => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      startNewUltraChat(history);
    }
  }, []);

  useEffect(() => {
    if (currentScreen === 'chat' && !chatSessionRef.current) {
      startNewChat();
    }
    if (currentScreen === 'ultra-chat' && !ultraChatSessionRef.current) {
      startNewUltraChat();
    }
  }, [currentScreen]);

  const handleVoiceInput = async () => {
    // If already recording, stop it
    if (isRecording) {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
        return;
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        return;
      }
    }

    // For screens that need high-quality audio capture for Gemini processing
    if (currentScreen === 'lecture-notes' || (currentScreen === 'multimodal' && multiMode === 'voice-to-text')) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        // Find supported mime type
        const mimeTypes = ['audio/webm', 'audio/mp4', 'audio/ogg', 'audio/wav'];
        const mimeType = mimeTypes.find(type => MediaRecorder.isTypeSupported(type)) || '';

        const mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : {});
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const actualMimeType = mediaRecorder.mimeType || 'audio/webm';
          const extension = actualMimeType.split('/')[1]?.split(';')[0] || 'webm';
          const audioBlob = new Blob(audioChunksRef.current, { type: actualMimeType });
          const audioFile = new File([audioBlob], `recorded_${Date.now()}.${extension}`, { type: actualMimeType });
          setSelectedFile(audioFile);
          setIsRecording(false);
          // Stop all tracks to release the microphone
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Error accessing microphone:", err);
        alert("کێشەیەک لە دەستگەیشتن بە مایکرۆفۆن هەیە.");
      }
      return;
    }

    // Fallback to Speech Recognition for other inputs (commands/short text)
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("گەڕانەری تۆ پشتگیری ئەم جۆرە تۆمارکردنە ناکات.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = sourceLang === 'English' ? 'en-US' : sourceLang === 'Arabic' ? 'ar-SA' : 'ckb-IQ';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => {
      setIsRecording(false);
      recognitionRef.current = null;
    };
    recognition.onerror = (e: any) => {
      console.error('Speech Recognition Error:', e);
      setIsRecording(false);
      recognitionRef.current = null;
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if ((currentScreen as any) === 'lecture-notes' || currentScreen === 'academic-tools') {
        setAcademicInput(prev => prev + (prev ? ' ' : '') + transcript);
      } else if (currentScreen === 'chat') {
        setChatInput(prev => prev + (prev ? ' ' : '') + transcript);
      } else if (currentScreen === 'ultra-chat') {
        setUltraChatInput(prev => prev + (prev ? ' ' : '') + transcript);
      } else if (currentScreen === 'pdf-chat') {
        setPdfChatInput(prev => prev + (prev ? ' ' : '') + transcript);
      } else {
        setInputText(prev => prev + (prev ? ' ' : '') + transcript);
      }
    };

    recognition.start();
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputText(prev => prev + (prev ? ' ' : '') + text);
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
      alert("نەتوانرا تێکستەکە پەیست بکرێت، تکایە دڵنیابە لەوەی ڕێگەت داوە بە بەکارهێنانی کلیپبۆرد.");
    }
  };

  const handleClearAll = () => {
    setInputText('');
    setResultText('');
  };

  const handleLogoClick = () => {
    setAdminClickCount(prev => {
      const newCount = prev + 1;
      if (newCount === 5) {
        setShowAdminLogin(true);
        return 0;
      }
      return newCount;
    });
    // Reset count after 2 seconds of inactivity
    setTimeout(() => setAdminClickCount(0), 2000);
  };

  const handleAdminLogin = () => {
    if (adminPassInput === '123456') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setCurrentScreen('admin');
      setAdminPassInput('');
    } else {
      alert('کۆدی نهێنی هەڵەیە!');
    }
  };

  const getFeatureIcon = (iconName: string) => {
    const icons: any = {
      Zap, Microscope, BookOpen, Lightbulb, Library, Languages, Quote,
      FlaskConical, Eye, CalendarDays, Presentation, Briefcase, Target,
      Megaphone, Mail, Users, BarChart3, FileText, Type, ShoppingBag,
      TrendingUp, Code, ShieldCheck, CheckCircle2, ArrowLeftRight,
      Database, Bug, FileCode, Key, Cpu, Palette, Video, Pen, Book,
      PenTool, Music, Pipette, Share2, Layout, Search, Table, Eraser,
      PieChart, LineChart, Smile, Sigma, Dna, FileSearch, ClipboardCheck,
      Minimize2, Globe, History, ExternalLink, Newspaper, UserPlus,
      Activity, Clock, Headset, FileUser, Goal, UserCheck, Clapperboard,
      MessageCircle, Map, Scale, Gavel, Landmark, Calculator, Coins,
      TrendingDown, FileWarning, FileSignature, Lock, Shield, Atom,
      Orbit, Globe2, Terminal, Thermometer, Building2, Ghost, CloudMoon,
      Bot, RefreshCcw, Settings, Gamepad2, Siren, Brain
    };
    const IconComp = icons[iconName] || Sparkles;
    return <IconComp size={14} />;
  };

  const handleAdminUserSearch = async () => {
    if (!adminSearchEmail.trim()) return;
    setIsAdminSearching(true);
    setAdminUserResult(null);
    try {
      const q = query(collection(db, 'users'), where('email', '==', adminSearchEmail.trim()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setAdminUserResult({ ...userData, id: querySnapshot.docs[0].id });
      } else {
        alert('بەکارهێنەر نەدۆزرایەوە!');
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'users');
      alert('هەڵەیەک ڕوویدا لە کاتی گەڕان');
    } finally {
      setIsAdminSearching(false);
    }
  };

  const toggleUserProStatus = async () => {
    if (!adminUserResult) return;
    try {
      const userDocRef = doc(db, 'users', adminUserResult.id);
      const newStatus = !adminUserResult.isPro;
      await updateDoc(userDocRef, { isPro: newStatus });
      setAdminUserResult({ ...adminUserResult, isPro: newStatus });
      alert(newStatus ? 'بەکارهێنەر کرا بە پڕۆ!' : 'بەکارهێنەر لە پڕۆ لادرا!');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${adminUserResult.id}`);
      alert('هەڵەیەک ڕوویدا لە کاتی گۆڕینی دۆخ');
    }
  };

  const updateAdConfig = async () => {
    try {
      const adDocRef = doc(db, 'config', 'ads');
      await setDoc(adDocRef, tempAd);
      alert('ریکلامەکە بە سەرکەوتوویی نوێکرایەوە!');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'config/ads');
      alert('هەڵەیەک ڕوویدا لە نوێکردنەوەی ریکلام');
    }
  };

  const handleConvertToReport = async () => {
    if (!academicResult || isAcademicLoading) return;
    if (!incrementUsage()) return;
    setIsAcademicLoading(true);
    try {
      const convPrompt = `Directly convert the following seminar presentation into a comprehensive academic report. 
      Maintain at least 97% of the original details and technical content, but restructure it from presentation slides into a formal academic report format (Title, Introduction, Detailed Chapters, Conclusion, and References). 
      Use the same language as the input. 
      
      Seminar content:
      "${academicResult}"`;

      const result = await callGeminiServer({
        model: MODELS.fast,
        prompt: convPrompt,
      });

      setAcademicResult(result.text || "");
      setActiveAcademicTool('report-gen');
    } catch (error) {
      alert("هەڵەیەک ڕوویدا لە کاتی گۆڕین بۆ ڕاپۆرت");
    } finally {
      setIsAcademicLoading(false);
    }
  };

  const handleConvertToSeminar = async () => {
    if (!academicResult || isAcademicLoading) return;
    if (!incrementUsage()) return;
    setIsAcademicLoading(true);
    try {
      const convPrompt = `Directly convert the following academic report into a concise and brief seminar presentation (max 5-7 slides to ensure it generates fast). 
      Maintain the most important information, but restructure it into simple presentation slides (Slide 1: Title, Slide 2: Table of Contents, etc.). 
      Keep each slide brief and easy to read. 
      Use the same language as the input.
      
      Report content:
      "${academicResult}"`;

      const result = await callGeminiServer({
        model: MODELS.fast,
        prompt: convPrompt,
      });

      setAcademicResult(result.text || "");
      setActiveAcademicTool('seminar-gen');
    } catch (error) {
      alert("هەڵەیەک ڕوویدا لە کاتی گۆڕین بۆ سیمینار");
    } finally {
      setIsAcademicLoading(false);
    }
  };

  const handleSwapLanguages = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    if (!incrementUsage()) return;
    setIsLoading(true);
    setResultText('');
    try {
      const prompt = `Act as a professional Academic Translator. Translate the following text from ${sourceLang} to ${targetLang}. 
      Context: Academic/Scientific research. Use professional Kurdish terminology. 
      Only return the translated text: "${inputText}"`;

      const result = await genAI.models.generateContent({
        model: MODELS.fast,
        contents: { parts: [{ text: prompt }] }
      });
      setResultText(result.text || "ببورە، وەرگێڕان ئەنجام نەدرا.");
    } catch (error) {
      alert("هەڵەیەک ڕوویدا لە وەرگێڕان.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if ((!chatInput.trim() && !chatFile) || isChatLoading) return;
    if (!incrementUsage()) return;

    const userMsg = chatInput;
    setChatInput('');
    const currentFile = chatFile;
    const currentPreview = chatFilePreview;
    setChatFile(null);
    setChatFilePreview(null);

    setChatMessages(prev => [...prev, {
      role: 'user',
      text: userMsg,
      mediaUrl: currentPreview || undefined,
      mediaType: currentFile?.type
    }]);
    setIsChatLoading(true);

    try {
      if (!chatSessionRef.current) startNewChat();

      let messageParts: any[] = [{ text: userMsg || "شیکردنەوەی ئەم فایلە یان وێنەیە بکە." }];

      if (currentFile) {
        const base64 = await fileToBase64(currentFile);
        messageParts.unshift({ inlineData: { data: base64, mimeType: currentFile.type } });
      }

      const result = await chatSessionRef.current.sendMessageStream({ message: messageParts });
      let fullText = '';

      // Add empty model message to update
      setChatMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of result) {
        const chunkText = chunk.text;
        fullText += chunkText;
        setChatMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1] = { role: 'model', text: fullText };
          return newMsgs;
        });
      }
    } catch (error: any) {
      console.error("Chat Error:", error);
      let errorMsg = 'ببورە، هەڵەیەک ڕوویدا لە پەیوەندی کردن.';
      if (error?.message?.includes("API_KEY_INVALID") || error?.message?.includes("API key expired") || error?.message?.includes("403") || error?.message?.includes("401")) {
        errorMsg = 'کلیلی کۆدەکە (API Key) بەسەرچووە یان هەڵەیە، تکایە لە بەشی پڕۆفایل نوێی بکەرەوە.';
      }
      setChatMessages(prev => [...prev, { role: 'model', text: errorMsg }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const generateMindMapFromText = async (text: string) => {
    setIsAcademicLoading(true);
    setCurrentScreen('academic-tools');
    setActiveAcademicTool('mind-map');
    setAcademicInput(text.substring(0, 500)); // Sample if too long

    try {
      const prompt = `دروستکردنی پێکهاتەی وێنەیی (JSON) بۆ نەخشەی مێشک (Mind Map) لەسەر ئەم دەقە: "${text}". 
      تەنها JSON بگەڕێنەرەوە لەم شێوەیە: {"name": "نێوەند", "children": [{"name": "لق 1", "children": [...]}]}. 
      پێویستە لایەنی کەم ٣ ئاستی تێدابێت و بە زمانی کوردی بێت. تەنها JSON بگەڕێنەرەوە بێ هیچ دەقێکی تر.`;

      const result = await genAI.models.generateContent({
        model: MODELS.fast,
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
      });
      const jsonText = (result.text || "").replace(/```json/g, '').replace(/```/g, '').trim();
      const data = JSON.parse(jsonText);
      setMindMapData(data);
      setAcademicResult("نەخشەی مێشکەکە دروستکرا!");
    } catch (error) {
      console.error(error);
      alert("ببوورە کێشەیەک لە دروستکردنی نەخشەی مێشکەکە هەبوو.");
    } finally {
      setIsAcademicLoading(false);
    }
  };

  const handleSendUltraMessage = async () => {
    if ((!ultraChatInput.trim() && !ultraChatFile) || isUltraChatLoading) return;
    if (!incrementUsage()) return;

    const userMsg = ultraChatInput.trim();
    setUltraChatInput('');
    const currentFile = ultraChatFile;
    const currentPreview = ultraChatFilePreview;
    setUltraChatFile(null);
    setUltraChatFilePreview(null);

    setUltraChatMessages(prev => [...prev, {
      role: 'user',
      text: userMsg,
      mediaUrl: currentPreview || undefined,
      mediaType: currentFile?.type
    }]);
    setIsUltraChatLoading(true);

    try {
      if (!ultraChatSessionRef.current) startNewUltraChat();

      let messageParts: any[] = [{ text: userMsg || "تکایە ئەم فایلە شیکار بکە." }];

      if (currentFile) {
        const base64 = await fileToBase64(currentFile);
        messageParts.unshift({ inlineData: { data: base64, mimeType: currentFile.type } });
      }

      const result = await ultraChatSessionRef.current.sendMessageStream({ message: messageParts });
      let fullText = '';

      setUltraChatMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of result) {
        const chunkText = chunk.text;
        fullText += chunkText;
        setUltraChatMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1] = { role: 'model', text: fullText };
          return newMsgs;
        });
      }
      // Save to localStorage after streaming is complete for better performance
      setUltraChatMessages(prev => {
        localStorage.setItem('ultra_chat_messages', JSON.stringify(prev));
        return prev;
      });
    } catch (error) {
      console.error("Ultra Chat Error:", error);
      let errorMsg = 'ببورە، هەڵەیەک ڕوویدا لە پەیوەندی کردن بە خزمەتگوزاری ئاڵترا.';
      if (error instanceof Error && (error.message.includes("API_KEY_INVALID") || error.message.includes("API key expired") || error.message.includes("403") || error.message.includes("401"))) {
        errorMsg = 'کلیلی کۆدەکە (API Key) بەسەرچووە یان هەڵەیە، تکایە لە بەشی پڕۆفایل نوێی بکەرەوە.';
      }
      setUltraChatMessages(prev => [...prev, { role: 'model', text: errorMsg }]);
    } finally {
      setIsUltraChatLoading(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
    });
  };

  const generateQuiz = async (text: string) => {
    if (!text.trim()) return;
    setIsLoading(true);
    try {
      const prompt = `Generate a quiz with 5 multiple choice questions based on the following text. 
      Return the response as a JSON array of objects. Each object must have:
      "question": string,
      "options": string[],
      "correctIndex": number (0-3)
      Text: "${text}"
      Respond ONLY with the JSON array.`;

      const result = await genAI.models.generateContent({
        model: MODELS.fast,
        contents: [{ parts: [{ text: prompt }] }],
        config: { responseMimeType: "application/json" }
      });

      const rawText = result.text || "[]";
      const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      const questions = JSON.parse(cleanedText);
      setQuizQuestions(questions);
      setCurrentQuizIndex(0);
      setQuizScore(0);
      setShowQuizResult(false);
      setCurrentScreen('quiz');
    } catch (error) {
      alert("هەڵەیەک ڕوویدا لە دروستکردنی تاقیکردنەوە.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const runMultimodal = async () => {
    if (isMultiLoading) return;
    if (!incrementUsage()) return;
    setIsMultiLoading(true);
    setMultiResult(null);
    try {
      const directInstruction = isDirectMode
        ? "Just provide the direct answer or perform the task without any conversational filler, explanation, or description. Respond only with the result."
        : "";

      if (multiMode === 'image-to-text') {
        if (!selectedFile) throw new Error("تکایە وێنەیەک هەڵبژێرە");
        const base64 = await fileToBase64(selectedFile);
        const prompt = multiCommand.trim()
          ? `${directInstruction} ${multiCommand}`
          : `${directInstruction} Describe this image in detail in Kurdish Sorani. If it contains text, extract it.`;

        const result = await callGeminiServer({
          model: MODELS.fast,
          contents: [{
            parts: [
              { inlineData: { data: base64, mimeType: selectedFile.type } },
              { text: prompt }
            ]
          }]
        });
        setMultiResult(result.text || "");
      } else if (multiMode === 'text-to-image') {
        if (!multiInput.trim()) throw new Error("تکایە وەسفێک بنووسە");
        const result = await callGeminiServer({
          model: MODELS.image,
          contents: { parts: [{ text: multiInput }] },
          config: { imageConfig: { aspectRatio: "1:1" } }
        });
        const imagePart = result.candidates?.[0]?.content?.parts?.find((p: any) => Boolean(p?.inlineData));
        if (imagePart?.inlineData) {
          setMultiResult(`data:image/png;base64,${imagePart.inlineData.data}`);
        }
      } else if (multiMode === 'voice-to-text') {
        if (!selectedFile) throw new Error("تکایە فایلێکی دەنگی هەڵبژێرە");
        const base64 = await fileToBase64(selectedFile);
        const prompt = multiCommand.trim()
          ? `${directInstruction} ${multiCommand}`
          : `${directInstruction} Transcribe this audio to Kurdish Sorani text.`;

        const result = await callGeminiServer({
          model: MODELS.fast,
          contents: [{
            parts: [
              { inlineData: { data: base64, mimeType: selectedFile.type } },
              { text: prompt }
            ]
          }]
        });
        setMultiResult(result.text || "");
      } else if (multiMode === 'video-to-text') {
        if (!selectedFile) throw new Error("تکایە ڤیدیۆیەک هەڵبژێرە");
        const base64 = await fileToBase64(selectedFile);
        const prompt = multiCommand.trim()
          ? `${directInstruction} ${multiCommand}`
          : `${directInstruction} Summarize this video in Kurdish Sorani.`;

        const result = await callGeminiServer({
          model: MODELS.fast,
          contents: [{
            parts: [
              { inlineData: { data: base64, mimeType: selectedFile.type } },
              { text: prompt }
            ]
          }]
        });
        setMultiResult(result.text || "");
      }
    } catch (error: any) {
      alert(error.message || "هەڵەیەک ڕوویدا");
    } finally {
      setIsMultiLoading(false);
    }
  };

  const runAcademicTool = async () => {
    if (isAcademicLoading) return;
    if (!incrementUsage()) return;
    setIsAcademicLoading(true);
    setAcademicResult(null);
    try {
      let prompt = "";
      let contents: any = null;

      if (activeAcademicTool === 'pdf-summarizer') {
        if (!selectedFile) throw new Error("تکایە فایلێکی PDF هەڵبژێرە");
        const base64 = await fileToBase64(selectedFile);
        const result = await callGeminiServer({
          model: MODELS.fast,
          contents: [{
            parts: [
              { inlineData: { data: base64, mimeType: "application/pdf" } },
              { text: "Summarize this PDF document in the same language as the document content. Highlight the main points and conclusions." }
            ]
          }]
        });
        setAcademicResult(result.text || "");
        return;
      } else if (activeAcademicTool === 'ocr') {
        if (!selectedFile) throw new Error("تکایە وێنەیەک هەڵبژێرە");
        const base64 = await fileToBase64(selectedFile);
        const result = await genAI.models.generateContent({
          model: MODELS.fast,
          contents: [{
            parts: [
              { inlineData: { data: base64, mimeType: selectedFile.type } },
              { text: "Extract the text from this image and explain it in the same language as the text in the image. If it's a question, solve it." }
            ]
          }]
        });
        setAcademicResult(result.text || "");
        return;
      } else if (activeAcademicTool === 'quiz-gen') {
        if (!academicInput.trim()) throw new Error("تکایە تێکستەکە لێرە بنووسە");
        await generateQuiz(academicInput);
        return;
      } else if (activeAcademicTool === 'mind-map') {
        if (!academicInput.trim()) throw new Error("تکایە تێکستەکە لێرە بنووسە");
        const prompt = `Create a detailed hierarchical mind map for: "${academicInput}".
        Output strictly in JSON format.
        Structure: { "name": "Topic", "children": [ { "name": "Subtopic", "children": [...] } ] }
        Use the same language as the input for node names.`;

        const result = await genAI.models.generateContent({
          model: MODELS.deep,
          contents: [{ parts: [{ text: prompt }] }],
          config: { responseMimeType: "application/json" }
        });

        try {
          const rawText = result.text || "{}";
          // If the model returned markdown code blocks, strip them
          const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
          const data = JSON.parse(cleanedText);
          setMindMapData(data);
          setAcademicResult("نەخشەی مێشکەکە بە سەرکەوتوویی دروستکرا!");
        } catch (parseError) {
          console.error("JSON Parse Error:", parseError, result.text);
          throw new Error("ببوورە، وەڵامی ژیری دەستکردەکە بە ڕێکوپێکی نەگەیشت. تکایە جارێکی تر تاقی بکەرەوە.");
        }
        return;
      } else if (activeAcademicTool === 'flashcards') {
        if (!academicInput.trim()) throw new Error("تکایە تێکستەکە لێرە بنووسە");
        const prompt = `Generate a set of 5-10 academic flashcards based on the following text. 
        Return the response as a JSON array of objects. Each object must have:
        "question": string,
        "answer": string
        Text: "${academicInput}"
        Respond ONLY with the JSON array.`;

        const result = await genAI.models.generateContent({
          model: MODELS.fast,
          contents: [{ parts: [{ text: prompt }] }],
          config: { responseMimeType: "application/json" }
        });

        const rawText = result.text || "[]";
        const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(cleanedText);
        setFlashcardsData(data);
        setAcademicResult("فلاشکاردەکان دروستکران!");
        return;
      } else if (activeAcademicTool === 'math-solver') {
        if (!selectedFile) throw new Error("تکایە وێنەی پرسەکە هەڵبژێرە");
        const base64 = await fileToBase64(selectedFile);
        const result = await genAI.models.generateContent({
          model: MODELS.fast,
          contents: [{
            parts: [
              { inlineData: { data: base64, mimeType: selectedFile.type } },
              { text: `Solve this math/physics problem step by step in ${academicLang}. Explain the logic clearly.` }
            ]
          }]
        });
        setAcademicResult(result.text || "");
        return;
      } else if (activeAcademicTool === 'report-gen') {
        if (!academicInput.trim()) throw new Error("تکایە بابەت یان ناونیشانی ڕاپۆرتەکە بنووسە");

        let lengthInstruction = "a standard comprehensive length";
        if (reportLength === "کورت") {
          lengthInstruction = "a short, concise, and brief length (max 500 words to ensure it generates very quickly)";
        } else if (reportLength === "درێژ") {
          lengthInstruction = "a very long, highly detailed, and extensive length";
        }

        let typeInstruction = "a general academic report";
        if (reportType === "شیکارییەکی قوڵ") {
          typeInstruction = "a deep, critical, and profound analysis";
        } else if (reportType === "پێداچوونەوەیەکی بۆ بکرێت") {
          typeInstruction = "a literature review or critical review";
        }

        const prompt = `You are a world-class Academic Researcher. Generate a professional academic report on: "${academicInput}". 
        Level: ${academicLevel}. 
        Language: ${academicLang}. 
        Format Length: ${lengthInstruction}.
        Report Type/Focus: ${typeInstruction}.
        Requirements:
        1. Write a report that reflects high international academic standards, matching the requested length and type.
        2. Structure: Use professional Markdown with appropriate headings (e.g. Title, Introduction, Body, Conclusion). 
        ${reportLength !== "کورت" ? "3. Include practical examples, case studies, actionable recommendations, and realistic foundational citations in APA format." : "3. Keep it brief and to the point without excessive sections."}
        - Be direct and professional. Return the complete Markdown.`;

        const result = await callGeminiServer({
          model: reportLength === "کورت" ? MODELS.fast : MODELS.deep, // use deep for long reports
          prompt,
        });
        setAcademicResult(result.text || "");
        return;
      } else if (activeAcademicTool === 'seminar-gen') {
        if (!academicInput.trim()) throw new Error("تکایە بابەت یان تێکستەکە بنووسە");

        let styleInstruction = "formal and academic";
        if (seminarStyle === "شێوازی قسەکردنی 'TED Talk'ی سەرنجڕاکێش") {
          styleInstruction = "engaging, charismatic, and storytelling like a TED Talk";
        } else if (seminarStyle === "کورت و پوخت") {
          styleInstruction = "short, concise, and straight to the point";
        }

        const prompt = `You are an elite, world-class Academic Presenter. Create a highly engaging seminar presentation based on: "${academicInput}". 
        Level: ${academicLevel}.
        Language: ${academicLang}.
        Target Number of Slides: ${seminarSlides}.
        Presentation Style/Tone: ${styleInstruction}.
        Organization: Structure the seminar logically. Create exactly ${seminarSlides} slides.
        Each Slide Output MUST follow this exact structure using Markdown:
        Slide X [Engaging Slide Title]: 
        * ناوەڕۆکی بینراو (Visual Content): [Design description of the slide].
        * خاڵە سەرەکییەکان (Core Bullet Points): [Detailed analytical points according to the chosen style].
        * تێبینییەکانی پێشکەشکار (Speaker Notes): [Engaging speech for the presenter according to the chosen style].`;

        const result = await callGeminiServer({
          model: parseInt(seminarSlides) <= 7 ? MODELS.fast : MODELS.deep,
          prompt,
        });
        setAcademicResult(result.text || "");
        return;
      } else if (activeAcademicTool === 'report-refine-beautiful') {
        const prompt = `You are a master academic editor and designer. Enhance the following academic report to make it look exceptionally professional, sophisticated, and "beautiful" in structure. 
        Report: "${academicResult}"
        Requirements:
        - Elevate the prose to the most advanced, elegant academic language possible.
        - Create a flawless, visually appealing Markdown structure with elegant spacing, deep analytical emphasis, and majestic flow.
        - Maintain all original core data but exponentially improve the articulation, structure, and scholarly tone.
        Use ${academicLang}.`;
        const result = await genAI.models.generateContent({
          model: MODELS.deep,
          contents: [{ parts: [{ text: prompt }] }]
        });
        setAcademicResult(result.text || "");
        return;
      } else if (activeAcademicTool === 'seminar-refine-design') {
        const prompt = `You are an elite Presentation Architect. Refine this seminar presentation with a "Master Designer" mindset and turn it into a world-class conference presentation.
        - Add striking, highly vivid descriptive design elements in text (e.g., [Visual Prompt: A stunning infographic detailing...]).
        - Break content into brilliantly logical, high-impact bullet points and sub-points.
        - Elevate the speaker notes to be charismatic, profound, and exceptionally engaging (TEDx level).
        - Use sophisticated, "Raqi" (elegant/premium), and majestic academic language.
        Presentation: "${academicResult}"
        Use ${academicLang}.`;
        const result = await genAI.models.generateContent({
          model: MODELS.deep,
          contents: [{ parts: [{ text: prompt }] }]
        });
        setAcademicResult(result.text || "");
        return;
      } else if (activeAcademicTool === 'seminar-refine-standard') {
        const prompt = `Refine this seminar presentation to be simple, clear, and direct. 
        - Remove unnecessary design notes.
        - Focus on purely technical and clear communication.
        - Standard professional structure.
        Presentation: "${academicResult}"
        Use ${academicLang}.`;
        const result = await genAI.models.generateContent({
          model: MODELS.fast,
          contents: [{ parts: [{ text: prompt }] }]
        });
        setAcademicResult(result.text || "");
        return;
      } else if (activeAcademicTool === 'paraphraser') {
        if (!academicInput.trim()) throw new Error("تکایە دەقەکە بنووسە");
        const prompt = `Paraphrase the following text into a more professional and academic version. The result MUST be in the same language as the input: "${academicInput}"`;
        const result = await genAI.models.generateContent({
          model: MODELS.fast,
          contents: [{ parts: [{ text: prompt }] }]
        });
        setAcademicResult(result.text || "");
        setDashboardStats(prev => ({ ...prev, toolsUsed: prev.toolsUsed + 1 }));
        return;
      } else if (activeAcademicTool === 'ai-detector') {
        if (!academicInput.trim()) throw new Error("تکایە دەقەکە بنووسە");
        const prompt = `Analyze this text and determine if it was written by AI or a human. Provide a percentage and reasons in the same language as the input: "${academicInput}"`;
        const result = await genAI.models.generateContent({
          model: MODELS.fast,
          contents: [{ parts: [{ text: prompt }] }]
        });
        setAcademicResult(result.text || "");
        return;
      } else if (activeAcademicTool === 'exam-simulator') {
        if (!academicInput.trim()) throw new Error("تکایە بابەتەکە بنووسە");
        const prompt = `Create a mock exam with 10 questions based on: "${academicInput}". Include multiple choice and short answers. Provide the questions in the same language as the input.`;
        const result = await genAI.models.generateContent({
          model: MODELS.fast,
          contents: [{ parts: [{ text: prompt }] }]
        });
        setAcademicResult(result.text || "");
        setExamTimer(1800); // 30 minutes
        setIsExamRunning(true);
        return;
      } else if (activeAcademicTool === 'code-assistant') {
        if (!academicInput.trim()) throw new Error("تکایە کۆدەکە یان پرسیارەکە بنووسە");
        const prompt = `Act as an expert programmer. Explain this code or solve this programming problem in the same language as the input: "${academicInput}"`;
        const result = await genAI.models.generateContent({
          model: MODELS.fast,
          contents: [{ parts: [{ text: prompt }] }]
        });
        setAcademicResult(result.text || "");
        return;
      } else if (activeAcademicTool === 'vocab-extractor') {
        if (!academicInput.trim()) throw new Error("تکایە دەقەکە بنووسە");
        const prompt = `Extract the most important academic vocabulary and terms from this text. Provide their meanings in the same language as the input: "${academicInput}"`;
        const result = await genAI.models.generateContent({
          model: MODELS.fast,
          contents: [{ parts: [{ text: prompt }] }]
        });
        setAcademicResult(result.text || "");
        return;
      } else if (activeAcademicTool === 'research-assistant') {
        if (!academicInput.trim()) throw new Error("تکایە بابەت یان تێکستەکە بنووسە");
        const prompt = `Act as a professional Research Assistant. Based on this input: "${academicInput}", write a high-quality ${researchPart} in the same language as the input. Use academic and formal language.`;
        const result = await genAI.models.generateContent({
          model: MODELS.fast,
          contents: [{ parts: [{ text: prompt }] }]
        });
        setAcademicResult(result.text || "");
        return;
      } else if (activeAcademicTool === 'lecture-notes') {
        if (!selectedFile && !academicInput.trim()) throw new Error("تکایە فایلی دەنگی یان ڤیدیۆی وانەکە هەڵبژێرە یان تۆماری بکە");

        if (selectedFile) {
          const base64 = await fileToBase64(selectedFile);
          const isVideo = selectedFile.type.startsWith('video/');
          const result = await genAI.models.generateContent({
            model: MODELS.fast,
            contents: {
              parts: [
                { inlineData: { data: base64, mimeType: selectedFile.type } },
                { text: `Analyze this ${isVideo ? 'video' : 'audio'} lecture and organize it into professional academic notes with bullet points and headings. The language of the notes should match the language of the lecture.` }
              ]
            }
          });
          setAcademicResult(result.text || "ببورە، هیچ تێبینییەک دروست نەکرا.");
        } else {
          const prompt = `Transcribe the following lecture content and organize it into professional academic notes with bullet points and headings. The output should be formal and structured.
          Language: ${academicLang}
          Lecture Content: "${academicInput}"`;

          const result = await genAI.models.generateContent({
            model: MODELS.fast,
            contents: { parts: [{ text: prompt }] }
          });
          setAcademicResult(result.text || "ببورە، هیچ تێبینییەک دروست نەکرا.");
        }
        return;
      } else if (activeAcademicTool === 'citation-generator') {
        if (!academicInput.trim()) throw new Error("تکایە زانیاری سەرچاوەکە بنووسە");
        prompt = `Generate a ${citationFormat} citation for the following source information: ${academicInput}. Respond only with the formatted citation.`;
        contents = prompt;
      } else if (activeAcademicTool === 'grammar-checker') {
        if (!academicInput.trim()) throw new Error("تکایە تێکستەکە لێرە بنووسە");
        prompt = `Check the grammar and spelling of the following text. Provide the corrected version and a brief explanation of the changes in the same language as the input: ${academicInput}`;
        contents = prompt;
      } else if (activeAcademicTool === 'study-planner') {
        if (!studySubjects.trim()) throw new Error("تکایە بابەتەکان بنووسە");
        prompt = `Create a smart study plan for the following subjects: ${studySubjects}. The duration is ${studyDuration}. Provide the plan in a clear, organized format in the same language as the input.`;
        contents = prompt;
      } else if (activeAcademicTool === 'plagiarism-checker') {
        if (!academicInput.trim()) throw new Error("تکایە دەقەکە بنووسە");
        prompt = `Check the following text for potential plagiarism. Provide a detailed report including similarity percentage (estimated) and suggestions for paraphrasing to avoid plagiarism. Respond in the same language as the input: ${academicInput}`;
        contents = prompt;
      } else if (activeAcademicTool === 'reference-manager') {
        if (!academicInput.trim()) throw new Error("تکایە زانیاری سەرچاوەکان بنووسە");
        prompt = `Organize the following source information into a professional bibliography or reference list. Use the ${citationFormat} style. Respond in the same language as the input: ${academicInput}`;
        contents = prompt;
      } else if (activeAcademicTool === 'gpa-calculator') {
        if (!academicInput.trim()) throw new Error("تکایە نمرەکان و یەکەکان بنووسە (بۆ نموونە: Math: 90, 3 credits)");
        prompt = `Calculate the GPA based on the following grades and credits: ${academicInput}. Provide a clear breakdown of the calculation and the final GPA. Respond in the same language as the input.`;
        contents = prompt;
      } else if (activeAcademicTool === 'video-summarizer') {
        if (!academicInput.trim()) throw new Error("تکایە لینکی ڤیدیۆکە یان وەسفەکەی بنووسە");
        prompt = `Summarize the content of the video based on this input: ${academicInput}. Provide key takeaways and a concise summary in the same language as the input.`;
        contents = prompt;
      } else if (activeAcademicTool === 'image-gen') {
        if (!academicInput.trim()) throw new Error("تکایە وەسفی وێنەکە بنووسە");
        setIsAcademicLoading(true);
        try {
          const response = await genAI.models.generateContent({
            model: MODELS.image,
            contents: { parts: [{ text: academicInput }] },
            config: { imageConfig: { aspectRatio: "1:1" } }
          });
          const partsList = response?.candidates?.[0]?.content?.parts || [];
          for (const part of partsList) {
            if (part.inlineData) {
              const imageUrl = `data:image/png;base64,${part.inlineData.data}`;
              setAcademicResult(`![Generated Image](${imageUrl})`);
              return;
            }
          }
          throw new Error("نەتوانرا وێنەکە دروست بکرێت");
        } catch (err: any) {
          alert(err.message || "هەڵەیەک لە دروستکردنی وێنەدا ڕوویدا");
          return;
        } finally {
          setIsAcademicLoading(false);
        }
      } else if (activeAcademicTool === 'voice-assistant') {
        if (!academicInput.trim()) throw new Error("تکایە پرسیارەکە بنووسە");
        prompt = `Act as a helpful academic voice assistant. Provide a concise and clear answer to this query: "${academicInput}". Respond in the same language as the input.`;
        contents = prompt;
      } else if (activeAcademicTool === 'daily-goals') {
        if (!academicInput.trim()) throw new Error("تکایە ئامانجەکان یان کارەکانت بنووسە");
        prompt = `Based on the following input: "${academicInput}", create a structured list of daily academic goals and a schedule to achieve them. Respond in the same language as the input.`;
        contents = prompt;
      } else if (activeAcademicTool === 'profile') {
        if (!academicInput.trim()) throw new Error("تکایە زانیارییەکانت بنووسە");
        prompt = `Generate a professional academic profile or CV summary based on the following information: "${academicInput}". Use formal and academic language. Respond in the same language as the input.`;
        contents = prompt;
      } else if (activeAcademicTool === 'formula-editor') {
        if (!academicInput.trim()) throw new Error("تکایە وەسفی هاوکێشەکە بنووسە");
        prompt = `Convert the following description into a professional LaTeX formula: "${academicInput}". Provide only the LaTeX code.`;
        contents = prompt;
      } else if (activeAcademicTool === 'pdf-annotation') {
        if (!selectedFile) throw new Error("تکایە فایلێکی PDF هەڵبژێرە");
        const base64 = await fileToBase64(selectedFile);
        const result = await genAI.models.generateContent({
          model: MODELS.fast,
          contents: [{
            parts: [
              { inlineData: { data: base64, mimeType: "application/pdf" } },
              { text: "Provide detailed annotations, key insights, and critical analysis for this PDF content. Highlight the most important parts. Respond in the same language as the document." }
            ]
          }]
        });
        setAcademicResult(result.text || "");
        return;
      } else if (activeAcademicTool === 'audio-to-mindmap') {
        if (!selectedFile) throw new Error("تکایە فایلێکی دەنگی هەڵبژێرە");
        const base64 = await fileToBase64(selectedFile);
        const result = await genAI.models.generateContent({
          model: MODELS.fast,
          contents: [{
            parts: [
              { inlineData: { data: base64, mimeType: selectedFile.type } },
              { text: "Transcribe this audio and generate a structured mind map in text format (using indentation or bullet points) that represents the main ideas and their connections. Respond in the same language as the audio." }
            ]
          }]
        });
        setAcademicResult(result.text || "");
        return;
      } else if (activeAcademicTool === 'flashcard-spaced') {
        if (!academicInput.trim()) throw new Error("تکایە زانیاری فلاشکاردەکان بنووسە");
        prompt = `Based on these flashcards or topics: "${academicInput}", create a spaced repetition study schedule (Anki style) for the next 30 days. Respond in the same language as the input.`;
        contents = prompt;
      } else if (activeAcademicTool === 'group-study') {
        if (!academicInput.trim()) throw new Error("تکایە بابەتەکە و ناوی ئەندامەکان بنووسە");
        prompt = `Create a collaborative study plan for a group based on: "${academicInput}". Assign roles and tasks to ensure effective learning. Respond in the same language as the input.`;
        contents = prompt;
      } else if (activeAcademicTool === 'exam-countdown') {
        if (!academicInput.trim()) throw new Error("تکایە ناوی تاقیکردنەوەکە و کاتەکەی بنووسە");
        prompt = `Calculate the remaining time and create a detailed study countdown and strategy for the upcoming exam: "${academicInput}". Respond in the same language as the input.`;
        contents = prompt;
      } else if (activeAcademicTool === 'handwriting-to-text') {
        if (!selectedFile) throw new Error("تکایە وێنەی دەستوخەتەکە هەڵبژێرە");
        const base64 = await fileToBase64(selectedFile);
        const result = await genAI.models.generateContent({
          model: MODELS.fast,
          contents: [{
            parts: [
              { inlineData: { data: base64, mimeType: selectedFile.type } },
              { text: "Convert this handwritten text in the image into accurate digital text. Maintain the original formatting as much as possible. Respond in the same language as the handwriting." }
            ]
          }]
        });
        setAcademicResult(result.text || "");
        return;
      } else if (activeAcademicTool === 'code-debugger') {
        if (!academicInput.trim()) throw new Error("تکایە کۆدەکە بنووسە");
        prompt = `Act as an expert software engineer. Debug the following code, explain the errors, and provide the fixed version: "${academicInput}". Respond in the same language as the input.`;
        contents = prompt;
      } else if (activeAcademicTool === 'sentiment-analysis') {
        if (!academicInput.trim()) throw new Error("تکایە دەقەکە بنووسە");
        prompt = `Analyze the sentiment and tone of the following academic text: "${academicInput}". Provide a detailed analysis of the emotions and perspective expressed. Respond in the same language as the input.`;
        contents = prompt;
      } else if (activeAcademicTool === 'career-advisor') {
        if (!academicInput.trim()) throw new Error("تکایە ئارەزووەکانت و بوارەکەت بنووسە");
        prompt = `Act as a professional career advisor. Based on these academic interests and background: "${academicInput}", provide personalized career advice and potential job paths. Respond in the same language as the input.`;
        contents = prompt;
      } else if (activeAcademicTool === 'learning-path') {
        if (!academicInput.trim()) throw new Error("تکایە ئەو بابەتە بنووسە کە دەتەوێت فێری بیت");
        prompt = `Create a comprehensive, step-by-step learning path for: "${academicInput}". Include recommended resources, milestones, and estimated timeframes. Respond in the same language as the input.`;
        contents = prompt;
      } else if (activeAcademicTool === 'debate-partner') {
        if (!academicInput.trim()) throw new Error("تکایە بابەتەکە بنووسە");
        prompt = `Act as a highly intellectual debate partner. Engage in a debate on the topic: "${academicInput}". Present strong counter-arguments and challenge the user's perspective. Respond in the same language as the input.`;
        contents = prompt;
      } else if (activeAcademicTool === 'grammar-pro') {
        if (!academicInput.trim()) throw new Error("تکایە دەقەکە بنووسە");
        prompt = `ئەنجامدانی پشکنینی ڕێزمانی پێشکەوتوو بۆ ئەم دەقە: "${academicInput}". هەڵەکان چاک بکەرەوە و ڕوونکردنەوە بدە.`;
        contents = prompt;
      } else if (activeAcademicTool === 'vocab-builder') {
        if (!academicInput.trim()) throw new Error("تکایە بابەتەکە بنووسە");
        prompt = `لیستێکی وشەی نوێ و گرنگ پەیوەست بەم بابەتە دروست بکە: "${academicInput}". مانا و نموونەیان بۆ دابنێ.`;
        contents = prompt;
      } else if (activeAcademicTool === 'speed-reading') {
        if (!academicInput.trim()) throw new Error("تکایە دەقەکە بنووسە");
        prompt = `ڕاهێنانی خوێندنەوەی خێرا بۆ ئەم دەقە دروست بکە: "${academicInput}".`;
        contents = prompt;
      } else if (activeAcademicTool === 'focus-timer') {
        if (!academicInput.trim()) throw new Error("تکایە ئەرکەکە بنووسە");
        prompt = `خشتەیەکی پۆمۆدۆرۆ (Pomodoro) بۆ ئەم ئەرکە دابنێ: "${academicInput}".`;
        contents = prompt;
      } else if (activeAcademicTool === 'thesis-gen') {
        if (!academicInput.trim()) throw new Error("تکایە بابەتەکە بنووسە");
        prompt = `دروستکردنی تێزی سەرەکی (Thesis Statement) بۆ ئەم بابەتە: "${academicInput}".`;
        contents = prompt;
      } else if (activeAcademicTool === 'essay-outliner') {
        if (!academicInput.trim()) throw new Error("تکایە بابەتەکە بنووسە");
        prompt = `دروستکردنی پلان و نەخشەی نووسینی وتار (Essay Outline) بۆ ئەم بابەتە: "${academicInput}".`;
        contents = prompt;
      } else if (activeAcademicTool === 'case-study') {
        if (!academicInput.trim()) throw new Error("تکایە کەیسەکە بنووسە");
        prompt = `شیکردنەوەی ئەم کەیسە (Case Study): "${academicInput}". خاڵە بەهێز و لاوازەکان دیاری بکە.`;
        contents = prompt;
      } else if (activeAcademicTool === 'lab-report') {
        if (!academicInput.trim()) throw new Error("تکایە تاقیکردنەوەکە بنووسە");
        prompt = `ئامادەکردنی ڕاپۆرتی تاقیگە بۆ ئەم تاقیکردنەوەیە: "${academicInput}".`;
        contents = prompt;
      } else if (activeAcademicTool === 'creative-writing') {
        if (!academicInput.trim()) throw new Error("تکایە بابەتەکە بنووسە");
        prompt = `سەرەتایەکی داهێنەرانە بۆ نووسین دەربارەی ئەم بابەتە پێشنیار بکە: "${academicInput}".`;
        contents = prompt;
      } else if (activeAcademicTool === 'peer-review') {
        if (!academicInput.trim()) throw new Error("تکایە دەقەکە بنووسە");
        prompt = `وەک هەڵسەنگێنەرێک (Peer Reviewer) سەیری ئەم دەقە بکە و تێبینی بدە: "${academicInput}".`;
        contents = prompt;
      } else if (activeAcademicTool === 'presentation-coach') {
        if (!academicInput.trim()) throw new Error("تکایە بابەتەکە بنووسە");
        prompt = `ئامۆژگاری و ڕێنمایی بۆ پێشکەشکردنی سیمینار دەربارەی ئەم بابەتە: "${academicInput}".`;
        contents = prompt;
      } else if (activeAcademicTool === 'interview-prep') {
        if (!academicInput.trim()) throw new Error("تکایە کارەکە بنووسە");
        prompt = `ئامادەکاری بۆ چاوپێکەوتن بۆ ئەم کارە یان بوارە: "${academicInput}". پرسیارە باوەکان و وەڵامەکان.`;
        contents = prompt;
      } else if (activeAcademicTool === 'resume-builder') {
        if (!academicInput.trim()) throw new Error("تکایە بوارەکە بنووسە");
        prompt = `پێشنیار بۆ باشترکردنی سیڤی (Resume) بۆ ئەم بوارە: "${academicInput}".`;
        contents = prompt;
      } else if (activeAcademicTool === 'cover-letter') {
        if (!academicInput.trim()) throw new Error("تکایە پۆستەکە بنووسە");
        prompt = `نووسینی نامەی داواکاری کار (Cover Letter) بۆ ئەم پۆستە: "${academicInput}".`;
        contents = prompt;
      } else if (activeAcademicTool === 'internship-finder') {
        if (!academicInput.trim()) throw new Error("تکایە بوارەکە بنووسە");
        prompt = `چۆن دەتوانم هەلی مەشق (Internship) لەم بوارەدا بدۆزمەوە: "${academicInput}".`;
        contents = prompt;
      } else if (activeAcademicTool === 'scholarship-search') {
        if (!academicInput.trim()) throw new Error("تکایە بوارەکە بنووسە");
        prompt = `ڕێنمایی بۆ دۆزینەوەی زەمالەی خوێندن (Scholarship) بۆ ئەم بوارە: "${academicInput}".`;
        contents = prompt;
      } else if (activeAcademicTool === 'language-immersion') {
        if (!academicInput.trim()) throw new Error("تکایە زمانەکە بنووسە");
        prompt = `پلانی فێربوونی زمان بە شێوەی تێکەڵبوون (Immersion) بۆ ئەم زمانە: "${academicInput}".`;
        contents = prompt;
      } else if (activeAcademicTool === 'cultural-guide') {
        if (!academicInput.trim()) throw new Error("تکایە وڵاتەکە بنووسە");
        prompt = `ڕێنمایی کلتووری و مێژوویی بۆ ئەم وڵاتە یان نەتەوەیە: "${academicInput}".`;
        contents = prompt;
      } else if (activeAcademicTool === 'history-timeline') {
        if (!academicInput.trim()) throw new Error("تکایە ڕووداوەکە بنووسە");
        prompt = `دروستکردنی هێڵی کاتی (Timeline) بۆ ئەم ڕووداوە مێژووییە: "${academicInput}".`;
        contents = prompt;
      } else if (activeAcademicTool === 'geography-explorer') {
        if (!academicInput.trim()) throw new Error("تکایە ناوچەکە بنووسە");
        prompt = `زانیاری ورد و نەخشەیی دەربارەی ئەم ناوچەیە: "${academicInput}".`;
        contents = prompt;
      } else if (activeAcademicTool === 'periodic-table') {
        if (!academicInput.trim()) throw new Error("تکایە توخمەکە بنووسە");
        prompt = `زانیاری دەربارەی ئەم توخمە کیمیاییە: "${academicInput}". تایبەتمەندییەکان و بەکارهێنانەکانی.`;
        contents = prompt;
      } else if (activeAcademicTool === 'physics-sim') {
        if (!academicInput.trim()) throw new Error("تکایە یاساکە بنووسە");
        prompt = `ڕوونکردنەوەی ئەم یاسا فیزیاییە بە نموونەی کرداری: "${academicInput}".`;
        contents = prompt;
      } else if (activeAcademicTool === 'biology-diagram') {
        if (!academicInput.trim()) throw new Error("تکایە بابەتەکە بنووسە");
        prompt = `ڕوونکردنەوەی ئەم دیاردە یان پێکهاتە بایۆلۆژییە: "${academicInput}".`;
        contents = prompt;
      } else if (activeAcademicTool === 'chemistry-reaction') {
        if (!academicInput.trim()) throw new Error("تکایە کارلێکەکە بنووسە");
        prompt = `پێشبینیکردنی ئەنجامی ئەم کارلێکە کیمیاییە: "${academicInput}".`;
        contents = prompt;
      } else if (activeAcademicTool === 'math-proof') {
        if (!academicInput.trim()) throw new Error("تکایە بیردۆزەکە بنووسە");
        prompt = `سەلماندنی ئەم بیردۆزە یان هاوکێشە بیرکارییە: "${academicInput}".`;
        contents = prompt;
      } else if (activeAcademicTool === 'stats-calc') {
        if (!academicInput.trim()) throw new Error("تکایە داتاکان بنووسە");
        prompt = `شیکردنەوەی ئاماری بۆ ئەم داتایانە: "${academicInput}".`;
        contents = prompt;
      } else if (activeAcademicTool === 'philosophy-logic') {
        if (!academicInput.trim()) throw new Error("تکایە بیرۆکەکە بنووسە");
        prompt = `پشکنینی لۆژیکی بۆ ئەم بیرۆکە فەلسەفییە: "${academicInput}".`;
        contents = prompt;
      } else if (activeAcademicTool === 'art-analyzer') {
        if (!academicInput.trim()) throw new Error("تکایە کارەکە بنووسە");
        prompt = `شیکردنەوەی شێوازی هونەری ئەم کارە یان هونەرمەندە: "${academicInput}".`;
        contents = prompt;
      } else if (activeAcademicTool === 'music-theory') {
        if (!academicInput.trim()) throw new Error("تکایە بابەتەکە بنووسە");
        prompt = `ڕوونکردنەوەی ئەم بابەتەی تیۆری مۆسیقا: "${academicInput}".`;
        contents = prompt;
      } else if (activeAcademicTool === 'coding-ideas') {
        if (!academicInput.trim()) throw new Error("تکایە زمانەکە بنووسە");
        prompt = `پێشنیارکردنی ٥ پڕۆژەی کۆدینگ بۆ ئەم زمانە یان ئاستە: "${academicInput}".`;
        contents = prompt;
      }

      const result = await genAI.models.generateContent({
        model: MODELS.fast,
        contents: contents || [{ parts: [{ text: prompt }] }],
      });
      setAcademicResult(result.text || "");
    } catch (error: any) {
      alert(error.message || "هەڵەیەک ڕوویدا");
    } finally {
      setIsAcademicLoading(false);
    }
  };

  const handlePdfChat = async () => {
    if (!pdfChatInput.trim() || isPdfChatLoading || !selectedFile) return;
    if (!incrementUsage()) return;

    const userMsg = pdfChatInput;
    setPdfChatInput('');
    setPdfChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsPdfChatLoading(true);

    try {
      const base64 = await fileToBase64(selectedFile);

      const newHistory = [...pdfChatHistory];

      const result = await genAI.models.generateContent({
        model: MODELS.fast,
        contents: [
          {
            role: 'user',
            parts: [
              { inlineData: { data: base64, mimeType: "application/pdf" } },
              { text: "Context: This is a PDF document. Analyze it and be ready to answer questions. Maintain a formal academic tone. Use professional Kurdish Sorani if asked in that language." }
            ]
          },
          ...newHistory,
          {
            role: 'user',
            parts: [{ text: userMsg }]
          }
        ]
      });

      const aiResponse = result.text || "ببورە، نەمتوانی وەڵامەکەت بدەمەوە.";
      setPdfChatMessages(prev => [...prev, { role: 'model', text: aiResponse }]);

      setPdfChatHistory(prev => [
        ...prev,
        { role: 'user', parts: [{ text: userMsg }] },
        { role: 'model', parts: [{ text: aiResponse }] }
      ].slice(-20)); // Keep last 10 exchanges

    } catch (error) {
      console.error("PDF Chat Error:", error);
      setPdfChatMessages(prev => [...prev, { role: 'model', text: 'هەڵەیەک ڕوویدا لە کاتی چات کردن لەگەڵ PDF. تکایە دڵنیابە فایلەکە زۆر گەورە نییە.' }]);
    } finally {
      setIsPdfChatLoading(false);
    }
  };

  const handleScholarSearch = () => {
    if (!scholarQuery.trim()) return;
    window.open(`https://scholar.google.com/scholar?q=${encodeURIComponent(scholarQuery)}`, '_blank');
  };

  const handleQuizAnswer = (index: number) => {
    if (index === quizQuestions[currentQuizIndex].correctIndex) {
      setQuizScore(prev => prev + 1);
    }

    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      setShowQuizResult(true);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = (content: string, filename: string) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadPDF = (filename: string) => {
    if (!academicPdfRef.current) return;

    const element = academicPdfRef.current;
    element.classList.add('pdf-content');

    // @ts-ignore
    const opt = {
      margin: [10, 10, 10, 10],
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        backgroundColor: '#ffffff'
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // @ts-ignore
    html2pdf().from(element).set(opt).save().then(() => {
      element.classList.remove('pdf-content');
    });
  };

  return (
    <div className={`min-h-screen font-sans ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`} dir="rtl">
      <GlobalStyles />
      <AnimatePresence>
        {showOfficialModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOfficialModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative w-full max-w-md ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border-2 rounded-[3rem] p-8 shadow-2xl overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-600/10 rounded-full -mr-16 -mt-16 blur-3xl" />

              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-20 h-20 bg-sky-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-sky-600/30 mb-4">
                  <Headset size={40} />
                </div>
                <h3 className="text-2xl font-black">هەژماری فەرمی ئەپ</h3>
                <p className="opacity-50 text-sm font-bold">Official App Support</p>
              </div>

              <div className="space-y-4">
                <a
                  href={`tel:${officialAccount.phone}`}
                  className={`flex items-center justify-between p-5 rounded-2xl ${isDarkMode ? 'bg-slate-800 hover:bg-slate-750' : 'bg-slate-50 hover:bg-slate-100'} transition-all group`}
                >
                  <div className="w-10 h-10 bg-sky-600/20 text-sky-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone size={20} />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black opacity-40 uppercase">ژمارەی تەلەفۆن</p>
                    <p className="font-bold">{officialAccount.phone}</p>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${officialAccount.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-5 rounded-2xl ${isDarkMode ? 'bg-slate-800 hover:bg-slate-750' : 'bg-slate-50 hover:bg-slate-100'} transition-all group`}
                >
                  <div className="w-10 h-10 bg-emerald-500/20 text-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle size={20} />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black opacity-40 uppercase">وەتسئەپ</p>
                    <p className="font-bold">پەیوەندی بکە</p>
                  </div>
                </a>

                <a
                  href={officialAccount.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-5 rounded-2xl ${isDarkMode ? 'bg-slate-800 hover:bg-slate-750' : 'bg-slate-50 hover:bg-slate-100'} transition-all group`}
                >
                  <div className="w-10 h-10 bg-sky-500/20 text-sky-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Send size={20} />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black opacity-40 uppercase">گرووپی تێلیگرام</p>
                    <p className="font-bold">گرووپی تێلیگرام</p>
                  </div>
                </a>
              </div>

              <button
                onClick={() => setShowOfficialModal(false)}
                className="w-full mt-8 py-4 bg-sky-600 text-white rounded-2xl font-black shadow-lg hover:bg-sky-600 transition-colors"
              >
                داخستن
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentScreen === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 flex flex-col transition-colors duration-700 animate-gradient ${isDarkMode ? 'bg-gradient-to-br from-slate-950 via-sky-900/40 to-slate-950' : 'bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600'}`}
          >
            {/* Main Scrollable Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar px-6 relative z-10">
              {/* Top Utility Bar - Now inside scrollable content to prevent overlaps */}
              <div className="w-full py-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCurrentScreen('profile')}
                    className="p-3.5 bg-white/10 rounded-2xl hover:bg-sky-600 hover:text-white transition-all border border-white/10 backdrop-blur-2xl shadow-lg active:scale-95"
                  >
                    <User size={22} className="text-white" />
                  </button>
                  <button
                    onClick={() => setShowOfficialModal(true)}
                    className="p-3.5 bg-white/10 rounded-2xl hover:bg-sky-600 hover:text-white transition-all border border-white/10 backdrop-blur-2xl shadow-lg active:scale-95"
                  >
                    <Headset size={22} className="text-white" />
                  </button>

                  {/* Usage Chip */}
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => setShowProModal(true)}
                    className={`px-4 py-2.5 rounded-2xl flex items-center gap-2 border backdrop-blur-xl transition-all ${isPro ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-white/10 border-white/5 hover:bg-white/20'}`}
                  >
                    {isPro ? (
                      <>
                        <Crown size={14} className="text-yellow-400" />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">تایبەت بە پڕۆ (Pro)</span>
                      </>
                    ) : (
                      <>
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-600 animate-pulse" />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">
                          {FREE_DAILY_LIMIT - dailyUsageCount} دانە ماوەتەوە
                        </span>
                      </>
                    )}
                  </motion.button>
                </div>

                <div className="flex items-center gap-3">
                  {!isPro && (
                    <motion.button
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowProModal(true)}
                      className="bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 text-black px-5 py-3 rounded-2xl font-black text-[10px] uppercase tracking-wider shadow-xl shadow-yellow-500/30 flex items-center gap-2 border border-yellow-200/50"
                    >
                      <Zap size={14} fill="currentColor" className="animate-pulse" />
                      بەدەستهێنانی پڕۆ
                    </motion.button>
                  )}
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="p-3.5 bg-white/10 rounded-2xl hover:bg-sky-600 hover:text-white transition-all border border-white/10 backdrop-blur-2xl shadow-lg active:scale-95"
                  >
                    {isDarkMode ? <Sun size={22} className="text-white" /> : <Moon size={22} className="text-white" />}
                  </button>
                </div>
              </div>

              {/* Hero Section (Logo & Title) - This will scroll away */}
              <div className="flex flex-col items-center justify-center pt-4 pb-10 text-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0, rotate: -20 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, duration: 1.5 }}
                  className="mb-6 relative group cursor-pointer"
                  onClick={handleLogoClick}
                >
                  <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full group-hover:bg-white/30 transition-all duration-700" />
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="relative p-5 bg-white/10 rounded-[2.5rem] backdrop-blur-2xl shadow-[0_0_40px_rgba(255,255,255,0.1)] border border-white/20 group-hover:scale-[1.02] active:scale-[0.98] transition-transform duration-700 ease-out"
                  >
                    <GraduationCap size={75} strokeWidth={1.5} className="text-white" />
                  </motion.div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    backgroundPosition: ["200% center", "-200% center"]
                  }}
                  transition={{
                    opacity: { delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                    y: { delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                    backgroundPosition: { repeat: Infinity, duration: 8, ease: "linear" }
                  }}
                  className="text-5xl md:text-7xl font-black mb-3 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-600 to-white bg-[length:200%_auto] drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform duration-700 ease-out"
                >
                  Academic AI Kurdish
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="text-white/60 font-medium tracking-[0.3em] uppercase text-[10px] mb-4"
                >
                  پەرەپێدراوە لەلایەن: محەمەد سەفەر
                </motion.p>

                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 40, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                  className="h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full mb-10"
                />

                {/* Advertisement Banner */}
                <AnimatePresence>
                  {ad.active && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full max-w-md mb-10 relative"
                    >
                      <a
                        href={ad.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl ${isDarkMode ? 'bg-slate-900/80 backdrop-blur-xl' : 'bg-white/10 backdrop-blur-3xl'}`}
                      >
                        <div className="relative h-44">
                          <img
                            src={ad.imageUrl}
                            alt={ad.title}
                            className="w-full h-full object-cover opacity-60"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end">
                            <span className="text-[10px] bg-yellow-400 text-black px-2 py-0.5 rounded-md font-black w-fit mb-2 uppercase tracking-widest">سپۆنسەر کراوە</span>
                            <h4 className="text-white text-xl font-black mb-1">{ad.title}</h4>
                            <p className="text-white/70 text-xs font-bold leading-tight line-clamp-2">{ad.description}</p>
                          </div>
                        </div>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Search Bar - Integrated for better UX */}
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.9, type: "spring", stiffness: 200, damping: 20 }}
                  className="w-full max-w-md relative group mt-2"
                >
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <Search size={18} className="text-white/40 group-focus-within:text-white transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="بگەڕێ بۆ ئامرازەکان..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pr-12 pl-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-right font-medium shadow-xl"
                  />
                </motion.div>

                {/* Ultra Smart Chat Button - Sky Blue Edition */}
                <motion.button
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentScreen('ultra-chat')}
                  className="relative group mt-12 w-full max-w-lg mx-auto"
                >
                  {/* Glowing Aura - Sky Blue */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-sky-500 to-sky-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

                  <div className={`relative flex items-center justify-between px-10 py-8 rounded-[2.5rem] border-2 backdrop-blur-3xl transition-all duration-700 overflow-hidden group-hover:border-sky-400/50 ${isDarkMode ? 'bg-slate-900/80 border-white/10 shadow-[0_0_50px_-12px_rgba(14,165,233,0.3)]' : 'bg-white/80 border-sky-100 shadow-[0_20px_50px_-12px_rgba(14,165,233,0.15)] hover:shadow-sky-500/10'}`}>

                    {/* Animated Background Gradients */}
                    <div className="absolute top-0 -right-20 w-40 h-40 bg-sky-400/10 blur-[60px] rounded-full group-hover:bg-sky-400/20 transition-all duration-700"></div>
                    <div className="absolute bottom-0 -left-20 w-40 h-40 bg-cyan-400/10 blur-[60px] rounded-full group-hover:bg-cyan-400/20 transition-all duration-700"></div>

                    <div className="flex items-center gap-6 relative z-10">
                      <div className="relative">
                        <div className="absolute inset-0 bg-sky-400 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div className="bg-gradient-to-br from-cyan-400 via-sky-500 to-sky-600 p-5 rounded-[1.75rem] text-white shadow-xl rotate-3 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500">
                          <Cpu size={36} className="animate-spin-slow" />
                        </div>
                      </div>
                      <div className="text-right">
                        <h3 className={`text-2xl font-black mb-1 flex items-center gap-2 justify-end ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          ئەلترا چاتی زۆر زیرەک
                          <Sparkles size={20} className="text-sky-400 animate-pulse" />
                        </h3>
                      </div>
                    </div>

                    <div className={`p-4 rounded-2xl transition-all duration-500 ${isDarkMode ? 'bg-white/5 group-hover:bg-white/10 group-hover:text-sky-400' : 'bg-sky-50 group-hover:bg-sky-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-sky-500/30'}`}>
                      <ChevronRight size={24} className={`transition-all duration-500 group-hover:translate-x-1`} />
                    </div>

                    {/* Feature Count Badge */}
                    <div className="absolute top-4 right-8 bg-sky-600 text-white text-[8px] font-black px-3 py-1 rounded-full shadow-lg ring-2 ring-white/10">
                      ULTRA V2.0
                    </div>
                  </div>
                </motion.button>
              </div>

              {/* Tools Grid */}
              <div className="w-full max-w-2xl mx-auto pb-20">
                <div className="grid grid-cols-2 gap-4 w-full">
                  {[
                    { id: 'translator', icon: <Languages size={32} />, label: 'وەرگێڕان', color: 'indigo', hoverDark: 'hover:bg-sky-600/20', hoverLight: 'hover:bg-sky-600/10' },
                    { id: 'chat', icon: <MessageSquareText size={32} />, label: 'چاتی زیرەک', color: 'emerald', hoverDark: 'hover:bg-emerald-500/20', hoverLight: 'hover:bg-emerald-500/10' },
                    { id: 'scholar', icon: <Search size={32} />, label: 'گەڕانی ئەکادیمی', color: 'sky', hoverDark: 'hover:bg-sky-500/20', hoverLight: 'hover:bg-sky-500/10' },
                    { id: 'multimodal', icon: <Sparkles size={32} />, label: 'فرەکارەکان', color: 'rose', hoverDark: 'hover:bg-rose-500/20', hoverLight: 'hover:bg-rose-500/10' },
                    { id: 'academic-tools', icon: <GraduationCap size={32} />, label: 'ئامرازەکان', color: 'zinc', hoverDark: 'hover:bg-zinc-500/20', hoverLight: 'hover:bg-zinc-500/10' },
                    { id: 'history', icon: <History size={32} />, label: 'مێژوو', color: 'slate', hoverDark: 'hover:bg-slate-500/20', hoverLight: 'hover:bg-slate-500/10' },
                    { id: 'citations', icon: <Library size={32} />, label: 'سەرچاوەکان', color: 'teal', hoverDark: 'hover:bg-teal-500/20', hoverLight: 'hover:bg-teal-500/10' },
                    { id: 'pomodoro', icon: <Coffee size={32} />, label: 'کاتی خوێندن', color: 'rose', hoverDark: 'hover:bg-rose-500/20', hoverLight: 'hover:bg-rose-500/10' },
                    { id: 'mindmap', icon: <GitGraph size={32} />, label: 'نەخشەی مێشک', color: 'fuchsia', hoverDark: 'hover:bg-fuchsia-500/20', hoverLight: 'hover:bg-fuchsia-500/10', tool: 'mind-map' },
                    { id: 'lecture-notes', icon: <FileAudio size={32} />, label: 'تۆماری وانە', color: 'cyan', hoverDark: 'hover:bg-cyan-500/20', hoverLight: 'hover:bg-cyan-500/10', tool: 'lecture-notes' },
                    { id: 'generators-report', icon: <FileText size={32} />, label: 'ڕاپۆرت', color: 'orange', hoverDark: 'hover:bg-orange-500/20', hoverLight: 'hover:bg-orange-500/10', screen: 'generators', tool: 'report-gen' },
                    { id: 'generators-seminar', icon: <Presentation size={32} />, label: 'سیمینار', color: 'purple', hoverDark: 'hover:bg-purple-500/20', hoverLight: 'hover:bg-purple-500/10', screen: 'generators', tool: 'seminar-gen' },
                  ].map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, y: 40, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: false, amount: 0.1 }}
                      whileHover={{ scale: 1.05, y: -8 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ delay: (index % 2) * 0.05, type: "spring", stiffness: 300, damping: 20 }}
                      onClick={() => {
                        window.scrollTo(0, 0);
                        setAcademicResult(null);
                        setAcademicInput('');
                        setSelectedFile(null);
                        if (item.screen) {
                          setCurrentScreen(item.screen as any);
                          if (item.tool) setActiveAcademicTool(item.tool as any);
                        } else {
                          setCurrentScreen(item.id as any);
                          if (item.tool) setActiveAcademicTool(item.tool as any);
                        }
                      }}
                      className={`col-span-1 relative overflow-hidden h-44 flex flex-col items-center justify-center gap-4 p-6 rounded-[2.5rem] border-2 transition-all duration-700 group ${isDarkMode
                        ? `bg-slate-900/40 border-white/10 hover:border-sky-500/50 shadow-2xl`
                        : `bg-white border-slate-100 hover:border-sky-300 shadow-xl shadow-slate-200/50`
                        }`}
                    >
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 blur-3xl rounded-full transition-all group-hover:bg-sky-500/15" />
                      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full transition-all group-hover:bg-cyan-500/15" />

                      <div className={`p-5 rounded-3xl transition-all duration-700 group-hover:scale-125 group-hover:rotate-6 shadow-xl ${isDarkMode
                        ? 'bg-white/5 text-sky-400 group-hover:bg-sky-500/20'
                        : 'bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white shadow-sky-100'
                        }`}>
                        {item.icon}
                      </div>

                      <div className="flex flex-col items-center">
                        <span className={`font-black text-base tracking-tight ${isDarkMode ? 'text-white/90' : 'text-slate-800'}`}>
                          {item.label}
                        </span>
                        <div className={`mt-2 w-0 h-1 bg-sky-500 rounded-full transition-all duration-500 group-hover:w-full`} />
                      </div>

                      {/* Hover Arrow */}
                      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                        <ArrowLeft size={16} className="text-sky-500" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <div className={`fixed inset-0 overflow-hidden pointer-events-none z-0 transition-opacity duration-1000 ${isDarkMode ? 'opacity-40' : 'opacity-25'}`}>
              <div className={`absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-pulse transition-colors duration-1000 ${isDarkMode ? 'bg-sky-600/40' : 'bg-sky-300'}`} />
              <div className={`absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full blur-[100px] animate-pulse delay-700 transition-colors duration-1000 ${isDarkMode ? 'bg-cyan-600/30' : 'bg-cyan-300'}`} />
              <div className={`absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] rounded-full blur-[150px] animate-pulse delay-1000 transition-colors duration-1000 ${isDarkMode ? 'bg-sky-600/20' : 'bg-sky-200'}`} />
            </div>
          </motion.div>
        ) : currentScreen === 'pomodoro' ? (
          <motion.div
            key="pomodoro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`min-h-screen flex flex-col max-w-2xl mx-auto ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
          >
            <header className="p-6 flex items-center justify-between">
              <button onClick={() => setCurrentScreen('home')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
                <ArrowRight size={24} />
              </button>
              <h2 className="text-2xl font-black">کاتی خوێندن (Pomodoro)</h2>
              <div className="w-10"></div>
            </header>

            <div className="flex-grow flex flex-col items-center justify-center p-6 gap-12">
              {/* Timer Circle */}
              <div className="relative w-72 h-72 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="144"
                    cy="144"
                    r="130"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-slate-200 dark:text-slate-800"
                  />
                  <motion.circle
                    cx="144"
                    cy="144"
                    r="130"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 130}
                    animate={{
                      strokeDashoffset: (2 * Math.PI * 130) * (1 - pomoTime / (pomoMode === 'work' ? 25 * 60 : pomoMode === 'short' ? 5 * 60 : 15 * 60))
                    }}
                    className="text-rose-500"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-6xl font-black font-mono tracking-tighter">
                    {formatPomoTime(pomoTime)}
                  </span>
                  <span className="text-sm font-bold opacity-50 uppercase tracking-widest mt-2">
                    {pomoMode === 'work' ? 'کاتی خوێندن' : pomoMode === 'short' ? 'پشووی کورت' : 'پشووی درێژ'}
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col gap-6 w-full max-w-xs">
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setIsPomoRunning(!isPomoRunning)}
                    className={`flex-1 py-4 rounded-3xl font-black text-xl shadow-xl transition-all active:scale-95 ${isPomoRunning ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white'}`}
                  >
                    {isPomoRunning ? 'ڕاگرتن' : 'دەستپێکردن'}
                  </button>
                  <button
                    onClick={() => { setIsPomoRunning(false); startPomo(pomoMode); }}
                    className="p-4 rounded-3xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 transition-all font-bold"
                  >
                    <RefreshCw size={24} />
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => startPomo('work')}
                    className={`flex-1 py-3 rounded-2xl text-xs font-bold transition-all ${pomoMode === 'work' ? 'bg-rose-500 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}
                  >
                    خوێندن
                  </button>
                  <button
                    onClick={() => startPomo('short')}
                    className={`flex-1 py-3 rounded-2xl text-xs font-bold transition-all ${pomoMode === 'short' ? 'bg-rose-500 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}
                  >
                    پشووی کورت
                  </button>
                  <button
                    onClick={() => startPomo('long')}
                    className={`flex-1 py-3 rounded-2xl text-xs font-bold transition-all ${pomoMode === 'long' ? 'bg-rose-500 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}
                  >
                    پشووی درێژ
                  </button>
                </div>
              </div>

              {/* Tips Section */}
              <div className={`w-full p-6 rounded-[2.5rem] border ${isDarkMode ? 'bg-slate-800/50 border-white/5' : 'bg-rose-50 border-rose-100/50'} flex gap-4 items-center`}>
                <div className="p-3 bg-rose-500 rounded-2xl text-white">
                  <Lightbulb size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-rose-500">تێبینی بۆ خوێندن</h4>
                  <p className="text-xs opacity-70 leading-relaxed">
                    تەکنیکی پۆمۆدۆرۆ یارمەتیت دەدات بۆ تەرکیزی زیاتر و کەمکردنەوەی ماندوێتی مێشک.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : currentScreen === 'citations' ? (
          <motion.div
            key="citations"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={`min-h-screen flex flex-col max-w-2xl mx-auto ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
          >
            <header className="p-6 flex items-center justify-between border-b dark:border-slate-800">
              <button onClick={() => setCurrentScreen('home')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
                <ArrowRight size={24} />
              </button>
              <h2 className="text-xl font-black">ڕێکخستنی سەرچاوەکان</h2>
              <div className="w-10"></div>
            </header>

            <div className="p-6 space-y-6">
              <div className="flex gap-2">
                {['APA', 'MLA', 'Harvard', 'IEEE'].map(style => (
                  <button
                    key={style}
                    onClick={() => setCitationFormat(style)}
                    className={`flex-1 py-3 rounded-2xl font-bold text-xs transition-all ${citationFormat === style ? 'bg-teal-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}
                  >
                    {style}
                  </button>
                ))}
              </div>

              <textarea
                value={academicInput}
                onChange={(e) => setAcademicInput(e.target.value)}
                placeholder="زانیاری سەرچاوە لێرە بنووسە... (بۆ نموونە: ناوی کتێب، نووسەر، ساڵ)"
                className={`w-full p-6 rounded-3xl min-h-[150px] outline-none border-2 focus:border-teal-400 transition-all text-right text-lg ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}
              />

              <button
                onClick={() => { setActiveAcademicTool('citation-generator'); runAcademicTool(); }}
                disabled={isAcademicLoading}
                className="w-full bg-teal-500 text-white py-5 rounded-3xl font-black text-xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                {isAcademicLoading ? <Loader2 className="animate-spin" size={24} /> : <Library size={24} />}
                <span>دروستکردنی سەرچاوە</span>
              </button>

              {academicResult && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-3xl bg-teal-500/10 border-2 border-teal-500/20">
                  <div className="flex justify-between items-center mb-4">
                    <button onClick={() => handleCopy(academicResult)} className="text-teal-600 dark:text-teal-400 p-2 hover:bg-teal-500/10 rounded-xl">
                      <Copy size={20} />
                    </button>
                    <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">سەرچاوەی ئامادە</span>
                  </div>
                  <p className="text-lg text-right font-mono select-all leading-relaxed">{academicResult}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : currentScreen === 'pdf-chat' ? (
          <motion.div
            key="pdf-chat"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`min-h-screen flex flex-col max-w-2xl mx-auto ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
          >
            <header className="p-6 flex items-center justify-between border-b dark:border-slate-800">
              <button onClick={() => setCurrentScreen('home')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
                <ArrowRight size={24} />
              </button>
              <h2 className="text-xl font-black">گفتوگۆ لەگەڵ فایل (PDF)</h2>
              <div className="w-10"></div>
            </header>

            <div className="p-6 flex-grow flex flex-col gap-4 overflow-hidden">
              {!selectedFile ? (
                <div className="flex-grow flex flex-col items-center justify-center gap-6">
                  <div className="w-32 h-32 bg-red-500/10 rounded-[2.5rem] flex items-center justify-center text-red-500">
                    <Upload size={48} />
                  </div>
                  <label className="bg-red-500 text-white px-8 py-4 rounded-2xl font-black text-lg cursor-pointer shadow-xl active:scale-95 transition-all">
                    هەڵبژاردنی فایلی PDF
                    <input type="file" className="hidden" accept="application/pdf" onChange={handleFileChange} />
                  </label>
                  <p className="opacity-50 text-sm">فایلێک هەڵبژێرە تا دەست بکەین بە شیکردنەوەی</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 p-4 bg-red-500/5 rounded-2xl border border-red-500/10 shrink-0">
                    <FileText className="text-red-500" />
                    <span className="text-sm font-bold flex-1 truncate">{selectedFile.name}</span>
                    <button onClick={() => setSelectedFile(null)} className="text-red-500">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="flex-grow overflow-y-auto space-y-4 p-2 no-scrollbar">
                    {pdfChatMessages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[85%] p-4 rounded-[1.5rem] text-sm leading-relaxed ${msg.role === 'user' ? 'bg-red-500 text-white rounded-bl-none shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-br-none border dark:border-slate-700 shadow-sm'}`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {isPdfChatLoading && (
                      <div className="flex justify-end">
                        <Loader2 className="animate-spin text-red-500" size={24} />
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-white dark:bg-slate-800 rounded-[2rem] border dark:border-slate-700 shadow-xl flex gap-3">
                    <button onClick={handlePdfChat} disabled={isPdfChatLoading || !pdfChatInput.trim()} className="bg-red-500 text-white p-4 rounded-2xl shadow-lg active:scale-90 transition-all disabled:opacity-50">
                      <Send size={24} />
                    </button>
                    <input
                      type="text"
                      value={pdfChatInput}
                      onChange={(e) => setPdfChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handlePdfChat()}
                      placeholder="پرسیار لەسەر دەقەکە بکە..."
                      className="flex-1 bg-transparent outline-none text-right font-bold text-lg"
                    />
                  </div>
                </>
              )}
            </div>
          </motion.div>
        ) : currentScreen === 'mindmap' ? (
          <motion.div
            key="mindmap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`min-h-screen flex flex-col max-w-2xl mx-auto ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
          >
            <header className="p-6 flex items-center justify-between">
              <button onClick={() => setCurrentScreen('home')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
                <ArrowRight size={24} />
              </button>
              <h2 className="text-xl font-black">نەخشەی مێشک (Mind Map)</h2>
              <div className="w-10"></div>
            </header>

            <div className="p-6 space-y-6 flex-grow flex flex-col overflow-hidden">
              <div className="bg-fuchsia-500/5 p-4 rounded-3xl border border-fuchsia-500/10 shrink-0">
                <textarea
                  value={academicInput}
                  onChange={(e) => setAcademicInput(e.target.value)}
                  placeholder="بابەتەکە لێرە بنووسە بۆ دروستکردنی نەخشە..."
                  className="w-full bg-transparent outline-none text-right font-bold text-lg min-h-[100px] resize-none"
                />
                <button
                  onClick={() => { setActiveAcademicTool('mind-map'); runAcademicTool(); }}
                  disabled={isAcademicLoading}
                  className="w-full bg-fuchsia-500 text-white py-4 rounded-2xl font-black text-lg shadow-lg mt-4 flex items-center justify-center gap-2"
                >
                  {isAcademicLoading ? <Loader2 className="animate-spin" size={24} /> : <GitGraph size={24} />}
                  <span>دروستکردن</span>
                </button>
              </div>

              {mindMapData && (
                <div className="flex-grow min-h-[400px]">
                  <MindMap data={mindMapData} isDarkMode={isDarkMode} onChange={setMindMapData} />
                </div>
              )}
            </div>
          </motion.div>
        ) : currentScreen === 'lecture-notes' ? (
          <motion.div
            key="lecture-notes"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`min-h-screen flex flex-col max-w-2xl mx-auto ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
          >
            <header className="p-6 flex items-center justify-between border-b dark:border-slate-800">
              <button onClick={() => setCurrentScreen('home')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
                <ArrowRight size={24} />
              </button>
              <h2 className="text-xl font-black">تۆماری وانەکان (Lecture Notes)</h2>
              <div className="w-10"></div>
            </header>

            <div className="p-6 flex flex-col gap-6">
              <div className={`p-8 rounded-[2.5rem] border-2 border-dashed flex flex-col items-center justify-center gap-6 transition-all ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'} hover:border-cyan-400`}>
                <div className={`w-20 h-20 rounded-full flex items-center justify-center ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-cyan-500'} text-white shadow-xl shadow-cyan-500/20`}>
                  {isRecording ? <Mic2 size={40} /> : <Mic size={40} />}
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-black mb-2">{isRecording ? 'خەریکی تۆمارکردنی وانەکەیە...' : 'وانەکە تۆمار بکە'}</h3>
                  <p className="text-sm opacity-50 px-10">
                    {isRecording
                      ? 'مایکرۆفۆنەکە چالاکە. کاتێک تەواو بوویت پەنجە بنێ بە "ڕاگرتن".'
                      : 'دەتوانیت وانەکە پاشەکەوت بکەیت و لەلایەن زیرەکی دەستکردەوە بینووسیتەوە و کورتەی بکەیتەوە.'}
                  </p>
                </div>

                {(academicInput || selectedFile) && (
                  <div className={`w-full p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-100'} text-right text-sm`}>
                    {selectedFile ? (
                      <div className="flex items-center justify-between">
                        <span className="font-mono truncate">{selectedFile.name}</span>
                        <button onClick={() => setSelectedFile(null)} className="text-red-500 p-2"><Trash2 size={16} /></button>
                      </div>
                    ) : (
                      <div className="relative group">
                        <p className="opacity-80 italic max-h-40 overflow-y-auto">{academicInput}</p>
                        <button onClick={() => setAcademicInput('')} className="absolute -top-2 -left-2 p-1 bg-red-500 text-white rounded-full shadow-lg"><X size={12} /></button>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-4 w-full">
                  <button
                    onClick={handleVoiceInput}
                    className={`flex-1 py-4 rounded-2xl font-black flex items-center justify-center gap-2 ${isRecording ? 'bg-red-500 text-white' : 'bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 font-bold border border-cyan-200 dark:border-cyan-500/20 shadow-sm'}`}
                  >
                    {isRecording ? <Timer size={20} className="animate-spin" /> : <Mic size={20} />}
                    {isRecording ? 'ڕاگرتن' : 'تۆمارکردن'}
                  </button>
                  <label className="flex-1 py-4 rounded-2xl font-black bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2 cursor-pointer border border-transparent hover:border-slate-300 dark:hover:border-slate-600 transition-all">
                    <Upload size={20} />
                    فایل
                    <input type="file" className="hidden" accept="audio/*,video/*" onChange={handleFileChange} />
                  </label>
                </div>

                {(academicInput.trim() || selectedFile) && !isAcademicLoading && (
                  <button
                    onClick={() => { setActiveAcademicTool('lecture-notes'); runAcademicTool(); }}
                    className="w-full py-4 rounded-2xl font-black bg-cyan-600 text-white shadow-xl shadow-cyan-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all text-lg"
                  >
                    <Zap size={22} className="fill-current" /> ڕێکخستنی تێبینییەکان
                  </button>
                )}
                {isAcademicLoading && (
                  <div className="w-full py-4 rounded-2xl font-black bg-slate-100 dark:bg-slate-800/80 text-cyan-500 flex items-center justify-center gap-2 border border-cyan-500/20">
                    <Loader2 size={22} className="animate-spin" /> خەریکی شیکردنەوەیە...
                  </div>
                )}
              </div>

              {academicResult && activeAcademicTool === 'lecture-notes' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-[2.5rem] bg-white dark:bg-slate-800 border-2 border-cyan-500/30">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-2">
                      <button onClick={() => handleCopy(academicResult)} className="bg-cyan-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-transform active:scale-95">
                        <Copy size={16} /> کۆپی
                      </button>
                      <button onClick={() => handleDownloadPDF(`lecture_notes_${Date.now()}.pdf`)} className="bg-red-500 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-red-500/20">
                        <Download size={16} /> PDF
                      </button>
                      <button onClick={() => handleDownload(academicResult, `lecture_notes_${Date.now()}.txt`)} className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-transform active:scale-95">
                        <FileText size={16} /> Text
                      </button>
                    </div>
                    <span className="text-xs font-black text-cyan-600">تێبینی وانەکە</span>
                  </div>
                  <div ref={academicPdfRef} className="text-right leading-relaxed text-lg prose dark:prose-invert max-w-none">
                    <ReactMarkdown>{academicResult}</ReactMarkdown>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : currentScreen === 'daily-goals' ? (
          <motion.div
            key="daily-goals"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`min-h-screen flex flex-col max-w-2xl mx-auto ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
          >
            <header className="p-6 flex items-center justify-between border-b dark:border-slate-800">
              <button onClick={() => setCurrentScreen('home')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
                <ArrowRight size={24} />
              </button>
              <h2 className="text-xl font-black">ئامانجە رۆژانەکان (Daily Goals)</h2>
              <div className="w-10"></div>
            </header>

            <div className="p-6 flex flex-col gap-6">
              <div className={`p-6 rounded-[2.5rem] ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border shadow-xl`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-emerald-500 rounded-2xl text-white">
                    <Target size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black">پلانی ئەمڕۆت چییە؟</h3>
                    <p className="text-xs opacity-50">ئەو بابەتانەی دەتەوێت بیخوێنیت بنووسە بۆ خوڵقاندنی خشتەیەکی زیرەک.</p>
                  </div>
                </div>

                <textarea
                  value={academicInput}
                  onChange={(e) => setAcademicInput(e.target.value)}
                  placeholder="بۆ نموونە: ئەمڕۆ دەمەوێت ٣ بەشی بیرکاری تەواو بکەم و پێداچوونەوە بۆ کیمیا بکەم..."
                  className={`w-full h-40 p-5 rounded-3xl border-2 outline-none transition-all ${isDarkMode ? 'bg-slate-900 border-slate-700 focus:border-emerald-500' : 'bg-slate-50 border-slate-200 focus:border-emerald-500'} text-right`}
                />

                <button
                  onClick={() => { setActiveAcademicTool('daily-goals'); runAcademicTool(); }}
                  disabled={isAcademicLoading || !academicInput.trim()}
                  className="w-full mt-4 bg-emerald-600 text-white py-5 rounded-3xl font-black text-xl shadow-xl shadow-emerald-600/20 active:scale-95 transition-all disabled:opacity-50"
                >
                  {isAcademicLoading ? <Loader2 className="animate-spin mx-auto" /> : 'دروستکردنی پلان'}
                </button>
              </div>

              {academicResult && activeAcademicTool === 'daily-goals' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-[2.5rem] bg-white dark:bg-slate-800 border-2 border-emerald-500/30"
                >
                  <div className="flex justify-between items-center mb-6">
                    <button onClick={() => handleCopy(academicResult)} className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
                      <Copy size={16} /> کۆپی
                    </button>
                    <span className="text-xs font-black text-emerald-600">پلان و خشتەی پێشنیارکراو</span>
                  </div>
                  <div className="text-right leading-relaxed whitespace-pre-wrap text-lg">
                    {academicResult}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : currentScreen === 'admin' ? (
          <motion.div
            key="admin"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`min-h-screen flex flex-col max-w-2xl mx-auto p-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
          >
            <header className="flex items-center justify-between mb-8">
              <button onClick={() => setCurrentScreen('home')} className="p-2 hover:bg-white/10 rounded-xl">
                <ArrowRight size={24} />
              </button>
              <h2 className="text-2xl font-bold">بەڕێوەبردنی ئەپ (Admin)</h2>
              <div className="w-10"></div>
            </header>

            <div className="grid grid-cols-1 gap-6">
              {/* User Management Section */}
              <div className={`p-6 rounded-3xl ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border shadow-xl space-y-4`}>
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <User size={20} className="text-sky-600" />
                  بەڕێوەبردنی بەکارهێنەران
                </h3>

                <div className="flex gap-2">
                  <input
                    type="email"
                    value={adminSearchEmail}
                    onChange={(e) => setAdminSearchEmail(e.target.value)}
                    placeholder="ئیمەیڵی بەکارهێنەر بنووسە..."
                    className={`flex-1 p-3 rounded-xl border outline-none focus:ring-2 focus:ring-sky-600 transition-all ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} text-right`}
                  />
                  <button
                    onClick={handleAdminUserSearch}
                    disabled={isAdminSearching || !adminSearchEmail.trim()}
                    className="p-3 bg-sky-600 text-white rounded-xl hover:bg-sky-600 transition-colors disabled:opacity-50"
                  >
                    {isAdminSearching ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
                  </button>
                </div>

                {adminUserResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-3`}
                  >
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-black text-sky-600">{adminUserResult.displayName || 'بەکارهێنەر'}</span>
                      <span className="opacity-50">{adminUserResult.email}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${adminUserResult.isPro ? 'bg-emerald-500/20 text-emerald-500' : 'bg-slate-500/20 text-slate-500'}`}>
                          {adminUserResult.isPro ? 'Pro' : 'Free'}
                        </span>
                      </div>

                      <button
                        onClick={toggleUserProStatus}
                        className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${adminUserResult.isPro ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'}`}
                      >
                        {adminUserResult.isPro ? 'لادانی پڕۆ' : 'کردن بە پڕۆ'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Advertisement Management Section */}
              <div className={`p-6 rounded-3xl ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border shadow-xl space-y-4`}>
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Globe size={20} className="text-sky-500" />
                  بەڕێوەبردنی ریکلام
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-100/10 rounded-2xl">
                    <span className="text-sm font-bold">پیشاندانی ریکلام</span>
                    <button
                      onClick={() => setTempAd({ ...tempAd, active: !tempAd.active })}
                      className={`w-12 h-6 rounded-full relative transition-colors ${tempAd.active ? 'bg-emerald-500' : 'bg-slate-400'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${tempAd.active ? 'right-1' : 'left-1'}`}></div>
                    </button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-black opacity-40 uppercase mr-2">ناوی ریکلام</p>
                    <input
                      type="text"
                      value={tempAd.title}
                      onChange={(e) => setTempAd({ ...tempAd, title: e.target.value })}
                      className={`w-full p-3 rounded-xl border outline-none ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} text-right`}
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-black opacity-40 uppercase mr-2">وەسفی ریکلام</p>
                    <textarea
                      value={tempAd.description}
                      onChange={(e) => setTempAd({ ...tempAd, description: e.target.value })}
                      className={`w-full p-3 rounded-xl border outline-none h-20 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} text-right`}
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-black opacity-40 uppercase mr-2">لینکی ئامانج</p>
                    <input
                      type="text"
                      value={tempAd.link}
                      onChange={(e) => setTempAd({ ...tempAd, link: e.target.value })}
                      className={`w-full p-3 rounded-xl border outline-none ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border-slate-200'} text-left font-mono text-xs`}
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-black opacity-40 uppercase mr-2">لینکی وێنە</p>
                    <input
                      type="text"
                      value={tempAd.imageUrl}
                      onChange={(e) => setTempAd({ ...tempAd, imageUrl: e.target.value })}
                      className={`w-full p-3 rounded-xl border outline-none ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border-slate-200'} text-left font-mono text-xs`}
                    />
                  </div>

                  <button
                    onClick={updateAdConfig}
                    className="w-full bg-sky-500 text-white py-3 rounded-xl font-black shadow-lg shadow-sky-500/20 active:scale-95 transition-all"
                  >
                    پاشەکەوتکردنی ریکلام
                  </button>
                </div>
              </div>

              <div className={`p-6 rounded-3xl ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border shadow-xl`}>
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Brain size={20} className="text-sky-600" />
                  زانیاری گشتی
                </h3>
                <div className="space-y-3 opacity-80">
                  <div className="flex justify-between">
                    <span>وەشانی ئەپ:</span>
                    <span className="font-mono">2.1.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>دۆخی سێرڤەر:</span>
                    <span className="text-emerald-500 font-bold">چالاک</span>
                  </div>
                  <div className="flex justify-between">
                    <span>بەکارهێنەرانی چالاک:</span>
                    <span className="font-mono">1 (تۆ)</span>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-3xl ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border shadow-xl`}>
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Sparkles size={20} className="text-emerald-500" />
                  کۆنتڕۆڵی بەشەکان
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-100/10 rounded-2xl">
                    <span>بەشی وەرگێڕان</span>
                    <div className="w-12 h-6 bg-emerald-500 rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-100/10 rounded-2xl">
                    <span className="flex items-center gap-2">
                      <Crown size={14} className="text-yellow-500" /> باری پڕۆ (Pro)
                    </span>
                    <button
                      onClick={async () => {
                        const newStatus = !isPro;
                        setIsPro(newStatus);
                        if (user) {
                          try {
                            const userDocRef = doc(db, 'users', user.uid);
                            await updateDoc(userDocRef, { isPro: newStatus });
                          } catch (err) {
                            handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`);
                          }
                        }
                      }}
                      className={`w-12 h-6 rounded-full relative transition-all ${isPro ? 'bg-emerald-500' : 'bg-slate-400'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isPro ? 'right-1' : 'left-1'}`}></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-100/10 rounded-2xl opacity-50">
                    <span>بەشی پارە (Premium)</span>
                    <div className="w-12 h-6 bg-slate-400 rounded-full relative">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                <p className="text-xs mt-4 opacity-50 text-center italic">
                  تێبینی: بەشی پارە لە داهاتوودا چالاک دەبێت.
                </p>
              </div>

              <button
                onClick={() => { setIsAdmin(false); setCurrentScreen('home'); }}
                className="mt-8 bg-red-500/10 text-red-500 py-4 rounded-2xl font-bold hover:bg-red-500/20 transition-all"
              >
                چوونەدەرەوە لە ئەدمین
              </button>
            </div>
          </motion.div>
        ) : currentScreen === 'translator' ? (
          <motion.div
            key="translator"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="min-h-screen flex flex-col max-w-2xl mx-auto"
          >
            <header className="bg-white border-b p-4 flex items-center justify-between sticky top-0 z-10">
              <button onClick={() => setCurrentScreen('home')} className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl">
                <ArrowRight size={24} />
              </button>
              <span className="text-xl font-bold">وەرگێڕانی ئەکادیمی</span>
              <div className="w-10"></div>
            </header>

            <div className="p-4 flex flex-col gap-4">
              <div className="bg-white p-3 rounded-2xl shadow-sm border flex items-center gap-3">
                <select
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value)}
                  className="flex-1 bg-slate-50 p-3 rounded-xl border outline-none font-bold text-sm text-center appearance-none"
                >
                  <option value="Auto-detect">دۆزینەوەی زمان</option>
                  <option value="English">English</option>
                  <option value="Arabic">عەرەبی</option>
                  <option value="Kurdish Sorani">سۆرانی</option>
                </select>

                <button
                  onClick={handleSwapLanguages}
                  className="p-3 bg-sky-600 text-white rounded-xl shadow-lg hover:bg-sky-600 transition-all active:scale-90"
                >
                  <ArrowLeftRight size={20} />
                </button>

                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="flex-1 bg-slate-50 p-3 rounded-xl border outline-none font-bold text-sm text-center appearance-none"
                >
                  <option value="Kurdish Sorani">سۆرانی (Sorani)</option>
                  <option value="Kurdish Badini">بادینی (Badini)</option>
                  <option value="English">ئینگلیزی (English)</option>
                  <option value="Arabic">عەرەبی (Arabic)</option>
                </select>
              </div>

              <div className="bg-white rounded-3xl p-5 shadow-sm border min-h-[250px] flex flex-col">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="تێکستەکە لێرە بنووسە یان پەیستی بکە..."
                  className="w-full flex-grow outline-none text-lg resize-none text-right text-slate-800 min-h-[200px]"
                />
                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <div className="flex gap-2">
                    <button
                      onClick={handleVoiceInput}
                      title="قسەکردن"
                      className={`px-4 py-3 rounded-full transition-all flex items-center justify-center gap-2 ${isRecording ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-sky-600'}`}
                    >
                      {isRecording ? (
                        <>
                          <Mic2 size={20} className="animate-pulse" />
                          <span className="text-sm font-bold animate-pulse">گوێگرتن...</span>
                        </>
                      ) : (
                        <Mic size={20} />
                      )}
                    </button>
                    <button
                      onClick={handlePaste}
                      title="پەیست کردن (Paste)"
                      className="px-4 py-3 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-sky-600 transition-all flex items-center justify-center gap-2"
                    >
                      <ClipboardPaste size={20} />
                      <span className="text-sm font-bold">پەیست</span>
                    </button>
                  </div>
                  <button
                    onClick={handleClearAll}
                    title="سڕینەوەی هەمووی"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium text-sm"
                  >
                    <span>سڕینەوە</span>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleTranslate}
                disabled={isLoading}
                className="w-full bg-sky-600 text-white py-5 rounded-3xl font-bold text-xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all disabled:bg-slate-300"
              >
                {isLoading ? <Loader2 className="animate-spin" size={28} /> : <Sparkles size={28} />}
                <span>{isLoading ? 'چاوەڕوانبە...' : 'وەرگێڕانی ئێستا'}</span>
              </button>

              {resultText && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border-2 border-sky-600 rounded-3xl p-6 shadow-2xl"
                >
                  <div className="flex justify-between items-center mb-4 pb-4 border-b">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCopy(resultText)}
                        className="bg-sky-600 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2"
                      >
                        {isCopied ? <Check size={16} /> : <Copy size={16} />}
                        {isCopied ? 'کۆپی کرا' : 'کۆپی'}
                      </button>
                      <button
                        onClick={() => {
                          saveToHistory('Translator', inputText.substring(0, 30) + '...', resultText);
                          alert('وەرگێڕانەکە پاشەکەوت کرا لە مێژوودا!');
                        }}
                        className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2"
                      >
                        <History size={16} />
                        پاشەکەوت
                      </button>
                    </div>
                    <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">ئەنجام</span>
                  </div>
                  <div className="text-xl leading-relaxed text-right text-slate-900 font-medium">
                    {resultText}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : currentScreen === 'multimodal' ? (
          <motion.div
            key="multimodal"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={`min-h-screen flex flex-col max-w-2xl mx-auto ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}
          >
            <header className={`${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-b'} p-4 flex items-center justify-between sticky top-0 z-10 shadow-sm`}>
              <button onClick={() => { setCurrentScreen('home'); setMultiResult(null); setFilePreview(null); setSelectedFile(null); }} className={`p-2 ${isDarkMode ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-500 hover:bg-slate-100'} rounded-xl`}>
                <ArrowRight size={24} />
              </button>
              <span className="text-xl font-bold">ئامرازە فرەچەشنەکان</span>
              <div className="w-10"></div>
            </header>

            <div className="p-4 flex flex-col gap-6">
              {/* Mode Selector Tabs */}
              <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
                {[
                  { id: 'image-to-text', icon: <LucideImage size={18} />, label: 'وێنە بۆ تێکست' },
                  { id: 'text-to-image', icon: <ImagePlus size={18} />, label: 'تێکست بۆ وێنە' },
                  { id: 'voice-to-text', icon: <Mic size={18} />, label: 'دەنگ بۆ تێکست' },
                  { id: 'video-to-text', icon: <Video size={18} />, label: 'ڤیدیۆ بۆ تێکست' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => { setMultiMode(tab.id as MultiMode); setMultiResult(null); setFilePreview(null); setSelectedFile(null); }}
                    className={`flex-shrink-0 px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${multiMode === tab.id ? 'bg-emerald-600 text-white shadow-md' : isDarkMode ? 'bg-slate-800 text-slate-400 border border-slate-700' : 'bg-white text-slate-500 border border-slate-200'}`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Input Section */}
              <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-3xl p-6 shadow-sm border space-y-4`}>
                {multiMode.includes('to-text') ? (
                  <div className="space-y-4">
                    <label className={`block w-full border-2 border-dashed ${isDarkMode ? 'border-slate-700 hover:border-emerald-500' : 'border-slate-200 hover:border-emerald-400'} rounded-2xl p-8 text-center cursor-pointer transition-all`}>
                      <input type="file" className="hidden" onChange={handleFileChange} accept={multiMode.startsWith('image') ? 'image/*' : multiMode.startsWith('voice') ? 'audio/*' : 'video/*'} />
                      {filePreview ? (
                        <div className="space-y-2">
                          {multiMode.startsWith('image') ? (
                            <img src={filePreview} className="max-h-48 mx-auto rounded-lg" alt="Preview" />
                          ) : multiMode.startsWith('voice') ? (
                            <div className="flex flex-col items-center gap-2">
                              <Volume2 size={48} className="text-emerald-500" />
                              <span className="text-sm font-medium">{selectedFile?.name}</span>
                            </div>
                          ) : (
                            <video src={filePreview} className="max-h-48 mx-auto rounded-lg" controls />
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-slate-400">
                          <Upload size={48} />
                          <span className="font-bold">فایلەکە لێرە دابنێ</span>
                        </div>
                      )}
                    </label>

                    <div className="space-y-2">
                      <label className={`text-sm font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} block text-right`}>فەرمان (ئارەزوومەندانە)</label>
                      <input
                        type="text"
                        value={multiCommand}
                        onChange={(e) => setMultiCommand(e.target.value)}
                        placeholder="بۆ نموونە: تێکستەکەم بۆ وەرگێڕە..."
                        className={`w-full ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-100'} rounded-xl p-3 outline-none border focus:border-emerald-400 transition-all text-right`}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <textarea
                      value={multiInput}
                      onChange={(e) => setMultiInput(e.target.value)}
                      placeholder="وەسفەکە لێرە بنووسە..."
                      className={`w-full ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-100'} rounded-2xl p-4 min-h-[150px] outline-none border focus:border-emerald-400 transition-all text-right`}
                    />
                  </div>
                )}

                <div className={`flex items-center justify-between ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-100'} p-3 rounded-2xl border`}>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsDirectMode(!isDirectMode)}
                      className={`w-12 h-6 rounded-full transition-all relative ${isDirectMode ? 'bg-emerald-500' : 'bg-slate-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isDirectMode ? 'left-7' : 'left-1'}`}></div>
                    </button>
                    <span className={`text-sm font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>سەرچاوەی ئامادە (Official)</span>
                  </div>
                  <span className="text-xs text-slate-400 text-right">بەبێ وەسف و ڕوونکردنەوە</span>
                </div>

                <button
                  onClick={runMultimodal}
                  disabled={isMultiLoading}
                  className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-xl shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-all disabled:bg-slate-300"
                >
                  {isMultiLoading ? <Loader2 className="animate-spin" size={24} /> : <Play size={24} />}
                  <span>{isMultiLoading ? 'چاوەڕوانبە...' : 'دەستپێکردن'}</span>
                </button>
              </div>

              {/* Result Section */}
              <AnimatePresence>
                {multiResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl p-6 shadow-xl border-2 border-emerald-500 space-y-4"
                  >
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">ئەنجام</span>
                      {typeof multiResult === 'string' && !multiResult.startsWith('data:') && !multiResult.startsWith('blob:') && (
                        <button onClick={() => handleCopy(multiResult)} className="text-emerald-600 hover:bg-emerald-50 p-2 rounded-lg">
                          <Copy size={18} />
                        </button>
                      )}
                    </div>

                    <div className="text-right">
                      {multiMode === 'text-to-image' ? (
                        <img src={multiResult} className="w-full rounded-2xl shadow-lg" alt="Generated" />
                      ) : (
                        <p className="text-lg leading-relaxed whitespace-pre-wrap">{multiResult}</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : currentScreen === 'academic-tools' ? (
          <motion.div
            key="academic-tools"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`min-h-screen flex flex-col max-w-4xl mx-auto ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}
          >
            <header className={`${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-b'} p-6 flex items-center justify-between sticky top-0 z-20 backdrop-blur-xl`}>
              <button onClick={() => { setCurrentScreen('home'); setAcademicResult(null); setAcademicInput(''); setFilePreview(null); setSelectedFile(null); }} className={`p-3 ${isDarkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'} rounded-2xl transition-all`}>
                <ArrowRight size={24} />
              </button>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black tracking-tight">ئامرازە ئەکادیمییەکان</span>
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-sky-600' : 'text-sky-600'}`}>ژیریی ئەکادیمی پێشکەوتوو</span>
              </div>
              <div className="w-12"></div>
            </header>

            <div className="p-6 space-y-8">
              {/* Search and Filter Section */}
              <div className="relative group">
                <input
                  type="text"
                  placeholder="گەڕان لە نێوان ئامرازەکان..."
                  value={academicSearchTerm}
                  className={`w-full ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border-2 rounded-3xl py-4 px-14 text-lg outline-none focus:border-sky-600 transition-all shadow-lg`}
                  onChange={(e) => setAcademicSearchTerm(e.target.value)}
                />
                <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-600 transition-colors" size={24} />
              </div>

              {/* Tools Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[
                  { id: 'mind-map', icon: <Sparkles size={24} />, label: 'نەخشەی مێشک', color: 'bg-purple-500' },
                  { id: 'flashcards', icon: <ArrowLeftRight size={24} />, label: 'فلاشکارد', color: 'bg-pink-500' },
                  { id: 'paraphraser', icon: <RefreshCw size={24} />, label: 'داڕشتنەوە', color: 'bg-emerald-500' },
                  { id: 'ai-detector', icon: <ShieldCheck size={24} />, label: 'پشکنەری AI', color: 'bg-rose-500' },
                  { id: 'math-solver', icon: <Brain size={24} />, label: 'بیرکاری', color: 'bg-sky-500' },
                  { id: 'lecture-notes', icon: <Mic size={24} />, label: 'تێبینی دەنگی', color: 'bg-violet-500' },
                  { id: 'research-assistant', icon: <FileText size={24} />, label: 'توێژینەوە', color: 'bg-teal-500' },
                  { id: 'code-assistant', icon: <Code size={24} />, label: 'کۆد', color: 'bg-slate-700' },
                  { id: 'ocr', icon: <ImagePlus size={24} />, label: 'وێنە بۆ دەق', color: 'bg-orange-500' },
                  { id: 'citation-generator', icon: <Quote size={24} />, label: 'سەرچاوە', color: 'bg-lime-500' },
                  { id: 'grammar-checker', icon: <SpellCheck size={24} />, label: 'ڕێزمان', color: 'bg-fuchsia-500' },
                  { id: 'study-planner', icon: <CalendarDays size={24} />, label: 'پلان', color: 'bg-yellow-500' },
                ].filter(t => t.label.includes(academicSearchTerm) || t.id.includes(academicSearchTerm)).map((tool) => (
                  <motion.button
                    key={tool.id}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setActiveAcademicTool(tool.id as AcademicTool); setAcademicResult(null); setAcademicInput(''); setSelectedFile(null); setFilePreview(null); }}
                    className={`relative overflow-hidden p-6 rounded-[2rem] flex flex-col items-center justify-center gap-3 transition-all border-2 ${activeAcademicTool === tool.id ? 'border-sky-600 bg-sky-600/10 shadow-sky-600/20 shadow-xl' : isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm'}`}
                  >
                    <div className={`p-4 rounded-2xl ${tool.color} text-white shadow-lg`}>
                      {tool.icon}
                    </div>
                    <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{tool.label}</span>
                    {activeAcademicTool === tool.id && (
                      <motion.div layoutId="activeTool" className="absolute bottom-0 left-0 w-full h-1 bg-sky-600" />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Active Tool Input Area */}
              <motion.div
                layout
                className={`${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} rounded-[2.5rem] p-8 shadow-2xl border space-y-6 relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-600/10 rounded-full -mr-16 -mt-16 blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-sky-600/10 rounded-full -ml-12 -mb-12 blur-2xl animate-pulse delay-700" />

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-lg shadow-sky-600/30">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="text-xl font-black">ئامرازی چالاک: {activeAcademicTool}</h3>
                </div>
                {activeAcademicTool === 'pdf-summarizer' || activeAcademicTool === 'pdf-chat' ? (
                  <div className="space-y-4">
                    <label className={`block w-full border-2 border-dashed ${isDarkMode ? 'border-slate-700 hover:border-sky-600' : 'border-slate-200 hover:border-sky-600'} rounded-2xl p-8 text-center cursor-pointer transition-all`}>
                      <input type="file" className="hidden" onChange={handleFileChange} accept="application/pdf" />
                      {selectedFile ? (
                        <div className="flex flex-col items-center gap-2">
                          <FileText size={48} className="text-sky-600" />
                          <span className="text-sm font-medium">{selectedFile.name}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-slate-400">
                          <Upload size={48} />
                          <span className="font-bold">فایلی PDF لێرە دابنێ</span>
                        </div>
                      )}
                    </label>
                  </div>
                ) : activeAcademicTool === 'ocr' || activeAcademicTool === 'math-solver' ? (
                  <div className="space-y-4">
                    <label className={`block w-full border-2 border-dashed ${isDarkMode ? 'border-slate-700 hover:border-sky-600' : 'border-slate-200 hover:border-sky-600'} rounded-2xl p-8 text-center cursor-pointer transition-all`}>
                      <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                      {selectedFile && selectedFile.type.startsWith('image/') ? (
                        <div className="flex flex-col items-center gap-2">
                          <img src={filePreview || ''} className="w-32 h-32 object-cover rounded-xl" alt="Preview" />
                          <span className="text-sm font-medium">{selectedFile.name}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-slate-400">
                          <ImagePlus size={48} />
                          <span className="font-bold">{activeAcademicTool === 'math-solver' ? 'وێنەی پرسەکە لێرە دابنێ' : 'وێنەی کتێب یان دەق لێرە دابنێ'}</span>
                        </div>
                      )}
                    </label>
                  </div>
                ) : activeAcademicTool === 'lecture-notes' ? (
                  <div className="space-y-4">
                    <label className={`block w-full border-2 border-dashed ${isDarkMode ? 'border-slate-700 hover:border-sky-600' : 'border-slate-200 hover:border-sky-600'} rounded-2xl p-8 text-center cursor-pointer transition-all`}>
                      <input type="file" className="hidden" onChange={handleFileChange} accept="audio/*,video/*" />
                      {selectedFile ? (
                        <div className="flex flex-col items-center gap-2">
                          {selectedFile.type.startsWith('video/') ? <Video size={48} className="text-sky-600" /> : <Mic size={48} className="text-sky-600" />}
                          <span className="text-sm font-medium">{selectedFile.name}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-slate-400">
                          <Upload size={48} />
                          <span className="font-bold">فایلی دەنگی یان ڤیدیۆ لێرە دابنێ</span>
                        </div>
                      )}
                    </label>
                  </div>
                ) : activeAcademicTool === 'research-assistant' ? (
                  <div className="space-y-4">
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                      {['Abstract', 'Introduction', 'Conclusion', 'Literature Review'].map(part => (
                        <button
                          key={part}
                          onClick={() => setResearchPart(part)}
                          className={`flex-shrink-0 px-4 py-2 rounded-xl font-bold text-xs border transition-all ${researchPart === part ? 'bg-sky-600 text-white border-sky-600' : 'bg-white text-slate-500 border-slate-200'}`}
                        >
                          {part}
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={academicInput}
                      onChange={(e) => setAcademicInput(e.target.value)}
                      placeholder="بابەت یان کورتەیەک بنووسە بۆ ئەوەی یاریدەدەرت بم لە نووسین..."
                      className={`w-full ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-100 text-slate-800'} rounded-2xl p-4 min-h-[120px] outline-none border focus:border-sky-600 transition-all text-right`}
                    />
                  </div>
                ) : activeAcademicTool === 'study-planner' ? (
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={studySubjects}
                        onChange={(e) => setStudySubjects(e.target.value)}
                        placeholder="بابەتەکان (بۆ نموونە: بیرکاری، فیزیا)"
                        className={`flex-1 ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-100 text-slate-800'} rounded-2xl p-4 outline-none border focus:border-sky-600 transition-all text-right`}
                      />
                      <select
                        value={studyDuration}
                        onChange={(e) => setStudyDuration(e.target.value)}
                        className={`${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-100 text-slate-800'} rounded-2xl p-4 outline-none border focus:border-sky-600 transition-all`}
                      >
                        <option value="1 week">١ هەفتە</option>
                        <option value="2 weeks">٢ هەفتە</option>
                        <option value="1 month">١ مانگ</option>
                      </select>
                    </div>

                    {/* Reminders Section */}
                    <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                      <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
                        <Bell size={16} className="text-sky-600" />
                        ئاگادارکەرەوەی خوێندن
                      </h4>
                      <div className="flex gap-2 mb-3">
                        <input
                          type="time"
                          value={reminderTime}
                          onChange={(e) => setReminderTime(e.target.value)}
                          className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-xl p-2 text-xs outline-none border`}
                        />
                        <input
                          type="text"
                          value={reminderInput}
                          onChange={(e) => setReminderInput(e.target.value)}
                          placeholder="چی بخوێنم؟"
                          className={`flex-1 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-xl p-2 text-xs outline-none border text-right`}
                        />
                        <button
                          onClick={() => {
                            if (!reminderInput || !reminderTime) return;
                            setReminders(prev => [...prev, { id: Date.now().toString(), text: reminderInput, time: reminderTime }]);
                            setReminderInput('');
                            setReminderTime('');
                          }}
                          className="bg-sky-600 text-white p-2 rounded-xl"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="space-y-2 max-h-[100px] overflow-y-auto no-scrollbar">
                        {reminders.map(r => (
                          <div key={r.id} className={`flex justify-between items-center p-2 rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'} border text-[10px]`}>
                            <button onClick={() => setReminders(prev => prev.filter(x => x.id !== r.id))} className="text-red-500">
                              <Trash2 size={12} />
                            </button>
                            <div className="flex gap-2 items-center">
                              <span className="font-bold">{r.text}</span>
                              <span className="opacity-50">{r.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : activeAcademicTool === 'dashboard' ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-100'} text-center`}>
                      <div className="text-2xl font-bold text-sky-600">{dashboardStats.toolsUsed}</div>
                      <div className="text-[10px] opacity-60">ئامرازە بەکارهاتووەکان</div>
                    </div>
                    <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-100'} text-center`}>
                      <div className="text-2xl font-bold text-emerald-500">{dashboardStats.filesProcessed}</div>
                      <div className="text-[10px] opacity-60">فایلەکان</div>
                    </div>
                    <div className={`col-span-2 p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                      <div className="text-sm font-bold mb-4 text-center">ئامارەکانی بەکارهێنان لەم هەفتەیەدا</div>
                      <div className="h-64 w-full" dir="ltr">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={[
                            { name: 'Sat', tools: 15 },
                            { name: 'Sun', tools: 19 },
                            { name: 'Mon', tools: 25 },
                            { name: 'Tue', tools: 22 },
                            { name: 'Wed', tools: 18 },
                            { name: 'Thu', tools: 30 },
                            { name: 'Today', tools: Math.max(dashboardStats.toolsUsed, 12) }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" opacity={isDarkMode ? 0.1 : 0.5} />
                            <XAxis dataKey="name" stroke={isDarkMode ? '#94a3b8' : '#64748b'} fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke={isDarkMode ? '#94a3b8' : '#64748b'} fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', color: isDarkMode ? '#f8fafc' : '#0f172a', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} cursor={{ fill: isDarkMode ? '#334155' : '#f1f5f9' }} />
                            <Bar dataKey="tools" name="Tools Used" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                ) : activeAcademicTool === 'quiz-gen' || activeAcademicTool === 'mind-map' || activeAcademicTool === 'flashcards' || activeAcademicTool === 'paraphraser' || activeAcademicTool === 'ai-detector' || activeAcademicTool === 'exam-simulator' || activeAcademicTool === 'code-assistant' || activeAcademicTool === 'vocab-extractor' || activeAcademicTool === 'report-gen' || activeAcademicTool === 'seminar-gen' ? (
                  <div className="space-y-4">
                    <textarea
                      value={academicInput}
                      onChange={(e) => setAcademicInput(e.target.value)}
                      placeholder={
                        activeAcademicTool === 'report-gen' ? 'بابەتی ڕاپۆرتەکە لێرە بنووسە...' :
                          activeAcademicTool === 'seminar-gen' ? 'بابەت یان تێکستی سیمینارەکە لێرە بنووسە...' :
                            activeAcademicTool === 'paraphraser' ? 'دەقەکە لێرە بنووسە بۆ داڕشتنەوە...' :
                              activeAcademicTool === 'ai-detector' ? 'دەقەکە لێرە بنووسە بۆ پشکنینی AI...' :
                                activeAcademicTool === 'exam-simulator' ? 'بابەتەکە بنووسە بۆ دروستکردنی تاقیکردنەوە...' :
                                  activeAcademicTool === 'code-assistant' ? 'کۆدەکە یان پرسیارەکە لێرە بنووسە...' :
                                    activeAcademicTool === 'vocab-extractor' ? 'دەقەکە لێرە بنووسە بۆ دەرهێنانی زاراوەکان...' :
                                      activeAcademicTool === 'mind-map' ? "تێکست یان بابەتێک بنووسە بۆ دروستکردنی نەخشەی مێشک..." :
                                        activeAcademicTool === 'flashcards' ? "تێکست یان بابەتێک بنووسە بۆ دروستکردنی فلاشکارد..." :
                                          "ناوەڕۆکی وانەکە لێرە بنووسە بۆ دروستکردنی تاقیکردنەوە..."
                      }
                      className={`w-full ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-100 text-slate-800'} rounded-2xl p-4 min-h-[150px] outline-none border focus:border-sky-600 transition-all text-right`}
                    />
                  </div>
                ) : (activeAcademicTool as any) === 'quiz-gen' ? (
                  <div className="space-y-4">
                    <textarea
                      value={academicInput}
                      onChange={(e) => setAcademicInput(e.target.value)}
                      placeholder="ناوەڕۆکی وانەکە لێرە بنووسە بۆ دروستکردنی تاقیکردنەوە..."
                      className={`w-full ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-100 text-slate-800'} rounded-2xl p-4 min-h-[150px] outline-none border focus:border-sky-600 transition-all text-right`}
                    />
                  </div>
                ) : activeAcademicTool === 'citation-generator' ? (
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      {['APA', 'MLA', 'Harvard'].map(format => (
                        <button
                          key={format}
                          onClick={() => setCitationFormat(format)}
                          className={`flex-1 py-2 rounded-xl font-bold text-xs border transition-all ${citationFormat === format ? 'bg-sky-600 text-white border-sky-600' : 'bg-white text-slate-500 border-slate-200'}`}
                        >
                          {format}
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={academicInput}
                      onChange={(e) => setAcademicInput(e.target.value)}
                      placeholder="زانیاری سەرچاوەکە بنووسە (ناونیشان، نووسەر، ساڵ...)"
                      className="w-full bg-slate-50 rounded-2xl p-4 min-h-[120px] outline-none border border-slate-100 focus:border-sky-600 transition-all text-right"
                    />
                  </div>
                ) : activeAcademicTool === 'grammar-checker' ? (
                  <div className="space-y-4">
                    <textarea
                      value={academicInput}
                      onChange={(e) => setAcademicInput(e.target.value)}
                      placeholder="تێکستەکە لێرە بنووسە بۆ پشکنین..."
                      className="w-full bg-slate-50 rounded-2xl p-4 min-h-[150px] outline-none border border-slate-100 focus:border-sky-600 transition-all text-right"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-500 block text-right">بابەتەکان</label>
                      <input
                        type="text"
                        value={studySubjects}
                        onChange={(e) => setStudySubjects(e.target.value)}
                        placeholder="بۆ نموونە: بیرکاری، فیزیا، مێژوو"
                        className="w-full bg-slate-50 rounded-xl p-3 outline-none border border-slate-100 focus:border-sky-600 transition-all text-right"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-500 block text-right">ماوەی خوێندن</label>
                      <select
                        value={studyDuration}
                        onChange={(e) => setStudyDuration(e.target.value)}
                        className="w-full bg-slate-50 rounded-xl p-3 outline-none border border-slate-100 focus:border-sky-600 transition-all text-right"
                      >
                        <option value="1 day">١ ڕۆژ</option>
                        <option value="3 days">٣ ڕۆژ</option>
                        <option value="1 week">١ هەفتە</option>
                        <option value="1 month">١ مانگ</option>
                      </select>
                    </div>
                  </div>
                )}

                <button
                  onClick={runAcademicTool}
                  disabled={isAcademicLoading}
                  className="w-full bg-sky-600 text-white py-4 rounded-2xl font-bold text-xl shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-all disabled:bg-slate-300"
                >
                  {isAcademicLoading ? <Loader2 className="animate-spin" size={24} /> : <Sparkles size={24} />}
                  <span>{isAcademicLoading ? 'چاوەڕوانبە...' : 'جێبەجێکردن'}</span>
                </button>
              </motion.div>

              {/* Result Section */}
              <AnimatePresence>
                {activeAcademicTool === 'pdf-chat' && selectedFile && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${isDarkMode ? 'bg-slate-800 border-sky-600' : 'bg-white border-sky-600'} rounded-3xl p-4 shadow-xl border-2 flex flex-col h-[400px]`}
                  >
                    <div className="flex-grow overflow-y-auto space-y-3 mb-4 p-2 no-scrollbar">
                      {pdfChatMessages.length === 0 && (
                        <div className="text-center py-10 opacity-40">
                          <MessageSquareText size={48} className="mx-auto mb-2" />
                          <p>پرسیار لەبارەی ئەم PDFـە بکە</p>
                        </div>
                      )}
                      {pdfChatMessages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${msg.role === 'user'
                            ? 'bg-sky-600 text-white self-start rounded-br-none'
                            : `${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border'} self-end rounded-bl-none`
                            }`}
                        >
                          {msg.text}
                        </div>
                      ))}
                      {isPdfChatLoading && (
                        <div className="flex justify-end">
                          <Loader2 className="animate-spin text-sky-600" size={16} />
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={pdfChatInput}
                        onChange={(e) => setPdfChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handlePdfChat()}
                        placeholder="پرسیار بکە..."
                        className={`flex-1 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} rounded-xl p-3 text-xs outline-none border focus:border-sky-600 text-right`}
                      />
                      <button
                        onClick={handlePdfChat}
                        disabled={isPdfChatLoading || !pdfChatInput.trim()}
                        className="bg-sky-600 text-white p-3 rounded-xl shadow-md disabled:opacity-50"
                      >
                        <SendHorizontal size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {academicResult && activeAcademicTool !== 'pdf-chat' && (
                  <motion.div
                    ref={resultRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'} rounded-[3rem] p-8 shadow-2xl border-2 space-y-6`}
                  >
                    <div className={`flex justify-between items-center border-b pb-4 ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                      <div className="flex gap-3">
                        <button onClick={() => handleCopy(academicResult)} className="text-sky-600 hover:bg-sky-600/10 p-3 rounded-2xl transition-colors">
                          <Copy size={20} />
                        </button>
                        {activeAcademicTool === 'report-gen' && (
                          <button
                            onClick={() => {
                              setAcademicInput(academicResult);
                              setActiveAcademicTool('seminar-gen');
                              setAcademicResult('');
                            }}
                            className="text-orange-500 hover:bg-orange-500/10 p-3 rounded-2xl flex items-center gap-2 transition-colors"
                          >
                            <ArrowLeft size={20} />
                            <span className="text-xs font-black">بۆ سیمینار</span>
                          </button>
                        )}
                        <button
                          onClick={() => {
                            const content = activeAcademicTool === 'mind-map' ? JSON.stringify(mindMapData) :
                              activeAcademicTool === 'flashcards' ? JSON.stringify(flashcardsData) :
                                academicResult || "";
                            saveToHistory(activeAcademicTool, academicInput.substring(0, 30) || selectedFile?.name || 'Academic Tool', content);
                            alert('بە سەرکەوتوویی پاشەکەوت کرا لە مێژوودا!');
                          }}
                          className="flex items-center gap-2 text-emerald-500 hover:bg-emerald-500/10 px-4 py-2 rounded-2xl transition-all border border-emerald-500/20"
                          title="پاشەکەوتکردن لە مێژوو"
                        >
                          <span className="text-xs font-bold">پاشەکەوتکردن</span>
                          <History size={18} />
                        </button>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-sky-600 uppercase tracking-widest">ئەنجامی زیرەک</span>
                        <span className="text-sm font-bold opacity-40">Academic AI Result</span>
                      </div>
                    </div>
                    <div className="text-right">
                      {activeAcademicTool === 'mind-map' && mindMapData ? (
                        <MindMap data={mindMapData} isDarkMode={isDarkMode} onChange={setMindMapData} />
                      ) : activeAcademicTool === 'flashcards' && flashcardsData.length > 0 ? (
                        <Flashcards data={flashcardsData} />
                      ) : activeAcademicTool === 'seminar-gen' ? (
                        <div className="space-y-8">
                          {academicResult.split(/Slide \d+:/i).filter(s => s.trim()).map((slide, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              className={`p-8 rounded-[2.5rem] border-2 ${isDarkMode ? 'bg-slate-950 border-sky-600/20' : 'bg-sky-600/30 border-sky-600'} shadow-sm relative overflow-hidden group`}
                            >
                              <div className="absolute top-0 left-0 w-1 h-full bg-sky-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                              <div className="absolute top-4 left-6 text-[10px] font-black opacity-20 uppercase tracking-[0.3em]">Slide {idx + 1}</div>
                              <div className="text-lg leading-relaxed whitespace-pre-wrap font-medium">{slide.trim()}</div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className={`prose prose-indigo max-w-none ${isDarkMode ? 'prose-invert' : ''} text-right`} dir="rtl">
                          <Markdown>{academicResult}</Markdown>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : currentScreen === 'scholar' ? (
          <motion.div
            key="scholar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`min-h-screen flex flex-col max-w-2xl mx-auto ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}
          >
            <header className={`${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-b'} p-4 flex items-center justify-between sticky top-0 z-10 shadow-sm`}>
              <button onClick={() => setCurrentScreen('home')} className={`p-2 ${isDarkMode ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-500 hover:bg-slate-100'} rounded-xl`}>
                <ArrowRight size={24} />
              </button>
              <span className="text-xl font-bold">گەڕانی ئەکادیمی (Scholar)</span>
              <div className="w-10"></div>
            </header>

            <div className="p-6 flex flex-col gap-8">
              <div className="text-center space-y-2">
                <div className="inline-block p-4 bg-sky-600 text-sky-600 rounded-full mb-2">
                  <Search size={48} />
                </div>
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>گەڕان لە سەرچاوە زانستییەکان</h2>
                <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>بەدوای وتار، کتێب، و تێزی زانستی بگە لە Google Scholar</p>
              </div>

              <div className="relative group">
                <input
                  type="text"
                  value={scholarQuery}
                  onChange={(e) => setScholarQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleScholarSearch()}
                  placeholder="ناوی وتار یان بابەت بنووسە..."
                  className={`w-full ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-100 focus:border-sky-600' : 'bg-white border-slate-200 focus:border-sky-600'} border-2 rounded-3xl py-6 px-8 pr-16 text-xl outline-none shadow-lg transition-all`}
                />
                <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-600" size={28} />
              </div>

              <button
                onClick={handleScholarSearch}
                className="w-full bg-sky-600 text-white py-5 rounded-3xl font-bold text-xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                گەڕان لە Google Scholar
              </button>

              <div className="grid grid-cols-1 gap-4 mt-4">
                <div className={`p-4 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'} rounded-2xl border shadow-sm flex items-start gap-4`}>
                  <div className="p-2 bg-sky-600 text-sky-600 rounded-lg">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h3 className={`font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>وتاری زانستی</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>دۆزینەوەی نوێترین توێژینەوەکان لە هەموو بوارەکاندا.</p>
                  </div>
                </div>
                <div className={`p-4 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'} rounded-2xl border shadow-sm flex items-start gap-4`}>
                  <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                    <Languages size={20} />
                  </div>
                  <div>
                    <h3 className={`font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>سەرچاوەی فرەزمان</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>گەڕان بە زمانەکانی ئینگلیزی، عەرەبی و کوردی.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : currentScreen === 'history' ? (
          <motion.div
            key="history"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`min-h-screen flex flex-col max-w-2xl mx-auto ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}
          >
            <header className={`${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-b'} p-4 flex items-center justify-between sticky top-0 z-10 shadow-sm`}>
              <button onClick={() => setCurrentScreen('home')} className={`p-2 ${isDarkMode ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-500 hover:bg-slate-100'} rounded-xl`}>
                <ArrowRight size={24} />
              </button>
              <span className="text-xl font-bold">پارێزراوەکان (History)</span>
              <button onClick={() => { if (confirm('ئایا دڵنیایت لە سڕینەوەی هەموو مێژووەکە؟')) { setHistory([]); localStorage.removeItem('academic_ai_history'); } }} className="p-2 text-red-400 hover:bg-red-50 rounded-xl">
                <Trash2 size={20} />
              </button>
            </header>

            <div className="p-4 flex flex-col gap-4">
              {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 opacity-40">
                  <History size={80} strokeWidth={1} />
                  <p className="mt-4 font-bold text-lg text-center px-10 leading-relaxed">هیچ شتێک پاشەکەوت نەکراوە.</p>
                  <p className="mt-2 text-sm text-center px-10 opacity-60">تێبینی: بۆ ئەوەی بابەتێک لێرە ببینی، دەبێت سەرەتا لە بەشی وەرگێڕان یان ئامرازەکان دوگمەی "پاشەکەوت" دابگریت.</p>
                </div>
              ) : (
                history.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} p-5 rounded-3xl shadow-sm border space-y-3`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="bg-sky-600 text-sky-600 px-2 py-1 rounded-lg text-[10px] font-bold uppercase">{item.type}</span>
                        <span className="text-[10px] opacity-50">{new Date(item.timestamp).toLocaleDateString('ku-IQ')}</span>
                      </div>
                      <button onClick={() => deleteFromHistory(item.id)} className="text-slate-400 hover:text-red-500">
                        <X size={16} />
                      </button>
                    </div>
                    <h4 className={`font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>{item.title}</h4>
                    <p className={`text-sm opacity-70 line-clamp-3 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{item.content}</p>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleCopy(item.content)}
                        className="flex-1 bg-slate-100 text-slate-600 py-2 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all"
                      >
                        کۆپی
                      </button>
                      <button
                        onClick={() => {
                          if (item.type === 'mind-map') {
                            try {
                              setMindMapData(JSON.parse(item.content));
                              setAcademicResult("نەخشەی مێشکەکە دروستکرا!");
                              setCurrentScreen('academic-tools');
                              setActiveAcademicTool('mind-map');
                            } catch (e) { }
                          } else if (item.type === 'flashcards') {
                            try {
                              setFlashcardsData(JSON.parse(item.content));
                              setAcademicResult("فلاشکاردەکان دروستکران!");
                              setCurrentScreen('academic-tools');
                              setActiveAcademicTool('flashcards');
                            } catch (e) { }
                          } else {
                            alert(item.content);
                          }
                        }}
                        className="flex-1 bg-sky-600 text-white py-2 rounded-xl text-xs font-bold hover:bg-sky-600 transition-all"
                      >
                        بینین
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        ) : currentScreen === 'quiz' ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`min-h-screen flex flex-col max-w-2xl mx-auto ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}
          >
            <header className={`${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-b'} p-4 flex items-center justify-between sticky top-0 z-10 shadow-sm`}>
              <button onClick={() => setCurrentScreen('academic-tools')} className={`p-2 ${isDarkMode ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-500 hover:bg-slate-100'} rounded-xl`}>
                <ArrowRight size={24} />
              </button>
              <span className="text-xl font-bold">تاقیکردنەوەی زیرەک</span>
              <div className="w-10"></div>
            </header>

            <div className="p-6 flex flex-col gap-6">
              {!showQuizResult ? (
                <>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>پرسیاری {currentQuizIndex + 1} لە {quizQuestions.length}</span>
                    <div className="flex gap-1">
                      {quizQuestions.map((_, idx) => (
                        <div key={idx} className={`h-2 w-8 rounded-full transition-all ${idx === currentQuizIndex ? 'bg-sky-600' : idx < currentQuizIndex ? 'bg-sky-600' : isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
                      ))}
                    </div>
                  </div>

                  <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'} p-8 rounded-3xl shadow-xl border-2 border-sky-600 text-right`}>
                    <h3 className="text-2xl font-bold leading-relaxed">{quizQuestions[currentQuizIndex]?.question}</h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {quizQuestions[currentQuizIndex]?.options.map((option: string, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => handleQuizAnswer(idx)}
                        className={`w-full p-5 rounded-2xl font-bold text-lg text-right transition-all border-2 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200 hover:border-sky-600' : 'bg-white border-slate-100 text-slate-700 hover:border-sky-600 hover:shadow-md'}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} p-10 rounded-3xl shadow-2xl border-2 border-sky-600 text-center space-y-6`}
                >
                  <div className="inline-block p-6 bg-sky-600 text-sky-600 rounded-full">
                    <Brain size={64} />
                  </div>
                  <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>ئەنجامی تاقیکردنەوە</h2>
                  <div className="text-6xl font-black text-sky-600">
                    {quizScore} / {quizQuestions.length}
                  </div>
                  <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} text-lg`}>
                    {quizScore === quizQuestions.length ? 'ناوازەیە! هەموو پرسیارەکانت ڕاست بوو.' : quizScore > quizQuestions.length / 2 ? 'زۆر باشە! هەوڵێکی باش بوو.' : 'پێویستت بە پێداچوونەوەی زیاترە.'}
                  </p>
                  <button
                    onClick={() => setCurrentScreen('academic-tools')}
                    className="w-full bg-sky-600 text-white py-5 rounded-2xl font-bold text-xl shadow-lg active:scale-95 transition-all"
                  >
                    گەڕانەوە بۆ ئامرازەکان
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : currentScreen === 'profile' ? (
          <motion.div
            key="profile"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed inset-0 flex flex-col ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}
          >
            <header className={`p-6 flex items-center justify-between border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
              <button onClick={() => setCurrentScreen('home')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <ArrowRight size={24} />
              </button>
              <span className="text-xl font-bold">پڕۆفایل</span>
              {user && (
                <button
                  onClick={() => isEditingProfile ? saveProfile() : setIsEditingProfile(true)}
                  className={`px-4 py-2 rounded-xl font-bold transition-all ${isEditingProfile ? 'bg-emerald-500 text-white' : 'bg-sky-600/10 text-sky-600'}`}
                >
                  {isEditingProfile ? 'پاشکەوتکردن' : 'دەستکاری'}
                </button>
              )}
            </header>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center gap-8">
              {!user ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center max-w-xs mx-auto">
                  <div className="w-24 h-24 rounded-3xl bg-sky-600/10 flex items-center justify-center text-sky-600">
                    <User size={48} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black">چوونە ژوورەوە</h3>
                    <p className="text-sm opacity-60 leading-relaxed">تکایە بە هەژماری Gmail بچۆ ژوورەوە بۆ ئەوەی پڕۆفایلەکەت تایبەت بێت بە خۆت.</p>
                  </div>
                  <button
                    onClick={handleGoogleLogin}
                    className="w-full py-4 bg-sky-600 text-white rounded-2xl font-bold shadow-lg shadow-sky-600/25 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    <Globe size={20} />
                    چوونە ژوورەوە بە Google
                  </button>
                </div>
              ) : (
                <React.Fragment>
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-sky-600 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-2xl border-4 border-white/20 overflow-hidden">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        userName.split(' ').map(n => n[0]).join('').toUpperCase()
                      )}
                    </div>
                  </div>

                  <div className="w-full max-w-md space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold opacity-60 px-2">ناو</label>
                      {isEditingProfile ? (
                        <input
                          type="text"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className={`w-full p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-sky-600 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
                        />
                      ) : (
                        <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} font-bold`}>
                          {userName}
                        </div>
                      )}
                    </div>
                    <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} space-y-3`}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold flex items-center gap-2">
                          <CheckCircle2 size={18} className="text-emerald-500" />
                          باری کلیلی زیرەکی
                        </span>
                        <span className="text-xs text-emerald-500 font-bold bg-emerald-500/10 px-2 py-1 rounded-lg">چالاکە</span>
                      </div>
                      <p className="text-xs opacity-60">کلیلی کۆدەکان بە شێوەیەکی ئۆتۆماتیکی لە ڕێکخستنەکان دابینکراوە.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold opacity-60 px-2">ئیمەیڵ</label>
                      <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} font-bold opacity-60`}>
                        {user.email}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold opacity-60 px-2">ژمارەی مۆبایل</label>
                      {isEditingProfile ? (
                        <input
                          type="text"
                          value={userPhone}
                          onChange={(e) => setUserPhone(e.target.value)}
                          className={`w-full p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-sky-600 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
                        />
                      ) : (
                        <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} font-bold`}>
                          {userPhone || 'دیاری نەکراوە'}
                        </div>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              )}

              <div className="w-full max-w-md space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold opacity-60 px-2">بەڕێوەبەرانی ئەپ (بۆ هەمووان)</label>
                  <div className={`p-6 rounded-3xl border-2 border-dashed ${isDarkMode ? 'bg-sky-600/5 border-sky-600/20' : 'bg-sky-600 border-sky-600'}`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-sky-600 flex items-center justify-center text-white shadow-lg">
                        <Sparkles size={24} />
                      </div>
                      <div>
                        <div className="font-black text-sky-600">پاڵپشتی ئەکادیمی AI</div>
                        <div className="text-xs opacity-60">بۆ هەر کێشە و پێشنیارێک</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <a href={`tel:${officialAccount.phone}`} className={`flex items-center gap-3 p-3 rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm hover:scale-[1.02] transition-transform`}>
                        <Phone size={18} className="text-green-500" />
                        <span className="font-bold">{officialAccount.phone}</span>
                      </a>
                      <a href={`https://wa.me/964${officialAccount.whatsapp.replace(/^0/, '')}`} className={`flex items-center gap-3 p-3 rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm hover:scale-[1.02] transition-transform`}>
                        <MessageCircle size={18} className="text-emerald-500" />
                        <span className="font-bold">پەیوەندی لە واتسئەپ</span>
                      </a>
                      <a href={`https://t.me/${officialAccount.telegram}`} className={`flex items-center gap-3 p-3 rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm hover:scale-[1.02] transition-transform`}>
                        <Send size={18} className="text-sky-500" />
                        <span className="font-bold">گرووپی تێلیگرام</span>
                      </a>
                      <button className={`w-full flex items-center justify-center gap-2 p-3 rounded-xl ${isDarkMode ? 'bg-sky-600' : 'bg-sky-600'} text-white shadow-md hover:scale-[1.02] active:scale-95 transition-all font-bold mt-2`}>
                        <Mail size={18} />
                        ناردنی ئیمەیڵ بۆ ستاف
                      </button>
                    </div>
                  </div>
                </div>

                {user && (
                  <button
                    onClick={handleLogout}
                    className="w-full py-4 bg-red-500/10 text-red-500 rounded-2xl font-bold hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <LogOut size={20} />
                    چوونە دەرەوە
                  </button>
                )}

                <div className="pt-8 pb-4 flex flex-col items-center gap-4 opacity-40">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white">
                      <GraduationCap size={18} />
                    </div>
                    <span className="font-black text-sm tracking-widest uppercase">Academic AI</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-[10px] font-bold">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={12} className="text-emerald-500" />
                      <span>وەشانی فەرمی ئەکادیمی</span>
                    </div>
                    <span className="opacity-60 uppercase tracking-widest">Developed by: Mohamad Safar</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : currentScreen === 'generators' ? (
          <motion.div
            key="generators"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`min-h-screen flex flex-col max-w-2xl mx-auto ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}
          >
            <header className={`${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-b'} p-4 flex items-center justify-between sticky top-0 z-10 shadow-sm`}>
              <button onClick={() => setCurrentScreen('home')} className={`p-2 ${isDarkMode ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-500 hover:bg-slate-100'} rounded-xl`}>
                <ArrowRight size={24} />
              </button>
              <span className="text-xl font-bold">دروستکەری ڕاپۆرت و سیمینار</span>
              <div className="w-10"></div>
            </header>

            <div className="p-4 flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex gap-2 p-1 bg-slate-200/50 rounded-2xl">
                  <button
                    onClick={() => { setActiveAcademicTool('report-gen'); setAcademicResult(null); setAcademicInput(''); }}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all ${activeAcademicTool === 'report-gen' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-500'}`}
                  >
                    ڕاپۆرت
                  </button>
                  <button
                    onClick={() => { setActiveAcademicTool('seminar-gen'); setAcademicResult(null); setAcademicInput(''); }}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all ${activeAcademicTool === 'seminar-gen' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-500'}`}
                  >
                    سیمینار
                  </button>
                </div>

                <div className={`flex items-center gap-2 p-3 rounded-2xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm`}>
                  <Globe size={18} className="text-sky-600" />
                  <span className="text-xs font-bold opacity-60">زمان:</span>
                  <select
                    value={academicLang}
                    onChange={(e) => setAcademicLang(e.target.value)}
                    className="flex-1 bg-transparent outline-none font-bold text-sm text-right"
                  >
                    <option value="کوردی - سۆرانی">کوردی (سۆرانی)</option>
                    <option value="کوردی - بادینی">کوردی (بادینی)</option>
                    <option value="English">ئینگلیزی (English)</option>
                    <option value="عربي">عەرەبی (Arabic)</option>
                  </select>
                </div>

                <div className={`flex items-center gap-2 p-3 rounded-2xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm`}>
                  <Zap size={18} className="text-yellow-500" />
                  <span className="text-xs font-bold opacity-60">ئاست:</span>
                  <select
                    value={academicLevel}
                    onChange={(e) => setAcademicLevel(e.target.value)}
                    className="flex-1 bg-transparent outline-none font-bold text-sm text-right"
                  >
                    <option value="ئاسایی">ئاسایی (Basic)</option>
                    <option value="ئەکادیمی">ئەکادیمی (Academic)</option>
                    <option value="پرۆفیشناڵ">پرۆفیشناڵ (Professional / Masters)</option>
                  </select>
                </div>

                {activeAcademicTool === 'report-gen' && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className={`flex items-center gap-2 p-3 rounded-2xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm`}>
                      <span className="text-xs font-bold opacity-60">درێژی:</span>
                      <select
                        value={reportLength}
                        onChange={(e) => setReportLength(e.target.value)}
                        className="flex-1 bg-transparent outline-none font-bold text-sm text-right"
                      >
                        <option value="کورت">کورت (خێرا)</option>
                        <option value="مامناوەند">مامناوەند</option>
                        <option value="درێژ">درێژ</option>
                      </select>
                    </div>

                    <div className={`flex items-center gap-2 p-3 rounded-2xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm`}>
                      <span className="text-xs font-bold opacity-60">جۆر:</span>
                      <select
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value)}
                        className="flex-1 bg-transparent outline-none font-bold text-sm text-right"
                      >
                        <option value="گشتی">گشتی</option>
                        <option value="شیکارییەکی قوڵ">شیکاری قوڵ</option>
                        <option value="پێداچوونەوەیەکی بۆ بکرێت">پێداچوونەوە</option>
                      </select>
                    </div>
                  </div>
                )}

                {activeAcademicTool === 'seminar-gen' && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className={`flex items-center gap-2 p-3 rounded-2xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm`}>
                      <span className="text-xs font-bold opacity-60">سلاید:</span>
                      <select
                        value={seminarSlides}
                        onChange={(e) => setSeminarSlides(e.target.value)}
                        className="flex-1 bg-transparent outline-none font-bold text-sm text-right"
                      >
                        <option value="5">٥ سلاید (خێرا)</option>
                        <option value="7">٧ سلاید</option>
                        <option value="10">١٠ سلاید</option>
                        <option value="15">١٥ سلاید</option>
                        <option value="20">٢٠ سلاید</option>
                      </select>
                    </div>

                    <div className={`flex items-center gap-2 p-3 rounded-2xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm`}>
                      <span className="text-xs font-bold opacity-60">شێواز:</span>
                      <select
                        value={seminarStyle}
                        onChange={(e) => setSeminarStyle(e.target.value)}
                        className="flex-1 bg-transparent outline-none font-bold text-sm text-right"
                      >
                        <option value="فەرمیی ئەکادیمی">فەرمی</option>
                        <option value="شێوازی قسەکردنی 'TED Talk'ی سەرنجڕاکێش">سەرنجڕاکێش</option>
                        <option value="کورت و پوخت">کورت و پوخت</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'} rounded-3xl p-6 shadow-xl border-2 space-y-6`}>
                <div className="space-y-4">
                  <textarea
                    value={academicInput}
                    onChange={(e) => setAcademicInput(e.target.value)}
                    placeholder={
                      activeAcademicTool === 'report-gen' ? 'بابەتی ڕاپۆرتەکە لێرە بنووسە...' : 'بابەت یان تێکستەکە لێرە دابنێ...'
                    }
                    rows={6}
                    className="w-full bg-transparent outline-none font-bold text-lg text-right resize-none no-scrollbar"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={runAcademicTool}
                    disabled={isAcademicLoading}
                    className={`flex-grow py-5 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-2xl ${isAcademicLoading
                      ? 'bg-slate-100 text-slate-300'
                      : 'bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600 text-white shadow-sky-500/40 hover:brightness-110 hover:shadow-sky-500/60'
                      }`}
                  >
                    {isAcademicLoading ? <Loader2 className="animate-spin" size={24} /> : <Sparkles size={24} className="animate-pulse" />}
                    <span>{isAcademicLoading ? 'چاوەڕوانبە...' : 'جێبەجێکردن'}</span>
                  </button>
                </div>

                {academicResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-6 rounded-3xl border-2 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-sky-100 shadow-lg'} space-y-4`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center">
                          <CheckCircle2 size={18} />
                        </div>
                        <span className="font-bold">ئەنجامی سەرکەوتوو</span>
                      </div>
                      <button onClick={() => handleCopy(academicResult)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <Copy size={18} />
                      </button>
                    </div>
                    <div className="prose prose-sm max-w-none text-right" dir="rtl">
                      <Markdown>{academicResult}</Markdown>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

        ) : currentScreen === 'ultra-chat' ? (
          <motion.div
            key="ultra-chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 flex flex-col md:flex-row h-screen h-[100dvh] overflow-hidden ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}
          >
            {/* Sidebar - Advanced Features List */}
            <div className={`hidden lg:flex w-80 shrink-0 flex-col border-l relative overflow-hidden ${isDarkMode ? 'bg-slate-900/50 border-white/5' : 'bg-white border-slate-200'}`}>
              <div className="p-6 border-b border-white/5 bg-gradient-to-br from-cyan-600/10 to-sky-600/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-sky-600 flex items-center justify-center text-white shadow-lg">
                    <Zap size={20} className="animate-pulse" />
                  </div>
                  <div className="text-right">
                    <h3 className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>توانا پێشکەوتووەکان</h3>
                  </div>
                </div>

                {/* Search Features */}
                <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                  <Search size={14} className="text-slate-400" />
                  <input
                    type="text"
                    placeholder="گەڕان لە توانا زیرەکەکان..."
                    value={featureSearchTerm}
                    onChange={(e) => setFeatureSearchTerm(e.target.value)}
                    className="bg-transparent outline-none text-[10px] font-bold w-full text-right"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 p-4 overflow-x-auto no-scrollbar border-b border-white/5">
                {['هەموو', 'ئەکادیمی', 'بزنس', 'کۆدینگ', 'داهێنان', 'داتا', 'زمانەوانی', 'بەڕێوەبردن', 'یاسایی', 'زانست', 'ئەلترا'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFeatureCategory(cat)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[9px] font-black transition-all ${activeFeatureCategory === cat
                      ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20'
                      : isDarkMode ? 'bg-white/5 text-white/40 hover:bg-white/10' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex-grow overflow-y-auto p-4 space-y-4 no-scrollbar">
                {Array.from(new Set(AI_FEATURES
                  .filter(f => activeFeatureCategory === 'هەموو' || f.category === activeFeatureCategory)
                  .filter(f => f.name.includes(featureSearchTerm) || f.description.includes(featureSearchTerm))
                  .map(f => f.category)
                )).map((cat, idx) => (
                  <div key={idx} className="space-y-2">
                    <p className="text-[9px] font-black text-sky-500 uppercase px-2 tracking-widest">{cat}</p>
                    {AI_FEATURES
                      .filter(f => f.category === cat)
                      .filter(f => f.name.includes(featureSearchTerm) || f.description.includes(featureSearchTerm))
                      .map((feature) => (
                        <button
                          key={feature.id}
                          onClick={() => setUltraChatInput(prev => prev + (prev ? ' ' : '') + `ئەم ئەرکەم بۆ ئەنجام بدە: ${feature.name}`)}
                          className={`w-full text-right px-4 py-3 rounded-2xl text-[11px] font-bold transition-all flex items-center justify-between group border border-transparent ${isDarkMode
                            ? 'text-white/60 hover:bg-white/5 hover:text-white hover:border-white/10'
                            : 'text-slate-600 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-100 shadow-sm hover:shadow-md'
                            }`}
                        >
                          <div className={`p-2 rounded-lg transition-all ${isDarkMode ? 'bg-white/5 text-sky-400 group-hover:bg-sky-500/20' : 'bg-sky-100 text-sky-600 group-hover:bg-sky-600 group-hover:text-white'}`}>
                            {getFeatureIcon(feature.icon)}
                          </div>
                          <div className="flex flex-col items-end gap-0.5">
                            <span className="group-hover:translate-x-[-4px] transition-transform">{feature.name}</span>
                            <span className="text-[8px] opacity-40 font-medium group-hover:opacity-60">{feature.description.substring(0, 30)}...</span>
                          </div>
                        </button>
                      ))}
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-white/5 bg-gradient-to-t from-sky-600/5 to-transparent">
              </div>
            </div>

            {/* Main Chat Interface */}
            <div className="flex-grow flex flex-col relative min-w-0">
              <header className={`px-6 py-4 flex items-center justify-between border-b relative z-10 backdrop-blur-3xl ${isDarkMode ? 'bg-slate-900/80 border-white/5 text-white' : 'bg-white/80 border-slate-100 text-slate-900'}`}>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => {
                      if (confirm('دڵنیایت لە پاککردنەوە؟')) {
                        setUltraChatMessages([{ role: 'model', text: 'مێژوو پاککرایەوە.' }]);
                        localStorage.removeItem('ultra_chat_messages');
                        startNewUltraChat();
                      }
                    }} className={`p-2.5 rounded-2xl transition-all ${isDarkMode ? 'hover:bg-white/5 text-white/40' : 'hover:bg-slate-100 text-slate-400'}`}>
                      <RefreshCw size={20} />
                    </button>
                    <button onClick={copyConversation} className={`p-2.5 rounded-2xl transition-all ${isDarkMode ? 'hover:bg-white/5 text-white/40' : 'hover:bg-slate-100 text-slate-400'}`}>
                      <Copy size={20} />
                    </button>
                  </div>
                  <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-lg font-black tracking-tight">ئەلترا چات</span>
                    <Sparkles size={18} className="text-sky-400" />
                  </div>
                </div>

                <button onClick={() => setCurrentScreen('home')} className={`p-2.5 rounded-2xl transition-all ${isDarkMode ? 'hover:bg-white/5 text-white/40' : 'hover:bg-slate-100 text-slate-400'}`}>
                  <ArrowRight size={24} />
                </button>
              </header>

              {/* Chat Messages Area */}
              <div className="flex-1 min-h-0 relative overflow-hidden">
                {/* Neural Pulse Background */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-30 overflow-hidden">
                  <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-sky-500/10 blur-[100px] rounded-full animate-pulse" />
                  <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 blur-[100px] rounded-full animate-pulse [animation-delay:2s]" />
                </div>

                <div
                  onScroll={(e) => {
                    const target = e.currentTarget;
                    const isNearBottom = target.scrollHeight - target.scrollTop - target.clientHeight < 100;
                    setShowScrollButton(!isNearBottom);
                  }}
                  className="absolute inset-0 overflow-y-auto px-6 py-12 space-y-12 scroll-smooth no-scrollbar ultra-messages-container z-10"
                >
                  {ultraChatMessages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: msg.role === 'user' ? -20 : 20, y: 20 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`group max-w-[90%] md:max-w-[75%] relative ${msg.role === 'user' ? 'text-right' : 'text-right'}`}>
                        <div className={`flex items-center gap-3 mb-3 opacity-40 text-[10px] font-black uppercase tracking-[0.1em] ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                          {msg.role === 'user' ? <><User size={12} className="text-sky-500" /> تۆ</> : <><Sparkles size={12} className="text-emerald-500" /> ئەلترا</>}
                        </div>
                        <div className={`px-8 py-6 rounded-[3rem] shadow-2xl border-t border-white/10 transition-all duration-500 hover:shadow-sky-500/10 ${msg.role === 'user'
                          ? 'bg-gradient-to-br from-sky-600 via-sky-700 to-sky-800 text-white rounded-br-none'
                          : `${isDarkMode ? 'bg-slate-900/80 text-slate-100 border-white/5' : 'bg-white text-slate-900 border-slate-100 shadow-md'} rounded-bl-none backdrop-blur-xl`
                          }`}>
                          {msg.mediaUrl && (
                            <div className="mb-6 rounded-[2rem] overflow-hidden border-2 border-white/10 shadow-2xl group/media relative">
                              {msg.mediaType?.startsWith('image') ? (
                                <img src={msg.mediaUrl} className="max-h-[500px] w-full object-cover transition-transform duration-700 group-hover/media:scale-110" alt="Media" referrerPolicy="no-referrer" />
                              ) : (
                                <div className="p-16 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-white/5 dark:to-white/10 flex flex-col items-center gap-4">
                                  <FileText size={64} className="text-sky-500 animate-bounce" />
                                  <span className="text-sm font-black opacity-80">فایلی شیکارکراو</span>
                                </div>
                              )}
                            </div>
                          )}
                          <div className={`prose prose-sm md:prose-base leading-relaxed ${msg.role === 'user' ? 'prose-invert font-bold' : isDarkMode ? 'prose-invert font-medium' : 'text-slate-800 font-medium'} max-w-none text-right`}>
                            {msg.text || (isUltraChatLoading && idx === ultraChatMessages.length - 1) ? (
                              <Markdown>{msg.text || (isUltraChatLoading && idx === ultraChatMessages.length - 1 ? '... خەریکە بیر دەکەمەوە ...' : '')}</Markdown>
                            ) : null}
                          </div>
                        </div>
                        {msg.role === 'model' && msg.text && (
                          <div className="absolute top-0 -left-16 opacity-0 group-hover:opacity-100 transition-all flex flex-col gap-3">
                            <button onClick={() => handleCopy(msg.text || '')} className={`p-3 rounded-2xl transition-all shadow-lg ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white border border-white/10' : 'bg-white hover:bg-slate-100 text-slate-900 border border-slate-200'}`} title="کۆپی">
                              <Copy size={16} />
                            </button>
                            <button onClick={() => speakText(msg.text || '', idx)} className={`p-3 rounded-2xl transition-all shadow-lg ${speakingMessage === idx ? 'bg-sky-500 text-white animate-pulse' : isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white border border-white/10' : 'bg-white hover:bg-slate-100 text-slate-900 border border-slate-200'}`} title="خوێندنەوە">
                              {speakingMessage === idx ? <VolumeX size={16} /> : <Volume2 size={16} />}
                            </button>
                            <button onClick={() => generateMindMapFromText(msg.text || '')} className={`p-3 rounded-2xl transition-all shadow-lg ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-fuchsia-400 border border-white/10' : 'bg-white hover:bg-slate-100 text-fuchsia-600 border border-slate-200'}`} title="نەخشەی مێشک">
                              <GitGraph size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {isUltraChatLoading && ultraChatMessages[ultraChatMessages.length - 1].role === 'user' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end pr-12">
                      <div className="flex gap-2 p-6 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-xl">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0s]" />
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest ml-4">Ultra Thinking...</span>
                      </div>
                    </motion.div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Floating Scroll Button */}
                <AnimatePresence>
                  {showScrollButton && (
                    <motion.button
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      onClick={() => {
                        const messagesDiv = document.querySelector('.ultra-messages-container');
                        if (messagesDiv) {
                          messagesDiv.scrollTo({ top: messagesDiv.scrollHeight, behavior: 'smooth' });
                        }
                      }}
                      className="absolute bottom-6 right-6 p-4 rounded-full bg-sky-600 text-white shadow-2xl z-50 hover:scale-110 active:scale-95 transition-transform"
                    >
                      <ArrowDown size={20} className="animate-bounce" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Input Control Center */}
              <div className={`p-6 md:p-10 border-t ${isDarkMode ? 'border-white/5 bg-slate-900/40' : 'border-slate-100 bg-slate-50/50'} backdrop-blur-3xl shrink-0`}>
                <div className="max-w-4xl mx-auto">
                  {ultraChatFilePreview && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 relative inline-block">
                      {ultraChatFile?.type.startsWith('image/') ? (
                        <img src={ultraChatFilePreview} className="h-20 w-20 object-cover rounded-2xl border-4 border-sky-500 shadow-xl" alt="Preview" />
                      ) : (
                        <div className="h-20 w-20 flex flex-col items-center justify-center bg-sky-500 rounded-2xl text-white shadow-xl">
                          <FileText size={32} />
                          <span className="text-[8px] font-black mt-1 uppercase">PDF</span>
                        </div>
                      )}
                      <button onClick={() => { setUltraChatFile(null); setUltraChatFilePreview(null); }} className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1.5 shadow-lg">
                        <X size={12} />
                      </button>
                    </motion.div>
                  )}

                  <div className={`relative p-3 rounded-[3rem] border-2 shadow-2xl transition-all duration-500 group flex items-center gap-3 ${isDarkMode ? 'bg-slate-800 border-white/10 focus-within:border-sky-500/50' : 'bg-white border-slate-200 focus-within:border-sky-500'}`}>
                    <label className={`p-4 rounded-[2rem] cursor-pointer transition-all ${isDarkMode ? 'hover:bg-white/5 text-white/40' : 'hover:bg-slate-100 text-slate-400'}`}>
                      <Upload size={20} />
                      <input type="file" className="hidden" onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setUltraChatFile(e.target.files[0]);
                          setUltraChatFilePreview(URL.createObjectURL(e.target.files[0]));
                        }
                      }} />
                    </label>

                    <textarea
                      value={ultraChatInput}
                      onChange={(e) => setUltraChatInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendUltraMessage(); } }}
                      placeholder="هەر شتێک لە مێشکدایە لێرە بیپرسە..."
                      rows={1}
                      className="flex-grow bg-transparent outline-none text-right font-bold text-sm py-2 px-2 resize-none no-scrollbar"
                    />

                    <button
                      onClick={handleSendUltraMessage}
                      disabled={isUltraChatLoading || (!ultraChatInput.trim() && !ultraChatFile)}
                      className={`p-5 rounded-[2rem] transition-all shadow-2xl active:scale-90 ${(ultraChatInput.trim() || ultraChatFile) && !isUltraChatLoading
                        ? 'bg-gradient-to-br from-cyan-400 via-sky-500 to-sky-600 text-white shadow-sky-500/40 hover:brightness-110 hover:shadow-sky-500/60'
                        : 'bg-slate-100 text-slate-300 dark:bg-white/5 dark:text-white/10'
                        }`}
                    >
                      {isUltraChatLoading ? <Loader2 className="animate-spin" size={24} /> : <SendHorizontal size={24} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`h-screen flex flex-col max-w-2xl mx-auto shadow-2xl relative ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}
          >
            {/* Ambient Background for Normal Chat */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 overflow-hidden">
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full" />
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-sky-500/10 blur-[100px] rounded-full" />
            </div>

            <header className={`px-6 py-5 flex items-center justify-between border-b relative z-10 backdrop-blur-2xl ${isDarkMode ? 'bg-slate-900/80 border-white/5 text-white' : 'bg-white/80 border-slate-100 text-slate-900'}`}>
              <div className="flex items-center gap-4">
                <button onClick={() => setCurrentScreen('home')} className={`p-3 rounded-2xl transition-all ${isDarkMode ? 'hover:bg-white/5 text-white/60' : 'hover:bg-slate-100 text-slate-500'}`}>
                  <ArrowRight size={24} />
                </button>
                <div className="h-5 w-[1px] bg-slate-200 dark:bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-base font-black tracking-tight flex items-center gap-2">
                    چاتی زیرەک
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">AI Academic Assistant</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (confirm('دڵنیایت لە پاککردنەوە؟')) {
                      setChatMessages([{ role: 'model', text: 'چاتەکە پاککرایەوە.' }]);
                      startNewChat();
                    }
                  }}
                  className={`p-3 rounded-2xl transition-all ${isDarkMode ? 'hover:bg-red-500/10 text-red-400' : 'hover:bg-red-50 text-red-500'}`}
                  title="سڕینەوە"
                >
                  <RefreshCw size={20} />
                </button>
              </div>
            </header>

            <div
              onScroll={(e) => {
                const target = e.currentTarget;
                const isNearBottom = target.scrollHeight - target.scrollTop - target.clientHeight < 100;
                setShowScrollButton(!isNearBottom);
              }}
              className={`flex-grow overflow-y-auto px-6 py-10 space-y-8 scroll-smooth no-scrollbar relative z-10`}
            >
              {chatMessages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.role === 'user' ? -20 : 20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.4, type: 'spring', damping: 20 }}
                  className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`group max-w-[90%] relative ${msg.role === 'user' ? 'text-right' : 'text-right'}`}>
                    <div className={`px-6 py-4 rounded-[2rem] shadow-lg transition-all duration-300 ${msg.role === 'user'
                      ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-br-none shadow-emerald-500/20'
                      : `${isDarkMode ? 'bg-slate-800 text-slate-100 border border-white/5' : 'bg-white text-slate-800 border border-slate-100 shadow-sm'} rounded-bl-none`
                      }`}>
                      {msg.mediaUrl && (
                        <div className="mb-4 rounded-2xl overflow-hidden border border-white/10 ring-4 ring-black/5">
                          {msg.mediaType?.startsWith('image') ? (
                            <img src={msg.mediaUrl} className="max-h-64 w-full object-cover" alt="Media" referrerPolicy="no-referrer" />
                          ) : (
                            <div className="p-8 bg-black/10 flex flex-col items-center gap-3">
                              <FileText size={40} className="text-white/60" />
                              <span className="text-[10px] font-black uppercase opacity-60">فایلی نێردراو</span>
                            </div>
                          )}
                        </div>
                      )}
                      <div className={`prose prose-sm leading-relaxed ${msg.role === 'user' ? 'prose-invert font-bold' : isDarkMode ? 'prose-invert font-medium' : 'text-slate-800 font-medium'} max-w-none text-right`}>
                        <Markdown>{msg.text || (isChatLoading && idx === chatMessages.length - 1 ? '...' : '')}</Markdown>
                      </div>
                    </div>

                    {msg.role === 'model' && msg.text && (
                      <div className="absolute top-0 -left-12 opacity-0 group-hover:opacity-100 transition-all flex flex-col gap-2 scale-90 origin-right">
                        <button onClick={() => handleCopy(msg.text || '')} className={`p-2 rounded-xl transition-all shadow-md ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-white hover:bg-slate-100 text-slate-900 border'}`}>
                          <Copy size={14} />
                        </button>
                        <button onClick={() => speakText(msg.text || '', idx, false)} className={`p-2 rounded-xl transition-all shadow-md ${speakingMessageChat === idx ? 'bg-emerald-500 text-white' : isDarkMode ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-white hover:bg-slate-100 text-slate-900 border'}`}>
                          {speakingMessageChat === idx ? <VolumeX size={14} /> : <Volume2 size={14} />}
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {isChatLoading && chatMessages[chatMessages.length - 1].role === 'user' && (
                <div className="flex justify-end pr-8">
                  <div className="flex gap-1.5 p-4 rounded-2xl bg-slate-500/5 dark:bg-white/5 backdrop-blur-sm border border-black/5 dark:border-white/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0s]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <AnimatePresence>
              {showScrollButton && currentScreen === 'chat' && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onClick={() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="absolute bottom-32 right-8 p-4 rounded-full bg-emerald-600 text-white shadow-2xl z-20 hover:scale-110 active:scale-95 transition-all"
                >
                  <ArrowDown size={18} className="animate-bounce" />
                </motion.button>
              )}
            </AnimatePresence>

            <div className={`p-6 pb-10 ${isDarkMode ? 'bg-slate-900/80' : 'bg-white/80'} backdrop-blur-3xl relative z-10 border-t border-black/5 dark:border-white/5`}>
              {chatFilePreview && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 relative inline-block">
                  {chatFile?.type.startsWith('image/') ? (
                    <img src={chatFilePreview} className="h-20 w-20 object-cover rounded-2xl border-2 border-emerald-500 shadow-xl ring-4 ring-emerald-500/10" alt="Preview" />
                  ) : (
                    <div className="h-20 w-20 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl text-white shadow-xl">
                      <FileText size={24} />
                      <span className="text-[8px] font-black uppercase mt-1">PDF / DOC</span>
                    </div>
                  )}
                  <button onClick={() => { setChatFile(null); setChatFilePreview(null); }} className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-2 shadow-2xl hover:scale-110 transition-all">
                    <X size={12} />
                  </button>
                </motion.div>
              )}
              <div className={`flex gap-3 items-center ${isDarkMode ? 'bg-slate-800/80 border-white/5' : 'bg-slate-100 border-slate-200'} border-2 rounded-[2.5rem] p-3 shadow-inner focus-within:border-emerald-500/50 transition-all duration-300`}>
                <div className="flex items-center">
                  <label className="cursor-pointer p-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors text-emerald-500">
                    <Upload size={20} />
                    <input type="file" className="hidden" onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setChatFile(e.target.files[0]);
                        setChatFilePreview(URL.createObjectURL(e.target.files[0]));
                      }
                    }} />
                  </label>
                  <button onClick={handleVoiceInput} className={`p-3 rounded-full transition-colors ${isRecording ? 'text-red-500 bg-red-500/10 animate-pulse' : 'text-emerald-500 hover:bg-black/5 dark:hover:bg-white/5'}`}>
                    <Mic size={20} />
                  </button>
                </div>
                <textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                  placeholder="پرسیارەکەت بنووسە..."
                  className={`flex-grow bg-transparent border-none outline-none p-3 text-right resize-none max-h-40 font-medium ${isDarkMode ? 'text-slate-100 placeholder:text-slate-600' : 'text-slate-800 placeholder:text-slate-400'}`}
                  rows={1}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isChatLoading || (!chatInput.trim() && !chatFile)}
                  className={`p-4 rounded-full transition-all shadow-xl active:scale-95 disabled:scale-100 group ${(chatInput.trim() || chatFile) && !isChatLoading
                    ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:brightness-105'
                    : 'bg-slate-200 text-slate-400 dark:bg-white/5 dark:text-white/10'
                    }`}
                >
                  {isChatLoading ? <Loader2 className="animate-spin" size={24} /> : <SendHorizontal size={24} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Login Modal */}
      <AnimatePresence>
        {showAdminLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`w-full max-w-sm p-8 rounded-[40px] shadow-2xl ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}
            >
              <h3 className="text-2xl font-black mb-6 text-center">چوونەژوورەوەی ئەدمین</h3>
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="کۆدی نهێنی بنووسە..."
                  value={adminPassInput}
                  onChange={(e) => setAdminPassInput(e.target.value)}
                  className={`w-full p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'} text-center text-2xl tracking-[1em]`}
                  autoFocus
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleAdminLogin}
                    className="flex-1 bg-sky-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-sky-600 transition-all"
                  >
                    چوونەژوورەوە
                  </button>
                  <button
                    onClick={() => { setShowAdminLogin(false); setAdminPassInput(''); }}
                    className={`flex-1 py-4 rounded-2xl font-bold text-lg ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'} hover:opacity-80 transition-all`}
                  >
                    داخستن
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pro Modal */}
      <AnimatePresence>
        {showProModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className={`w-full max-w-sm rounded-[3rem] overflow-hidden shadow-2xl ${isDarkMode ? 'bg-slate-900 border border-white/10' : 'bg-white'}`}
            >
              <div className="relative h-40 bg-gradient-to-br from-sky-600 to-purple-700 flex flex-col items-center justify-center text-white p-6 text-center">
                <button
                  onClick={() => setShowProModal(false)}
                  className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center mb-2">
                  <Crown size={40} className="text-yellow-400" />
                </div>
                <h3 className="text-xl font-black tracking-tighter">ئەپەکەت بکە بە پڕۆ (PRO)</h3>
              </div>

              <div className="p-8 space-y-6">
                <p className="text-center text-sm font-bold opacity-70 leading-relaxed">
                  تۆ گەیشتوویت بە سنووری بەکارهێنانی خۆڕایی بۆ ئەمڕۆ ({FREE_DAILY_LIMIT} داواکاری). بۆ بەکارهێنانی بێ سنوور پڕۆ چالاک بکە.
                </p>

                <div className="space-y-3">
                  {[
                    'وەرگێڕانی بێ سنوور و خێرا',
                    'شیکردنەوەی هەموو جۆرە فایلێک',
                    'دروستکردنی وێنە و ڤیدیۆی بێ سنوور',
                    'دروستکردنی ڕاپۆرت و سیمیناری درێژ',
                    'بەکارهێنانی هەموو ئامرازەکان بەبێ سنوور',
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3 text-[11px] font-bold">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                        <Check size={12} strokeWidth={4} />
                      </div>
                      <span className="opacity-80">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-4">
                  <button
                    onClick={() => {
                      const message = encodeURIComponent(`سڵاو، من حەز دەکەم وەشانی پڕۆی ئەپی Academic AI چالاک بکەم. تکایە ڕێنماییم بکە بۆ ناردنی بڕی ٥٠٠٠ دینار.`);
                      window.open(`https://wa.me/${officialAccount.phone.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
                    }}
                    className="w-full bg-sky-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-sky-600/20 active:scale-95 transition-all text-center flex items-center justify-center gap-2"
                  >
                    <Crown size={20} className="text-yellow-400" />
                    <span>چالاککردنی پڕۆ (٥٠٠٠ دینار)</span>
                  </button>
                  <button
                    onClick={() => setShowProModal(false)}
                    className="w-full py-2 text-xs font-bold opacity-40 hover:opacity-100 transition-opacity text-center"
                  >
                    دوای تاقی دەکەمەوە
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
