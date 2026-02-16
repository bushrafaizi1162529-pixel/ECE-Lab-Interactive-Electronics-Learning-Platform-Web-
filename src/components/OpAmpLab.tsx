import { useState } from 'react';

interface Props {
  onBack: () => void;
}

type Config = 'inverting' | 'noninverting' | 'buffer' | 'summing' | 'differential';

export default function OpAmpLab({ onBack }: Props) {
  const [config, setConfig] = useState<Config>('inverting');
  const [vin1, setVin1] = useState(1);
  const [vin2, setVin2] = useState(0.5);
  const [r1, setR1] = useState(10);
  const [r2, setR2] = useState(20);
  const [supplyRail] = useState(15);

  const calculateOutput = () => {
    let gain = 0;
    let vout = 0;
    
    switch (config) {
      case 'inverting':
        gain = -r2 / r1;
        vout = vin1 * gain;
        break;
      case 'noninverting':
        gain = 1 + r2 / r1;
        vout = vin1 * gain;
        break;
      case 'buffer':
        gain = 1;
        vout = vin1;
        break;
      case 'summing':
        gain = -r2 / r1;
        vout = gain * (vin1 + vin2);
        break;
      case 'differential':
        gain = r2 / r1;
        vout = gain * (vin2 - vin1);
        break;
    }

    // Clipping
    const clipped = vout > supplyRail ? supplyRail : vout < -supplyRail ? -supplyRail : vout;
    return { gain, vout: clipped, isClipped: Math.abs(vout) > supplyRail };
  };

  const result = calculateOutput();

  const configs: { id: Config; name: string; icon: string }[] = [
    { id: 'inverting', name: 'Inverting', icon: '−' },
    { id: 'noninverting', name: 'Non-Inv', icon: '+' },
    { id: 'buffer', name: 'Buffer', icon: '1' },
    { id: 'summing', name: 'Summing', icon: 'Σ' },
    { id: 'differential', name: 'Diff', icon: 'Δ' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white p-4">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors">
        <span>←</span> Back to Labs
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            📈 Op-Amp Configurations
          </h1>
          <p className="text-gray-400 text-sm">Explore inverting, non-inverting, and more</p>
        </div>

        {/* Config Selector */}
        <div className="flex gap-2 mb-4 flex-wrap justify-center">
          {configs.map(c => (
            <button
              key={c.id}
              onClick={() => setConfig(c.id)}
              className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${
                config === c.id
                  ? 'bg-green-500 text-black'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <span className="w-6 h-6 rounded bg-black/30 flex items-center justify-center text-sm">{c.icon}</span>
              {c.name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Circuit Diagram */}
          <div className="bg-gray-900/80 rounded-xl p-4 border border-green-500/30">
            <h3 className="font-bold text-green-400 mb-3 text-center">Circuit Diagram</h3>
            <svg viewBox="0 0 300 200" className="w-full">
              <rect width="300" height="200" fill="#0d1117" />
              
              {/* Op-Amp Triangle */}
              <polygon points="120,60 120,140 200,100" fill="#1a1a2e" stroke="#22c55e" strokeWidth="2" />
              <text x="135" y="85" fill="#666" fontSize="10">−</text>
              <text x="135" y="120" fill="#666" fontSize="10">+</text>
              
              {/* Supply rails */}
              <line x1="160" y1="55" x2="160" y2="40" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="160" y="35" textAnchor="middle" fill="#f59e0b" fontSize="8">+{supplyRail}V</text>
              <line x1="160" y1="145" x2="160" y2="160" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="160" y="170" textAnchor="middle" fill="#3b82f6" fontSize="8">−{supplyRail}V</text>

              {/* Input connections based on config */}
              {config === 'inverting' && (
                <>
                  {/* Vin to R1 */}
                  <line x1="20" y1="75" x2="50" y2="75" stroke="#ec4899" strokeWidth="2" />
                  <text x="20" y="70" fill="#ec4899" fontSize="10">Vin</text>
                  {/* R1 */}
                  <rect x="50" y="68" width="30" height="14" fill="#1a1a2e" stroke="#3b82f6" strokeWidth="1.5" rx="2" />
                  <text x="65" y="78" textAnchor="middle" fill="#fff" fontSize="8">R1</text>
                  {/* Junction */}
                  <line x1="80" y1="75" x2="120" y2="75" stroke="#ec4899" strokeWidth="2" />
                  <circle cx="95" cy="75" r="3" fill="#ec4899" />
                  {/* R2 feedback */}
                  <line x1="95" y1="75" x2="95" y2="45" stroke="#22c55e" strokeWidth="2" />
                  <line x1="95" y1="45" x2="220" y2="45" stroke="#22c55e" strokeWidth="2" />
                  <rect x="140" y="38" width="30" height="14" fill="#1a1a2e" stroke="#3b82f6" strokeWidth="1.5" rx="2" />
                  <text x="155" y="48" textAnchor="middle" fill="#fff" fontSize="8">R2</text>
                  <line x1="220" y1="45" x2="220" y2="100" stroke="#22c55e" strokeWidth="2" />
                  {/* Ground to + input */}
                  <line x1="120" y1="115" x2="100" y2="115" stroke="#666" strokeWidth="2" />
                  <line x1="100" y1="115" x2="100" y2="130" stroke="#666" strokeWidth="2" />
                  <path d="M95 130 L105 130 M97 134 L103 134 M99 138 L101 138" stroke="#666" strokeWidth="1.5" />
                </>
              )}

              {config === 'noninverting' && (
                <>
                  {/* Vin to + input */}
                  <line x1="20" y1="115" x2="120" y2="115" stroke="#ec4899" strokeWidth="2" />
                  <text x="20" y="110" fill="#ec4899" fontSize="10">Vin</text>
                  {/* R1 to ground */}
                  <line x1="120" y1="75" x2="80" y2="75" stroke="#22c55e" strokeWidth="2" />
                  <circle cx="80" cy="75" r="3" fill="#22c55e" />
                  <line x1="80" y1="75" x2="80" y2="95" stroke="#666" strokeWidth="2" />
                  <rect x="72" y="95" width="16" height="25" fill="#1a1a2e" stroke="#3b82f6" strokeWidth="1.5" rx="2" />
                  <text x="80" y="110" textAnchor="middle" fill="#fff" fontSize="7">R1</text>
                  <line x1="80" y1="120" x2="80" y2="135" stroke="#666" strokeWidth="2" />
                  <path d="M75 135 L85 135 M77 139 L83 139 M79 143 L81 143" stroke="#666" strokeWidth="1.5" />
                  {/* R2 feedback */}
                  <line x1="80" y1="75" x2="80" y2="45" stroke="#22c55e" strokeWidth="2" />
                  <line x1="80" y1="45" x2="220" y2="45" stroke="#22c55e" strokeWidth="2" />
                  <rect x="140" y="38" width="30" height="14" fill="#1a1a2e" stroke="#3b82f6" strokeWidth="1.5" rx="2" />
                  <text x="155" y="48" textAnchor="middle" fill="#fff" fontSize="8">R2</text>
                  <line x1="220" y1="45" x2="220" y2="100" stroke="#22c55e" strokeWidth="2" />
                </>
              )}

              {config === 'buffer' && (
                <>
                  {/* Vin to + input */}
                  <line x1="20" y1="115" x2="120" y2="115" stroke="#ec4899" strokeWidth="2" />
                  <text x="20" y="110" fill="#ec4899" fontSize="10">Vin</text>
                  {/* Direct feedback */}
                  <line x1="120" y1="75" x2="100" y2="75" stroke="#22c55e" strokeWidth="2" />
                  <line x1="100" y1="75" x2="100" y2="45" stroke="#22c55e" strokeWidth="2" />
                  <line x1="100" y1="45" x2="220" y2="45" stroke="#22c55e" strokeWidth="2" />
                  <line x1="220" y1="45" x2="220" y2="100" stroke="#22c55e" strokeWidth="2" />
                </>
              )}

              {(config === 'summing' || config === 'differential') && (
                <>
                  {/* Vin1 */}
                  <line x1="20" y1="60" x2="50" y2="60" stroke="#ec4899" strokeWidth="2" />
                  <text x="20" y="55" fill="#ec4899" fontSize="8">V1</text>
                  <rect x="50" y="53" width="20" height="14" fill="#1a1a2e" stroke="#3b82f6" strokeWidth="1.5" rx="2" />
                  <line x1="70" y1="60" x2="90" y2="60" stroke="#ec4899" strokeWidth="2" />
                  <line x1="90" y1="60" x2="90" y2="75" stroke="#ec4899" strokeWidth="2" />
                  {/* Vin2 */}
                  <line x1="20" y1="90" x2="50" y2="90" stroke="#a855f7" strokeWidth="2" />
                  <text x="20" y="85" fill="#a855f7" fontSize="8">V2</text>
                  <rect x="50" y="83" width="20" height="14" fill="#1a1a2e" stroke="#3b82f6" strokeWidth="1.5" rx="2" />
                  <line x1="70" y1="90" x2="90" y2="90" stroke="#a855f7" strokeWidth="2" />
                  <line x1="90" y1="90" x2="90" y2="75" stroke="#a855f7" strokeWidth="2" />
                  {/* Junction to - input */}
                  <circle cx="90" cy="75" r="3" fill="#fff" />
                  <line x1="90" y1="75" x2="120" y2="75" stroke="#fff" strokeWidth="2" />
                  {/* Feedback */}
                  <line x1="90" y1="75" x2="90" y2="45" stroke="#22c55e" strokeWidth="2" />
                  <line x1="90" y1="45" x2="220" y2="45" stroke="#22c55e" strokeWidth="2" />
                  <rect x="140" y="38" width="30" height="14" fill="#1a1a2e" stroke="#3b82f6" strokeWidth="1.5" rx="2" />
                  <text x="155" y="48" textAnchor="middle" fill="#fff" fontSize="8">Rf</text>
                  <line x1="220" y1="45" x2="220" y2="100" stroke="#22c55e" strokeWidth="2" />
                  {/* Ground or V2 to + */}
                  {config === 'summing' && (
                    <>
                      <line x1="120" y1="115" x2="100" y2="115" stroke="#666" strokeWidth="2" />
                      <line x1="100" y1="115" x2="100" y2="130" stroke="#666" strokeWidth="2" />
                      <path d="M95 130 L105 130 M97 134 L103 134" stroke="#666" strokeWidth="1.5" />
                    </>
                  )}
                  {config === 'differential' && (
                    <line x1="120" y1="115" x2="70" y2="115" stroke="#a855f7" strokeWidth="2" />
                  )}
                </>
              )}

              {/* Output */}
              <line x1="200" y1="100" x2="280" y2="100" stroke="#22c55e" strokeWidth="2" />
              <text x="280" y="95" fill="#22c55e" fontSize="10">Vout</text>
              <circle cx="220" cy="100" r="3" fill="#22c55e" />
            </svg>

            {/* Formula */}
            <div className="text-center mt-3 bg-black/50 rounded p-2">
              <p className="text-green-400 font-mono text-sm">
                {config === 'inverting' && 'Vout = -(R2/R1) × Vin'}
                {config === 'noninverting' && 'Vout = (1 + R2/R1) × Vin'}
                {config === 'buffer' && 'Vout = Vin (Unity Gain)'}
                {config === 'summing' && 'Vout = -(Rf/R) × (V1 + V2)'}
                {config === 'differential' && 'Vout = (R2/R1) × (V2 - V1)'}
              </p>
            </div>
          </div>

          {/* Controls & Results */}
          <div className="bg-gray-900/80 rounded-xl p-4 border border-gray-700">
            <h3 className="font-bold text-white mb-3">Parameters</h3>
            
            {/* Input Voltage 1 */}
            <div className="mb-4">
              <label className="text-sm text-gray-400 flex justify-between">
                <span>Input Voltage (V1)</span>
                <span className="text-pink-400 font-bold">{vin1.toFixed(2)}V</span>
              </label>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.1"
                value={vin1}
                onChange={(e) => setVin1(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>

            {/* Input Voltage 2 */}
            {(config === 'summing' || config === 'differential') && (
              <div className="mb-4">
                <label className="text-sm text-gray-400 flex justify-between">
                  <span>Input Voltage (V2)</span>
                  <span className="text-purple-400 font-bold">{vin2.toFixed(2)}V</span>
                </label>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.1"
                  value={vin2}
                  onChange={(e) => setVin2(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>
            )}

            {/* Resistors */}
            {config !== 'buffer' && (
              <>
                <div className="mb-4">
                  <label className="text-sm text-gray-400 flex justify-between">
                    <span>R1</span>
                    <span className="text-blue-400 font-bold">{r1}kΩ</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={r1}
                    onChange={(e) => setR1(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="text-sm text-gray-400 flex justify-between">
                    <span>R2 (Feedback)</span>
                    <span className="text-cyan-400 font-bold">{r2}kΩ</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={r2}
                    onChange={(e) => setR2(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>
              </>
            )}

            {/* Results */}
            <div className={`bg-black/50 rounded-lg p-4 border ${result.isClipped ? 'border-red-500/50' : 'border-green-500/30'}`}>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-xs text-gray-400">Gain</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    {result.gain > 0 ? '+' : ''}{result.gain.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Output</p>
                  <p className={`text-2xl font-bold ${result.isClipped ? 'text-red-400' : 'text-green-400'}`}>
                    {result.vout.toFixed(2)}V
                  </p>
                </div>
              </div>
              {result.isClipped && (
                <p className="text-center text-red-400 text-xs mt-2">⚠️ Output clipped at ±{supplyRail}V rail!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
