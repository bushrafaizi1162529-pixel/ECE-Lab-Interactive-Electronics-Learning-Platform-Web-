import { useState, useEffect } from 'react';

export function CapacitorLab() {
  const [resistance, setResistance] = useState(10000);
  const [capacitance, setCapacitance] = useState(100);
  const [voltage, setVoltage] = useState(5);
  const [timeConstant, setTimeConstant] = useState(0);
  const [chargeTime, setChargeTime] = useState(0);
  const [animationTime, setAnimationTime] = useState(0);
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    const c = capacitance * 1e-6; // Convert µF to F
    const tau = resistance * c;
    setTimeConstant(tau);
    setChargeTime(tau * 5); // 5τ for ~99% charge
  }, [resistance, capacitance]);

  useEffect(() => {
    if (!isCharging) return;
    
    const interval = setInterval(() => {
      setAnimationTime(prev => {
        if (prev >= timeConstant * 5) {
          setIsCharging(false);
          return prev;
        }
        return prev + timeConstant * 0.05;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isCharging, timeConstant]);

  const getVoltageAtTime = (t: number) => {
    return voltage * (1 - Math.exp(-t / timeConstant));
  };

  const getCurrentAtTime = (t: number) => {
    return (voltage / resistance) * Math.exp(-t / timeConstant);
  };

  const formatTime = (t: number) => {
    if (t >= 1) return `${t.toFixed(2)} s`;
    if (t >= 0.001) return `${(t * 1000).toFixed(2)} ms`;
    return `${(t * 1000000).toFixed(2)} µs`;
  };

  const formatCapacitance = (c: number) => {
    if (c >= 1000) return `${(c / 1000).toFixed(1)} mF`;
    if (c >= 1) return `${c.toFixed(1)} µF`;
    return `${(c * 1000).toFixed(1)} nF`;
  };

  const formatResistance = (r: number) => {
    if (r >= 1000000) return `${(r / 1000000).toFixed(1)} MΩ`;
    if (r >= 1000) return `${(r / 1000).toFixed(1)} kΩ`;
    return `${r} Ω`;
  };

  const startCharging = () => {
    setAnimationTime(0);
    setIsCharging(true);
  };

  const resetCircuit = () => {
    setIsCharging(false);
    setAnimationTime(0);
  };

  // Generate curve points
  const curvePoints = [];
  for (let i = 0; i <= 100; i++) {
    const t = (i / 100) * timeConstant * 5;
    const v = getVoltageAtTime(t);
    curvePoints.push({ t, v });
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <span className="text-4xl">🔋</span> RC Circuit Lab
        </h2>
        <p className="text-slate-400">Explore capacitor charging/discharging and time constants</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          {/* Resistance */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
            <label className="text-white font-medium mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400">R</span>
              Resistance
            </label>
            <input
              type="range"
              min="100"
              max="1000000"
              step="100"
              value={resistance}
              onChange={(e) => setResistance(parseInt(e.target.value))}
              className="w-full accent-green-500"
            />
            <div className="flex justify-between mt-2">
              <span className="text-slate-400 text-sm">100Ω</span>
              <span className="text-green-400 font-mono text-lg">{formatResistance(resistance)}</span>
              <span className="text-slate-400 text-sm">1MΩ</span>
            </div>
          </div>

          {/* Capacitance */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
            <label className="text-white font-medium mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">C</span>
              Capacitance
            </label>
            <input
              type="range"
              min="0.1"
              max="1000"
              step="0.1"
              value={capacitance}
              onChange={(e) => setCapacitance(parseFloat(e.target.value))}
              className="w-full accent-blue-500"
            />
            <div className="flex justify-between mt-2">
              <span className="text-slate-400 text-sm">0.1µF</span>
              <span className="text-blue-400 font-mono text-lg">{formatCapacitance(capacitance)}</span>
              <span className="text-slate-400 text-sm">1000µF</span>
            </div>
          </div>

          {/* Voltage */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
            <label className="text-white font-medium mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center text-yellow-400">V</span>
              Supply Voltage
            </label>
            <div className="flex gap-2">
              {[3.3, 5, 9, 12, 24].map((v) => (
                <button
                  key={v}
                  onClick={() => setVoltage(v)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    voltage === v
                      ? 'bg-yellow-500 text-black'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {v}V
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/30 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Calculated Values</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/50 rounded-lg p-3">
                <div className="text-sm text-slate-400">Time Constant (τ)</div>
                <div className="text-2xl font-bold text-cyan-400 font-mono">{formatTime(timeConstant)}</div>
                <div className="text-xs text-slate-500">τ = R × C</div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3">
                <div className="text-sm text-slate-400">Full Charge (5τ)</div>
                <div className="text-2xl font-bold text-green-400 font-mono">{formatTime(chargeTime)}</div>
                <div className="text-xs text-slate-500">~99.3% charged</div>
              </div>
            </div>
            
            <div className="mt-4 flex gap-2">
              <button
                onClick={startCharging}
                disabled={isCharging}
                className="flex-1 py-2 bg-green-500 hover:bg-green-400 disabled:bg-slate-600 rounded-lg text-black font-medium transition-all"
              >
                ▶ Start Charging
              </button>
              <button
                onClick={resetCircuit}
                className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-medium transition-all"
              >
                ↺ Reset
              </button>
            </div>
          </div>

          {/* Live Values */}
          {(isCharging || animationTime > 0) && (
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
              <h4 className="text-white font-medium mb-3">Live Values</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Capacitor Voltage</span>
                    <span className="text-yellow-400 font-mono">{getVoltageAtTime(animationTime).toFixed(3)} V</span>
                  </div>
                  <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-500 to-green-500 transition-all"
                      style={{ width: `${(getVoltageAtTime(animationTime) / voltage) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Current</span>
                    <span className="text-cyan-400 font-mono">{(getCurrentAtTime(animationTime) * 1000).toFixed(3)} mA</span>
                  </div>
                  <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
                      style={{ width: `${(getCurrentAtTime(animationTime) / (voltage / resistance)) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm text-slate-400">
                  Time: <span className="text-white font-mono">{formatTime(animationTime)}</span> 
                  <span className="text-slate-500"> ({(animationTime / timeConstant).toFixed(2)}τ)</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Visualization */}
        <div className="space-y-4">
          {/* Circuit Diagram */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">RC Circuit</h3>
            <svg viewBox="0 0 400 200" className="w-full">
              {/* Battery */}
              <g transform="translate(40, 50)">
                <line x1="0" y1="0" x2="0" y2="100" stroke="#facc15" strokeWidth="3" />
                <line x1="-12" y1="25" x2="12" y2="25" stroke="#facc15" strokeWidth="4" />
                <line x1="-6" y1="40" x2="6" y2="40" stroke="#facc15" strokeWidth="4" />
                <text x="0" y="-10" textAnchor="middle" fill="#facc15" fontSize="14">{voltage}V</text>
              </g>
              
              {/* Top wire */}
              <line x1="40" y1="50" x2="120" y2="50" stroke="#0ea5e9" strokeWidth="2" />
              
              {/* Resistor */}
              <g transform="translate(120, 50)">
                <path d="M 0,0 L 5,0 L 8,10 L 14,-10 L 20,10 L 26,-10 L 32,10 L 38,-10 L 42,0 L 50,0" 
                  fill="none" stroke="#22c55e" strokeWidth="2" />
                <text x="25" y="25" textAnchor="middle" fill="#22c55e" fontSize="10">{formatResistance(resistance)}</text>
              </g>
              
              <line x1="170" y1="50" x2="280" y2="50" stroke="#0ea5e9" strokeWidth="2" />
              
              {/* Capacitor */}
              <g transform="translate(280, 30)">
                <line x1="0" y1="20" x2="0" y2="40" stroke="#3b82f6" strokeWidth="3" />
                <line x1="-15" y1="40" x2="15" y2="40" stroke="#3b82f6" strokeWidth="4" />
                <line x1="-15" y1="55" x2="15" y2="55" stroke="#3b82f6" strokeWidth="4" />
                <line x1="0" y1="55" x2="0" y2="75" stroke="#3b82f6" strokeWidth="3" />
                <text x="25" y="55" fill="#3b82f6" fontSize="10">{formatCapacitance(capacitance)}</text>
                
                {/* Charge indicator */}
                {animationTime > 0 && (
                  <rect 
                    x="-12" y="42" 
                    width="24" 
                    height={Math.min(11, (getVoltageAtTime(animationTime) / voltage) * 11)} 
                    fill="#fbbf24" 
                    opacity="0.6"
                  />
                )}
              </g>
              
              {/* Bottom wire */}
              <line x1="40" y1="150" x2="280" y2="150" stroke="#0ea5e9" strokeWidth="2" />
              <line x1="280" y1="105" x2="280" y2="150" stroke="#0ea5e9" strokeWidth="2" />
              
              {/* Current flow animation */}
              {isCharging && (
                <>
                  {[0, 1, 2].map((i) => (
                    <circle key={i} r="4" fill="#60a5fa" className="animate-pulse">
                      <animateMotion
                        dur="1s"
                        repeatCount="indefinite"
                        begin={`${i * 0.33}s`}
                        path="M 40,50 L 170,50 L 280,50 L 280,80"
                      />
                    </circle>
                  ))}
                </>
              )}
              
              {/* Voltage indicator */}
              <text x="350" y="90" fill="#fbbf24" fontSize="14" fontWeight="bold">
                Vc = {getVoltageAtTime(animationTime).toFixed(2)}V
              </text>
            </svg>
          </div>

          {/* Charging Curve */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Voltage Charging Curve</h3>
            <svg viewBox="0 0 400 200" className="w-full">
              {/* Grid */}
              <defs>
                <pattern id="rcGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect x="50" y="20" width="320" height="150" fill="url(#rcGrid)" />
              
              {/* Axes */}
              <line x1="50" y1="170" x2="370" y2="170" stroke="#64748b" strokeWidth="2" />
              <line x1="50" y1="20" x2="50" y2="170" stroke="#64748b" strokeWidth="2" />
              
              {/* Y-axis labels */}
              <text x="40" y="25" textAnchor="end" fill="#64748b" fontSize="10">{voltage}V</text>
              <text x="40" y="95" textAnchor="end" fill="#64748b" fontSize="10">{(voltage * 0.632).toFixed(1)}V</text>
              <text x="40" y="170" textAnchor="end" fill="#64748b" fontSize="10">0V</text>
              
              {/* X-axis labels */}
              <text x="50" y="185" textAnchor="middle" fill="#64748b" fontSize="10">0</text>
              <text x="114" y="185" textAnchor="middle" fill="#64748b" fontSize="10">τ</text>
              <text x="178" y="185" textAnchor="middle" fill="#64748b" fontSize="10">2τ</text>
              <text x="242" y="185" textAnchor="middle" fill="#64748b" fontSize="10">3τ</text>
              <text x="306" y="185" textAnchor="middle" fill="#64748b" fontSize="10">4τ</text>
              <text x="370" y="185" textAnchor="middle" fill="#64748b" fontSize="10">5τ</text>
              
              {/* 63.2% line */}
              <line x1="50" y1="95" x2="370" y2="95" stroke="#fbbf24" strokeWidth="1" strokeDasharray="5,5" />
              <line x1="114" y1="95" x2="114" y2="170" stroke="#fbbf24" strokeWidth="1" strokeDasharray="5,5" />
              
              {/* Charging curve */}
              <path
                d={`M 50,170 ${curvePoints.map((p, i) => 
                  `L ${50 + (i / 100) * 320},${170 - (p.v / voltage) * 150}`
                ).join(' ')}`}
                fill="none"
                stroke="#22c55e"
                strokeWidth="3"
              />
              
              {/* Current position indicator */}
              {animationTime > 0 && (
                <circle
                  cx={50 + (animationTime / (timeConstant * 5)) * 320}
                  cy={170 - (getVoltageAtTime(animationTime) / voltage) * 150}
                  r="6"
                  fill="#22c55e"
                  stroke="white"
                  strokeWidth="2"
                />
              )}
              
              {/* Legend */}
              <text x="200" y="15" textAnchor="middle" fill="#94a3b8" fontSize="10">
                V(t) = Vs × (1 - e^(-t/τ))
              </text>
            </svg>
            
            {/* Time constant explanation */}
            <div className="mt-4 grid grid-cols-5 gap-2 text-center text-xs">
              {[
                { tau: '1τ', percent: '63.2%' },
                { tau: '2τ', percent: '86.5%' },
                { tau: '3τ', percent: '95.0%' },
                { tau: '4τ', percent: '98.2%' },
                { tau: '5τ', percent: '99.3%' },
              ].map((item) => (
                <div key={item.tau} className="bg-slate-700/50 rounded p-2">
                  <div className="text-cyan-400 font-medium">{item.tau}</div>
                  <div className="text-slate-400">{item.percent}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Formulas Reference */}
      <div className="mt-8 bg-slate-800/30 rounded-xl border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">📐 RC Circuit Formulas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-cyan-400 text-xl font-mono mb-2">τ = R × C</div>
            <div className="text-sm text-slate-400">Time Constant</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-green-400 text-xl font-mono mb-2">Vc(t) = Vs(1 - e^(-t/τ))</div>
            <div className="text-sm text-slate-400">Charging Voltage</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-yellow-400 text-xl font-mono mb-2">I(t) = (Vs/R) × e^(-t/τ)</div>
            <div className="text-sm text-slate-400">Charging Current</div>
          </div>
        </div>
      </div>
    </div>
  );
}
