import { useState, useEffect } from 'react';

interface Props {
  onBack: () => void;
}

export default function OhmsLawLab({ onBack }: Props) {
  const [mode, setMode] = useState<'V' | 'I' | 'R'>('V');
  const [voltage, setVoltage] = useState(12);
  const [current, setCurrent] = useState(0.024);
  const [resistance, setResistance] = useState(500);
  useEffect(() => {
    // Animation interval for electron flow
    const interval = setInterval(() => {}, 50);
    return () => clearInterval(interval);
  }, []);

  const calculateResult = () => {
    switch (mode) {
      case 'V': return { value: current * resistance, unit: 'V', label: 'Voltage' };
      case 'I': return { value: voltage / resistance * 1000, unit: 'mA', label: 'Current' };
      case 'R': return { value: voltage / current, unit: 'Ω', label: 'Resistance' };
    }
  };

  const result = calculateResult();
  const power = mode === 'V' ? result.value * current : mode === 'I' ? voltage * (result.value / 1000) : voltage * current;

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white p-4">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors">
        <span>←</span> Back to Labs
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            ⚡ Ohm's Law Lab
          </h1>
          <p className="text-gray-400 text-sm">Interactive V = I × R Calculator</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Circuit Visualization */}
          <div className="bg-gray-900/80 rounded-xl p-4 border border-yellow-500/30">
            <h3 className="font-bold text-yellow-400 mb-3 text-center">Live Circuit</h3>
            <svg viewBox="0 0 300 200" className="w-full">
              {/* Background */}
              <rect width="300" height="200" fill="#0d1117" />
              
              {/* Battery */}
              <rect x="20" y="70" width="30" height="60" fill="#1a1a2e" stroke="#f59e0b" strokeWidth="2" rx="3" />
              <text x="35" y="95" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">+</text>
              <text x="35" y="115" textAnchor="middle" fill="#666" fontSize="10">
                {mode === 'V' ? result.value.toFixed(1) : voltage}V
              </text>

              {/* Top wire */}
              <path d="M50 80 L80 80 L80 50 L220 50 L220 80" stroke="#22c55e" strokeWidth="3" fill="none" />
              
              {/* Resistor */}
              <rect x="195" y="80" width="50" height="25" fill="#1a1a2e" stroke="#3b82f6" strokeWidth="2" rx="3" />
              <path d="M200 92.5 L207 85 L214 100 L221 85 L228 100 L235 85 L240 92.5" stroke="#3b82f6" strokeWidth="2" fill="none" />
              <text x="220" y="120" textAnchor="middle" fill="#666" fontSize="10">
                {mode === 'R' ? result.value.toFixed(0) : resistance}Ω
              </text>

              {/* Bottom wire */}
              <path d="M220 105 L220 150 L80 150 L80 130 L50 130" stroke="#22c55e" strokeWidth="3" fill="none" />

              {/* Ammeter */}
              <circle cx="150" cy="150" r="18" fill="#1a1a2e" stroke="#ec4899" strokeWidth="2" />
              <text x="150" y="145" textAnchor="middle" fill="#ec4899" fontSize="8">A</text>
              <text x="150" y="157" textAnchor="middle" fill="#ec4899" fontSize="9" fontWeight="bold">
                {mode === 'I' ? result.value.toFixed(1) : (current * 1000).toFixed(1)}
              </text>

              {/* Electron flow animation */}
              {[0, 25, 50, 75].map((offset) => (
                <circle
                  key={offset}
                  r="4"
                  fill="#22c55e"
                  opacity="0.8"
                >
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    begin={`${offset * 0.02}s`}
                    path="M35 80 L80 80 L80 50 L220 50 L220 105 L220 150 L80 150 L80 130 L35 130"
                  />
                </circle>
              ))}

              {/* Labels */}
              <text x="150" y="40" textAnchor="middle" fill="#22c55e" fontSize="10">Current Flow →</text>
            </svg>
          </div>

          {/* Controls */}
          <div className="bg-gray-900/80 rounded-xl p-4 border border-gray-700">
            <h3 className="font-bold text-white mb-3">Calculate:</h3>
            <div className="flex gap-2 mb-4">
              {(['V', 'I', 'R'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                    mode === m
                      ? 'bg-yellow-500 text-black'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {m === 'V' ? 'Voltage' : m === 'I' ? 'Current' : 'Resistance'}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {mode !== 'V' && (
                <div>
                  <label className="text-sm text-gray-400 flex justify-between">
                    <span>Voltage (V)</span>
                    <span className="text-yellow-400 font-bold">{voltage}V</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="24"
                    value={voltage}
                    onChange={(e) => setVoltage(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                  />
                </div>
              )}

              {mode !== 'I' && (
                <div>
                  <label className="text-sm text-gray-400 flex justify-between">
                    <span>Current (mA)</span>
                    <span className="text-pink-400 font-bold">{(current * 1000).toFixed(1)}mA</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={current * 1000}
                    onChange={(e) => setCurrent(Number(e.target.value) / 1000)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
                </div>
              )}

              {mode !== 'R' && (
                <div>
                  <label className="text-sm text-gray-400 flex justify-between">
                    <span>Resistance (Ω)</span>
                    <span className="text-blue-400 font-bold">{resistance}Ω</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={resistance}
                    onChange={(e) => setResistance(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
              )}
            </div>

            {/* Result Display */}
            <div className="mt-4 bg-black/50 rounded-xl p-4 border border-yellow-500/30">
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">Formula: V = I × R</p>
                <p className="text-2xl font-bold text-white mb-2">
                  {result.label} = <span className="text-yellow-400">{result.value.toFixed(2)} {result.unit}</span>
                </p>
                <p className="text-sm text-gray-400">
                  Power: <span className="text-orange-400 font-bold">{(power * 1000).toFixed(2)} mW</span>
                </p>
              </div>
            </div>

            {/* Ohm's Law Triangle */}
            <div className="mt-4 flex justify-center">
              <svg viewBox="0 0 120 100" className="w-32">
                <polygon points="60,10 10,90 110,90" fill="none" stroke="#f59e0b" strokeWidth="2" />
                <text x="60" y="45" textAnchor="middle" fill={mode === 'V' ? '#f59e0b' : '#fff'} fontSize="16" fontWeight="bold">V</text>
                <line x1="30" y1="55" x2="90" y2="55" stroke="#f59e0b" strokeWidth="1" />
                <text x="35" y="78" textAnchor="middle" fill={mode === 'I' ? '#f59e0b' : '#fff'} fontSize="16" fontWeight="bold">I</text>
                <text x="85" y="78" textAnchor="middle" fill={mode === 'R' ? '#f59e0b' : '#fff'} fontSize="16" fontWeight="bold">R</text>
                <text x="60" y="78" textAnchor="middle" fill="#f59e0b" fontSize="12">×</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-4 grid md:grid-cols-3 gap-3">
          <div className="bg-gray-900/60 rounded-lg p-3 border border-gray-800">
            <h4 className="text-yellow-400 font-bold text-sm mb-2">📐 Ohm's Law</h4>
            <p className="text-gray-400 text-xs">V = I × R describes the relationship between voltage, current, and resistance in an electrical circuit.</p>
          </div>
          <div className="bg-gray-900/60 rounded-lg p-3 border border-gray-800">
            <h4 className="text-blue-400 font-bold text-sm mb-2">⚡ Power Formula</h4>
            <p className="text-gray-400 text-xs">P = V × I = I²R = V²/R. Power is the rate at which electrical energy is converted.</p>
          </div>
          <div className="bg-gray-900/60 rounded-lg p-3 border border-gray-800">
            <h4 className="text-green-400 font-bold text-sm mb-2">🔬 Applications</h4>
            <p className="text-gray-400 text-xs">Used in circuit design, troubleshooting, LED resistor calculations, and power supply design.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
