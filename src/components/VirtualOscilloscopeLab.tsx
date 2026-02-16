import { useState, useEffect, useRef } from 'react';

interface Props {
  onBack: () => void;
}

type WaveType = 'sine' | 'square' | 'triangle' | 'sawtooth';

export default function VirtualOscilloscopeLab({ onBack }: Props) {
  const [waveType, setWaveType] = useState<WaveType>('sine');
  const [frequency, setFrequency] = useState(100);
  const [amplitude, setAmplitude] = useState(2);
  const [dcOffset, setDcOffset] = useState(0);
  const [timeDiv, setTimeDiv] = useState(1);
  const [voltDiv, setVoltDiv] = useState(1);
  const [isRunning, setIsRunning] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const phaseRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Clear
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      // Grid
      ctx.strokeStyle = '#1a3a1a';
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= width; x += width / 10) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += height / 8) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Center lines
      ctx.strokeStyle = '#2a5a2a';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();

      // Waveform
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#22c55e';
      ctx.beginPath();

      for (let x = 0; x < width; x++) {
        const t = (x / width) * timeDiv * 10;
        const phase = phaseRef.current + t * frequency * 0.01;
        let y = 0;

        switch (waveType) {
          case 'sine':
            y = Math.sin(phase * Math.PI * 2);
            break;
          case 'square':
            y = Math.sin(phase * Math.PI * 2) > 0 ? 1 : -1;
            break;
          case 'triangle':
            y = Math.asin(Math.sin(phase * Math.PI * 2)) * (2 / Math.PI);
            break;
          case 'sawtooth':
            y = 2 * (phase % 1) - 1;
            break;
        }

        const pixelY = centerY - (y * amplitude * 40 / voltDiv) - (dcOffset * 40 / voltDiv);
        
        if (x === 0) {
          ctx.moveTo(x, pixelY);
        } else {
          ctx.lineTo(x, pixelY);
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      if (isRunning) {
        phaseRef.current += 0.02;
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [waveType, frequency, amplitude, dcOffset, timeDiv, voltDiv, isRunning]);

  const period = 1000 / frequency;
  const vpp = amplitude * 2;
  const vrms = waveType === 'sine' ? amplitude / Math.sqrt(2) : amplitude;

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white p-4">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors">
        <span>←</span> Back to Labs
      </button>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-black bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            📊 Virtual Oscilloscope
          </h1>
          <p className="text-gray-400 text-sm">Visualize waveforms in real-time</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {/* Oscilloscope Screen */}
          <div className="lg:col-span-2 bg-gray-900 rounded-xl p-3 border-4 border-gray-700">
            {/* Top Panel */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-bold">CH1</span>
                <span className="text-gray-500 text-xs">|</span>
                <span className="text-gray-400 text-xs">{voltDiv}V/div</span>
                <span className="text-gray-400 text-xs">{timeDiv}ms/div</span>
              </div>
              <div className="flex gap-2">
                <span className={`px-2 py-1 rounded text-xs font-bold ${isRunning ? 'bg-green-500 text-black' : 'bg-red-500/20 text-red-400'}`}>
                  {isRunning ? 'RUN' : 'STOP'}
                </span>
              </div>
            </div>

            {/* Screen */}
            <div className="relative bg-black rounded border border-gray-600">
              <canvas 
                ref={canvasRef} 
                width={600} 
                height={300}
                className="w-full rounded"
              />
              {/* Screen corners */}
              <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-green-500/50" />
              <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-green-500/50" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-green-500/50" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-green-500/50" />
            </div>

            {/* Measurements */}
            <div className="grid grid-cols-4 gap-2 mt-2">
              <div className="bg-black/50 rounded p-2 text-center">
                <p className="text-[10px] text-gray-500">Frequency</p>
                <p className="text-green-400 font-bold text-sm">{frequency} Hz</p>
              </div>
              <div className="bg-black/50 rounded p-2 text-center">
                <p className="text-[10px] text-gray-500">Period</p>
                <p className="text-green-400 font-bold text-sm">{period.toFixed(2)} ms</p>
              </div>
              <div className="bg-black/50 rounded p-2 text-center">
                <p className="text-[10px] text-gray-500">Vpp</p>
                <p className="text-green-400 font-bold text-sm">{vpp.toFixed(2)} V</p>
              </div>
              <div className="bg-black/50 rounded p-2 text-center">
                <p className="text-[10px] text-gray-500">Vrms</p>
                <p className="text-green-400 font-bold text-sm">{vrms.toFixed(2)} V</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-3">
            {/* Waveform Selection */}
            <div className="bg-gray-900/80 rounded-xl p-3 border border-gray-700">
              <h3 className="font-bold text-white text-sm mb-2">Waveform</h3>
              <div className="grid grid-cols-2 gap-2">
                {(['sine', 'square', 'triangle', 'sawtooth'] as WaveType[]).map(type => (
                  <button
                    key={type}
                    onClick={() => setWaveType(type)}
                    className={`py-2 rounded text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                      waveType === type ? 'bg-green-500 text-black' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {type === 'sine' && '∿'}
                    {type === 'square' && '⊓'}
                    {type === 'triangle' && '△'}
                    {type === 'sawtooth' && '⋀'}
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Signal Controls */}
            <div className="bg-gray-900/80 rounded-xl p-3 border border-gray-700">
              <h3 className="font-bold text-white text-sm mb-2">Signal</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-400 flex justify-between">
                    <span>Frequency</span>
                    <span className="text-green-400">{frequency} Hz</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    value={frequency}
                    onChange={(e) => setFrequency(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-700 rounded appearance-none cursor-pointer accent-green-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 flex justify-between">
                    <span>Amplitude</span>
                    <span className="text-yellow-400">{amplitude} V</span>
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.1"
                    value={amplitude}
                    onChange={(e) => setAmplitude(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-700 rounded appearance-none cursor-pointer accent-yellow-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 flex justify-between">
                    <span>DC Offset</span>
                    <span className="text-blue-400">{dcOffset} V</span>
                  </label>
                  <input
                    type="range"
                    min="-3"
                    max="3"
                    step="0.1"
                    value={dcOffset}
                    onChange={(e) => setDcOffset(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-700 rounded appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Display Controls */}
            <div className="bg-gray-900/80 rounded-xl p-3 border border-gray-700">
              <h3 className="font-bold text-white text-sm mb-2">Display</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-400 flex justify-between">
                    <span>Time/Div</span>
                    <span className="text-cyan-400">{timeDiv} ms</span>
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="10"
                    step="0.1"
                    value={timeDiv}
                    onChange={(e) => setTimeDiv(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-700 rounded appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 flex justify-between">
                    <span>Volt/Div</span>
                    <span className="text-pink-400">{voltDiv} V</span>
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.5"
                    value={voltDiv}
                    onChange={(e) => setVoltDiv(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-700 rounded appearance-none cursor-pointer accent-pink-500"
                  />
                </div>
              </div>
            </div>

            {/* Run/Stop */}
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`w-full py-3 rounded-lg font-bold text-sm transition-all ${
                isRunning 
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                  : 'bg-green-500 text-black hover:bg-green-600'
              }`}
            >
              {isRunning ? '⏹ STOP' : '▶ RUN'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
