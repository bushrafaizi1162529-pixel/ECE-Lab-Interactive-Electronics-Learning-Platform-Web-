import { useState } from 'react';

interface Props {
  onBack: () => void;
}

const LED_COLORS = [
  { name: 'Red', vf: 2.0, hex: '#ff0000' },
  { name: 'Orange', vf: 2.1, hex: '#ff6600' },
  { name: 'Yellow', vf: 2.1, hex: '#ffff00' },
  { name: 'Green', vf: 2.2, hex: '#00ff00' },
  { name: 'Blue', vf: 3.2, hex: '#0066ff' },
  { name: 'White', vf: 3.3, hex: '#ffffff' },
];

export default function LEDCircuitLab({ onBack }: Props) {
  const [supplyVoltage, setSupplyVoltage] = useState(12);
  const [ledColor, setLedColor] = useState(0);
  const [current, setCurrent] = useState(20);
  const [numLeds, setNumLeds] = useState(1);
  const [config, setConfig] = useState<'series' | 'parallel'>('series');

  const led = LED_COLORS[ledColor];
  const totalVf = config === 'series' ? led.vf * numLeds : led.vf;
  const resistorValue = (supplyVoltage - totalVf) / (current / 1000);
  const power = Math.pow(current / 1000, 2) * resistorValue * 1000;
  const isValid = resistorValue > 0 && supplyVoltage > totalVf;

  const standardResistors = [10, 22, 33, 47, 68, 100, 150, 220, 330, 470, 680, 1000, 1500, 2200, 3300, 4700, 6800, 10000];
  const nearestStandard = standardResistors.reduce((prev, curr) => 
    Math.abs(curr - resistorValue) < Math.abs(prev - resistorValue) ? curr : prev
  );

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white p-4">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors">
        <span>←</span> Back to Labs
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black bg-gradient-to-r from-red-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
            💡 LED Circuit Designer
          </h1>
          <p className="text-gray-400 text-sm">Calculate LED resistor values and build circuits</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Circuit Visualization */}
          <div className="bg-gray-900/80 rounded-xl p-4 border border-green-500/30">
            <h3 className="font-bold text-green-400 mb-3 text-center">Circuit Diagram</h3>
            <svg viewBox="0 0 280 200" className="w-full">
              <rect width="280" height="200" fill="#0d1117" />
              
              {/* Battery */}
              <rect x="10" y="60" width="25" height="80" fill="#1a1a2e" stroke="#f59e0b" strokeWidth="2" rx="3" />
              <text x="22" y="95" textAnchor="middle" fill="#f59e0b" fontSize="14">+</text>
              <text x="22" y="130" textAnchor="middle" fill="#666" fontSize="8">{supplyVoltage}V</text>

              {/* Top wire */}
              <path d="M35 75 L60 75 L60 40 L220 40" stroke={isValid ? '#22c55e' : '#666'} strokeWidth="2" fill="none" />

              {/* Resistor */}
              <rect x="220" y="30" width="20" height="45" fill="#1a1a2e" stroke="#3b82f6" strokeWidth="2" rx="2" />
              <text x="230" y="55" textAnchor="middle" fill="#fff" fontSize="8">R</text>
              <text x="260" y="55" textAnchor="start" fill="#3b82f6" fontSize="9">{nearestStandard}Ω</text>

              {/* Wire to LED */}
              <line x1="230" y1="75" x2="230" y2="100" stroke={isValid ? '#22c55e' : '#666'} strokeWidth="2" />

              {/* LEDs */}
              {config === 'series' ? (
                [...Array(Math.min(numLeds, 4))].map((_, i) => (
                  <g key={i} transform={`translate(0, ${i * 25})`}>
                    <polygon points="220,105 240,105 230,125" fill={isValid ? led.hex : '#333'} stroke={led.hex} strokeWidth="1.5" />
                    <line x1="220" y1="125" x2="240" y2="125" stroke={led.hex} strokeWidth="2" />
                    {isValid && (
                      <circle cx="230" cy="115" r="10" fill={led.hex} opacity="0.4">
                        <animate attributeName="opacity" values="0.4;0.7;0.4" dur="1s" repeatCount="indefinite" />
                      </circle>
                    )}
                    {i < numLeds - 1 && i < 3 && (
                      <line x1="230" y1="127" x2="230" y2="130" stroke={isValid ? '#22c55e' : '#666'} strokeWidth="2" />
                    )}
                  </g>
                ))
              ) : (
                <g>
                  <polygon points="220,105 240,105 230,125" fill={isValid ? led.hex : '#333'} stroke={led.hex} strokeWidth="1.5" />
                  <line x1="220" y1="125" x2="240" y2="125" stroke={led.hex} strokeWidth="2" />
                  {isValid && (
                    <circle cx="230" cy="115" r="10" fill={led.hex} opacity="0.4">
                      <animate attributeName="opacity" values="0.4;0.7;0.4" dur="1s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <text x="250" y="120" fill="#888" fontSize="8">×{numLeds}</text>
                </g>
              )}

              {/* Bottom wire */}
              <path d={`M230 ${config === 'series' ? 100 + Math.min(numLeds, 4) * 25 : 130} L230 170 L60 170 L60 140 L35 140`} stroke={isValid ? '#22c55e' : '#666'} strokeWidth="2" fill="none" />

              {/* Current flow */}
              {isValid && (
                <circle r="3" fill="#22c55e">
                  <animateMotion dur="2s" repeatCount="indefinite" path="M35 75 L60 75 L60 40 L230 40 L230 170 L60 170 L60 140 L35 140" />
                </circle>
              )}

              {/* Labels */}
              <text x="140" y="30" textAnchor="middle" fill="#888" fontSize="9">I = {current}mA</text>
            </svg>
          </div>

          {/* Controls */}
          <div className="bg-gray-900/80 rounded-xl p-4 border border-gray-700">
            <h3 className="font-bold text-white mb-3">Settings</h3>
            
            {/* LED Color */}
            <div className="mb-4">
              <label className="text-sm text-gray-400 mb-2 block">LED Color (Vf = {led.vf}V)</label>
              <div className="flex gap-2">
                {LED_COLORS.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setLedColor(i)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      ledColor === i ? 'border-white scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c.hex, boxShadow: ledColor === i ? `0 0 10px ${c.hex}` : 'none' }}
                    title={`${c.name} (${c.vf}V)`}
                  />
                ))}
              </div>
            </div>

            {/* Supply Voltage */}
            <div className="mb-4">
              <label className="text-sm text-gray-400 flex justify-between">
                <span>Supply Voltage</span>
                <span className="text-yellow-400 font-bold">{supplyVoltage}V</span>
              </label>
              <input
                type="range"
                min="3"
                max="24"
                value={supplyVoltage}
                onChange={(e) => setSupplyVoltage(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
              />
              <div className="flex gap-1 mt-1">
                {[3.3, 5, 9, 12, 24].map(v => (
                  <button
                    key={v}
                    onClick={() => setSupplyVoltage(v)}
                    className={`flex-1 py-1 rounded text-xs font-bold ${supplyVoltage === v ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-gray-400'}`}
                  >
                    {v}V
                  </button>
                ))}
              </div>
            </div>

            {/* Current */}
            <div className="mb-4">
              <label className="text-sm text-gray-400 flex justify-between">
                <span>LED Current</span>
                <span className="text-pink-400 font-bold">{current}mA</span>
              </label>
              <input
                type="range"
                min="5"
                max="30"
                value={current}
                onChange={(e) => setCurrent(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>

            {/* Number of LEDs */}
            <div className="mb-4">
              <label className="text-sm text-gray-400 flex justify-between">
                <span>Number of LEDs</span>
                <span className="text-green-400 font-bold">{numLeds}</span>
              </label>
              <input
                type="range"
                min="1"
                max="6"
                value={numLeds}
                onChange={(e) => setNumLeds(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
            </div>

            {/* Configuration */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setConfig('series')}
                className={`flex-1 py-2 rounded font-bold text-sm ${config === 'series' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400'}`}
              >
                Series
              </button>
              <button
                onClick={() => setConfig('parallel')}
                className={`flex-1 py-2 rounded font-bold text-sm ${config === 'parallel' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400'}`}
              >
                Parallel
              </button>
            </div>

            {/* Results */}
            <div className={`bg-black/50 rounded-lg p-4 border ${isValid ? 'border-green-500/30' : 'border-red-500/30'}`}>
              {isValid ? (
                <>
                  <div className="text-center mb-2">
                    <p className="text-xs text-gray-400">R = (Vs - Vf) / I</p>
                    <p className="text-xs text-gray-500">R = ({supplyVoltage} - {totalVf.toFixed(1)}) / {current/1000}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div>
                      <p className="text-xs text-gray-400">Calculated</p>
                      <p className="text-xl font-bold text-blue-400">{resistorValue.toFixed(0)}Ω</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Standard</p>
                      <p className="text-xl font-bold text-green-400">{nearestStandard}Ω</p>
                    </div>
                  </div>
                  <p className="text-center text-xs text-gray-500 mt-2">
                    Power: <span className="text-orange-400">{power.toFixed(1)}mW</span>
                  </p>
                </>
              ) : (
                <p className="text-center text-red-400 text-sm">
                  ⚠️ Supply voltage too low for {numLeds} LED(s) in series!<br/>
                  <span className="text-xs text-gray-500">Need at least {(totalVf + 0.5).toFixed(1)}V</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
