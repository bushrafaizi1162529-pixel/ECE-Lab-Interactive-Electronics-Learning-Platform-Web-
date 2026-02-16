import { useState, useEffect } from 'react';

interface Props {
  onBack: () => void;
}

export default function RCCircuitLab({ onBack }: Props) {
  const [resistance, setResistance] = useState(10000); // 10kΩ
  const [capacitance, setCapacitance] = useState(100); // 100µF
  const [isCharging, setIsCharging] = useState(false);
  const [chargeLevel, setChargeLevel] = useState(0);
  const [time, setTime] = useState(0);

  const timeConstant = (resistance * capacitance) / 1000000; // τ in seconds
  const supplyVoltage = 5;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isCharging) {
      interval = setInterval(() => {
        setTime(t => {
          const newTime = t + 0.05;
          const charge = 1 - Math.exp(-newTime / timeConstant);
          setChargeLevel(charge);
          if (charge >= 0.99) {
            setIsCharging(false);
          }
          return newTime;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isCharging, timeConstant]);

  const reset = () => {
    setIsCharging(false);
    setChargeLevel(0);
    setTime(0);
  };

  const currentVoltage = chargeLevel * supplyVoltage;
  const currentPercent = chargeLevel * 100;

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white p-4">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors">
        <span>←</span> Back to Labs
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            🔋 RC Circuit Lab
          </h1>
          <p className="text-gray-400 text-sm">Time constant calculator and charging simulation</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Circuit & Visualization */}
          <div className="bg-gray-900/80 rounded-xl p-4 border border-blue-500/30">
            <h3 className="font-bold text-blue-400 mb-3 text-center">RC Circuit</h3>
            <svg viewBox="0 0 300 180" className="w-full mb-4">
              <rect width="300" height="180" fill="#0d1117" />
              
              {/* Battery */}
              <rect x="20" y="50" width="25" height="80" fill="#1a1a2e" stroke="#f59e0b" strokeWidth="2" rx="3" />
              <text x="32" y="85" textAnchor="middle" fill="#f59e0b" fontSize="12">+</text>
              <text x="32" y="115" textAnchor="middle" fill="#666" fontSize="8">{supplyVoltage}V</text>

              {/* Top wire */}
              <path d="M45 65 L70 65 L70 35 L150 35" stroke="#22c55e" strokeWidth="2" fill="none" />

              {/* Resistor */}
              <rect x="150" y="25" width="40" height="20" fill="#1a1a2e" stroke="#3b82f6" strokeWidth="2" rx="3" />
              <path d="M155 35 L160 28 L167 42 L174 28 L181 42 L185 35" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
              <text x="170" y="55" textAnchor="middle" fill="#888" fontSize="8">{resistance >= 1000 ? (resistance/1000) + 'kΩ' : resistance + 'Ω'}</text>

              {/* Wire to capacitor */}
              <line x1="190" y1="35" x2="230" y2="35" stroke="#22c55e" strokeWidth="2" />
              <line x1="230" y1="35" x2="230" y2="60" stroke="#22c55e" strokeWidth="2" />

              {/* Capacitor */}
              <line x1="215" y1="60" x2="245" y2="60" stroke="#ec4899" strokeWidth="3" />
              <line x1="215" y1="70" x2="245" y2="70" stroke="#ec4899" strokeWidth="3" />
              <text x="260" y="68" fill="#888" fontSize="8">{capacitance}µF</text>
              
              {/* Charge indicator */}
              <rect x="217" y="62" width={`${26 * chargeLevel}`} height="6" fill="#22c55e" opacity="0.7">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="1s" repeatCount="indefinite" />
              </rect>

              {/* Bottom wire */}
              <line x1="230" y1="70" x2="230" y2="140" stroke="#22c55e" strokeWidth="2" />
              <path d="M230 140 L70 140 L70 130 L45 130" stroke="#22c55e" strokeWidth="2" fill="none" />

              {/* Switch */}
              <circle cx="100" cy="35" r="5" fill={isCharging ? '#22c55e' : '#666'} />
              <line x1="70" y1="35" x2={isCharging ? 100 : 90} y2={isCharging ? 35 : 25} stroke={isCharging ? '#22c55e' : '#666'} strokeWidth="2" />
              <circle cx="100" cy="35" r="5" fill={isCharging ? '#22c55e' : '#666'} />

              {/* Current indicator */}
              {isCharging && chargeLevel < 0.99 && (
                <circle r="3" fill="#22c55e">
                  <animateMotion dur={`${Math.max(0.5, timeConstant)}s`} repeatCount="indefinite" path="M45 65 L70 65 L70 35 L230 35 L230 140 L70 140 L70 130 L45 130" />
                </circle>
              )}

              {/* Voltage Display */}
              <text x="150" y="100" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">
                Vc = {currentVoltage.toFixed(2)}V
              </text>
              <text x="150" y="115" textAnchor="middle" fill="#888" fontSize="10">
                ({currentPercent.toFixed(1)}% charged)
              </text>
            </svg>

            {/* Controls */}
            <div className="flex gap-2">
              <button
                onClick={() => setIsCharging(true)}
                disabled={isCharging || chargeLevel >= 0.99}
                className={`flex-1 py-2 rounded font-bold ${isCharging ? 'bg-gray-700 text-gray-500' : 'bg-green-500 text-white hover:bg-green-600'}`}
              >
                {isCharging ? 'Charging...' : 'Start Charging'}
              </button>
              <button
                onClick={reset}
                className="flex-1 py-2 rounded font-bold bg-red-500/20 text-red-400 hover:bg-red-500/30"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Settings & Results */}
          <div className="bg-gray-900/80 rounded-xl p-4 border border-gray-700">
            <h3 className="font-bold text-white mb-3">Parameters</h3>
            
            {/* Resistance */}
            <div className="mb-4">
              <label className="text-sm text-gray-400 flex justify-between">
                <span>Resistance (R)</span>
                <span className="text-blue-400 font-bold">{resistance >= 1000 ? (resistance/1000) + 'kΩ' : resistance + 'Ω'}</span>
              </label>
              <input
                type="range"
                min="100"
                max="100000"
                step="100"
                value={resistance}
                onChange={(e) => { setResistance(Number(e.target.value)); reset(); }}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* Capacitance */}
            <div className="mb-4">
              <label className="text-sm text-gray-400 flex justify-between">
                <span>Capacitance (C)</span>
                <span className="text-pink-400 font-bold">{capacitance}µF</span>
              </label>
              <input
                type="range"
                min="1"
                max="1000"
                value={capacitance}
                onChange={(e) => { setCapacitance(Number(e.target.value)); reset(); }}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>

            {/* Time Constant Display */}
            <div className="bg-black/50 rounded-lg p-4 border border-cyan-500/30 mb-4">
              <div className="text-center">
                <p className="text-xs text-gray-400 mb-1">Time Constant (τ = R × C)</p>
                <p className="text-3xl font-bold text-cyan-400">{timeConstant.toFixed(3)}s</p>
                <p className="text-xs text-gray-500 mt-1">= {resistance} × {capacitance}µF</p>
              </div>
            </div>

            {/* Charging Timeline */}
            <div className="bg-gray-800/50 rounded-lg p-3">
              <h4 className="text-sm font-bold text-gray-400 mb-2">Charging Timeline</h4>
              <div className="space-y-1 text-xs">
                {[
                  { tau: 1, percent: 63.2 },
                  { tau: 2, percent: 86.5 },
                  { tau: 3, percent: 95.0 },
                  { tau: 4, percent: 98.2 },
                  { tau: 5, percent: 99.3 },
                ].map(({ tau, percent }) => (
                  <div key={tau} className="flex items-center gap-2">
                    <span className="text-cyan-400 w-8">{tau}τ</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="text-gray-400 w-16">{percent}%</span>
                    <span className="text-gray-500 w-16">{(timeConstant * tau).toFixed(2)}s</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Charging Curve Graph */}
        <div className="mt-4 bg-gray-900/80 rounded-xl p-4 border border-gray-700">
          <h3 className="font-bold text-white mb-3 text-center">Capacitor Charging Curve</h3>
          <svg viewBox="0 0 400 150" className="w-full">
            <rect width="400" height="150" fill="#0d1117" />
            
            {/* Grid */}
            {[...Array(6)].map((_, i) => (
              <g key={i}>
                <line x1={50 + i * 60} y1="20" x2={50 + i * 60} y2="120" stroke="#1a1a2e" strokeWidth="1" />
                <text x={50 + i * 60} y="135" textAnchor="middle" fill="#666" fontSize="8">{i}τ</text>
              </g>
            ))}
            {[0, 25, 50, 75, 100].map((p, i) => (
              <g key={p}>
                <line x1="50" y1={120 - i * 25} x2="350" y2={120 - i * 25} stroke="#1a1a2e" strokeWidth="1" />
                <text x="40" y={124 - i * 25} textAnchor="end" fill="#666" fontSize="8">{p}%</text>
              </g>
            ))}

            {/* Axes */}
            <line x1="50" y1="120" x2="350" y2="120" stroke="#444" strokeWidth="2" />
            <line x1="50" y1="20" x2="50" y2="120" stroke="#444" strokeWidth="2" />

            {/* Charging curve */}
            <path
              d={`M50,120 ${[...Array(301)].map((_, i) => {
                const t = i / 60; // 0 to 5τ
                const v = 1 - Math.exp(-t);
                return `L${50 + i},${120 - v * 100}`;
              }).join(' ')}`}
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
            />

            {/* Current position */}
            <circle 
              cx={50 + (time / timeConstant) * 60}
              cy={120 - chargeLevel * 100}
              r="6"
              fill="#22c55e"
              stroke="#fff"
              strokeWidth="2"
            />

            {/* Formula */}
            <text x="200" y="15" textAnchor="middle" fill="#22c55e" fontSize="10">
              V(t) = V₀(1 - e^(-t/RC))
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
