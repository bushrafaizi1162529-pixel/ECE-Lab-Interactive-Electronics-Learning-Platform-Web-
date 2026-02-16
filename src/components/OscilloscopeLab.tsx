import { useState, useEffect, useRef } from 'react';

type WaveformType = 'sine' | 'square' | 'triangle' | 'sawtooth';

export function OscilloscopeLab() {
  const [waveform, setWaveform] = useState<WaveformType>('sine');
  const [frequency, setFrequency] = useState(100);
  const [amplitude, setAmplitude] = useState(2.5);
  const [offset, setOffset] = useState(0);
  const [timeDiv, setTimeDiv] = useState(2);
  const [voltDiv, setVoltDiv] = useState(1);
  const [isRunning, setIsRunning] = useState(true);
  const [phase, setPhase] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      setPhase(prev => (prev + 0.05) % (2 * Math.PI));
    }, 16);
    
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;
    
    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid
    ctx.strokeStyle = '#1e3a5f';
    ctx.lineWidth = 1;
    
    // Vertical divisions
    for (let i = 0; i <= 10; i++) {
      ctx.beginPath();
      ctx.moveTo((width / 10) * i, 0);
      ctx.lineTo((width / 10) * i, height);
      ctx.stroke();
    }
    
    // Horizontal divisions
    for (let i = 0; i <= 8; i++) {
      ctx.beginPath();
      ctx.moveTo(0, (height / 8) * i);
      ctx.lineTo(width, (height / 8) * i);
      ctx.stroke();
    }
    
    // Center lines
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
    
    // Draw waveform
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    const samplesPerDiv = 50;
    const totalSamples = 10 * samplesPerDiv;
    const timePerDiv = timeDiv / 1000; // Convert ms to seconds
    const totalTime = 10 * timePerDiv;
    
    for (let i = 0; i < totalSamples; i++) {
      const x = (i / totalSamples) * width;
      const t = (i / totalSamples) * totalTime + phase / (2 * Math.PI * frequency);
      
      let value = 0;
      const angularFreq = 2 * Math.PI * frequency;
      
      switch (waveform) {
        case 'sine':
          value = amplitude * Math.sin(angularFreq * t);
          break;
        case 'square':
          value = amplitude * (Math.sin(angularFreq * t) >= 0 ? 1 : -1);
          break;
        case 'triangle':
          value = amplitude * (2 / Math.PI) * Math.asin(Math.sin(angularFreq * t));
          break;
        case 'sawtooth':
          const period = 1 / frequency;
          const tMod = t % period;
          value = amplitude * (2 * (tMod / period) - 1);
          break;
      }
      
      value += offset;
      
      // Scale to canvas coordinates
      const pixelsPerVolt = (height / 8) / voltDiv;
      const y = centerY - value * pixelsPerVolt;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
    
    // Draw measurements
    ctx.fillStyle = '#22c55e';
    ctx.font = '12px monospace';
    ctx.fillText(`CH1`, 10, 20);
    
  }, [waveform, frequency, amplitude, offset, timeDiv, voltDiv, phase]);

  const period = 1000 / frequency;
  const vpp = amplitude * 2;
  const vrms = amplitude / Math.sqrt(2);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <span className="text-4xl">📊</span> Virtual Oscilloscope
        </h2>
        <p className="text-slate-400">Visualize different waveforms and adjust parameters</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Oscilloscope Display */}
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl border-4 border-slate-700 p-4">
          {/* Top Controls */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-green-400 text-sm font-mono">CH1</span>
              </div>
              <span className="text-slate-400 text-sm font-mono">{frequency} Hz</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  isRunning ? 'bg-green-500 text-black' : 'bg-red-500 text-white'
                }`}
              >
                {isRunning ? '▶ RUN' : '⏸ STOP'}
              </button>
            </div>
          </div>
          
          {/* Canvas Display */}
          <div className="relative bg-black rounded-lg overflow-hidden border border-slate-700">
            <canvas 
              ref={canvasRef} 
              width={600} 
              height={400}
              className="w-full"
            />
            
            {/* Scale Labels */}
            <div className="absolute bottom-2 left-2 text-xs text-slate-400 font-mono">
              Time: {timeDiv} ms/div
            </div>
            <div className="absolute bottom-2 right-2 text-xs text-slate-400 font-mono">
              Volt: {voltDiv} V/div
            </div>
          </div>
          
          {/* Bottom Info */}
          <div className="mt-4 grid grid-cols-4 gap-4">
            <div className="bg-slate-800/50 rounded-lg p-3 text-center">
              <div className="text-xs text-slate-400">Frequency</div>
              <div className="text-lg font-mono text-cyan-400">{frequency} Hz</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3 text-center">
              <div className="text-xs text-slate-400">Period</div>
              <div className="text-lg font-mono text-yellow-400">{period.toFixed(2)} ms</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3 text-center">
              <div className="text-xs text-slate-400">Vpp</div>
              <div className="text-lg font-mono text-green-400">{vpp.toFixed(2)} V</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3 text-center">
              <div className="text-xs text-slate-400">Vrms</div>
              <div className="text-lg font-mono text-purple-400">{vrms.toFixed(2)} V</div>
            </div>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="space-y-4">
          {/* Waveform Selection */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
            <h3 className="text-white font-medium mb-3">Waveform</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'sine', name: 'Sine', icon: '∿' },
                { id: 'square', name: 'Square', icon: '⊓' },
                { id: 'triangle', name: 'Triangle', icon: '△' },
                { id: 'sawtooth', name: 'Sawtooth', icon: '⊿' },
              ].map((w) => (
                <button
                  key={w.id}
                  onClick={() => setWaveform(w.id as WaveformType)}
                  className={`p-3 rounded-lg font-medium transition-all flex flex-col items-center ${
                    waveform === w.id
                      ? 'bg-green-500 text-black'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  <span className="text-2xl">{w.icon}</span>
                  <span className="text-sm">{w.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Frequency */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
            <label className="text-white font-medium mb-3 flex items-center justify-between">
              <span>Frequency</span>
              <span className="text-cyan-400 font-mono">{frequency} Hz</span>
            </label>
            <input
              type="range"
              min="1"
              max="1000"
              value={frequency}
              onChange={(e) => setFrequency(parseInt(e.target.value))}
              className="w-full accent-cyan-500"
            />
            <div className="flex gap-2 mt-2">
              {[10, 50, 100, 500, 1000].map((f) => (
                <button
                  key={f}
                  onClick={() => setFrequency(f)}
                  className={`flex-1 py-1 rounded text-xs ${
                    frequency === f ? 'bg-cyan-500 text-black' : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Amplitude */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
            <label className="text-white font-medium mb-3 flex items-center justify-between">
              <span>Amplitude</span>
              <span className="text-yellow-400 font-mono">{amplitude.toFixed(1)} V</span>
            </label>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={amplitude}
              onChange={(e) => setAmplitude(parseFloat(e.target.value))}
              className="w-full accent-yellow-500"
            />
          </div>

          {/* DC Offset */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
            <label className="text-white font-medium mb-3 flex items-center justify-between">
              <span>DC Offset</span>
              <span className="text-purple-400 font-mono">{offset.toFixed(1)} V</span>
            </label>
            <input
              type="range"
              min="-3"
              max="3"
              step="0.1"
              value={offset}
              onChange={(e) => setOffset(parseFloat(e.target.value))}
              className="w-full accent-purple-500"
            />
          </div>

          {/* Time/Div */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
            <label className="text-white font-medium mb-3 flex items-center justify-between">
              <span>Time/Div</span>
              <span className="text-green-400 font-mono">{timeDiv} ms</span>
            </label>
            <div className="flex gap-2">
              {[0.5, 1, 2, 5, 10].map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeDiv(t)}
                  className={`flex-1 py-2 rounded text-sm ${
                    timeDiv === t ? 'bg-green-500 text-black' : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Volt/Div */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
            <label className="text-white font-medium mb-3 flex items-center justify-between">
              <span>Volt/Div</span>
              <span className="text-orange-400 font-mono">{voltDiv} V</span>
            </label>
            <div className="flex gap-2">
              {[0.5, 1, 2, 5].map((v) => (
                <button
                  key={v}
                  onClick={() => setVoltDiv(v)}
                  className={`flex-1 py-2 rounded text-sm ${
                    voltDiv === v ? 'bg-orange-500 text-black' : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Waveform Info */}
      <div className="mt-8 bg-slate-800/30 rounded-xl border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">📐 Waveform Formulas</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-green-400 font-medium mb-2">Sine Wave</div>
            <div className="text-cyan-400 font-mono text-sm">v(t) = A·sin(2πft)</div>
            <div className="text-xs text-slate-400 mt-2">Vrms = A/√2 ≈ 0.707A</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-green-400 font-medium mb-2">Square Wave</div>
            <div className="text-cyan-400 font-mono text-sm">50% duty cycle</div>
            <div className="text-xs text-slate-400 mt-2">Vrms = A (for ideal)</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-green-400 font-medium mb-2">Triangle Wave</div>
            <div className="text-cyan-400 font-mono text-sm">Linear rise/fall</div>
            <div className="text-xs text-slate-400 mt-2">Vrms = A/√3</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-green-400 font-medium mb-2">Sawtooth</div>
            <div className="text-cyan-400 font-mono text-sm">Linear rise, instant fall</div>
            <div className="text-xs text-slate-400 mt-2">Vrms = A/√3</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-700/30 rounded-lg p-3 text-center">
            <div className="text-xs text-slate-400">Period</div>
            <div className="text-sm font-mono text-white">T = 1/f</div>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-3 text-center">
            <div className="text-xs text-slate-400">Peak-to-Peak</div>
            <div className="text-sm font-mono text-white">Vpp = 2A</div>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-3 text-center">
            <div className="text-xs text-slate-400">Angular Freq</div>
            <div className="text-sm font-mono text-white">ω = 2πf</div>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-3 text-center">
            <div className="text-xs text-slate-400">Wavelength</div>
            <div className="text-sm font-mono text-white">λ = c/f</div>
          </div>
        </div>
      </div>
    </div>
  );
}
