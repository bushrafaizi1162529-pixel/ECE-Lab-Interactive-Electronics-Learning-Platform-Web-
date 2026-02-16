import { useState } from 'react';

type SubLab = 'ohms-law' | 'kirchhoff' | 'rlc-components' | 'series-parallel' | 'voltage-divider';

export default function BasicElectronicsLab({ onBack }: { onBack: () => void }) {
  const [subLab, setSubLab] = useState<SubLab>('ohms-law');

  const subLabs = [
    { id: 'ohms-law', name: "Ohm's Law", icon: '⚡' },
    { id: 'kirchhoff', name: "Kirchhoff's Laws", icon: '🔄' },
    { id: 'rlc-components', name: 'R, L, C Components', icon: '🔧' },
    { id: 'series-parallel', name: 'Series & Parallel', icon: '🔗' },
    { id: 'voltage-divider', name: 'Voltage Divider', icon: '📊' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-4">
          ← Back to Labs
        </button>
        
        <h1 className="text-3xl font-bold text-white mb-6">⚡ Basic Electronics Lab</h1>
        
        {/* Sub-lab tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {subLabs.map(lab => (
            <button
              key={lab.id}
              onClick={() => setSubLab(lab.id as SubLab)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                subLab === lab.id
                  ? 'bg-yellow-500 text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {lab.icon} {lab.name}
            </button>
          ))}
        </div>

        {/* Sub-lab content */}
        <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-gray-700">
          {subLab === 'ohms-law' && <OhmsLawLab />}
          {subLab === 'kirchhoff' && <KirchhoffLab />}
          {subLab === 'rlc-components' && <RLCComponentsLab />}
          {subLab === 'series-parallel' && <SeriesParallelLab />}
          {subLab === 'voltage-divider' && <VoltageDividerLab />}
        </div>
      </div>
    </div>
  );
}

// Ohm's Law Interactive Lab
function OhmsLawLab() {
  const [voltage, setVoltage] = useState(12);
  const [resistance, setResistance] = useState(1000);
  const [showElectrons, setShowElectrons] = useState(true);

  const current = voltage / resistance;
  const power = voltage * current;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">Ohm's Law: V = I × R</h2>
        
        {/* Circuit Visualization */}
        <div className="bg-gray-900 rounded-xl p-4 mb-4 relative overflow-hidden">
          <svg viewBox="0 0 400 200" className="w-full">
            {/* Battery */}
            <rect x="20" y="60" width="30" height="80" fill="#333" stroke="#666" strokeWidth="2" rx="4" />
            <rect x="25" y="55" width="20" height="10" fill="#f59e0b" />
            <text x="35" y="105" textAnchor="middle" fill="white" fontSize="12">+</text>
            <text x="35" y="130" textAnchor="middle" fill="white" fontSize="12">-</text>
            <text x="35" y="160" textAnchor="middle" fill="#f59e0b" fontSize="10">{voltage}V</text>
            
            {/* Top wire */}
            <line x1="50" y1="70" x2="150" y2="70" stroke="#10b981" strokeWidth="3" />
            <line x1="250" y1="70" x2="380" y2="70" stroke="#10b981" strokeWidth="3" />
            <line x1="380" y1="70" x2="380" y2="130" stroke="#10b981" strokeWidth="3" />
            
            {/* Resistor */}
            <rect x="150" y="55" width="100" height="30" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" rx="4" />
            <text x="200" y="75" textAnchor="middle" fill="white" fontSize="12">{resistance}Ω</text>
            
            {/* Color bands */}
            <rect x="160" y="60" width="8" height="20" fill="#8b5cf6" />
            <rect x="175" y="60" width="8" height="20" fill="#ef4444" />
            <rect x="190" y="60" width="8" height="20" fill="#f59e0b" />
            <rect x="230" y="60" width="8" height="20" fill="#d4af37" />
            
            {/* Bottom wire */}
            <line x1="50" y1="130" x2="380" y2="130" stroke="#10b981" strokeWidth="3" />
            
            {/* Current arrow */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
              </marker>
            </defs>
            <line x1="280" y1="45" x2="120" y2="45" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="200" y="40" textAnchor="middle" fill="#f59e0b" fontSize="12">I = {(current * 1000).toFixed(2)} mA</text>
            
            {/* Electron flow animation */}
            {showElectrons && [...Array(8)].map((_, i) => (
              <circle
                key={i}
                r="4"
                fill="#3b82f6"
                className="animate-pulse"
              >
                <animateMotion
                  dur={`${2 + i * 0.3}s`}
                  repeatCount="indefinite"
                  path="M 50,70 L 150,70 L 250,70 L 380,70 L 380,130 L 50,130 Z"
                />
              </circle>
            ))}
          </svg>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="text-gray-300 block mb-2">Voltage (V): {voltage}V</label>
            <input
              type="range"
              min="1"
              max="24"
              value={voltage}
              onChange={(e) => setVoltage(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-gray-300 block mb-2">Resistance (Ω): {resistance}Ω</label>
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={resistance}
              onChange={(e) => setResistance(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <label className="flex items-center gap-2 text-gray-300">
            <input
              type="checkbox"
              checked={showElectrons}
              onChange={(e) => setShowElectrons(e.target.checked)}
              className="w-5 h-5"
            />
            Show Electron Flow
          </label>
        </div>
      </div>

      <div>
        {/* Calculations */}
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-white mb-3">📊 Calculations</h3>
          <div className="space-y-3">
            <div className="bg-blue-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Current (I = V / R)</p>
              <p className="text-2xl font-bold text-blue-400">{(current * 1000).toFixed(3)} mA</p>
            </div>
            <div className="bg-green-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Power (P = V × I)</p>
              <p className="text-2xl font-bold text-green-400">{(power * 1000).toFixed(3)} mW</p>
            </div>
          </div>
        </div>

        {/* Ohm's Law Triangle */}
        <div className="bg-gray-900 rounded-xl p-4">
          <h3 className="text-lg font-bold text-white mb-3">📐 Ohm's Law Triangle</h3>
          <svg viewBox="0 0 200 180" className="w-full max-w-[200px] mx-auto">
            <polygon points="100,10 10,170 190,170" fill="none" stroke="#f59e0b" strokeWidth="3" />
            <line x1="10" y1="100" x2="190" y2="100" stroke="#f59e0b" strokeWidth="2" />
            <text x="100" y="60" textAnchor="middle" fill="#3b82f6" fontSize="24" fontWeight="bold">V</text>
            <text x="60" y="145" textAnchor="middle" fill="#10b981" fontSize="24" fontWeight="bold">I</text>
            <text x="140" y="145" textAnchor="middle" fill="#ef4444" fontSize="24" fontWeight="bold">R</text>
            <text x="100" y="85" textAnchor="middle" fill="white" fontSize="10">V = I × R</text>
          </svg>
          <div className="grid grid-cols-3 gap-2 mt-4 text-center text-sm">
            <div className="bg-blue-900/50 p-2 rounded">V = I × R</div>
            <div className="bg-green-900/50 p-2 rounded">I = V / R</div>
            <div className="bg-red-900/50 p-2 rounded">R = V / I</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Kirchhoff's Laws Lab
function KirchhoffLab() {
  const [v1, setV1] = useState(12);
  const [r1, setR1] = useState(100);
  const [r2, setR2] = useState(200);
  const [r3, setR3] = useState(300);

  const totalR = r1 + r2 + r3;
  const current = v1 / totalR;
  const vR1 = current * r1;
  const vR2 = current * r2;
  const vR3 = current * r3;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">Kirchhoff's Laws</h2>
        
        {/* KVL Circuit */}
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-cyan-400 mb-2">KVL: Σ Voltages = 0</h3>
          <svg viewBox="0 0 400 250" className="w-full">
            {/* Battery */}
            <rect x="30" y="80" width="25" height="90" fill="#333" stroke="#f59e0b" strokeWidth="2" rx="4" />
            <text x="42" y="130" textAnchor="middle" fill="white" fontSize="10">{v1}V</text>
            
            {/* Wires and Resistors */}
            <line x1="55" y1="90" x2="120" y2="90" stroke="#10b981" strokeWidth="2" />
            <rect x="120" y="75" width="60" height="30" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" rx="3" />
            <text x="150" y="95" textAnchor="middle" fill="white" fontSize="10">R1={r1}Ω</text>
            <text x="150" y="65" textAnchor="middle" fill="#ef4444" fontSize="10">{vR1.toFixed(2)}V</text>
            
            <line x1="180" y1="90" x2="220" y2="90" stroke="#10b981" strokeWidth="2" />
            <rect x="220" y="75" width="60" height="30" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" rx="3" />
            <text x="250" y="95" textAnchor="middle" fill="white" fontSize="10">R2={r2}Ω</text>
            <text x="250" y="65" textAnchor="middle" fill="#ef4444" fontSize="10">{vR2.toFixed(2)}V</text>
            
            <line x1="280" y1="90" x2="320" y2="90" stroke="#10b981" strokeWidth="2" />
            <rect x="320" y="75" width="60" height="30" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" rx="3" />
            <text x="350" y="95" textAnchor="middle" fill="white" fontSize="10">R3={r3}Ω</text>
            <text x="350" y="65" textAnchor="middle" fill="#ef4444" fontSize="10">{vR3.toFixed(2)}V</text>
            
            <line x1="380" y1="90" x2="380" y2="160" stroke="#10b981" strokeWidth="2" />
            <line x1="380" y1="160" x2="55" y2="160" stroke="#10b981" strokeWidth="2" />
            <line x1="55" y1="160" x2="55" y2="170" stroke="#10b981" strokeWidth="2" />
            
            {/* Ground */}
            <line x1="40" y1="170" x2="70" y2="170" stroke="#666" strokeWidth="2" />
            <line x1="45" y1="175" x2="65" y2="175" stroke="#666" strokeWidth="2" />
            <line x1="50" y1="180" x2="60" y2="180" stroke="#666" strokeWidth="2" />
            
            {/* Current arrow */}
            <path d="M 100,110 L 100,125 L 95,120 M 100,125 L 105,120" stroke="#f59e0b" strokeWidth="2" fill="none" />
            <text x="110" y="125" fill="#f59e0b" fontSize="10">I = {(current * 1000).toFixed(2)}mA</text>
            
            {/* KVL equation */}
            <text x="200" y="200" textAnchor="middle" fill="#10b981" fontSize="12">
              {v1}V - {vR1.toFixed(2)}V - {vR2.toFixed(2)}V - {vR3.toFixed(2)}V = 0 ✓
            </text>
          </svg>
        </div>

        {/* Controls */}
        <div className="space-y-3">
          <div>
            <label className="text-gray-300 text-sm">Source Voltage: {v1}V</label>
            <input type="range" min="5" max="24" value={v1} onChange={(e) => setV1(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-gray-300 text-sm">R1: {r1}Ω</label>
            <input type="range" min="50" max="500" step="10" value={r1} onChange={(e) => setR1(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-gray-300 text-sm">R2: {r2}Ω</label>
            <input type="range" min="50" max="500" step="10" value={r2} onChange={(e) => setR2(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-gray-300 text-sm">R3: {r3}Ω</label>
            <input type="range" min="50" max="500" step="10" value={r3} onChange={(e) => setR3(Number(e.target.value))} className="w-full" />
          </div>
        </div>
      </div>

      <div>
        {/* KCL Demonstration */}
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-purple-400 mb-2">KCL: Σ Currents = 0</h3>
          <svg viewBox="0 0 300 200" className="w-full">
            {/* Node */}
            <circle cx="150" cy="100" r="15" fill="#8b5cf6" />
            <text x="150" y="105" textAnchor="middle" fill="white" fontSize="12">N</text>
            
            {/* Incoming currents */}
            <line x1="50" y1="60" x2="140" y2="95" stroke="#10b981" strokeWidth="3" />
            <polygon points="135,92 145,98 140,88" fill="#10b981" />
            <text x="70" y="55" fill="#10b981" fontSize="12">I₁ = 2A</text>
            
            <line x1="50" y1="140" x2="140" y2="105" stroke="#10b981" strokeWidth="3" />
            <polygon points="135,108 145,102 140,112" fill="#10b981" />
            <text x="70" y="155" fill="#10b981" fontSize="12">I₂ = 3A</text>
            
            {/* Outgoing current */}
            <line x1="160" y1="100" x2="250" y2="100" stroke="#ef4444" strokeWidth="3" />
            <polygon points="245,95 255,100 245,105" fill="#ef4444" />
            <text x="220" y="85" fill="#ef4444" fontSize="12">I₃ = 5A</text>
            
            {/* Equation */}
            <text x="150" y="180" textAnchor="middle" fill="white" fontSize="14">
              I₁ + I₂ = I₃ → 2A + 3A = 5A ✓
            </text>
          </svg>
        </div>

        {/* Laws Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-cyan-900/30 border border-cyan-500 rounded-xl p-4">
            <h4 className="font-bold text-cyan-400 mb-2">KVL</h4>
            <p className="text-gray-300 text-sm">Sum of all voltages around a closed loop equals zero.</p>
            <p className="text-cyan-300 font-mono mt-2">Σ V = 0</p>
          </div>
          <div className="bg-purple-900/30 border border-purple-500 rounded-xl p-4">
            <h4 className="font-bold text-purple-400 mb-2">KCL</h4>
            <p className="text-gray-300 text-sm">Sum of currents entering a node equals sum leaving.</p>
            <p className="text-purple-300 font-mono mt-2">Σ Iᵢₙ = Σ Iₒᵤₜ</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// RLC Components Lab
function RLCComponentsLab() {
  const [component, setComponent] = useState<'R' | 'L' | 'C'>('R');
  const [resistance, setResistance] = useState(1000);
  const [capacitance, setCapacitance] = useState(100); // µF
  const [inductance, setInductance] = useState(10); // mH
  const [frequency, setFrequency] = useState(1000);

  const xC = 1 / (2 * Math.PI * frequency * (capacitance / 1000000));
  const xL = 2 * Math.PI * frequency * (inductance / 1000);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">R, L, C Components</h2>
        
        {/* Component selector */}
        <div className="flex gap-2 mb-4">
          {[
            { id: 'R', name: 'Resistor', color: 'blue' },
            { id: 'L', name: 'Inductor', color: 'purple' },
            { id: 'C', name: 'Capacitor', color: 'green' },
          ].map(c => (
            <button
              key={c.id}
              onClick={() => setComponent(c.id as 'R' | 'L' | 'C')}
              className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                component === c.id
                  ? `bg-${c.color}-500 text-white`
                  : 'bg-gray-700 text-gray-300'
              }`}
              style={{ backgroundColor: component === c.id ? (c.color === 'blue' ? '#3b82f6' : c.color === 'purple' ? '#8b5cf6' : '#10b981') : '' }}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Component visualization */}
        <div className="bg-gray-900 rounded-xl p-6">
          <svg viewBox="0 0 300 150" className="w-full">
            {/* Wires */}
            <line x1="20" y1="75" x2="80" y2="75" stroke="#10b981" strokeWidth="3" />
            <line x1="220" y1="75" x2="280" y2="75" stroke="#10b981" strokeWidth="3" />
            
            {component === 'R' && (
              <>
                {/* Resistor symbol */}
                <path d="M 80,75 L 95,75 L 100,55 L 110,95 L 120,55 L 130,95 L 140,55 L 150,95 L 160,55 L 170,95 L 180,55 L 190,95 L 200,55 L 205,75 L 220,75" 
                      fill="none" stroke="#3b82f6" strokeWidth="3" />
                <text x="150" y="120" textAnchor="middle" fill="#3b82f6" fontSize="14">{resistance} Ω</text>
              </>
            )}
            
            {component === 'L' && (
              <>
                {/* Inductor symbol */}
                <path d="M 80,75 Q 100,75 100,55 Q 100,35 120,35 Q 140,35 140,55 Q 140,75 160,75 Q 160,55 180,55 Q 200,55 200,75 L 220,75" 
                      fill="none" stroke="#8b5cf6" strokeWidth="3" />
                <text x="150" y="120" textAnchor="middle" fill="#8b5cf6" fontSize="14">{inductance} mH</text>
              </>
            )}
            
            {component === 'C' && (
              <>
                {/* Capacitor symbol */}
                <line x1="80" y1="75" x2="140" y2="75" stroke="#10b981" strokeWidth="3" />
                <line x1="140" y1="45" x2="140" y2="105" stroke="#10b981" strokeWidth="4" />
                <line x1="160" y1="45" x2="160" y2="105" stroke="#10b981" strokeWidth="4" />
                <line x1="160" y1="75" x2="220" y2="75" stroke="#10b981" strokeWidth="3" />
                <text x="150" y="130" textAnchor="middle" fill="#10b981" fontSize="14">{capacitance} µF</text>
              </>
            )}
          </svg>
        </div>

        {/* Controls */}
        <div className="mt-4 space-y-3">
          {component === 'R' && (
            <div>
              <label className="text-gray-300 text-sm">Resistance: {resistance} Ω</label>
              <input type="range" min="100" max="10000" step="100" value={resistance} 
                     onChange={(e) => setResistance(Number(e.target.value))} className="w-full" />
            </div>
          )}
          {component === 'L' && (
            <div>
              <label className="text-gray-300 text-sm">Inductance: {inductance} mH</label>
              <input type="range" min="1" max="100" value={inductance} 
                     onChange={(e) => setInductance(Number(e.target.value))} className="w-full" />
            </div>
          )}
          {component === 'C' && (
            <div>
              <label className="text-gray-300 text-sm">Capacitance: {capacitance} µF</label>
              <input type="range" min="1" max="1000" value={capacitance} 
                     onChange={(e) => setCapacitance(Number(e.target.value))} className="w-full" />
            </div>
          )}
          {(component === 'L' || component === 'C') && (
            <div>
              <label className="text-gray-300 text-sm">Frequency: {frequency} Hz</label>
              <input type="range" min="100" max="10000" step="100" value={frequency} 
                     onChange={(e) => setFrequency(Number(e.target.value))} className="w-full" />
            </div>
          )}
        </div>
      </div>

      <div>
        {/* Properties */}
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-white mb-3">📊 Properties</h3>
          
          {component === 'R' && (
            <div className="space-y-3">
              <div className="bg-blue-900/50 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">Impedance (Z)</p>
                <p className="text-2xl font-bold text-blue-400">{resistance} Ω</p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">Phase Shift</p>
                <p className="text-xl font-bold text-white">0°</p>
                <p className="text-gray-400 text-xs">Current in phase with voltage</p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">Energy</p>
                <p className="text-white">Dissipates as heat (P = I²R)</p>
              </div>
            </div>
          )}
          
          {component === 'L' && (
            <div className="space-y-3">
              <div className="bg-purple-900/50 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">Inductive Reactance (Xʟ = 2πfL)</p>
                <p className="text-2xl font-bold text-purple-400">{xL.toFixed(2)} Ω</p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">Phase Shift</p>
                <p className="text-xl font-bold text-white">+90°</p>
                <p className="text-gray-400 text-xs">Current lags voltage by 90°</p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">Energy</p>
                <p className="text-white">Stores in magnetic field</p>
              </div>
            </div>
          )}
          
          {component === 'C' && (
            <div className="space-y-3">
              <div className="bg-green-900/50 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">Capacitive Reactance (Xc = 1/2πfC)</p>
                <p className="text-2xl font-bold text-green-400">{xC.toFixed(2)} Ω</p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">Phase Shift</p>
                <p className="text-xl font-bold text-white">-90°</p>
                <p className="text-gray-400 text-xs">Current leads voltage by 90°</p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">Energy</p>
                <p className="text-white">Stores in electric field</p>
              </div>
            </div>
          )}
        </div>

        {/* Comparison table */}
        <div className="bg-gray-900 rounded-xl p-4">
          <h3 className="text-lg font-bold text-white mb-3">⚡ Quick Reference</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400">
                <th className="text-left p-2">Property</th>
                <th className="text-center p-2">R</th>
                <th className="text-center p-2">L</th>
                <th className="text-center p-2">C</th>
              </tr>
            </thead>
            <tbody className="text-white">
              <tr className="border-t border-gray-700">
                <td className="p-2">Unit</td>
                <td className="text-center p-2 text-blue-400">Ω</td>
                <td className="text-center p-2 text-purple-400">H</td>
                <td className="text-center p-2 text-green-400">F</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="p-2">DC</td>
                <td className="text-center p-2">Conducts</td>
                <td className="text-center p-2">Short</td>
                <td className="text-center p-2">Open</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="p-2">High f</td>
                <td className="text-center p-2">Same</td>
                <td className="text-center p-2">↑ Z</td>
                <td className="text-center p-2">↓ Z</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Series & Parallel Lab
function SeriesParallelLab() {
  const [config, setConfig] = useState<'series' | 'parallel'>('series');
  const [r1, setR1] = useState(100);
  const [r2, setR2] = useState(200);
  const [r3, setR3] = useState(300);
  const [voltage, setVoltage] = useState(12);

  const seriesTotal = r1 + r2 + r3;
  const parallelTotal = 1 / (1/r1 + 1/r2 + 1/r3);
  const totalR = config === 'series' ? seriesTotal : parallelTotal;
  const totalI = voltage / totalR;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">Series & Parallel Circuits</h2>
        
        {/* Config selector */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setConfig('series')}
            className={`flex-1 py-3 rounded-lg font-bold transition-all ${
              config === 'series' ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300'
            }`}
          >
            Series
          </button>
          <button
            onClick={() => setConfig('parallel')}
            className={`flex-1 py-3 rounded-lg font-bold transition-all ${
              config === 'parallel' ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-300'
            }`}
          >
            Parallel
          </button>
        </div>

        {/* Circuit visualization */}
        <div className="bg-gray-900 rounded-xl p-4">
          <svg viewBox="0 0 400 200" className="w-full">
            {config === 'series' ? (
              <>
                {/* Series circuit */}
                <rect x="20" y="70" width="20" height="60" fill="#333" stroke="#f59e0b" strokeWidth="2" />
                <text x="30" y="105" textAnchor="middle" fill="white" fontSize="8">{voltage}V</text>
                
                <line x1="40" y1="80" x2="80" y2="80" stroke="#10b981" strokeWidth="2" />
                <rect x="80" y="65" width="50" height="30" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" rx="3" />
                <text x="105" y="85" textAnchor="middle" fill="white" fontSize="10">R1</text>
                
                <line x1="130" y1="80" x2="170" y2="80" stroke="#10b981" strokeWidth="2" />
                <rect x="170" y="65" width="50" height="30" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" rx="3" />
                <text x="195" y="85" textAnchor="middle" fill="white" fontSize="10">R2</text>
                
                <line x1="220" y1="80" x2="260" y2="80" stroke="#10b981" strokeWidth="2" />
                <rect x="260" y="65" width="50" height="30" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" rx="3" />
                <text x="285" y="85" textAnchor="middle" fill="white" fontSize="10">R3</text>
                
                <line x1="310" y1="80" x2="350" y2="80" stroke="#10b981" strokeWidth="2" />
                <line x1="350" y1="80" x2="350" y2="120" stroke="#10b981" strokeWidth="2" />
                <line x1="350" y1="120" x2="40" y2="120" stroke="#10b981" strokeWidth="2" />
                <line x1="40" y1="120" x2="40" y2="130" stroke="#10b981" strokeWidth="2" />
                
                {/* Current indicator */}
                <text x="200" y="50" textAnchor="middle" fill="#f59e0b" fontSize="12">
                  I = {(totalI * 1000).toFixed(2)} mA (same everywhere)
                </text>
                
                {/* Formula */}
                <text x="200" y="170" textAnchor="middle" fill="#10b981" fontSize="12">
                  Rₜ = R1 + R2 + R3 = {seriesTotal}Ω
                </text>
              </>
            ) : (
              <>
                {/* Parallel circuit */}
                <rect x="20" y="80" width="20" height="60" fill="#333" stroke="#f59e0b" strokeWidth="2" />
                <text x="30" y="115" textAnchor="middle" fill="white" fontSize="8">{voltage}V</text>
                
                <line x1="40" y1="90" x2="100" y2="90" stroke="#10b981" strokeWidth="2" />
                <line x1="100" y1="90" x2="100" y2="40" stroke="#10b981" strokeWidth="2" />
                <line x1="100" y1="90" x2="100" y2="140" stroke="#10b981" strokeWidth="2" />
                
                {/* Branch 1 */}
                <line x1="100" y1="40" x2="150" y2="40" stroke="#10b981" strokeWidth="2" />
                <rect x="150" y="25" width="60" height="30" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" rx="3" />
                <text x="180" y="45" textAnchor="middle" fill="white" fontSize="10">R1</text>
                <line x1="210" y1="40" x2="260" y2="40" stroke="#10b981" strokeWidth="2" />
                
                {/* Branch 2 */}
                <line x1="100" y1="90" x2="150" y2="90" stroke="#10b981" strokeWidth="2" />
                <rect x="150" y="75" width="60" height="30" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" rx="3" />
                <text x="180" y="95" textAnchor="middle" fill="white" fontSize="10">R2</text>
                <line x1="210" y1="90" x2="260" y2="90" stroke="#10b981" strokeWidth="2" />
                
                {/* Branch 3 */}
                <line x1="100" y1="140" x2="150" y2="140" stroke="#10b981" strokeWidth="2" />
                <rect x="150" y="125" width="60" height="30" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" rx="3" />
                <text x="180" y="145" textAnchor="middle" fill="white" fontSize="10">R3</text>
                <line x1="210" y1="140" x2="260" y2="140" stroke="#10b981" strokeWidth="2" />
                
                <line x1="260" y1="40" x2="260" y2="140" stroke="#10b981" strokeWidth="2" />
                <line x1="260" y1="90" x2="320" y2="90" stroke="#10b981" strokeWidth="2" />
                <line x1="320" y1="90" x2="320" y2="130" stroke="#10b981" strokeWidth="2" />
                <line x1="320" y1="130" x2="40" y2="130" stroke="#10b981" strokeWidth="2" />
                <line x1="40" y1="130" x2="40" y2="140" stroke="#10b981" strokeWidth="2" />
                
                {/* Voltage indicator */}
                <text x="80" y="20" textAnchor="middle" fill="#f59e0b" fontSize="10">
                  V = {voltage}V (same across all)
                </text>
                
                {/* Formula */}
                <text x="200" y="185" textAnchor="middle" fill="#10b981" fontSize="11">
                  1/Rₜ = 1/R1 + 1/R2 + 1/R3 → Rₜ = {parallelTotal.toFixed(2)}Ω
                </text>
              </>
            )}
          </svg>
        </div>

        {/* Controls */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <label className="text-gray-300 text-sm">V: {voltage}V</label>
            <input type="range" min="5" max="24" value={voltage} onChange={(e) => setVoltage(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-gray-300 text-sm">R1: {r1}Ω</label>
            <input type="range" min="50" max="500" step="10" value={r1} onChange={(e) => setR1(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-gray-300 text-sm">R2: {r2}Ω</label>
            <input type="range" min="50" max="500" step="10" value={r2} onChange={(e) => setR2(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-gray-300 text-sm">R3: {r3}Ω</label>
            <input type="range" min="50" max="500" step="10" value={r3} onChange={(e) => setR3(Number(e.target.value))} className="w-full" />
          </div>
        </div>
      </div>

      <div>
        {/* Results */}
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-white mb-3">📊 Circuit Analysis</h3>
          <div className="space-y-3">
            <div className={`p-3 rounded-lg ${config === 'series' ? 'bg-cyan-900/50' : 'bg-purple-900/50'}`}>
              <p className="text-gray-400 text-sm">Total Resistance</p>
              <p className="text-2xl font-bold text-white">{totalR.toFixed(2)} Ω</p>
            </div>
            <div className="bg-yellow-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Total Current</p>
              <p className="text-2xl font-bold text-yellow-400">{(totalI * 1000).toFixed(2)} mA</p>
            </div>
            <div className="bg-green-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Total Power</p>
              <p className="text-2xl font-bold text-green-400">{(voltage * totalI * 1000).toFixed(2)} mW</p>
            </div>
          </div>
        </div>

        {/* Key differences */}
        <div className="bg-gray-900 rounded-xl p-4">
          <h3 className="text-lg font-bold text-white mb-3">⚡ Key Differences</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-cyan-900/30 border border-cyan-500 p-3 rounded-lg">
              <h4 className="font-bold text-cyan-400 mb-2">Series</h4>
              <ul className="text-gray-300 space-y-1">
                <li>• Same current</li>
                <li>• Voltages add up</li>
                <li>• Rₜ = R1+R2+...</li>
                <li>• Higher total R</li>
              </ul>
            </div>
            <div className="bg-purple-900/30 border border-purple-500 p-3 rounded-lg">
              <h4 className="font-bold text-purple-400 mb-2">Parallel</h4>
              <ul className="text-gray-300 space-y-1">
                <li>• Same voltage</li>
                <li>• Currents add up</li>
                <li>• 1/Rₜ = 1/R1+...</li>
                <li>• Lower total R</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Voltage Divider Lab
function VoltageDividerLab() {
  const [vin, setVin] = useState(12);
  const [r1, setR1] = useState(1000);
  const [r2, setR2] = useState(1000);

  const vout = vin * (r2 / (r1 + r2));
  const current = vin / (r1 + r2);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">Voltage Divider</h2>
        
        {/* Circuit visualization */}
        <div className="bg-gray-900 rounded-xl p-4">
          <svg viewBox="0 0 350 280" className="w-full">
            {/* Input voltage */}
            <text x="40" y="30" fill="#f59e0b" fontSize="14" fontWeight="bold">Vin = {vin}V</text>
            <line x1="60" y1="40" x2="60" y2="70" stroke="#f59e0b" strokeWidth="3" />
            
            {/* R1 */}
            <line x1="60" y1="70" x2="60" y2="90" stroke="#10b981" strokeWidth="2" />
            <rect x="35" y="90" width="50" height="60" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" rx="4" />
            <text x="60" y="115" textAnchor="middle" fill="white" fontSize="10">R1</text>
            <text x="60" y="130" textAnchor="middle" fill="#3b82f6" fontSize="10">{r1}Ω</text>
            
            {/* Voltage drop across R1 */}
            <text x="120" y="120" fill="#ef4444" fontSize="11">V₁ = {(vin - vout).toFixed(2)}V</text>
            
            {/* Output node */}
            <line x1="60" y1="150" x2="60" y2="170" stroke="#10b981" strokeWidth="2" />
            <circle cx="60" cy="170" r="5" fill="#10b981" />
            <line x1="65" y1="170" x2="150" y2="170" stroke="#10b981" strokeWidth="2" strokeDasharray="5,3" />
            <text x="180" y="175" fill="#10b981" fontSize="14" fontWeight="bold">Vout = {vout.toFixed(2)}V</text>
            
            {/* R2 */}
            <line x1="60" y1="175" x2="60" y2="190" stroke="#10b981" strokeWidth="2" />
            <rect x="35" y="190" width="50" height="60" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2" rx="4" />
            <text x="60" y="215" textAnchor="middle" fill="white" fontSize="10">R2</text>
            <text x="60" y="230" textAnchor="middle" fill="#8b5cf6" fontSize="10">{r2}Ω</text>
            
            {/* Voltage drop across R2 */}
            <text x="120" y="220" fill="#10b981" fontSize="11">V₂ = {vout.toFixed(2)}V</text>
            
            {/* Ground */}
            <line x1="60" y1="250" x2="60" y2="270" stroke="#10b981" strokeWidth="2" />
            <line x1="45" y1="270" x2="75" y2="270" stroke="#666" strokeWidth="3" />
            <line x1="50" y1="275" x2="70" y2="275" stroke="#666" strokeWidth="2" />
            <line x1="55" y1="280" x2="65" y2="280" stroke="#666" strokeWidth="1" />
            
            {/* Current arrow */}
            <path d="M 25,120 L 25,200" stroke="#f59e0b" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
              </marker>
            </defs>
            <text x="15" y="165" fill="#f59e0b" fontSize="10" transform="rotate(-90, 15, 165)">I = {(current * 1000).toFixed(2)}mA</text>

            {/* Formula */}
            <rect x="180" y="200" width="150" height="50" fill="#1a1a2e" stroke="#f59e0b" strokeWidth="2" rx="8" />
            <text x="255" y="220" textAnchor="middle" fill="white" fontSize="11">Vout = Vin × R2/(R1+R2)</text>
            <text x="255" y="240" textAnchor="middle" fill="#f59e0b" fontSize="11">= {vin} × {r2}/{r1+r2}</text>
          </svg>
        </div>

        {/* Controls */}
        <div className="mt-4 space-y-3">
          <div>
            <label className="text-gray-300 text-sm">Input Voltage (Vin): {vin}V</label>
            <input type="range" min="5" max="24" value={vin} onChange={(e) => setVin(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-gray-300 text-sm">R1: {r1}Ω</label>
            <input type="range" min="100" max="10000" step="100" value={r1} onChange={(e) => setR1(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-gray-300 text-sm">R2: {r2}Ω</label>
            <input type="range" min="100" max="10000" step="100" value={r2} onChange={(e) => setR2(Number(e.target.value))} className="w-full" />
          </div>
        </div>
      </div>

      <div>
        {/* Output */}
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-white mb-3">📊 Output</h3>
          <div className="bg-gradient-to-r from-green-900/50 to-green-700/50 p-6 rounded-xl text-center mb-4">
            <p className="text-gray-400 text-sm">Output Voltage (Vout)</p>
            <p className="text-5xl font-bold text-green-400">{vout.toFixed(2)}</p>
            <p className="text-green-300 text-xl">Volts</p>
          </div>
          
          {/* Ratio bar */}
          <div className="mb-4">
            <p className="text-gray-400 text-sm mb-2">Voltage Distribution</p>
            <div className="h-8 rounded-full overflow-hidden flex">
              <div 
                className="bg-blue-500 flex items-center justify-center text-white text-xs font-bold"
                style={{ width: `${((vin - vout) / vin) * 100}%` }}
              >
                R1: {((vin - vout) / vin * 100).toFixed(0)}%
              </div>
              <div 
                className="bg-purple-500 flex items-center justify-center text-white text-xs font-bold"
                style={{ width: `${(vout / vin) * 100}%` }}
              >
                R2: {(vout / vin * 100).toFixed(0)}%
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-900/50 p-3 rounded-lg text-center">
              <p className="text-gray-400 text-xs">Voltage across R1</p>
              <p className="text-xl font-bold text-blue-400">{(vin - vout).toFixed(2)}V</p>
            </div>
            <div className="bg-purple-900/50 p-3 rounded-lg text-center">
              <p className="text-gray-400 text-xs">Voltage across R2</p>
              <p className="text-xl font-bold text-purple-400">{vout.toFixed(2)}V</p>
            </div>
          </div>
        </div>

        {/* Applications */}
        <div className="bg-gray-900 rounded-xl p-4">
          <h3 className="text-lg font-bold text-white mb-3">🔧 Common Applications</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-400">•</span>
              <span>Level shifting (5V to 3.3V logic)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">•</span>
              <span>Sensor signal conditioning</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">•</span>
              <span>Volume controls (potentiometers)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">•</span>
              <span>Reference voltage generation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">•</span>
              <span>ADC input scaling</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
