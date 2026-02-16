import { useState, useEffect, useRef } from 'react';

type SubLab = 'opamp' | 'filters' | 'amplifier' | 'oscillator';

export default function AnalogCircuitsLab({ onBack }: { onBack: () => void }) {
  const [subLab, setSubLab] = useState<SubLab>('opamp');

  const subLabs = [
    { id: 'opamp', name: 'Op-Amp Configs', icon: '🔺' },
    { id: 'filters', name: 'Filters', icon: '📊' },
    { id: 'amplifier', name: 'Amplifiers', icon: '📈' },
    { id: 'oscillator', name: 'Oscillators', icon: '〰️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-green-400 hover:text-green-300 mb-4">
          ← Back to Labs
        </button>
        
        <h1 className="text-3xl font-bold text-white mb-6">📈 Analog Circuits Lab</h1>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {subLabs.map(lab => (
            <button
              key={lab.id}
              onClick={() => setSubLab(lab.id as SubLab)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                subLab === lab.id
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {lab.icon} {lab.name}
            </button>
          ))}
        </div>

        <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-gray-700">
          {subLab === 'opamp' && <OpAmpLab />}
          {subLab === 'filters' && <FilterLab />}
          {subLab === 'amplifier' && <AmplifierLab />}
          {subLab === 'oscillator' && <OscillatorLab />}
        </div>
      </div>
    </div>
  );
}

// Op-Amp Configurations Lab
function OpAmpLab() {
  const [config, setConfig] = useState<'inverting' | 'non-inverting' | 'buffer' | 'summing' | 'differential'>('inverting');
  const [vin, setVin] = useState(1);
  const [vin2, setVin2] = useState(0.5);
  const [r1, setR1] = useState(10);
  const [rf, setRf] = useState(100);
  const [vSupply] = useState(15);

  let gain = 1;
  let vout = 0;
  let formula = '';

  switch (config) {
    case 'inverting':
      gain = -rf / r1;
      vout = gain * vin;
      formula = `Vout = -Rf/R1 × Vin = -${rf}/${r1} × ${vin} = ${vout.toFixed(2)}V`;
      break;
    case 'non-inverting':
      gain = 1 + rf / r1;
      vout = gain * vin;
      formula = `Vout = (1 + Rf/R1) × Vin = (1 + ${rf}/${r1}) × ${vin} = ${vout.toFixed(2)}V`;
      break;
    case 'buffer':
      gain = 1;
      vout = vin;
      formula = `Vout = Vin = ${vin}V (Unity Gain)`;
      break;
    case 'summing':
      vout = -(rf / r1) * (vin + vin2);
      formula = `Vout = -Rf/R × (V1 + V2) = -${rf}/${r1} × (${vin} + ${vin2}) = ${vout.toFixed(2)}V`;
      break;
    case 'differential':
      vout = (rf / r1) * (vin2 - vin);
      formula = `Vout = Rf/R1 × (V2 - V1) = ${rf}/${r1} × (${vin2} - ${vin}) = ${vout.toFixed(2)}V`;
      break;
  }

  const clippedVout = Math.max(-vSupply + 1, Math.min(vSupply - 1, vout));
  const isClipping = Math.abs(vout) > vSupply - 1;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold text-green-400 mb-4">Op-Amp Configurations</h2>
        
        {/* Config selector */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { id: 'inverting', name: 'Inverting' },
            { id: 'non-inverting', name: 'Non-Inverting' },
            { id: 'buffer', name: 'Buffer' },
            { id: 'summing', name: 'Summing' },
            { id: 'differential', name: 'Differential' },
          ].map(c => (
            <button
              key={c.id}
              onClick={() => setConfig(c.id as typeof config)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                config === c.id ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Circuit Diagram */}
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <svg viewBox="0 0 400 250" className="w-full">
            {/* Op-Amp Triangle */}
            <polygon points="150,50 150,200 300,125" fill="#1a1a2e" stroke="#10b981" strokeWidth="2" />
            <text x="200" y="130" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">∞</text>
            
            {/* Inputs */}
            <text x="160" y="95" fill="#ef4444" fontSize="14">-</text>
            <text x="160" y="165" fill="#10b981" fontSize="14">+</text>
            
            {/* Power rails */}
            <line x1="200" y1="50" x2="200" y2="30" stroke="#ef4444" strokeWidth="2" />
            <text x="210" y="35" fill="#ef4444" fontSize="10">+{vSupply}V</text>
            <line x1="200" y1="200" x2="200" y2="220" stroke="#3b82f6" strokeWidth="2" />
            <text x="210" y="225" fill="#3b82f6" fontSize="10">-{vSupply}V</text>
            
            {config === 'inverting' && (
              <>
                {/* Input resistor R1 */}
                <line x1="50" y1="90" x2="80" y2="90" stroke="#10b981" strokeWidth="2" />
                <rect x="80" y="80" width="40" height="20" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" rx="3" />
                <text x="100" y="94" textAnchor="middle" fill="white" fontSize="10">R1</text>
                <line x1="120" y1="90" x2="150" y2="90" stroke="#10b981" strokeWidth="2" />
                
                {/* Feedback resistor Rf */}
                <line x1="150" y1="90" x2="150" y2="40" stroke="#10b981" strokeWidth="2" />
                <line x1="150" y1="40" x2="180" y2="40" stroke="#10b981" strokeWidth="2" />
                <rect x="180" y="30" width="60" height="20" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2" rx="3" />
                <text x="210" y="44" textAnchor="middle" fill="white" fontSize="10">Rf</text>
                <line x1="240" y1="40" x2="320" y2="40" stroke="#10b981" strokeWidth="2" />
                <line x1="320" y1="40" x2="320" y2="125" stroke="#10b981" strokeWidth="2" />
                
                {/* Non-inverting to ground */}
                <line x1="100" y1="160" x2="150" y2="160" stroke="#10b981" strokeWidth="2" />
                <line x1="100" y1="160" x2="100" y2="180" stroke="#10b981" strokeWidth="2" />
                <line x1="90" y1="180" x2="110" y2="180" stroke="#666" strokeWidth="2" />
                
                {/* Labels */}
                <text x="30" y="95" fill="#f59e0b" fontSize="11">Vin={vin}V</text>
              </>
            )}
            
            {config === 'non-inverting' && (
              <>
                {/* Input to non-inverting */}
                <line x1="50" y1="160" x2="150" y2="160" stroke="#10b981" strokeWidth="2" />
                <text x="30" y="165" fill="#f59e0b" fontSize="11">Vin={vin}V</text>
                
                {/* Feedback network */}
                <line x1="150" y1="90" x2="100" y2="90" stroke="#10b981" strokeWidth="2" />
                <rect x="60" y="80" width="40" height="20" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" rx="3" />
                <text x="80" y="94" textAnchor="middle" fill="white" fontSize="10">R1</text>
                <line x1="60" y1="90" x2="60" y2="110" stroke="#10b981" strokeWidth="2" />
                <line x1="50" y1="110" x2="70" y2="110" stroke="#666" strokeWidth="2" />
                
                {/* Rf */}
                <line x1="100" y1="90" x2="100" y2="40" stroke="#10b981" strokeWidth="2" />
                <rect x="100" y="30" width="60" height="20" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2" rx="3" />
                <text x="130" y="44" textAnchor="middle" fill="white" fontSize="10">Rf</text>
                <line x1="160" y1="40" x2="320" y2="40" stroke="#10b981" strokeWidth="2" />
                <line x1="320" y1="40" x2="320" y2="125" stroke="#10b981" strokeWidth="2" />
              </>
            )}
            
            {config === 'buffer' && (
              <>
                {/* Input to non-inverting */}
                <line x1="50" y1="160" x2="150" y2="160" stroke="#10b981" strokeWidth="2" />
                <text x="30" y="165" fill="#f59e0b" fontSize="11">Vin={vin}V</text>
                
                {/* Direct feedback */}
                <line x1="150" y1="90" x2="120" y2="90" stroke="#10b981" strokeWidth="2" />
                <line x1="120" y1="90" x2="120" y2="40" stroke="#10b981" strokeWidth="2" />
                <line x1="120" y1="40" x2="320" y2="40" stroke="#10b981" strokeWidth="2" />
                <line x1="320" y1="40" x2="320" y2="125" stroke="#10b981" strokeWidth="2" />
              </>
            )}
            
            {/* Output */}
            <line x1="300" y1="125" x2="370" y2="125" stroke="#10b981" strokeWidth="2" />
            <circle cx="320" cy="125" r="4" fill="#10b981" />
            <text x="350" y="120" fill="#10b981" fontSize="11">Vout</text>
          </svg>
        </div>

        {/* Controls */}
        <div className="space-y-3">
          <div>
            <label className="text-gray-300 text-sm">Vin: {vin}V</label>
            <input type="range" min="-5" max="5" step="0.1" value={vin} 
                   onChange={(e) => setVin(Number(e.target.value))} className="w-full" />
          </div>
          {(config === 'summing' || config === 'differential') && (
            <div>
              <label className="text-gray-300 text-sm">Vin2: {vin2}V</label>
              <input type="range" min="-5" max="5" step="0.1" value={vin2} 
                     onChange={(e) => setVin2(Number(e.target.value))} className="w-full" />
            </div>
          )}
          {config !== 'buffer' && (
            <>
              <div>
                <label className="text-gray-300 text-sm">R1: {r1}kΩ</label>
                <input type="range" min="1" max="100" value={r1} 
                       onChange={(e) => setR1(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="text-gray-300 text-sm">Rf: {rf}kΩ</label>
                <input type="range" min="1" max="1000" value={rf} 
                       onChange={(e) => setRf(Number(e.target.value))} className="w-full" />
              </div>
            </>
          )}
        </div>
      </div>

      <div>
        {/* Output */}
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-white mb-3">📊 Output</h3>
          
          <div className={`p-4 rounded-xl mb-4 text-center ${isClipping ? 'bg-red-900/50 border border-red-500' : 'bg-green-900/50'}`}>
            <p className="text-gray-400 text-sm">Output Voltage</p>
            <p className="text-4xl font-bold text-green-400">{clippedVout.toFixed(2)}V</p>
            {isClipping && <p className="text-red-400 text-sm mt-2">⚠️ Output clipping!</p>}
          </div>
          
          <div className="bg-gray-800 p-3 rounded-lg font-mono text-sm mb-4">
            <p className="text-cyan-400">{formula}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Gain</p>
              <p className="text-xl font-bold text-blue-400">{gain.toFixed(1)}x</p>
            </div>
            <div className="bg-purple-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Gain (dB)</p>
              <p className="text-xl font-bold text-purple-400">{(20 * Math.log10(Math.abs(gain))).toFixed(1)} dB</p>
            </div>
          </div>
        </div>

        {/* Op-Amp Rules */}
        <div className="bg-gray-900 rounded-xl p-4">
          <h3 className="text-lg font-bold text-white mb-3">📐 Golden Rules</h3>
          <div className="space-y-2 text-sm">
            <div className="bg-yellow-900/30 p-3 rounded-lg border border-yellow-500">
              <p className="text-yellow-400 font-bold">Rule 1: No current into inputs</p>
              <p className="text-gray-400">I+ = I- = 0</p>
            </div>
            <div className="bg-cyan-900/30 p-3 rounded-lg border border-cyan-500">
              <p className="text-cyan-400 font-bold">Rule 2: Virtual short</p>
              <p className="text-gray-400">V+ = V- (with negative feedback)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Filter Lab
function FilterLab() {
  const [filterType, setFilterType] = useState<'lowpass' | 'highpass' | 'bandpass'>('lowpass');
  const [r, setR] = useState(10);
  const [c, setC] = useState(100);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const fc = 1 / (2 * Math.PI * (r * 1000) * (c / 1000000000));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, 400, 200);

    // Draw grid
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    for (let i = 0; i < 10; i++) {
      ctx.beginPath();
      ctx.moveTo(40 + i * 35, 20);
      ctx.lineTo(40 + i * 35, 180);
      ctx.stroke();
    }
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(40, 20 + i * 40);
      ctx.lineTo(390, 20 + i * 40);
      ctx.stroke();
    }

    // Draw frequency response
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    for (let x = 0; x < 350; x++) {
      const freq = Math.pow(10, (x / 350) * 4); // 1 to 10000 Hz
      let gain = 1;
      
      if (filterType === 'lowpass') {
        gain = 1 / Math.sqrt(1 + Math.pow(freq / fc, 2));
      } else if (filterType === 'highpass') {
        gain = (freq / fc) / Math.sqrt(1 + Math.pow(freq / fc, 2));
      } else {
        const q = 1;
        gain = (freq / fc) / Math.sqrt(Math.pow(1 - Math.pow(freq / fc, 2), 2) + Math.pow(freq / (fc * q), 2));
      }
      
      const y = 100 - gain * 80;
      
      if (x === 0) ctx.moveTo(40 + x, y);
      else ctx.lineTo(40 + x, y);
    }
    ctx.stroke();

    // Draw -3dB line
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(40, 100 - 0.707 * 80);
    ctx.lineTo(390, 100 - 0.707 * 80);
    ctx.stroke();
    ctx.setLineDash([]);

    // Labels
    ctx.fillStyle = '#fff';
    ctx.font = '10px sans-serif';
    ctx.fillText('0dB', 10, 25);
    ctx.fillText('-3dB', 5, 100 - 0.707 * 80);
    ctx.fillText('Frequency →', 180, 195);
    ctx.fillText(`fc = ${fc.toFixed(0)}Hz`, 300, 30);
  }, [filterType, r, c, fc]);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold text-green-400 mb-4">RC Filters</h2>
        
        {/* Filter selector */}
        <div className="flex gap-2 mb-4">
          {[
            { id: 'lowpass', name: 'Low-Pass', color: 'green' },
            { id: 'highpass', name: 'High-Pass', color: 'blue' },
            { id: 'bandpass', name: 'Band-Pass', color: 'purple' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id as typeof filterType)}
              className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                filterType === f.id ? `bg-${f.color}-500 text-white` : 'bg-gray-700 text-gray-300'
              }`}
              style={{ backgroundColor: filterType === f.id ? (f.color === 'green' ? '#22c55e' : f.color === 'blue' ? '#3b82f6' : '#8b5cf6') : '' }}
            >
              {f.name}
            </button>
          ))}
        </div>

        {/* Circuit Diagram */}
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <svg viewBox="0 0 350 150" className="w-full">
            {filterType === 'lowpass' && (
              <>
                <line x1="30" y1="60" x2="80" y2="60" stroke="#10b981" strokeWidth="2" />
                <rect x="80" y="50" width="60" height="20" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" rx="3" />
                <text x="110" y="64" textAnchor="middle" fill="white" fontSize="10">R</text>
                <line x1="140" y1="60" x2="200" y2="60" stroke="#10b981" strokeWidth="2" />
                <circle cx="200" cy="60" r="4" fill="#10b981" />
                
                {/* Capacitor */}
                <line x1="200" y1="64" x2="200" y2="80" stroke="#10b981" strokeWidth="2" />
                <line x1="185" y1="80" x2="215" y2="80" stroke="#22c55e" strokeWidth="3" />
                <line x1="185" y1="88" x2="215" y2="88" stroke="#22c55e" strokeWidth="3" />
                <line x1="200" y1="88" x2="200" y2="110" stroke="#10b981" strokeWidth="2" />
                
                <line x1="200" y1="60" x2="280" y2="60" stroke="#10b981" strokeWidth="2" />
                <text x="300" y="65" fill="#10b981" fontSize="11">Vout</text>
                
                <line x1="30" y1="110" x2="280" y2="110" stroke="#666" strokeWidth="2" />
                <text x="15" y="65" fill="#f59e0b" fontSize="11">Vin</text>
              </>
            )}
            
            {filterType === 'highpass' && (
              <>
                <line x1="30" y1="60" x2="80" y2="60" stroke="#10b981" strokeWidth="2" />
                
                {/* Capacitor first */}
                <line x1="80" y1="50" x2="80" y2="70" stroke="#22c55e" strokeWidth="3" />
                <line x1="88" y1="50" x2="88" y2="70" stroke="#22c55e" strokeWidth="3" />
                
                <line x1="88" y1="60" x2="140" y2="60" stroke="#10b981" strokeWidth="2" />
                <circle cx="140" cy="60" r="4" fill="#10b981" />
                
                {/* Resistor to ground */}
                <line x1="140" y1="64" x2="140" y2="75" stroke="#10b981" strokeWidth="2" />
                <rect x="125" y="75" width="30" height="20" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" rx="3" />
                <text x="140" y="89" textAnchor="middle" fill="white" fontSize="10">R</text>
                <line x1="140" y1="95" x2="140" y2="110" stroke="#10b981" strokeWidth="2" />
                
                <line x1="140" y1="60" x2="280" y2="60" stroke="#10b981" strokeWidth="2" />
                <text x="300" y="65" fill="#10b981" fontSize="11">Vout</text>
                
                <line x1="30" y1="110" x2="280" y2="110" stroke="#666" strokeWidth="2" />
                <text x="15" y="65" fill="#f59e0b" fontSize="11">Vin</text>
              </>
            )}
            
            {filterType === 'bandpass' && (
              <>
                <line x1="20" y1="60" x2="50" y2="60" stroke="#10b981" strokeWidth="2" />
                
                {/* Capacitor */}
                <line x1="50" y1="50" x2="50" y2="70" stroke="#22c55e" strokeWidth="3" />
                <line x1="58" y1="50" x2="58" y2="70" stroke="#22c55e" strokeWidth="3" />
                
                <line x1="58" y1="60" x2="90" y2="60" stroke="#10b981" strokeWidth="2" />
                <rect x="90" y="50" width="40" height="20" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" rx="3" />
                <text x="110" y="64" textAnchor="middle" fill="white" fontSize="9">R1</text>
                <line x1="130" y1="60" x2="160" y2="60" stroke="#10b981" strokeWidth="2" />
                <circle cx="160" cy="60" r="4" fill="#10b981" />
                
                {/* R2 to ground */}
                <line x1="160" y1="64" x2="160" y2="75" stroke="#10b981" strokeWidth="2" />
                <rect x="145" y="75" width="30" height="20" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" rx="3" />
                <line x1="160" y1="95" x2="160" y2="110" stroke="#10b981" strokeWidth="2" />
                
                {/* C2 */}
                <line x1="160" y1="60" x2="200" y2="60" stroke="#10b981" strokeWidth="2" />
                <line x1="200" y1="64" x2="200" y2="75" stroke="#10b981" strokeWidth="2" />
                <line x1="185" y1="75" x2="215" y2="75" stroke="#22c55e" strokeWidth="3" />
                <line x1="185" y1="83" x2="215" y2="83" stroke="#22c55e" strokeWidth="3" />
                <line x1="200" y1="83" x2="200" y2="110" stroke="#10b981" strokeWidth="2" />
                
                <line x1="200" y1="60" x2="280" y2="60" stroke="#10b981" strokeWidth="2" />
                <text x="300" y="65" fill="#10b981" fontSize="11">Vout</text>
                
                <line x1="20" y1="110" x2="280" y2="110" stroke="#666" strokeWidth="2" />
                <text x="5" y="65" fill="#f59e0b" fontSize="10">Vin</text>
              </>
            )}
          </svg>
        </div>

        {/* Controls */}
        <div className="space-y-3">
          <div>
            <label className="text-gray-300 text-sm">Resistance: {r}kΩ</label>
            <input type="range" min="1" max="100" value={r} onChange={(e) => setR(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-gray-300 text-sm">Capacitance: {c}nF</label>
            <input type="range" min="10" max="1000" step="10" value={c} onChange={(e) => setC(Number(e.target.value))} className="w-full" />
          </div>
        </div>
      </div>

      <div>
        {/* Frequency Response */}
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-white mb-3">📈 Frequency Response (Bode Plot)</h3>
          <canvas ref={canvasRef} width={400} height={200} className="w-full rounded-lg" />
        </div>

        {/* Results */}
        <div className="bg-gray-900 rounded-xl p-4">
          <h3 className="text-lg font-bold text-white mb-3">📊 Filter Parameters</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Cutoff Frequency</p>
              <p className="text-2xl font-bold text-green-400">{fc.toFixed(1)} Hz</p>
            </div>
            <div className="bg-blue-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Time Constant</p>
              <p className="text-xl font-bold text-blue-400">{((r * 1000) * (c / 1000000000) * 1000).toFixed(2)} ms</p>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-gray-800 rounded-lg">
            <p className="text-cyan-400 font-mono text-sm">fc = 1 / (2π × R × C)</p>
            <p className="text-gray-400 font-mono text-sm mt-1">fc = 1 / (2π × {r}kΩ × {c}nF)</p>
            <p className="text-green-400 font-mono text-sm mt-1">fc = {fc.toFixed(1)} Hz</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Amplifier Lab
function AmplifierLab() {
  const [ampType, setAmpType] = useState<'ce' | 'cc' | 'cb'>('ce');
  const [vinPeak, setVinPeak] = useState(0.1);
  const [rc, setRc] = useState(2200);
  const [re, setRe] = useState(1000);
  const [vcc] = useState(12);

  let gain = 1;
  let phase = 0;
  let inputZ = 'Medium';
  let outputZ = 'Medium';

  switch (ampType) {
    case 'ce':
      gain = rc / re;
      phase = 180;
      inputZ = 'Medium (~1kΩ)';
      outputZ = 'Medium (~Rc)';
      break;
    case 'cc':
      gain = 1;
      phase = 0;
      inputZ = 'High (~βRe)';
      outputZ = 'Low (~re)';
      break;
    case 'cb':
      gain = rc / 26;
      phase = 0;
      inputZ = 'Low (~re)';
      outputZ = 'High (~Rc)';
      break;
  }

  const voutPeak = Math.min(vinPeak * gain, vcc / 2);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold text-green-400 mb-4">BJT Amplifier Configurations</h2>
        
        {/* Amp selector */}
        <div className="flex gap-2 mb-4">
          {[
            { id: 'ce', name: 'Common Emitter' },
            { id: 'cc', name: 'Common Collector' },
            { id: 'cb', name: 'Common Base' },
          ].map(a => (
            <button
              key={a.id}
              onClick={() => setAmpType(a.id as typeof ampType)}
              className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${
                ampType === a.id ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              {a.name}
            </button>
          ))}
        </div>

        {/* Waveform display */}
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <h3 className="text-white text-sm mb-2">Input vs Output Waveforms</h3>
          <svg viewBox="0 0 350 150" className="w-full">
            {/* Grid */}
            <line x1="30" y1="40" x2="330" y2="40" stroke="#333" strokeWidth="1" />
            <line x1="30" y1="75" x2="330" y2="75" stroke="#444" strokeWidth="1" />
            <line x1="30" y1="110" x2="330" y2="110" stroke="#333" strokeWidth="1" />
            
            {/* Input sine wave */}
            <path
              d={`M 30,75 ${[...Array(300)].map((_, i) => {
                const x = 30 + i;
                const y = 75 - Math.sin(i * 0.05) * vinPeak * 300;
                return `L ${x},${y}`;
              }).join(' ')}`}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            
            {/* Output sine wave */}
            <path
              d={`M 30,75 ${[...Array(300)].map((_, i) => {
                const x = 30 + i;
                const phaseRad = phase * Math.PI / 180;
                const y = 75 - Math.sin(i * 0.05 + phaseRad) * voutPeak * 30;
                return `L ${x},${y}`;
              }).join(' ')}`}
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
            />
            
            {/* Labels */}
            <text x="340" y="45" fill="#3b82f6" fontSize="10">Vin</text>
            <text x="340" y="115" fill="#10b981" fontSize="10">Vout</text>
          </svg>
        </div>

        {/* Controls */}
        <div className="space-y-3">
          <div>
            <label className="text-gray-300 text-sm">Input Amplitude: {(vinPeak * 1000).toFixed(0)}mV</label>
            <input type="range" min="0.01" max="0.5" step="0.01" value={vinPeak} 
                   onChange={(e) => setVinPeak(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-gray-300 text-sm">Rc: {rc}Ω</label>
            <input type="range" min="1000" max="10000" step="100" value={rc} 
                   onChange={(e) => setRc(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-gray-300 text-sm">Re: {re}Ω</label>
            <input type="range" min="100" max="5000" step="100" value={re} 
                   onChange={(e) => setRe(Number(e.target.value))} className="w-full" />
          </div>
        </div>
      </div>

      <div>
        {/* Results */}
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-white mb-3">📊 Amplifier Properties</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Voltage Gain</p>
              <p className="text-2xl font-bold text-green-400">{gain.toFixed(1)}x</p>
            </div>
            <div className="bg-blue-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Phase Shift</p>
              <p className="text-xl font-bold text-blue-400">{phase}°</p>
            </div>
            <div className="bg-purple-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Vout Peak</p>
              <p className="text-xl font-bold text-purple-400">{voutPeak.toFixed(2)}V</p>
            </div>
            <div className="bg-yellow-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Gain (dB)</p>
              <p className="text-xl font-bold text-yellow-400">{(20 * Math.log10(gain)).toFixed(1)} dB</p>
            </div>
          </div>
        </div>

        {/* Impedance */}
        <div className="bg-gray-900 rounded-xl p-4">
          <h3 className="text-lg font-bold text-white mb-3">⚡ Impedance</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-cyan-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Input Z</p>
              <p className="text-sm font-bold text-cyan-400">{inputZ}</p>
            </div>
            <div className="bg-pink-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Output Z</p>
              <p className="text-sm font-bold text-pink-400">{outputZ}</p>
            </div>
          </div>

          {/* Comparison */}
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-400">
                <th className="text-left p-2">Config</th>
                <th className="text-center p-2">Gain</th>
                <th className="text-center p-2">Zin</th>
                <th className="text-center p-2">Zout</th>
                <th className="text-center p-2">Phase</th>
              </tr>
            </thead>
            <tbody className="text-white">
              <tr className={`border-t border-gray-700 ${ampType === 'ce' ? 'bg-green-900/30' : ''}`}>
                <td className="p-2">CE</td>
                <td className="text-center p-2 text-green-400">High</td>
                <td className="text-center p-2">Med</td>
                <td className="text-center p-2">Med</td>
                <td className="text-center p-2 text-red-400">180°</td>
              </tr>
              <tr className={`border-t border-gray-700 ${ampType === 'cc' ? 'bg-green-900/30' : ''}`}>
                <td className="p-2">CC</td>
                <td className="text-center p-2 text-yellow-400">≈1</td>
                <td className="text-center p-2">High</td>
                <td className="text-center p-2">Low</td>
                <td className="text-center p-2 text-green-400">0°</td>
              </tr>
              <tr className={`border-t border-gray-700 ${ampType === 'cb' ? 'bg-green-900/30' : ''}`}>
                <td className="p-2">CB</td>
                <td className="text-center p-2 text-green-400">High</td>
                <td className="text-center p-2">Low</td>
                <td className="text-center p-2">High</td>
                <td className="text-center p-2 text-green-400">0°</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Oscillator Lab
function OscillatorLab() {
  const [oscType, setOscType] = useState<'rc' | 'lc' | '555'>('rc');
  const [r1, setR1] = useState(10);
  const [r2, setR2] = useState(10);
  const [c, setC] = useState(100);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 0.05);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  let frequency = 0;
  let dutyCycle = 50;

  if (oscType === '555') {
    frequency = 1.44 / ((r1 + 2 * r2) * c * 0.001);
    dutyCycle = ((r1 + r2) / (r1 + 2 * r2)) * 100;
  } else if (oscType === 'rc') {
    frequency = 1 / (2 * Math.PI * r1 * c * 0.000001);
  } else {
    frequency = 1 / (2 * Math.PI * Math.sqrt(r1 * 0.001 * c * 0.000000001));
  }

  const period = 1000 / frequency;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold text-green-400 mb-4">Oscillator Circuits</h2>
        
        {/* Osc selector */}
        <div className="flex gap-2 mb-4">
          {[
            { id: 'rc', name: 'RC Phase Shift' },
            { id: 'lc', name: 'LC Tank' },
            { id: '555', name: '555 Timer' },
          ].map(o => (
            <button
              key={o.id}
              onClick={() => setOscType(o.id as typeof oscType)}
              className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${
                oscType === o.id ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              {o.name}
            </button>
          ))}
        </div>

        {/* Animated waveform */}
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <h3 className="text-white text-sm mb-2">Output Waveform (Live)</h3>
          <svg viewBox="0 0 350 120" className="w-full">
            {/* Grid */}
            <rect x="20" y="10" width="310" height="100" fill="#0a0a0a" stroke="#333" />
            {[...Array(10)].map((_, i) => (
              <line key={i} x1={20 + i * 31} y1="10" x2={20 + i * 31} y2="110" stroke="#222" strokeWidth="1" />
            ))}
            <line x1="20" y1="60" x2="330" y2="60" stroke="#444" strokeWidth="1" />
            
            {/* Waveform */}
            <path
              d={oscType === '555' 
                ? `M 20,60 ${[...Array(310)].map((_, i) => {
                    const phase = ((i / 310) * 4 + time) % 1;
                    const y = phase < (dutyCycle / 100) ? 25 : 95;
                    return `L ${20 + i},${y}`;
                  }).join(' ')}`
                : `M 20,60 ${[...Array(310)].map((_, i) => {
                    const x = 20 + i;
                    const y = 60 - Math.sin((i / 310) * 8 * Math.PI + time * 5) * 40;
                    return `L ${x},${y}`;
                  }).join(' ')}`
              }
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Controls */}
        <div className="space-y-3">
          <div>
            <label className="text-gray-300 text-sm">R1: {r1}kΩ</label>
            <input type="range" min="1" max="100" value={r1} onChange={(e) => setR1(Number(e.target.value))} className="w-full" />
          </div>
          {oscType === '555' && (
            <div>
              <label className="text-gray-300 text-sm">R2: {r2}kΩ</label>
              <input type="range" min="1" max="100" value={r2} onChange={(e) => setR2(Number(e.target.value))} className="w-full" />
            </div>
          )}
          <div>
            <label className="text-gray-300 text-sm">C: {c}{oscType === 'lc' ? 'pF' : 'nF'}</label>
            <input type="range" min="10" max="1000" step="10" value={c} onChange={(e) => setC(Number(e.target.value))} className="w-full" />
          </div>
        </div>
      </div>

      <div>
        {/* Results */}
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-white mb-3">📊 Oscillator Output</h3>
          <div className="bg-gradient-to-r from-green-900/50 to-cyan-900/50 p-4 rounded-xl text-center mb-4">
            <p className="text-gray-400 text-sm">Frequency</p>
            <p className="text-4xl font-bold text-green-400">
              {frequency > 1000 ? (frequency / 1000).toFixed(2) + ' kHz' : frequency.toFixed(1) + ' Hz'}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Period</p>
              <p className="text-xl font-bold text-blue-400">
                {period > 1 ? period.toFixed(2) + ' ms' : (period * 1000).toFixed(1) + ' µs'}
              </p>
            </div>
            {oscType === '555' && (
              <div className="bg-purple-900/50 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">Duty Cycle</p>
                <p className="text-xl font-bold text-purple-400">{dutyCycle.toFixed(1)}%</p>
              </div>
            )}
          </div>
        </div>

        {/* Formulas */}
        <div className="bg-gray-900 rounded-xl p-4">
          <h3 className="text-lg font-bold text-white mb-3">📐 Formula</h3>
          <div className="bg-gray-800 p-4 rounded-lg font-mono text-sm">
            {oscType === '555' && (
              <>
                <p className="text-cyan-400">f = 1.44 / ((R1 + 2R2) × C)</p>
                <p className="text-purple-400 mt-2">Duty = (R1 + R2) / (R1 + 2R2)</p>
              </>
            )}
            {oscType === 'rc' && (
              <p className="text-cyan-400">f = 1 / (2π × R × C × √6)</p>
            )}
            {oscType === 'lc' && (
              <p className="text-cyan-400">f = 1 / (2π × √(L × C))</p>
            )}
          </div>
          
          <div className="mt-4 text-sm text-gray-400">
            <p className="font-bold text-white mb-2">Applications:</p>
            <ul className="space-y-1">
              <li>• Clock generation</li>
              <li>• PWM signal generation</li>
              <li>• Tone/audio generation</li>
              <li>• Timing circuits</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
