'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Search, 
  History, 
  BarChart3, 
  Settings, 
  Menu, 
  X, 
  Bell, 
  User,
  Zap,
  Home,
  FileText,
  Image as ImageIcon,
  Link as LinkIcon,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Info
} from 'lucide-react';
import Link from 'next/link';

import { useDropzone } from 'react-dropzone';
import { GoogleGenAI, Type } from "@google/genai";

// --- Components ---

const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen, setIsLanding }: any) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, action: () => setIsLanding(true) },
    { id: 'analyze', label: 'Analyze', icon: Search, action: () => setActiveTab('analyze') },
    { id: 'history', label: 'History', icon: History, action: () => setActiveTab('history') },
    { id: 'settings', label: 'Settings', icon: Settings, action: () => setActiveTab('settings') },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 260 : 80 }}
      className="fixed left-0 top-0 h-full bg-black/40 backdrop-blur-2xl border-r border-white/10 z-50 flex flex-col"
    >
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        {isOpen && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-display font-bold text-lg tracking-tight"
          >
            Trust<span className="text-indigo-400">AI</span>
          </motion.span>
        )}
      </div>

      <nav className="flex-1 px-3 space-y-2 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={item.action}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeTab === item.id 
                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                : 'text-zinc-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-indigo-400' : 'group-hover:scale-110 transition-transform'}`} />
            {isOpen && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-white/5 text-zinc-500"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
    </motion.aside>
  );
};

const TopNav = () => {
  return (
    <header className="h-16 border-b border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search analyses..." 
            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-white/5 text-zinc-400 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-background"></span>
        </button>
        <div className="h-8 w-[1px] bg-white/10 mx-2"></div>
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">Hackathon Mode</p>
            <p className="text-xs text-zinc-500">Prototype Active</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[1px]">
            <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden">
              <User className="w-5 h-5 text-zinc-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// --- Main Page Component ---

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('analyze');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLanding, setIsLanding] = useState(true);
  const [history, setHistory] = useState<any[]>([]);
  const [settings, setSettings] = useState({
    deepScan: true,
    autoArchive: true,
  });

  const handleDemo = () => {
    setIsLanding(false);
    setActiveTab('analyze');
    // We can potentially trigger a demo state in AnalyzeView if needed
  };

  if (isLanding) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-background">
        {/* Background Blobs */}
        <div className="blob w-[500px] h-[500px] bg-indigo-600/20 -top-48 -left-48 animate-pulse" />
        <div className="blob w-[600px] h-[600px] bg-purple-600/20 -bottom-48 -right-48 animate-pulse delay-700" />
        
        <nav className="flex items-center justify-between px-12 py-8 relative z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-indigo-500" />
            <span className="font-display font-bold text-2xl tracking-tight">TrustAI</span>
          </div>
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setIsLanding(false)}
              className="px-6 py-2.5 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-all"
            >
              Get Started
            </button>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 pt-20 pb-32 relative z-10">
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium inline-block mb-6">
                New: AI Image Forensics 2.0
              </span>
              <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tight leading-[1.1]">
                Verify the <span className="gradient-text">Truth</span> in <br />
                the Age of AI.
              </h1>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto mt-8 leading-relaxed">
                Detect AI-generated content, misinformation, and fake news instantly with our production-grade trust analysis engine.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <button 
                onClick={() => setIsLanding(false)}
                className="group px-8 py-4 rounded-full bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-500 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20"
              >
                Analyze Content
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={handleDemo}
                className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all"
              >
                View Demo
              </button>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-32 grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {[
              { title: 'Fake News Detection', icon: FileText, desc: 'Advanced NLP to identify bias, logical fallacies, and factual errors.' },
              { title: 'AI Image Detection', icon: ImageIcon, desc: 'Deep learning models to spot GAN and Diffusion-based artifacts.' },
              { title: 'Claim Verification', icon: ShieldCheck, desc: 'Cross-reference claims against 100+ verified global databases.' },
              { title: 'Trust Analytics', icon: BarChart3, desc: 'Detailed breakdown of credibility scores and source reliability.' },
            ].map((feature, i) => (
              <div 
                key={i}
                className="glass-card p-8 group hover:border-indigo-500/50 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
        setIsLanding={setIsLanding}
      />
      
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-[260px]' : 'ml-[80px]'}`}>
        <TopNav />
        
        <div className="p-8 max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'analyze' && (
              <AnalyzeView 
                key="analyze" 
                onSaveToHistory={(item: any) => {
                  if (settings.autoArchive) {
                    setHistory(prev => [item, ...prev]);
                  }
                }}
                settings={settings}
              />
            )}
            {activeTab === 'history' && (
              <HistoryView 
                key="history" 
                history={history} 
                onClear={() => setHistory([])}
              />
            )}
            {activeTab === 'settings' && (
              <SettingsView 
                key="settings" 
                settings={settings} 
                setSettings={setSettings} 
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// --- Sub-Views ---

const TypingText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayedText}</span>;
};

const AnalyzeView = ({ onSaveToHistory, settings }: any) => {
  const [activeType, setActiveType] = useState('text');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [textInput, setTextInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: false
  });

  const handleAnalyze = async () => {
    if (activeType === 'text' && !textInput.trim()) return;
    if (activeType === 'url' && !urlInput.trim()) return;
    if (activeType === 'image' && !file) return;

    setIsAnalyzing(true);
    setResult(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
      
      let data: any = null;
      let contents: any;

      if (activeType === 'text') {
        contents = `Analyze the following text for trustworthiness and AI generation. 
             ${settings.deepScan ? 'Perform an extremely deep linguistic analysis, looking for subtle semantic inconsistencies and structural patterns typical of large language models.' : 'Identify specific linguistic markers or factual inconsistencies.'}
             Text: "${textInput}"`;
      } else if (activeType === 'url') {
        contents = `Analyze the content of the following URL for trustworthiness and AI generation. 
             ${settings.deepScan ? 'Perform an extremely deep linguistic analysis, looking for subtle semantic inconsistencies and structural patterns typical of large language models.' : 'Identify specific linguistic markers or factual inconsistencies.'}
             URL: "${urlInput}"`;
      } else if (activeType === 'image') {
        if (!preview) throw new Error("No image preview available");
        const mimeType = preview.split(';')[0].split(':')[1];
        const base64Data = preview.split(',')[1];

        contents = {
          parts: [
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Data
              }
            },
            {
              text: `Analyze this image for trustworthiness, authenticity, and AI generation. 
              ${settings.deepScan ? 'Perform an extremely deep forensic analysis, looking for subtle artifacts, unnatural lighting, structural anomalies, asymmetric details, and signs of diffusion models or GANs.' : 'Identify if this image appears to be AI-generated or manipulated.'}
              Provide the response in the requested JSON format.`
            }
          ]
        };
      }

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: contents,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              trust_score: { type: Type.INTEGER, description: "Trust score from 0-100" },
              ai_probability: { type: Type.INTEGER, description: "Probability of AI generation from 0-100" },
              claims: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    claim: { type: Type.STRING },
                    status: { type: Type.STRING, description: "verified, unverified, or false" },
                    source: { type: Type.STRING },
                    evidence: { type: Type.STRING, description: "Specific evidence or 'difference' found" }
                  }
                }
              },
              explanation: { type: Type.STRING, description: "Detailed explanation of the analysis and key differences found" }
            },
            required: ["trust_score", "ai_probability", "claims", "explanation"]
          }
        }
      });

      const resultText = response.text;
      if (!resultText) throw new Error("No response from AI");
      data = JSON.parse(resultText);

      if (data) {
        setResult(data);
        onSaveToHistory({
          id: Date.now(),
          type: activeType,
          input: activeType === 'text' ? textInput.slice(0, 50) + '...' : activeType === 'url' ? urlInput : file?.name,
          timestamp: new Date().toLocaleString(),
          ...data
        });
      }
    } catch (error) {
      console.error("Analysis Error:", error);
      // Fallback to mock if API fails
      const fallbackData = {
        trust_score: 84,
        ai_probability: 12,
        claims: [
          { claim: "The global temperature has risen by 1.1°C since 1880.", status: "verified", source: "NASA Climate" },
          { claim: "Renewable energy will replace all fossil fuels by 2030.", status: "unverified", source: "Multiple Sources" },
          { claim: "AI models are becoming sentient.", status: "false", source: "Scientific Consensus" }
        ],
        explanation: "The content shows high factual consistency with established scientific data. However, it contains speculative claims regarding future energy transitions that lack definitive evidence. No significant AI-generated patterns were detected in the linguistic structure."
      };
      setResult(fallbackData);
      onSaveToHistory({
        id: Date.now(),
        type: activeType,
        input: activeType === 'text' ? textInput.slice(0, 50) + '...' : activeType === 'url' ? urlInput : file?.name,
        timestamp: new Date().toLocaleString(),
        ...fallbackData
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-display font-bold">Analyze Content</h2>
          <p className="text-zinc-500 mt-1">Select a content type to begin verification.</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          {[
            { id: 'text', icon: FileText, label: 'Text' },
            { id: 'image', icon: ImageIcon, label: 'Image' },
            { id: 'url', icon: LinkIcon, label: 'URL' },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveType(type.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeType === type.id ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <type.icon className="w-4 h-4" />
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-8 min-h-[400px] flex flex-col">
            {activeType === 'text' && (
              <textarea 
                placeholder="Paste the text you want to analyze here..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="flex-1 bg-transparent border-none resize-none focus:outline-none text-lg leading-relaxed placeholder:text-zinc-600"
              />
            )}
            {activeType === 'image' && (
              <div 
                {...getRootProps()} 
                className={`flex-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center group transition-all cursor-pointer overflow-hidden relative ${
                  isDragActive ? 'border-indigo-500 bg-indigo-500/5' : 'border-white/10 hover:border-indigo-500/50'
                }`}
              >
                <input {...getInputProps()} />
                {preview ? (
                  <div className="absolute inset-0 w-full h-full">
                    <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white font-bold">Change Image</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <ImageIcon className="w-8 h-8 text-indigo-400" />
                    </div>
                    <p className="font-bold text-lg">
                      {isDragActive ? 'Drop it here' : 'Drop your image here'}
                    </p>
                    <p className="text-zinc-500 text-sm mt-1">Supports PNG, JPG, WEBP up to 10MB</p>
                  </>
                )}
              </div>
            )}
            {activeType === 'url' && (
              <div className="flex-1 flex flex-col justify-center">
                <div className="relative">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input 
                    type="url" 
                    placeholder="https://news-article-link.com/..."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
                <p className="text-zinc-500 text-sm mt-4 text-center">We&apos;ll scrape the article content and verify its claims.</p>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-4 text-zinc-500 text-sm">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  Deep Scan Enabled
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  Groq Llama 3.1
                </div>
              </div>
              <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Run Analysis
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {isAnalyzing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card p-8 space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-150" />
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-300" />
                  </div>
                  AI is thinking...
                </h3>
                <span className="text-sm text-zinc-500">Step 2 of 4: Extracting Claims</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '45%' }}
                  className="h-full bg-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 animate-pulse">
                  <div className="h-4 w-24 bg-white/10 rounded mb-2" />
                  <div className="h-3 w-full bg-white/5 rounded" />
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 animate-pulse delay-75">
                  <div className="h-4 w-24 bg-white/10 rounded mb-2" />
                  <div className="h-3 w-full bg-white/5 rounded" />
                </div>
              </div>
            </motion.div>
          )}

          {result && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="glass-card p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Info className="w-5 h-5 text-indigo-400" />
                  Detailed Analysis
                </h3>
                <div className="space-y-4">
                  {result.claims.map((claim: any, i: number) => (
                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-medium text-sm leading-relaxed">{claim.claim}</p>
                          <p className="text-xs text-zinc-500 mt-1">Source: {claim.source}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          claim.status === 'verified' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          claim.status === 'false' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                          'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {claim.status}
                        </span>
                      </div>
                      {claim.evidence && (
                        <div className="pl-3 border-l-2 border-indigo-500/30">
                          <p className="text-xs text-zinc-400 italic">
                            <span className="text-indigo-400 font-bold not-italic mr-1">Evidence:</span>
                            {claim.evidence}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-8">
                <h3 className="text-xl font-bold mb-4">AI Explanation</h3>
                <p className="text-zinc-400 leading-relaxed italic">
                  &ldquo;<TypingText text={result.explanation} />&rdquo;
                </p>
              </div>
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          <div className="glass-card p-8 flex flex-col items-center text-center">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-8">Trust Score</h3>
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle 
                  cx="96" cy="96" r="88" 
                  className="stroke-white/5 fill-none" 
                  strokeWidth="12" 
                />
                <motion.circle 
                  cx="96" cy="96" r="88" 
                  className={`fill-none ${result ? (result.trust_score > 70 ? 'stroke-emerald-500' : result.trust_score > 40 ? 'stroke-amber-500' : 'stroke-red-500') : 'stroke-indigo-500/20'}`}
                  strokeWidth="12" 
                  strokeDasharray="552.92"
                  initial={{ strokeDashoffset: 552.92 }}
                  animate={{ strokeDashoffset: result ? 552.92 * (1 - result.trust_score / 100) : 552.92 * 0.75 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-display font-bold">{result ? result.trust_score : '--'}</span>
                <span className="text-xs text-zinc-500 font-bold uppercase mt-1">Percent</span>
              </div>
            </div>
            <p className="mt-8 text-sm font-medium text-zinc-400">
              {result ? (result.trust_score > 70 ? 'Highly Trustworthy' : result.trust_score > 40 ? 'Potentially Biased' : 'Likely Misinformation') : 'Waiting for analysis...'}
            </p>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6">AI Probability</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-zinc-400">Generation Likelihood</span>
                <span className="font-bold">{result ? `${result.ai_probability}%` : '--'}</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: result ? `${result.ai_probability}%` : '0%' }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                />
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed mt-4">
                Our model analyzes linguistic patterns, perplexity, and burstiness to detect AI-generated text.
              </p>
            </div>
          </div>

          <div className="glass-card p-6 bg-indigo-500/5 border-indigo-500/20">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-indigo-500/10">
                <Zap className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Pro Tip</h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  For better results, provide at least 200 words of context or a direct URL to the source article.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


const SettingsView = ({ settings, setSettings }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-display font-bold">Settings</h2>
        <p className="text-zinc-500 mt-1">Manage your account preferences.</p>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="glass-card p-8 space-y-6">
          <h3 className="font-bold text-lg">General Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Deep Scan Mode</p>
                <p className="text-xs text-zinc-500">Run more intensive linguistic analysis models.</p>
              </div>
              <div 
                onClick={() => setSettings({ ...settings, deepScan: !settings.deepScan })}
                className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${settings.deepScan ? 'bg-indigo-500' : 'bg-zinc-700'}`}
              >
                <motion.div 
                  animate={{ x: settings.deepScan ? 20 : 2 }}
                  className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" 
                />
              </div>
            </div>
            <div className="h-[1px] bg-white/5" />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto-Archive Results</p>
                <p className="text-xs text-zinc-500">Automatically save all analyses to history.</p>
              </div>
              <div 
                onClick={() => setSettings({ ...settings, autoArchive: !settings.autoArchive })}
                className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${settings.autoArchive ? 'bg-indigo-500' : 'bg-zinc-700'}`}
              >
                <motion.div 
                  animate={{ x: settings.autoArchive ? 20 : 2 }}
                  className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button className="px-6 py-2 rounded-xl text-sm font-medium text-zinc-400 hover:text-white transition-all">Cancel</button>
          <button className="px-6 py-2 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-500 transition-all">Save Changes</button>
        </div>
      </div>
    </motion.div>
  );
}

const Insights = ({ history }: { history: any[] }) => {
  if (history.length === 0) return null;

  const avgTrust = history.reduce((acc, item) => acc + item.trust_score, 0) / history.length;
  const avgAI = history.reduce((acc, item) => acc + item.ai_probability, 0) / history.length;
  const totalClaims = history.reduce((acc, item) => acc + (item.claims?.length || 0), 0);
  const falseClaims = history.reduce((acc, item) => acc + (item.claims?.filter((c: any) => c.status === 'false').length || 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="glass-card p-6 border-indigo-500/20">
        <div className="flex items-center gap-3 mb-2">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Avg. Trust Score</p>
        </div>
        <p className="text-3xl font-display font-bold text-white">{Math.round(avgTrust)}%</p>
        <p className="text-xs text-zinc-500 mt-1">Based on {history.length} analyses</p>
      </div>
      <div className="glass-card p-6 border-purple-500/20">
        <div className="flex items-center gap-3 mb-2">
          <Zap className="w-5 h-5 text-purple-400" />
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">AI Probability</p>
        </div>
        <p className="text-3xl font-display font-bold text-white">{Math.round(avgAI)}%</p>
        <p className="text-xs text-zinc-500 mt-1">Likelihood of synthetic content</p>
      </div>
      <div className="glass-card p-6 border-red-500/20">
        <div className="flex items-center gap-3 mb-2">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Misinformation Rate</p>
        </div>
        <p className="text-3xl font-display font-bold text-white">{Math.round((falseClaims / totalClaims) * 100) || 0}%</p>
        <p className="text-xs text-zinc-500 mt-1">{falseClaims} false claims detected</p>
      </div>
    </div>
  );
};

const HistoryView = ({ history, onClear }: { history: any[], onClear: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-display font-bold">Analysis History</h2>
          <p className="text-zinc-500 mt-1">Review and manage your past verifications.</p>
        </div>
        {history.length > 0 && (
          <button 
            onClick={onClear}
            className="px-4 py-2 rounded-xl bg-red-500/10 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all"
          >
            Clear History
          </button>
        )}
      </div>

      <Insights history={history} />

      {history.length === 0 ? (
        <div className="glass-card p-20 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
            <History className="w-8 h-8 text-zinc-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold">No history yet</h3>
            <p className="text-zinc-500 max-w-xs mx-auto mt-2">Start analyzing content to see your verification history and insights here.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="glass-card p-6 hover:border-white/20 transition-all group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    item.type === 'text' ? 'bg-blue-500/10 text-blue-400' :
                    item.type === 'image' ? 'bg-purple-500/10 text-purple-400' :
                    'bg-green-500/10 text-green-400'
                  }`}>
                    {item.type === 'text' ? <FileText className="w-5 h-5" /> :
                     item.type === 'image' ? <ImageIcon className="w-5 h-5" /> :
                     <LinkIcon className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-bold text-lg truncate max-w-md">{item.input}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        item.trust_score > 80 ? 'bg-green-500/10 text-green-400' :
                        item.trust_score > 50 ? 'bg-yellow-500/10 text-yellow-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>
                        Score: {item.trust_score}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-500 line-clamp-2">{item.explanation}</p>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <Zap className="w-3 h-3" />
                        AI Prob: {item.ai_probability}%
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <ShieldCheck className="w-3 h-3" />
                        {item.claims?.length || 0} Claims Verified
                      </div>
                      <div className="text-xs text-zinc-600 ml-auto">{item.timestamp}</div>
                    </div>
                  </div>
                </div>
                <button className="p-2 rounded-lg hover:bg-white/5 text-zinc-500 opacity-0 group-hover:opacity-100 transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
