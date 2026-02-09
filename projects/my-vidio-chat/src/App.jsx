import React, { useState, useEffect } from 'react';

const SCENARIO = {
  intro: { file: '/video_files/prompt.mp4', next: 'idle' },
  idle: { 
    file: '/video_files/idle.mp4', 
    isLoop: true,
    triggers: [
      { keywords: ['hi', 'hello', 'hey', 'greetings'], next: 'greeting' },
      { keywords: ['how are you', 'status', 'how is it going'], next: 'general_response' },
      { keywords: ['weather', 'forecast', 'temperature'], next: 'weather' },
      { keywords: ['bye', 'goodbye', 'exit'], next: 'goodbye' },
      { keywords: ['easter egg', 'secret', 'hidden'], next: 'easter_egg' }
    ]
  },
  greeting: { file: '/video_files/greeting.mp4', next: 'idle' },
  general_response: { file: '/video_files/general_response.mp4', next: 'idle' },
  weather: { file: '/video_files/weather.mp4', next: 'idle' },
  goodbye: { file: '/video_files/goodbye.mp4', next: 'idle' },
  easter_egg: { file: '/video_files/easter_egg.mp4', next: 'idle' },
  fallback: { file: '/video_files/fallback.mp4', next: 'idle' }
};

function App() {
  const [currentState, setCurrentState] = useState('intro');
  const [transcript, setTranscript] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // Call duration timer
  useEffect(() => {
    let interval;
    if (isStarted) interval = setInterval(() => setSeconds(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [isStarted]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  // Speech Recognition Logic
  useEffect(() => {
    if (!isStarted) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US'; // Set to English for the task
    
    recognition.onresult = (event) => {
      const text = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
      setTranscript(text);
      
      if (currentState === 'idle') {
        const match = SCENARIO.idle.triggers.find(t => t.keywords.some(k => text.includes(k)));
        setCurrentState(match ? match.next : 'fallback');
      }
    };
    
    recognition.start();
    return () => recognition.stop();
  }, [isStarted, currentState]);

  // Landing Page / Entry Screen
  if (!isStarted) {
    return (
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-cyan-400 text-4xl font-bold tracking-[0.3em] neon-text-blue animate-pulse">
          // V-CHAT AI //
        </h1>
        <button 
          onClick={() => setIsStarted(true)}
          className="border-2 border-cyan-400 px-10 py-4 text-cyan-400 font-bold hover:bg-cyan-400 hover:text-black transition-all duration-300 neon-border-blue"
        >
          _START
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 max-w-4xl w-full p-4">
      
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-white text-3xl font-bold tracking-[0.2em] mb-2">// V-CHAT AI //</h1>
        <p className="text-cyan-400 text-sm tracking-[0.4em] neon-text-blue">TRACKING_NEON_OS</p>
      </div>

      <div className="flex items-center justify-between w-full gap-4">
          {/* Left Visualizer Decoration */}
          <div className="hidden md:block w-32 h-20 border-l-2 border-cyan-500/30 opacity-50 relative">
             <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-transparent animate-pulse"></div>
          </div>

          {/* MAIN TERMINAL DISPLAY */}
          <div className="relative border-2 border-cyan-400 rounded-3xl p-4 bg-black/40 neon-border-blue backdrop-blur-sm w-[600px]">
            <div className="flex justify-between text-[10px] text-cyan-400/70 mb-2 font-mono uppercase tracking-widest">
                <span>format:(60fps)</span>
                <span className="animate-pulse tracking-tighter">// LIVE_FEED //</span>
            </div>
            
            <div className="relative aspect-video rounded-xl overflow-hidden border border-cyan-900/50 bg-black shadow-inner">
                <video
                    key={currentState}
                    src={SCENARIO[currentState].file}
                    autoPlay
                    onEnded={() => SCENARIO[currentState].next && setCurrentState(SCENARIO[currentState].next)}
                    loop={SCENARIO[currentState].isLoop}
                    className="w-full h-full object-cover opacity-90"
                />
                {/* CRT Scan-line Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
            </div>

            <div className="mt-2 flex justify-between items-center font-mono text-cyan-400/60 text-[10px]">
                <div className="flex gap-2 items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_5px_red]"></div>
                    <span className="text-white">Uptime: {formatTime(seconds)}</span>
                </div>
                <span>SYS_VER: 3.0.0.1</span>
            </div>
          </div>

          {/* Right Visualizer Decoration */}
          <div className="hidden md:block w-32 h-20 border-r-2 border-pink-500/30 opacity-50 relative">
             <div className="absolute inset-0 bg-gradient-to-l from-pink-500/20 to-transparent animate-pulse"></div>
          </div>
      </div>

      {/* CONTROL INTERFACE */}
      <div className="flex gap-4">
          <button className="px-6 py-2 border border-cyan-400 text-cyan-400 text-xs font-bold hover:bg-cyan-400 hover:text-black transition-all neon-border-blue">MIC_ON</button>
          <button className="px-6 py-2 border border-cyan-400 text-cyan-400 text-xs font-bold hover:bg-cyan-400 hover:text-black transition-all neon-border-blue">SYNC</button>
          <button className="px-6 py-2 border border-pink-500 text-pink-500 text-xs font-bold hover:bg-pink-500 hover:text-black transition-all neon-border-pink">CAM_FX</button>
          <button onClick={() => window.location.reload()} className="px-6 py-2 border border-cyan-400 text-cyan-400 text-xs font-bold hover:bg-cyan-400 hover:text-black transition-all neon-border-blue">TERMINATE</button>
      </div>

      {/* TRANSCRIPTION LOG (Bottom Console) */}
      <div className="w-full max-w-lg border-2 border-cyan-400 rounded-2xl p-6 bg-black/60 neon-border-blue relative overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
              <span className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase">Input Stream Analysis</span>
          </div>
          <div className="font-mono text-sm leading-relaxed">
             <p className="text-cyan-400/50 mb-1">&gt; shell.exec("capture_voice")</p>
             <p className="text-cyan-400/50 mb-4">&gt; transcript_output:</p>
             <p className="text-pink-400 uppercase tracking-widest text-[10px] mb-2 neon-text-pink">
                {currentState === 'idle' ? 'AWAITING_VOICE_COMMAND...' : 'PROCESSING_RESPONSE...'}
             </p>
             <p className="text-white text-lg italic">
                {transcript ? `"${transcript}"` : "NO_SIGNAL_DETECTED"}
             </p>
          </div>
          {/* Decorative Bottom Bar */}
          <div className="absolute bottom-0 left-0 w-1/3 h-1 bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>
      </div>
    </div>
  );
}

export default App;