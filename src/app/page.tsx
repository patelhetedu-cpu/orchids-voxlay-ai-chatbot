"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { 
  PanelLeftClose, 
  PanelLeft,
  Plus, 
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  Settings,
  ChevronDown,
  Send,
  Paperclip,
  Camera,
  Sparkles,
  Brain,
  Globe,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
  RotateCcw,
  Star,
  X,
  Code2,
  FolderKanban,
  User,
  Zap,
  Sliders,
  HelpCircle,
  LogOut,
  ChevronRight,
  Ghost,
  BookOpen,
  Cpu,
  Upload,
  FileText,
  Link,
  Youtube,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  ArrowLeft,
  Folder,
  File,
  Clock,
  Edit3,
  Download,
  Share2,
  Eye,
  Shield,
  Building,
  MessageSquare,
  Database
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Chat {
  id: string;
  title: string;
  timestamp: Date;
  messages: Message[];
  starred?: boolean;
}

interface CodeSnippet {
  id: string;
  title: string;
  language: string;
  code: string;
  createdAt: Date;
}

interface Project {
  id: string;
  name: string;
  description: string;
  files: number;
  lastModified: Date;
}

interface NotebookSource {
  id: string;
  name: string;
  type: "pdf" | "link" | "youtube" | "text";
  content?: string;
}

const aiResponses = [
  "I'd be happy to help with that. Let me think through this carefully.\n\nBased on what you've shared, there are a few key considerations we should explore. First, it's important to understand the context and any constraints you're working within.\n\nWould you like me to elaborate on any particular aspect, or shall we dive deeper into a specific area?",
  "That's a great question! Here's my perspective:\n\nThe topic you're asking about is quite nuanced. There are multiple angles we could approach this from, depending on your specific goals and situation.\n\nI can provide more detailed analysis if you'd like to share additional context about what you're trying to achieve.",
  "Let me help you work through this step by step.\n\n**First**, we should establish the foundational concepts. This will give us a solid base to build upon.\n\n**Second**, we can explore the practical applications and how they might apply to your situation.\n\n**Finally**, I can offer some recommendations based on best practices and common patterns I've seen work well.",
  "Interesting question! Here's what I think:\n\nThis is an area where there's often more complexity than initially meets the eye. The key is to balance several competing factors while staying focused on your primary objective.\n\nI'm happy to go deeper on any part of this—just let me know what would be most useful.",
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "G' morning";
  if (hour < 17) return "G' afternoon";
  return "G' evening";
}

function VoiceWaveAnimation({ lightTheme }: { lightTheme: boolean }) {
  return (
    <div className="flex items-center justify-center gap-[3px] h-[18px] w-[32px]">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className={`w-[3px] rounded-full ${lightTheme ? "bg-gray-800" : "bg-white"}`}
          style={{
            animation: `voiceWave 1s ease-in-out infinite`,
            animationDelay: `${i * 0.15}s`,
            height: '8px',
          }}
        />
      ))}
      <style jsx>{`
        @keyframes voiceWave {
          0%, 100% {
            height: 8px;
          }
          50% {
            height: 18px;
          }
        }
      `}</style>
    </div>
  );
}

function FloatingGhosts() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute text-purple-500/10 animate-float-ghost"
          style={{
            left: `${15 + i * 15}%`,
            top: `${10 + (i % 3) * 30}%`,
            animationDelay: `${i * 0.8}s`,
            fontSize: `${20 + (i % 3) * 8}px`,
          }}
        >
          <Ghost size={20 + (i % 3) * 8} />
        </div>
      ))}
      <style jsx>{`
        @keyframes float-ghost {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.1;
          }
          25% {
            transform: translateY(-15px) rotate(5deg);
            opacity: 0.15;
          }
          50% {
            transform: translateY(-25px) rotate(-3deg);
            opacity: 0.2;
          }
          75% {
            transform: translateY(-10px) rotate(3deg);
            opacity: 0.15;
          }
        }
        .animate-float-ghost {
          animation: float-ghost 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// VOX Learn Mode - NotebookLM Style Interface
function VOXLearnMode({ onBack, ghostMode }: { onBack: () => void; ghostMode: boolean }) {
  const [sources, setSources] = useState<NotebookSource[]>([
    { id: "1", name: "Introduction to AI.pdf", type: "pdf" },
    { id: "2", name: "Machine Learning Guide", type: "link" },
  ]);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const bgColor = ghostMode ? "bg-[#0d1117]" : "bg-[#212121]";
  const cardBg = ghostMode ? "bg-[#161b22]" : "bg-[#2a2a2a]";
  const hoverBg = ghostMode ? "hover:bg-[#21262d]" : "hover:bg-[#333]";
  const borderColor = ghostMode ? "border-[#30363d]" : "border-[#444]";

  return (
    <div className={`h-screen ${bgColor} text-white flex flex-col`}>
      <header className={`flex items-center justify-between px-6 py-4 border-b ${borderColor}`}>
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className={`p-2 rounded-lg ${hoverBg} transition-all`}
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 flex items-center justify-center">
              <BookOpen size={20} className="text-emerald-400" />
            </div>
            <div>
              <h1 className="font-semibold">VOX Learn</h1>
              <p className="text-xs text-[#888]">AI-powered learning assistant</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className={`px-4 py-2 rounded-lg text-sm ${hoverBg} transition-all flex items-center gap-2`}>
            <Share2 size={16} />
            Share
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className={`w-80 border-r ${borderColor} flex flex-col`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium">Sources</h2>
              <button 
                onClick={() => setShowUpload(true)}
                className={`p-2 rounded-lg ${hoverBg} transition-all`}
              >
                <Plus size={18} />
              </button>
            </div>

            {showUpload && (
              <div className={`mb-4 p-4 rounded-xl border-2 border-dashed ${borderColor} ${cardBg} relative`}>
                <div className="text-center">
                  <Upload size={32} className="mx-auto mb-2 text-[#666]" />
                  <p className="text-sm text-[#888] mb-3">Drop files here or click to upload</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${cardBg} ${hoverBg} transition-all`}>
                      <FileText size={14} />
                      PDF
                    </button>
                    <button className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${cardBg} ${hoverBg} transition-all`}>
                      <Link size={14} />
                      URL
                    </button>
                    <button className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${cardBg} ${hoverBg} transition-all`}>
                      <Youtube size={14} />
                      YouTube
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => setShowUpload(false)}
                  className="absolute top-2 right-2 p-1 rounded text-[#666] hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            <div className="space-y-2">
              {sources.map(source => (
                <button
                  key={source.id}
                  onClick={() => setSelectedSource(source.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                    selectedSource === source.id ? cardBg : hoverBg
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg ${
                    source.type === "pdf" ? "bg-red-500/20 text-red-400" :
                    source.type === "youtube" ? "bg-red-600/20 text-red-500" :
                    "bg-blue-500/20 text-blue-400"
                  } flex items-center justify-center`}>
                    {source.type === "pdf" ? <FileText size={16} /> :
                     source.type === "youtube" ? <Youtube size={16} /> :
                     <Link size={16} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{source.name}</p>
                    <p className="text-xs text-[#666] capitalize">{source.type}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className={`p-6 border-b ${borderColor}`}>
            <div className={`${cardBg} rounded-2xl p-6`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium mb-1">Audio Overview</h3>
                  <p className="text-sm text-[#888]">Listen to an AI-generated summary of your sources</p>
                </div>
                <button className={`px-4 py-2 rounded-xl ${ghostMode ? "bg-emerald-600" : "bg-white text-black"} text-sm font-medium transition-all hover:opacity-90`}>
                  Generate
                </button>
              </div>
              
              <div className={`flex items-center gap-4 p-4 rounded-xl ${ghostMode ? "bg-[#0d1117]" : "bg-black"}`}>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`w-12 h-12 rounded-full ${ghostMode ? "bg-emerald-600" : "bg-white"} flex items-center justify-center transition-all hover:scale-105`}
                >
                  {isPlaying ? 
                    <Pause size={20} className={ghostMode ? "text-white" : "text-black"} /> : 
                    <Play size={20} className={`${ghostMode ? "text-white" : "text-black"} ml-1`} />
                  }
                </button>
                <div className="flex-1">
                  <div className={`h-1 rounded-full ${ghostMode ? "bg-[#30363d]" : "bg-[#333]"}`}>
                    <div className={`h-full w-1/3 rounded-full ${ghostMode ? "bg-emerald-500" : "bg-white"}`} />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-[#666]">
                    <span>2:34</span>
                    <span>8:45</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg text-[#888] hover:text-white transition-all">
                    <SkipBack size={18} />
                  </button>
                  <button className="p-2 rounded-lg text-[#888] hover:text-white transition-all">
                    <SkipForward size={18} />
                  </button>
                  <button className="p-2 rounded-lg text-[#888] hover:text-white transition-all">
                    <Volume2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col p-6">
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="w-16 h-16 rounded-2xl bg-emerald-600/20 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare size={28} className="text-emerald-400" />
                </div>
                <h3 className="font-medium mb-2">Start a conversation</h3>
                <p className="text-sm text-[#888] mb-6">Ask questions about your sources and get AI-powered answers with citations.</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["Summarize the key points", "What are the main themes?", "Explain this concept"].map(suggestion => (
                    <button 
                      key={suggestion}
                      onClick={() => setChatInput(suggestion)}
                      className={`px-4 py-2 rounded-full text-sm ${cardBg} ${hoverBg} transition-all`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={`rounded-2xl border ${borderColor} ${cardBg} p-3`}>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about your sources..."
                  className="flex-1 bg-transparent outline-none text-sm"
                />
                <button className={`p-2 rounded-lg ${ghostMode ? "bg-emerald-600" : "bg-white"} transition-all`}>
                  <Send size={16} className={ghostMode ? "text-white" : "text-black"} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={`w-72 border-l ${borderColor} p-4`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Notes</h2>
            <button className={`p-2 rounded-lg ${hoverBg} transition-all`}>
              <Plus size={18} />
            </button>
          </div>
          <div className={`${cardBg} rounded-xl p-4 text-center`}>
            <Edit3 size={24} className="mx-auto mb-2 text-[#666]" />
            <p className="text-sm text-[#888]">Save important insights and notes here</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Code Library Component
function CodeLibrary({ onClose, lightTheme }: { onClose: () => void; lightTheme: boolean }) {
  const [snippets, setSnippets] = useState<CodeSnippet[]>([
    { id: "1", title: "React useEffect Hook", language: "typescript", code: "useEffect(() => {\n  // Effect logic\n  return () => cleanup();\n}, [deps]);", createdAt: new Date(Date.now() - 86400000) },
    { id: "2", title: "Fetch API Wrapper", language: "javascript", code: "async function fetchData(url) {\n  const res = await fetch(url);\n  return res.json();\n}", createdAt: new Date(Date.now() - 172800000) },
    { id: "3", title: "Tailwind Button", language: "html", code: '<button class="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600">\n  Click me\n</button>', createdAt: new Date(Date.now() - 259200000) },
  ]);
  const [selectedSnippet, setSelectedSnippet] = useState<CodeSnippet | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewSnippet, setShowNewSnippet] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newLanguage, setNewLanguage] = useState("javascript");
  const [newCode, setNewCode] = useState("");

  const bgColor = lightTheme ? "bg-white" : "bg-[#1a1a1a]";
  const cardBg = lightTheme ? "bg-gray-100" : "bg-[#252525]";
  const hoverBg = lightTheme ? "hover:bg-gray-200" : "hover:bg-[#2a2a2a]";
  const borderColor = lightTheme ? "border-gray-300" : "border-[#333]";
  const textColor = lightTheme ? "text-gray-900" : "text-white";
  const subTextColor = lightTheme ? "text-gray-500" : "text-[#888]";

  const filteredSnippets = snippets.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveSnippet = () => {
    if (!newTitle.trim() || !newCode.trim()) return;
    const newSnippet: CodeSnippet = {
      id: Date.now().toString(),
      title: newTitle,
      language: newLanguage,
      code: newCode,
      createdAt: new Date()
    };
    setSnippets(prev => [newSnippet, ...prev]);
    setShowNewSnippet(false);
    setNewTitle("");
    setNewCode("");
  };

  const handleDeleteSnippet = (id: string) => {
    setSnippets(prev => prev.filter(s => s.id !== id));
    if (selectedSnippet?.id === id) setSelectedSnippet(null);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
      <div className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-5xl h-[80vh] ${bgColor} ${textColor} rounded-2xl z-50 overflow-hidden flex`}>
        <div className={`w-72 border-r ${borderColor} flex flex-col`}>
          <div className={`p-4 border-b ${borderColor}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold flex items-center gap-2">
                <Code2 size={18} />
                Code Library
              </h2>
              <button onClick={onClose} className={`p-1.5 rounded-lg ${subTextColor} hover:${textColor}`}>
                <X size={16} />
              </button>
            </div>
            <div className={`flex items-center gap-2 ${cardBg} rounded-lg px-3 py-2`}>
              <Search size={14} className={subTextColor} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search snippets..."
                className={`flex-1 bg-transparent text-sm outline-none ${textColor}`}
              />
            </div>
          </div>

          <div className="p-3">
            <button 
              onClick={() => setShowNewSnippet(true)}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg ${hoverBg} text-sm transition-all`}
            >
              <Plus size={16} />
              New Snippet
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 pb-3">
            {filteredSnippets.map(snippet => (
              <button
                key={snippet.id}
                onClick={() => setSelectedSnippet(snippet)}
                className={`w-full text-left p-3 rounded-lg mb-2 transition-all ${
                  selectedSnippet?.id === snippet.id ? cardBg : hoverBg
                }`}
              >
                <p className="text-sm font-medium truncate">{snippet.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    snippet.language === "typescript" ? "bg-blue-500/20 text-blue-400" :
                    snippet.language === "javascript" ? "bg-yellow-500/20 text-yellow-500" :
                    "bg-orange-500/20 text-orange-400"
                  }`}>
                    {snippet.language}
                  </span>
                  <span className={`text-xs ${subTextColor}`}>
                    {snippet.createdAt.toLocaleDateString()}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {showNewSnippet ? (
            <div className="flex-1 p-6">
              <h3 className="font-medium mb-4">New Snippet</h3>
              <div className="space-y-4">
                <div>
                  <label className={`text-sm ${subTextColor} mb-2 block`}>Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Snippet title..."
                    className={`w-full px-4 py-3 rounded-lg ${cardBg} outline-none text-sm ${textColor}`}
                  />
                </div>
                <div>
                  <label className={`text-sm ${subTextColor} mb-2 block`}>Language</label>
                  <select
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg ${cardBg} outline-none text-sm ${textColor}`}
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                  </select>
                </div>
                <div>
                  <label className={`text-sm ${subTextColor} mb-2 block`}>Code</label>
                  <textarea
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    placeholder="Paste your code here..."
                    rows={12}
                    className={`w-full px-4 py-3 rounded-lg ${cardBg} outline-none text-sm font-mono resize-none ${textColor}`}
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleSaveSnippet}
                    className={`px-6 py-2.5 rounded-lg ${lightTheme ? "bg-gray-900 text-white" : "bg-white text-black"} text-sm font-medium`}
                  >
                    Save Snippet
                  </button>
                  <button
                    onClick={() => setShowNewSnippet(false)}
                    className={`px-6 py-2.5 rounded-lg ${cardBg} text-sm`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : selectedSnippet ? (
            <div className="flex-1 flex flex-col">
              <div className={`flex items-center justify-between p-4 border-b ${borderColor}`}>
                <div>
                  <h3 className="font-medium">{selectedSnippet.title}</h3>
                  <p className={`text-xs ${subTextColor} mt-1`}>
                    {selectedSnippet.language} • Created {selectedSnippet.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className={`p-2 rounded-lg ${hoverBg}`}>
                    <Copy size={16} />
                  </button>
                  <button className={`p-2 rounded-lg ${hoverBg}`}>
                    <Download size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeleteSnippet(selectedSnippet.id)}
                    className={`p-2 rounded-lg ${hoverBg} text-red-500`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-auto">
                <pre className={`${cardBg} rounded-xl p-4 text-sm font-mono overflow-x-auto`}>
                  <code>{selectedSnippet.code}</code>
                </pre>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Code2 size={40} className={`mx-auto mb-4 ${subTextColor}`} />
                <h3 className="font-medium mb-2">Select a snippet</h3>
                <p className={`text-sm ${subTextColor}`}>Choose a code snippet from the sidebar or create a new one</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Projects Component
function ProjectsView({ onClose, lightTheme }: { onClose: () => void; lightTheme: boolean }) {
  const [projects, setProjects] = useState<Project[]>([
    { id: "1", name: "VOXLAY Dashboard", description: "Main dashboard application", files: 24, lastModified: new Date(Date.now() - 3600000) },
    { id: "2", name: "API Integration", description: "Backend API services", files: 12, lastModified: new Date(Date.now() - 86400000) },
    { id: "3", name: "Mobile App", description: "React Native mobile application", files: 45, lastModified: new Date(Date.now() - 172800000) },
  ]);
  const [showNewProject, setShowNewProject] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const bgColor = lightTheme ? "bg-white" : "bg-[#1a1a1a]";
  const cardBg = lightTheme ? "bg-gray-100" : "bg-[#252525]";
  const hoverBg = lightTheme ? "hover:bg-gray-200" : "hover:bg-[#2a2a2a]";
  const borderColor = lightTheme ? "border-gray-300" : "border-[#333]";
  const textColor = lightTheme ? "text-gray-900" : "text-white";
  const subTextColor = lightTheme ? "text-gray-500" : "text-[#888]";

  const handleCreateProject = () => {
    if (!newName.trim()) return;
    const newProject: Project = {
      id: Date.now().toString(),
      name: newName,
      description: newDescription,
      files: 0,
      lastModified: new Date()
    };
    setProjects(prev => [newProject, ...prev]);
    setShowNewProject(false);
    setNewName("");
    setNewDescription("");
  };

  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
      <div className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl h-[70vh] ${bgColor} ${textColor} rounded-2xl z-50 overflow-hidden`}>
        <div className={`flex items-center justify-between p-4 border-b ${borderColor}`}>
          <h2 className="font-semibold flex items-center gap-2">
            <FolderKanban size={18} />
            Projects
          </h2>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowNewProject(true)}
              className={`px-4 py-2 rounded-lg ${lightTheme ? "bg-gray-900 text-white" : "bg-white text-black"} text-sm font-medium flex items-center gap-2`}
            >
              <Plus size={14} />
              New Project
            </button>
            <button onClick={onClose} className={`p-2 rounded-lg ${subTextColor} hover:${textColor}`}>
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto h-[calc(100%-60px)]">
          {showNewProject && (
            <div className={`${cardBg} rounded-xl p-4 mb-6`}>
              <h3 className="font-medium mb-4">Create New Project</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Project name..."
                  className={`w-full px-4 py-3 rounded-lg ${lightTheme ? "bg-white" : "bg-black/30"} outline-none text-sm`}
                />
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Description (optional)..."
                  className={`w-full px-4 py-3 rounded-lg ${lightTheme ? "bg-white" : "bg-black/30"} outline-none text-sm`}
                />
                <div className="flex gap-3">
                  <button onClick={handleCreateProject} className={`px-4 py-2 rounded-lg ${lightTheme ? "bg-gray-900 text-white" : "bg-white text-black"} text-sm`}>
                    Create
                  </button>
                  <button onClick={() => setShowNewProject(false)} className={`px-4 py-2 rounded-lg ${hoverBg} text-sm`}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(project => (
              <div
                key={project.id}
                className={`${cardBg} rounded-xl p-4 ${hoverBg} transition-all cursor-pointer group`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg ${lightTheme ? "bg-blue-100" : "bg-blue-500/20"} flex items-center justify-center`}>
                    <Folder size={18} className={lightTheme ? "text-blue-600" : "text-blue-400"} />
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDeleteProject(project.id); }}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded text-red-500 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <h3 className="font-medium mb-1">{project.name}</h3>
                <p className={`text-sm ${subTextColor} mb-3`}>{project.description || "No description"}</p>
                <div className={`flex items-center gap-4 text-xs ${subTextColor}`}>
                  <span className="flex items-center gap-1">
                    <File size={12} />
                    {project.files} files
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {project.lastModified.toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// Edit Profile Component
function EditProfile({ onClose, lightTheme }: { onClose: () => void; lightTheme: boolean }) {
  const [name, setName] = useState("Agent");
  const [email, setEmail] = useState("agent@voxlay.ai");
  const [bio, setBio] = useState("");

  const bgColor = lightTheme ? "bg-white" : "bg-[#1a1a1a]";
  const cardBg = lightTheme ? "bg-gray-100" : "bg-[#252525]";
  const borderColor = lightTheme ? "border-gray-300" : "border-[#333]";
  const textColor = lightTheme ? "text-gray-900" : "text-white";
  const subTextColor = lightTheme ? "text-gray-500" : "text-[#888]";

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
      <div className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md ${bgColor} ${textColor} rounded-2xl z-50 overflow-hidden`}>
        <div className={`flex items-center justify-between p-4 border-b ${borderColor}`}>
          <h2 className="font-semibold">Edit Profile</h2>
          <button onClick={onClose} className={`p-2 rounded-lg ${subTextColor}`}>
            <X size={16} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <User size={40} className="text-white" />
              </div>
              <button className={`absolute bottom-0 right-0 w-8 h-8 rounded-full ${cardBg} border-2 ${lightTheme ? "border-white" : "border-black"} flex items-center justify-center`}>
                <Camera size={14} />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className={`text-sm ${subTextColor} mb-2 block`}>Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg ${cardBg} outline-none text-sm`}
              />
            </div>
            <div>
              <label className={`text-sm ${subTextColor} mb-2 block`}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg ${cardBg} outline-none text-sm`}
              />
            </div>
            <div>
              <label className={`text-sm ${subTextColor} mb-2 block`}>Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
                rows={3}
                className={`w-full px-4 py-3 rounded-lg ${cardBg} outline-none text-sm resize-none`}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button className={`flex-1 py-3 rounded-lg ${lightTheme ? "bg-gray-900 text-white" : "bg-white text-black"} font-medium text-sm`}>
              Save Changes
            </button>
            <button onClick={onClose} className={`px-6 py-3 rounded-lg ${cardBg} text-sm`}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// Upgrade/Pricing Page Component
function UpgradePage({ onClose, lightTheme }: { onClose: () => void; lightTheme: boolean }) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const bgColor = lightTheme ? "bg-gray-50" : "bg-black";
  const cardBg = lightTheme ? "bg-white" : "bg-[#141414]";
  const borderColor = lightTheme ? "border-gray-200" : "border-[#333]";
  const hoverBg = lightTheme ? "hover:bg-gray-100" : "hover:bg-[#1a1a1a]";
  const textColor = lightTheme ? "text-gray-900" : "text-white";
  const subTextColor = lightTheme ? "text-gray-500" : "text-[#888]";

  const plans = [
    {
      name: "Free",
      price: 0,
      description: "For individuals getting started",
      features: [
        { name: "Basic chat", included: true },
        { name: "5 messages/day", included: true },
        { name: "Standard models", included: true },
        { name: "Code library (10 snippets)", included: true },
        { name: "1 Project", included: true },
        { name: "Community support", included: true },
        { name: "VOX Learn", included: false },
        { name: "Priority support", included: false },
        { name: "API access", included: false },
      ],
      cta: "Current Plan",
      popular: false,
      color: "gray"
    },
    {
      name: "Pro",
      price: 19,
      description: "For professionals and creators",
      features: [
        { name: "Unlimited chat", included: true },
        { name: "Unlimited messages", included: true },
        { name: "All models including PRO", included: true },
        { name: "Unlimited code snippets", included: true },
        { name: "10 Projects", included: true },
        { name: "Priority support", included: true },
        { name: "VOX Learn", included: true },
        { name: "Deep research", included: true },
        { name: "API access", included: false },
      ],
      cta: "Upgrade to Pro",
      popular: true,
      color: "blue"
    },
    {
      name: "Explorer",
      price: 59,
      description: "For teams and power users",
      features: [
        { name: "Everything in Pro", included: true },
        { name: "Early access to new features", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Unlimited projects", included: true },
        { name: "Team collaboration", included: true },
        { name: "Custom integrations", included: true },
        { name: "API access (10k calls/mo)", included: true },
        { name: "Dedicated support", included: true },
        { name: "Custom model fine-tuning", included: false },
      ],
      cta: "Upgrade to Explorer",
      popular: false,
      color: "purple"
    },
    {
      name: "Enterprise",
      price: 2000,
      priceLabel: "Starting at",
      description: "For organizations at scale",
      features: [
        { name: "Everything in Explorer", included: true },
        { name: "Unlimited API calls", included: true },
        { name: "Custom model fine-tuning", included: true },
        { name: "SSO & SAML", included: true },
        { name: "Advanced security", included: true },
        { name: "SLA guarantee", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "On-premise deployment", included: true },
        { name: "Custom contracts", included: true },
      ],
      cta: "Contact Sales",
      popular: false,
      color: "amber"
    }
  ];

  const comparisonFeatures = [
    { name: "Messages per day", free: "5", pro: "Unlimited", explorer: "Unlimited", enterprise: "Unlimited" },
    { name: "AI Models", free: "Standard", pro: "All + PRO", explorer: "All + PRO", enterprise: "All + Custom" },
    { name: "Code snippets", free: "10", pro: "Unlimited", explorer: "Unlimited", enterprise: "Unlimited" },
    { name: "Projects", free: "1", pro: "10", explorer: "Unlimited", enterprise: "Unlimited" },
    { name: "VOX Learn", free: "—", pro: "✓", explorer: "✓", enterprise: "✓" },
    { name: "Deep Research", free: "—", pro: "✓", explorer: "✓", enterprise: "✓" },
    { name: "Ghost Mode", free: "✓", pro: "✓", explorer: "✓", enterprise: "✓" },
    { name: "API Access", free: "—", pro: "—", explorer: "10k calls/mo", enterprise: "Unlimited" },
    { name: "Team Members", free: "1", pro: "1", explorer: "5", enterprise: "Unlimited" },
    { name: "Support", free: "Community", pro: "Priority", explorer: "Dedicated", enterprise: "24/7 + Account Manager" },
    { name: "Custom Integrations", free: "—", pro: "—", explorer: "✓", enterprise: "✓" },
    { name: "SSO/SAML", free: "—", pro: "—", explorer: "—", enterprise: "✓" },
    { name: "SLA", free: "—", pro: "—", explorer: "—", enterprise: "99.9%" },
  ];

  return (
    <div className={`fixed inset-0 ${bgColor} ${textColor} z-50 overflow-y-auto`}>
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Image src="/voxlay-logo.png" alt="VOXLAY" width={32} height={32} />
              <span className="font-semibold text-lg">VOXLAY</span>
            </div>
            <button onClick={onClose} className={`p-2 rounded-lg ${hoverBg}`}>
              <X size={24} />
            </button>
          </div>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-500 text-sm mb-4">
              <Zap size={16} />
              Upgrade your experience
            </div>
            <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
            <p className={subTextColor}>
              Unlock powerful AI capabilities and take your productivity to the next level.
            </p>

            <div className="flex items-center justify-center gap-4 mt-8">
              <span className={billingCycle === "monthly" ? textColor : subTextColor}>Monthly</span>
              <button
                onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                className={`w-14 h-7 rounded-full ${billingCycle === "yearly" ? "bg-blue-500" : (lightTheme ? "bg-gray-300" : "bg-[#333]")} relative transition-colors`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-transform`}
                  style={{ transform: billingCycle === "yearly" ? "translateX(30px)" : "translateX(4px)" }}
                />
              </button>
              <span className={billingCycle === "yearly" ? textColor : subTextColor}>
                Yearly <span className="text-emerald-500 text-sm">(Save 20%)</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`${cardBg} rounded-2xl p-6 relative ${
                  plan.popular ? "ring-2 ring-blue-500" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium bg-blue-500 text-white">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
                    plan.color === "gray" ? (lightTheme ? "bg-gray-200" : "bg-[#333]") :
                    plan.color === "blue" ? "bg-blue-500/20 text-blue-500" :
                    plan.color === "purple" ? "bg-purple-500/20 text-purple-500" :
                    "bg-amber-500/20 text-amber-500"
                  }`}>
                    {plan.color === "gray" ? <User size={24} /> :
                     plan.color === "blue" ? <Zap size={24} /> :
                     plan.color === "purple" ? <Sparkles size={24} /> :
                     <Building size={24} />}
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
                  <p className={`text-sm ${subTextColor}`}>{plan.description}</p>
                </div>

                <div className="mb-6">
                  {plan.priceLabel && <p className={`text-xs ${subTextColor}`}>{plan.priceLabel}</p>}
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">
                      ${billingCycle === "yearly" ? Math.round(plan.price * 0.8) : plan.price}
                    </span>
                    {plan.price > 0 && <span className={subTextColor}>/mo</span>}
                  </div>
                </div>

                <button className={`w-full py-3 rounded-xl font-medium text-sm mb-6 transition-all ${
                  plan.popular 
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : `${hoverBg} border ${borderColor}`
                }`}>
                  {plan.cta}
                </button>

                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm">
                      {feature.included ? (
                        <Check size={16} className="text-emerald-500" />
                      ) : (
                        <X size={16} className={lightTheme ? "text-gray-300" : "text-[#444]"} />
                      )}
                      <span className={feature.included ? "" : subTextColor}>{feature.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">Feature Comparison</h2>
            <div className={`${cardBg} rounded-2xl overflow-hidden`}>
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${borderColor}`}>
                    <th className="text-left p-4 font-medium">Feature</th>
                    <th className="text-center p-4 font-medium">Free</th>
                    <th className="text-center p-4 font-medium text-blue-500">Pro</th>
                    <th className="text-center p-4 font-medium">Explorer</th>
                    <th className="text-center p-4 font-medium">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, idx) => (
                    <tr key={idx} className={`border-b ${borderColor} last:border-0`}>
                      <td className="p-4 text-sm">{feature.name}</td>
                      <td className={`p-4 text-sm text-center ${subTextColor}`}>{feature.free}</td>
                      <td className="p-4 text-sm text-center text-blue-500">{feature.pro}</td>
                      <td className="p-4 text-sm text-center">{feature.explorer}</td>
                      <td className="p-4 text-sm text-center text-amber-500">{feature.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center pb-8">
            <p className={`${subTextColor} mb-4`}>Have questions about our plans?</p>
            <button className={`px-6 py-3 rounded-xl ${hoverBg} border ${borderColor} text-sm`}>
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VoxlayChat() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ghostMode, setGhostMode] = useState(false);
  const [lightTheme, setLightTheme] = useState(false);
  const [learnMode, setLearnMode] = useState(false);
  const [chats, setChats] = useState<Chat[]>([
    { id: "1", title: "Understanding machine learning", timestamp: new Date(Date.now() - 3600000), messages: [], starred: true },
    { id: "2", title: "React best practices", timestamp: new Date(Date.now() - 86400000), messages: [] },
    { id: "3", title: "Writing a business proposal", timestamp: new Date(Date.now() - 172800000), messages: [] },
  ]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("VOX v-4");
  const [showMoreModels, setShowMoreModels] = useState(false);
  const [attachMenuOpen, setAttachMenuOpen] = useState(false);
  const [showCodeLibrary, setShowCodeLibrary] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleNewChat = () => {
    setActiveChat(null);
    setMessages([]);
    setInput("");
  };

  const handleSelectChat = (chat: Chat) => {
    setActiveChat(chat.id);
    setMessages(chat.messages);
  };

  const handleDeleteChat = (id: string) => {
    setChats(prev => prev.filter(c => c.id !== id));
    if (activeChat === id) {
      setActiveChat(null);
      setMessages([]);
    }
    setOpenMenuId(null);
  };

  const handleRenameChat = (id: string) => {
    const chat = chats.find(c => c.id === id);
    if (chat) {
      setEditingChatId(id);
      setEditTitle(chat.title);
      setOpenMenuId(null);
    }
  };

  const handleSaveRename = (id: string) => {
    setChats(prev => prev.map(c => c.id === id ? { ...c, title: editTitle } : c));
    setEditingChatId(null);
    setEditTitle("");
  };

  const handleToggleStar = (id: string) => {
    setChats(prev => prev.map(c => c.id === id ? { ...c, starred: !c.starred } : c));
    setOpenMenuId(null);
  };

  const handleCopy = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = useCallback(() => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");

    let chatId = activeChat;
    if (!chatId) {
      chatId = Date.now().toString();
      const newChat: Chat = {
        id: chatId,
        title: input.trim().slice(0, 40) + (input.trim().length > 40 ? "..." : ""),
        timestamp: new Date(),
        messages: newMessages,
      };
      setChats(prev => [newChat, ...prev]);
      setActiveChat(chatId);
    } else {
      setChats(prev => prev.map(c => c.id === chatId ? { ...c, messages: newMessages } : c));
    }

    setIsLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date(),
      };

      const updatedMessages = [...newMessages, aiMessage];
      setMessages(updatedMessages);
      setChats(prev => prev.map(c => c.id === chatId ? { ...c, messages: updatedMessages } : c));
      setIsLoading(false);
    }, 1200 + Math.random() * 800);
  }, [input, isLoading, messages, activeChat]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredChats = chats.filter(chat => 
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If Learn Mode is active, show VOX Learn interface
  if (learnMode) {
    return <VOXLearnMode onBack={() => setLearnMode(false)} ghostMode={ghostMode} />;
  }

  // Theme colors
  const bgColor = lightTheme ? "bg-white" : (ghostMode ? "bg-[#0d1117]" : "bg-[#212121]");
  const sidebarBg = lightTheme ? "bg-gray-50" : (ghostMode ? "bg-[#010409]" : "bg-[#1a1a1a]");
  const cardBg = lightTheme ? "bg-gray-100" : (ghostMode ? "bg-[#161b22]" : "bg-[#2a2a2a]");
  const hoverBg = lightTheme ? "hover:bg-gray-200" : (ghostMode ? "hover:bg-[#21262d]" : "hover:bg-[#333]");
  const activeBg = lightTheme ? "bg-gray-200" : (ghostMode ? "bg-[#21262d]" : "bg-[#333]");
  const borderColor = lightTheme ? "border-gray-300" : (ghostMode ? "border-[#30363d]" : "border-[#444]");
  const textColor = lightTheme ? "text-gray-900" : "text-white";
  const subTextColor = lightTheme ? "text-gray-500" : "text-gray-400";

  return (
    <>
      <div className={`flex h-screen ${bgColor} ${textColor} overflow-hidden transition-colors duration-500`}>
        {/* Sidebar */}
        <div 
          className={`${sidebarOpen ? "w-[220px]" : "w-0"} flex-shrink-0 transition-all duration-300 ease-out overflow-hidden`}
        >
          <div className={`flex flex-col h-full w-[220px] ${sidebarBg} transition-colors duration-500 relative`}>
            {ghostMode && <FloatingGhosts />}
            
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center gap-2">
                <Image src="/voxlay-logo.png" alt="VOXLAY" width={20} height={20} />
                <span className="text-sm font-medium">VOXLAY</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className={`p-1.5 rounded-lg ${subTextColor} ${hoverBg} transition-all duration-200`}
              >
                <PanelLeftClose size={16} />
              </button>
            </div>

            {/* Navigation Buttons */}
            <div className="px-2 space-y-0.5">
              <button
                onClick={handleNewChat}
                className={`flex items-center gap-2 w-full px-2 py-2 rounded-lg ${hoverBg} transition-all duration-200 text-sm`}
              >
                <Plus size={16} />
                <span>New chat</span>
              </button>
              
              <button
                onClick={() => setShowSearch(!showSearch)}
                className={`flex items-center gap-2 w-full px-2 py-2 rounded-lg ${subTextColor} ${hoverBg} transition-all duration-200 text-sm`}
              >
                <Search size={16} />
                <span>Search</span>
              </button>

              <button 
                onClick={() => setShowCodeLibrary(true)}
                className={`flex items-center gap-2 w-full px-2 py-2 rounded-lg ${subTextColor} ${hoverBg} transition-all duration-200 text-sm`}
              >
                <Code2 size={16} />
                <span>Codes library</span>
              </button>

              <button 
                onClick={() => setShowProjects(true)}
                className={`flex items-center gap-2 w-full px-2 py-2 rounded-lg ${subTextColor} ${hoverBg} transition-all duration-200 text-sm`}
              >
                <FolderKanban size={16} />
                <span>Projects</span>
              </button>
            </div>

            {/* Search Input */}
            {showSearch && (
              <div className="px-2 py-2">
                <div className={`flex items-center gap-2 ${cardBg} rounded-lg px-2 py-1.5`}>
                  <Search size={14} className={subTextColor} />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search chats..."
                    className={`flex-1 bg-transparent text-sm outline-none ${textColor}`}
                    autoFocus
                  />
                  <button onClick={() => { setShowSearch(false); setSearchQuery(""); }}>
                    <X size={12} className={subTextColor} />
                  </button>
                </div>
              </div>
            )}

            {/* VOXS Section */}
            <div className="px-2 mt-3">
              <p className={`px-2 py-1.5 text-[10px] font-medium ${subTextColor} uppercase tracking-wider`}>VOXS</p>
              <div className="space-y-0.5">
                <button className={`flex items-center justify-between w-full px-2 py-2 rounded-lg ${subTextColor} ${hoverBg} transition-all duration-200 text-sm`}>
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} />
                    <span>CLOVI</span>
                  </div>
                  <span className={`text-[9px] ${lightTheme ? "bg-gray-200" : "bg-[#333]"} px-1 py-0.5 rounded`}>Soon</span>
                </button>
                <button className={`flex items-center justify-between w-full px-2 py-2 rounded-lg ${subTextColor} ${hoverBg} transition-all duration-200 text-sm`}>
                  <div className="flex items-center gap-2">
                    <Brain size={16} />
                    <span>CLOX</span>
                  </div>
                  <span className={`text-[9px] ${lightTheme ? "bg-gray-200" : "bg-[#333]"} px-1 py-0.5 rounded`}>Soon</span>
                </button>
              </div>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto px-2 mt-3">
              <p className={`px-2 py-1.5 text-[10px] font-medium ${subTextColor} uppercase tracking-wider`}>History</p>
              {filteredChats.map(chat => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  isActive={activeChat === chat.id}
                  isEditing={editingChatId === chat.id}
                  editTitle={editTitle}
                  openMenuId={openMenuId}
                  lightTheme={lightTheme}
                  ghostMode={ghostMode}
                  onSelect={() => handleSelectChat(chat)}
                  onDelete={() => handleDeleteChat(chat.id)}
                  onRename={() => handleRenameChat(chat.id)}
                  onToggleStar={() => handleToggleStar(chat.id)}
                  onSaveRename={() => handleSaveRename(chat.id)}
                  onEditTitleChange={setEditTitle}
                  onMenuToggle={() => setOpenMenuId(openMenuId === chat.id ? null : chat.id)}
                  onCancelEdit={() => setEditingChatId(null)}
                />
              ))}
            </div>

            {/* Account Section */}
            <div className="p-2 relative">
              <button 
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className={`flex items-center gap-2 w-full px-2 py-2 rounded-lg ${subTextColor} ${hoverBg} transition-all duration-200`}
              >
                <div className={`w-7 h-7 rounded-full ${ghostMode ? "bg-gradient-to-br from-purple-600 to-indigo-800" : "bg-gradient-to-br from-blue-500 to-purple-600"} flex items-center justify-center`}>
                  <User size={14} className="text-white" />
                </div>
                <span className="text-sm flex-1 text-left">Agent</span>
                <ChevronDown size={14} className={`transition-transform ${accountMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {accountMenuOpen && (
                <div className={`absolute bottom-full left-2 right-2 mb-2 ${cardBg} rounded-xl py-2 shadow-xl z-50`}>
                  <button 
                    onClick={() => { setShowEditProfile(true); setAccountMenuOpen(false); }}
                    className={`flex items-center gap-2 w-full px-3 py-2 text-sm text-left ${hoverBg} transition-colors`}
                  >
                    <Pencil size={14} />
                    Edit profile
                  </button>
                  <button 
                    onClick={() => { setShowUpgrade(true); setAccountMenuOpen(false); }}
                    className={`flex items-center gap-2 w-full px-3 py-2 text-sm text-left ${hoverBg} transition-colors text-amber-500`}
                  >
                    <Zap size={14} />
                    Upgrade to Plus
                  </button>
                  <button 
                    onClick={() => { setSettingsOpen(true); setAccountMenuOpen(false); }}
                    className={`flex items-center gap-2 w-full px-3 py-2 text-sm text-left ${hoverBg} transition-colors`}
                  >
                    <Settings size={14} />
                    Settings
                  </button>
                  <button className={`flex items-center gap-2 w-full px-3 py-2 text-sm text-left ${hoverBg} transition-colors`}>
                    <Sliders size={14} />
                    Personalization
                  </button>
                  <div className={`h-px ${lightTheme ? "bg-gray-200" : "bg-[#333]"} my-2`} />
                  <button className={`flex items-center gap-2 w-full px-3 py-2 text-sm text-left ${hoverBg} transition-colors`}>
                    <HelpCircle size={14} />
                    Get help
                  </button>
                  <button className={`flex items-center gap-2 w-full px-3 py-2 text-sm text-left text-red-500 ${hoverBg} transition-colors`}>
                    <LogOut size={14} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className={`p-1.5 rounded-lg ${subTextColor} ${hoverBg} transition-all duration-200`}
                >
                  <PanelLeft size={18} />
                </button>
              )}
            </div>

            {/* Top Right - Theme Toggle, Ghost Mode & Learn Mode (icons only) */}
            <div className="flex items-center gap-1">
              {/* Theme Toggle */}
              <button
                onClick={() => setLightTheme(!lightTheme)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  lightTheme 
                    ? "bg-gray-200 text-gray-900" 
                    : `${subTextColor} ${hoverBg}`
                }`}
                title={lightTheme ? "Switch to Dark" : "Switch to Light"}
              >
                <Eye size={18} />
              </button>
              
              {/* Ghost Mode */}
              <button
                onClick={() => setGhostMode(!ghostMode)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  ghostMode 
                    ? "bg-purple-600/20 text-purple-400" 
                    : `${subTextColor} ${hoverBg}`
                }`}
                title="Ghost Mode"
              >
                <Ghost size={18} />
              </button>
              
              {/* Learn Mode */}
              <button
                onClick={() => setLearnMode(!learnMode)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  learnMode 
                    ? "bg-emerald-600/20 text-emerald-400" 
                    : `${subTextColor} ${hoverBg}`
                }`}
                title="VOX Learn"
              >
                <BookOpen size={18} />
              </button>
            </div>
          </header>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto relative">
            {ghostMode && <FloatingGhosts />}
            
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center px-4">
                <div className="max-w-2xl w-full text-center">
                  <div className="mb-8">
                    <div className="flex justify-center mb-6">
                      <img 
                        src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/108cdeea-261a-4ea8-bf1a-88873d221075/Abstract_triangular_logo_on_black_background-removebg-preview-1767420073005.png?width=8000&height=8000&resize=contain" 
                        alt="VOXLAY Logo" 
                        className={`w-20 h-20 object-contain ${ghostMode ? "opacity-70" : (lightTheme ? "opacity-100" : "opacity-90")}`}
                      />
                    </div>
                    <h1 className={`text-3xl font-medium tracking-tight ${ghostMode ? "text-purple-300" : ""}`}>
                      {getGreeting()}, Agent
                    </h1>
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto px-4 py-6">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className="mb-6"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {message.role === "user" ? (
                      <div className="flex justify-end">
                        <div className={`max-w-[85%] ${cardBg} rounded-2xl px-4 py-3 transition-colors duration-500`}>
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <div className={`w-7 h-7 rounded-full ${cardBg} flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-500`}>
                          <Image src="/voxlay-logo.png" alt="VOXLAY" width={16} height={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="whitespace-pre-wrap">{message.content}</div>
                          <div className="flex items-center gap-1 mt-3 opacity-0 hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleCopy(message.content, message.id)}
                              className={`p-1.5 rounded-lg ${subTextColor} ${hoverBg} transition-all`}
                            >
                              {copiedId === message.id ? <Check size={14} /> : <Copy size={14} />}
                            </button>
                            <button className={`p-1.5 rounded-lg ${subTextColor} ${hoverBg} transition-all`}>
                              <ThumbsUp size={14} />
                            </button>
                            <button className={`p-1.5 rounded-lg ${subTextColor} ${hoverBg} transition-all`}>
                              <ThumbsDown size={14} />
                            </button>
                            <button className={`p-1.5 rounded-lg ${subTextColor} ${hoverBg} transition-all`}>
                              <RotateCcw size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3">
                    <div className={`w-7 h-7 rounded-full ${cardBg} flex items-center justify-center flex-shrink-0 transition-colors duration-500`}>
                      <Image src="/voxlay-logo.png" alt="VOXLAY" width={16} height={16} />
                    </div>
                    <div className="typing-indicator flex items-center gap-1 py-3">
                      <span className={`w-2 h-2 rounded-full ${ghostMode ? "bg-purple-500" : (lightTheme ? "bg-gray-400" : "bg-gray-600")} animate-pulse`} />
                      <span className={`w-2 h-2 rounded-full ${ghostMode ? "bg-purple-500" : (lightTheme ? "bg-gray-400" : "bg-gray-600")} animate-pulse`} style={{ animationDelay: "0.2s" }} />
                      <span className={`w-2 h-2 rounded-full ${ghostMode ? "bg-purple-500" : (lightTheme ? "bg-gray-400" : "bg-gray-600")} animate-pulse`} style={{ animationDelay: "0.4s" }} />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="px-4 pb-4 pt-2">
            <div className="max-w-3xl mx-auto">
              <div className={`rounded-2xl border transition-all duration-300 ${
                input.trim() 
                  ? "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]" 
                  : `${borderColor} ${cardBg}`
              }`}>
                <div className="flex items-end gap-2 px-4 py-3">
                  {/* Plus button with dropdown */}
                  <div className="relative pb-1">
                    <button 
                      onClick={() => setAttachMenuOpen(!attachMenuOpen)}
                      className={`p-2 rounded-xl ${subTextColor} ${hoverBg} transition-all border ${borderColor}`}
                    >
                      <Plus size={18} />
                    </button>
                    
                    {attachMenuOpen && (
                      <div className={`absolute bottom-full left-0 mb-3 w-56 ${cardBg} rounded-2xl py-2 shadow-2xl z-50 border ${borderColor} backdrop-blur-md`}>
                        <button className={`flex items-center gap-3 w-full px-4 py-3 text-sm text-left ${hoverBg} transition-colors`}>
                          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                            <Paperclip size={16} />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">Attach file</p>
                            <p className="text-[10px] opacity-60">Images, PDFs, docs</p>
                          </div>
                        </button>
                        <button className={`flex items-center gap-3 w-full px-4 py-3 text-sm text-left ${hoverBg} transition-colors`}>
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                            <Camera size={16} />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">Camera</p>
                            <p className="text-[10px] opacity-60">Take a photo</p>
                          </div>
                        </button>
                        <div className={`h-px ${borderColor} my-2`} />
                        <button className={`flex items-center gap-3 w-full px-4 py-3 text-sm text-left ${hoverBg} transition-colors`}>
                          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                            <Sparkles size={16} />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">Deep Research</p>
                            <p className="text-[10px] opacity-60">Comprehensive analysis</p>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-h-[44px] flex flex-col justify-center">
                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask VOXLAY anything..."
                      rows={1}
                      className={`bg-transparent resize-none outline-none text-[15px] leading-relaxed ${lightTheme ? "placeholder:text-gray-400" : "placeholder:text-gray-500"} py-2`}
                    />
                  </div>
                  
                  {/* Right side buttons */}
                  <div className="flex items-center gap-2 pb-1">
                    {/* Model Selector */}
                    <div className="relative">
                      <button
                        onClick={() => setModelMenuOpen(!modelMenuOpen)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium ${subTextColor} ${hoverBg} transition-all border ${borderColor}`}
                      >
                        <Cpu size={14} className="text-blue-500" />
                        <span className="hidden sm:inline">{selectedModel}</span>
                        <ChevronDown size={12} />
                      </button>
                      
                      {modelMenuOpen && (
                        <div className={`absolute bottom-full right-0 mb-3 w-56 ${cardBg} rounded-2xl py-2 shadow-2xl z-50 border ${borderColor} backdrop-blur-md`}>
                          {["VOX v-3", "VOX v-4", "VOX v-4 MINI"].map(model => (
                            <button
                              key={model}
                              onClick={() => { setSelectedModel(model); setModelMenuOpen(false); setShowMoreModels(false); }}
                              className={`flex items-center justify-between w-full px-4 py-2.5 text-sm text-left ${hoverBg} transition-colors ${selectedModel === model ? "text-blue-500" : textColor}`}
                            >
                              <span className="flex items-center gap-2">
                                {model}
                              </span>
                              {selectedModel === model && <Check size={14} />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Send Button */}
                    <button
                      onClick={handleSendMessage}
                      disabled={!input.trim() || isLoading}
                      className={`p-2.5 rounded-xl transition-all ${
                        input.trim() 
                          ? (ghostMode ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20" : (lightTheme ? "bg-black text-white" : "bg-white text-black"))
                          : `${lightTheme ? "bg-gray-200 text-gray-400" : "bg-[#333] text-gray-600"}`
                      } disabled:cursor-not-allowed`}
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <p className={`text-center text-xs ${subTextColor} mt-3`}>
                VOXLAY AI can make mistakes. Consider checking important information.
              </p>
            </div>
          </div>
        </div>

        {/* Settings Modal */}
        {settingsOpen && (
          <SettingsModal onClose={() => setSettingsOpen(false)} lightTheme={lightTheme} />
        )}

        {/* Code Library Modal */}
        {showCodeLibrary && (
          <CodeLibrary onClose={() => setShowCodeLibrary(false)} lightTheme={lightTheme} />
        )}

        {/* Projects Modal */}
        {showProjects && (
          <ProjectsView onClose={() => setShowProjects(false)} lightTheme={lightTheme} />
        )}

        {/* Edit Profile Modal */}
        {showEditProfile && (
          <EditProfile onClose={() => setShowEditProfile(false)} lightTheme={lightTheme} />
        )}

        {/* Upgrade Page */}
        {showUpgrade && (
          <UpgradePage onClose={() => setShowUpgrade(false)} lightTheme={lightTheme} />
        )}

        {/* Click outside to close menus */}
        {(accountMenuOpen || modelMenuOpen || attachMenuOpen) && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => { setAccountMenuOpen(false); setModelMenuOpen(false); setAttachMenuOpen(false); setShowMoreModels(false); }} 
          />
        )}
      </div>
    </>
  );
}

interface ChatItemProps {
  chat: Chat;
  isActive: boolean;
  isEditing: boolean;
  editTitle: string;
  openMenuId: string | null;
  lightTheme: boolean;
  ghostMode: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onRename: () => void;
  onToggleStar: () => void;
  onSaveRename: () => void;
  onEditTitleChange: (value: string) => void;
  onMenuToggle: () => void;
  onCancelEdit: () => void;
}

function ChatItem({
  chat,
  isActive,
  isEditing,
  editTitle,
  openMenuId,
  lightTheme,
  ghostMode,
  onSelect,
  onDelete,
  onRename,
  onToggleStar,
  onSaveRename,
  onEditTitleChange,
  onMenuToggle,
  onCancelEdit,
}: ChatItemProps) {
  const activeBg = lightTheme ? "bg-gray-200" : (ghostMode ? "bg-[#21262d]" : "bg-[#333]");
  const hoverBg = lightTheme ? "hover:bg-gray-100" : (ghostMode ? "hover:bg-[#161b22]" : "hover:bg-[#2a2a2a]");
  const menuBg = lightTheme ? "bg-white" : (ghostMode ? "bg-[#161b22]" : "bg-[#1a1a1a]");
  const textColor = lightTheme ? "text-gray-900" : "text-white";
  const subTextColor = lightTheme ? "text-gray-500" : "text-gray-400";

  return (
    <div
      className={`group relative flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
        isActive ? activeBg : hoverBg
      }`}
      onClick={!isEditing ? onSelect : undefined}
    >
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => onEditTitleChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSaveRename();
            if (e.key === "Escape") onCancelEdit();
          }}
          onBlur={onSaveRename}
          className={`flex-1 bg-transparent text-sm outline-none ${textColor}`}
          autoFocus
        />
      ) : (
        <>
          <span className="flex-1 text-sm truncate">{chat.title}</span>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => { e.stopPropagation(); onMenuToggle(); }}
              className={`p-1 rounded ${subTextColor} ${lightTheme ? "hover:bg-gray-300" : "hover:bg-[#252525]"} transition-all`}
            >
              <MoreHorizontal size={14} />
            </button>
          </div>
          
          {openMenuId === chat.id && (
            <div className={`absolute right-0 top-full mt-1 w-36 ${menuBg} rounded-lg py-1 shadow-lg z-50`}>
              <button
                onClick={(e) => { e.stopPropagation(); onRename(); }}
                className={`flex items-center gap-2 w-full px-3 py-2 text-sm text-left ${lightTheme ? "hover:bg-gray-100" : "hover:bg-[#252525]"} transition-colors`}
              >
                <Pencil size={12} />
                Rename
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onToggleStar(); }}
                className={`flex items-center gap-2 w-full px-3 py-2 text-sm text-left ${lightTheme ? "hover:bg-gray-100" : "hover:bg-[#252525]"} transition-colors`}
              >
                <Star size={12} className={chat.starred ? "fill-current" : ""} />
                {chat.starred ? "Unstar" : "Star"}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                className={`flex items-center gap-2 w-full px-3 py-2 text-sm text-left text-red-500 ${lightTheme ? "hover:bg-gray-100" : "hover:bg-[#252525]"} transition-colors`}
              >
                <Trash2 size={12} />
                Delete
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function SettingsModal({ onClose, lightTheme }: { onClose: () => void; lightTheme: boolean }) {
  const [activeTab, setActiveTab] = useState("general");
  
  const bgColor = lightTheme ? "bg-white" : "bg-[#0a0a0a]";
  const sidebarBg = lightTheme ? "bg-gray-50" : "bg-[#070707]";
  const cardBg = lightTheme ? "bg-gray-100" : "bg-[#1a1a1a]";
  const hoverBg = lightTheme ? "hover:bg-gray-200" : "hover:bg-[#1a1a1a]";
  const borderColor = lightTheme ? "border-gray-200" : "border-[#333]";
  const textColor = lightTheme ? "text-gray-900" : "text-white";
  const subTextColor = lightTheme ? "text-gray-500" : "text-[#888]";

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
      <div className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl max-h-[80vh] ${bgColor} ${textColor} rounded-2xl z-50 overflow-hidden`}>
        <div className="flex h-full">
          <div className={`w-44 ${sidebarBg} p-4 flex flex-col`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-medium">Settings</h2>
              <button onClick={onClose} className={`p-1.5 rounded-lg ${subTextColor} ${hoverBg}`}>
                <X size={16} />
              </button>
            </div>
            <nav className="space-y-1">
              {[
                { id: "general", label: "General", icon: Settings },
                { id: "appearance", label: "Appearance", icon: Eye },
                { id: "shortcuts", label: "Shortcuts", icon: Zap },
                { id: "privacy", label: "Privacy", icon: Shield },
                { id: "notifications", label: "Notifications", icon: Globe },
                { id: "data", label: "Data & Storage", icon: Database },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full px-3 py-2 rounded-lg text-sm text-left transition-all flex items-center gap-2 ${
                    activeTab === tab.id ? `${cardBg} ${textColor}` : `${subTextColor}`
                  }`}
                >
                  <tab.icon size={14} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === "general" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">General Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm">Auto-save conversations</p>
                        <p className={`text-xs ${subTextColor} mt-0.5`}>Save chats automatically</p>
                      </div>
                      <ToggleSwitch defaultChecked lightTheme={lightTheme} />
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm">Show typing indicator</p>
                        <p className={`text-xs ${subTextColor} mt-0.5`}>Display when VOXLAY is thinking</p>
                      </div>
                      <ToggleSwitch defaultChecked lightTheme={lightTheme} />
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm">Send with Enter key</p>
                        <p className={`text-xs ${subTextColor} mt-0.5`}>Press Enter to send messages</p>
                      </div>
                      <ToggleSwitch defaultChecked lightTheme={lightTheme} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Appearance</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm mb-3">Theme</p>
                      <div className="flex gap-3">
                        {["Dark", "Light", "System"].map(theme => (
                          <button
                            key={theme}
                            className={`px-4 py-2 rounded-lg text-sm transition-all ${
                              (theme === "Light" && lightTheme) || (theme === "Dark" && !lightTheme)
                                ? (lightTheme ? "bg-gray-900 text-white" : "bg-white text-black")
                                : `${cardBg} ${subTextColor}`
                            }`}
                          >
                            {theme}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm">Compact mode</p>
                        <p className={`text-xs ${subTextColor} mt-0.5`}>Reduce spacing between messages</p>
                      </div>
                      <ToggleSwitch lightTheme={lightTheme} />
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm">Show avatars</p>
                        <p className={`text-xs ${subTextColor} mt-0.5`}>Display profile pictures in chat</p>
                      </div>
                      <ToggleSwitch defaultChecked lightTheme={lightTheme} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "shortcuts" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Keyboard Shortcuts</h3>
                  <div className="space-y-3">
                    {[
                      { action: "New chat", keys: ["⌘", "N"] },
                      { action: "Search", keys: ["⌘", "K"] },
                      { action: "Toggle sidebar", keys: ["⌘", "B"] },
                      { action: "Settings", keys: ["⌘", ","] },
                      { action: "Send message", keys: ["Enter"] },
                      { action: "New line", keys: ["Shift", "Enter"] },
                    ].map(shortcut => (
                      <div key={shortcut.action} className="flex items-center justify-between py-2">
                        <span className={`text-sm ${subTextColor}`}>{shortcut.action}</span>
                        <div className="flex gap-1">
                          {shortcut.keys.map(key => (
                            <kbd key={key} className={`px-2 py-1 ${cardBg} rounded text-xs font-mono`}>
                              {key}
                            </kbd>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Privacy & Security</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm">Data collection</p>
                        <p className={`text-xs ${subTextColor} mt-0.5`}>Help improve VOXLAY with usage data</p>
                      </div>
                      <ToggleSwitch lightTheme={lightTheme} />
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm">Chat history</p>
                        <p className={`text-xs ${subTextColor} mt-0.5`}>Save conversation history</p>
                      </div>
                      <ToggleSwitch defaultChecked lightTheme={lightTheme} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm">Push notifications</p>
                        <p className={`text-xs ${subTextColor} mt-0.5`}>Receive browser notifications</p>
                      </div>
                      <ToggleSwitch lightTheme={lightTheme} />
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm">Sound alerts</p>
                        <p className={`text-xs ${subTextColor} mt-0.5`}>Play sound on new messages</p>
                      </div>
                      <ToggleSwitch defaultChecked lightTheme={lightTheme} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "data" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Data & Storage</h3>
                  <div className="space-y-4">
                    <div className={`${cardBg} rounded-xl p-4`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Storage used</span>
                        <span className={`text-sm ${subTextColor}`}>2.4 MB / 50 MB</span>
                      </div>
                      <div className={`h-2 ${lightTheme ? "bg-gray-200" : "bg-[#333]"} rounded-full overflow-hidden`}>
                        <div className={`h-full w-[5%] rounded-full ${lightTheme ? "bg-gray-900" : "bg-white"}`} />
                      </div>
                    </div>
                    <button className={`w-full py-3 rounded-lg text-sm ${cardBg} ${hoverBg} transition-all`}>
                      Export all data
                    </button>
                    <button className={`w-full py-3 rounded-lg text-sm ${cardBg} ${hoverBg} transition-all`}>
                      Import data
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function ToggleSwitch({ defaultChecked = false, lightTheme = false }: { defaultChecked?: boolean; lightTheme?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  
  return (
    <button
      onClick={() => setChecked(!checked)}
      className={`w-11 h-6 rounded-full transition-colors ${checked ? (lightTheme ? "bg-gray-900" : "bg-white") : (lightTheme ? "bg-gray-300" : "bg-[#333]")}`}
    >
      <div
        className={`w-5 h-5 rounded-full ${lightTheme ? "bg-white" : "bg-black"} transition-transform`}
        style={{ transform: checked ? "translateX(22px)" : "translateX(2px)" }}
      />
    </button>
  );
}
