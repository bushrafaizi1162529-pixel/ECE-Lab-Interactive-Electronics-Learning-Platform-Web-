import { useState } from 'react';

type SubLab = 'diode' | 'led' | 'bjt' | 'mosfet' | 'zener' | 'photodiode';

export default function SemiconductorLab({ onBack }: { onBack: () => void }) {
  const [subLab, setSubLab] = useState<SubLab>('diode');

  const subLabs = [
    { id: 'diode', name: 'Diodes', icon: '▶' },
    { id: 'led', name: 'LEDs', icon: '💡' },
    { id: 'bjt', name: 'BJT', icon: '🔀' },
    { id: 'mosfet', name: 'MOSFET', icon: '⚡' },
    { id: 'zener', name: 'Zener', icon: '📊' },
    { id: 'photodiode', name: 'Photo Devices', icon: '☀️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-4">
          ← Back to Labs
        </button>
        
        <h1 className="text-3xl font-bold text-white mb-6">🔌 Semiconductor Devices Lab</h1>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {subLabs.map(lab => (
            <button
              key={lab.id}
              onClick={() => setSubLab(lab.id as SubLab)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                subLab === lab.id
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {lab.icon} {lab.name}
            </button>
          ))}
        </div>

        <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-gray-700">
          {subLab === 'diode' && <DiodeLab />}
          {subLab === 'led' && <LEDLab />}
          {subLab === 'bjt' && <BJTLab />}
          {subLab === 'mosfet' && <MOSFETLab />}
          {subLab === 'zener' && <ZenerLab />}
          {subLab === 'photodiode' && <PhotodiodeLab />}
        </div>
      </div>
    </div>
  );
}

// Diode Lab
function DiodeLab() {
  const [voltage, setVoltage] = useState(5);
  const [forwardVoltage] = useState(0.7);
  const [resistance, setResistance] = useState(330);
  const [isBiasForward, setIsBiasForward] = useState(true);

  const current = isBiasForward && voltage > forwardVoltage 
    ? (voltage - forwardVoltage) / resistance 
    : 0;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold text-purple-400 mb-4">PN Junction Diode</h2>
        
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <svg viewBox="0 0 400 200" className="w-full">
            {/* Battery */}
            <rect x="30" y="60" width="25" height="80" fill="#333" stroke="#f59e0b" strokeWidth="2" rx="3" />
            <text x="42" y={isBiasForward ? "55" : "150"} textAnchor="middle" fill="#10b981" fontSize="14">+</text>
            <text x="42" y={isBiasForward ? "150" : "55"} textAnchor="middle" fill="#ef4444" fontSize="14">-</text>
            <text x="42" y="105" textAnchor="middle" fill="white" fontSize="10">{voltage}V</text>
            
            {/* Wires */}
            <line x1="55" y1="70" x2="120" y2="70" stroke="#10b981" strokeWidth="2" />
            <line x1="280" y1="70" x2="350" y2="70" stroke="#10b981" strokeWidth="2" />
            <line x1="350" y1="70" x2="350" y2="130" stroke="#10b981" strokeWidth="2" />
            <line x1="350" y1="130" x2="55" y2="130" stroke="#10b981" strokeWidth="2" />
            
            {/* Resistor */}
            <rect x="120" y="55" width="60" height="30" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" rx="3" />
            <text x="150" y="75" textAnchor="middle" fill="white" fontSize="10">{resistance}Ω</text>
            
            {/* Diode */}
            <line x1="180" y1="70" x2="220" y2="70" stroke="#10b981" strokeWidth="2" />
            <polygon points="220,50 220,90 260,70" fill={current > 0 ? "#8b5cf6" : "#444"} stroke="#8b5cf6" strokeWidth="2" />
            <line x1="260" y1="50" x2="260" y2="90" stroke="#8b5cf6" strokeWidth="3" />
            <line x1="260" y1="70" x2="280" y2="70" stroke="#10b981" strokeWidth="2" />
            
            {/* Labels */}
            <text x="240" y="110" textAnchor="middle" fill="#8b5cf6" fontSize="10">
              {isBiasForward ? "Forward" : "Reverse"} Bias
            </text>
            
            {/* Current indicator */}
            {current > 0 && (
              <>
                <circle r="4" fill="#f59e0b">
                  <animateMotion dur="1s" repeatCount="indefinite" path="M 70,70 L 350,70 L 350,130 L 55,130" />
                </circle>
                <text x="300" y="50" fill="#f59e0b" fontSize="10">I = {(current * 1000).toFixed(2)}mA</text>
              </>
            )}
            
            {/* Forward voltage drop */}
            {current > 0 && (
              <text x="240" y="40" textAnchor="middle" fill="#10b981" fontSize="10">Vf = 0.7V</text>
            )}
          </svg>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-gray-300 text-sm">Supply Voltage: {voltage}V</label>
            <input type="range" min="0" max="12" step="0.5" value={voltage} 
                   onChange={(e) => setVoltage(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-gray-300 text-sm">Resistance: {resistance}Ω</label>
            <input type="range" min="100" max="1000" step="10" value={resistance} 
                   onChange={(e) => setResistance(Number(e.target.value))} className="w-full" />
          </div>
          <button
            onClick={() => setIsBiasForward(!isBiasForward)}
            className={`w-full py-3 rounded-lg font-bold transition-all ${
              isBiasForward ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}
          >
            {isBiasForward ? '✓ Forward Bias' : '✗ Reverse Bias'}
          </button>
        </div>
      </div>

      <div>
        {/* I-V Curve */}
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-white mb-3">📈 Diode I-V Characteristic</h3>
          <svg viewBox="0 0 300 200" className="w-full">
            {/* Axes */}
            <line x1="50" y1="150" x2="280" y2="150" stroke="white" strokeWidth="2" />
            <line x1="150" y1="20" x2="150" y2="180" stroke="white" strokeWidth="2" />
            <text x="270" y="170" fill="white" fontSize="10">V</text>
            <text x="155" y="30" fill="white" fontSize="10">I</text>
            
            {/* Forward curve */}
            <path d="M 150,150 Q 180,150 200,130 Q 220,90 250,30" fill="none" stroke="#10b981" strokeWidth="2" />
            
            {/* Reverse region */}
            <line x1="50" y1="155" x2="150" y2="155" stroke="#ef4444" strokeWidth="2" />
            
            {/* Threshold */}
            <line x1="180" y1="145" x2="180" y2="155" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />
            <text x="180" y="170" textAnchor="middle" fill="#f59e0b" fontSize="8">0.7V</text>
            
            {/* Current operating point */}
            {current > 0 && (
              <circle cx={150 + (voltage * 10)} cy={150 - (current * 5000)} r="5" fill="#f59e0b" />
            )}
            
            {/* Labels */}
            <text x="220" y="80" fill="#10b981" fontSize="10">Forward</text>
            <text x="80" y="140" fill="#ef4444" fontSize="10">Reverse</text>
          </svg>
        </div>

        {/* Current display */}
        <div className="bg-gray-900 rounded-xl p-4">
          <h3 className="text-lg font-bold text-white mb-3">📊 Measurements</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className={`p-3 rounded-lg ${current > 0 ? 'bg-green-900/50' : 'bg-red-900/50'}`}>
              <p className="text-gray-400 text-sm">Status</p>
              <p className={`text-xl font-bold ${current > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {current > 0 ? 'Conducting' : 'Blocking'}
              </p>
            </div>
            <div className="bg-purple-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Current</p>
              <p className="text-xl font-bold text-purple-400">{(current * 1000).toFixed(2)} mA</p>
            </div>
            <div className="bg-blue-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Vf (Drop)</p>
              <p className="text-xl font-bold text-blue-400">{current > 0 ? '0.7V' : '0V'}</p>
            </div>
            <div className="bg-yellow-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Power</p>
              <p className="text-xl font-bold text-yellow-400">{(forwardVoltage * current * 1000).toFixed(2)} mW</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// LED Lab
function LEDLab() {
  const [voltage, setVoltage] = useState(5);
  const [resistance, setResistance] = useState(220);
  const [ledColor, setLedColor] = useState<'red' | 'green' | 'blue' | 'white'>('red');

  const ledVoltages = { red: 2.0, green: 2.2, blue: 3.2, white: 3.4 };
  const ledColors = { red: '#ef4444', green: '#22c55e', blue: '#3b82f6', white: '#f8fafc' };
  
  const vf = ledVoltages[ledColor];
  const current = voltage > vf ? (voltage - vf) / resistance : 0;
  const brightness = Math.min(current / 0.02, 1);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold text-purple-400 mb-4">LED Circuit Designer</h2>
        
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <svg viewBox="0 0 400 220" className="w-full">
            {/* Battery */}
            <rect x="30" y="70" width="25" height="80" fill="#333" stroke="#f59e0b" strokeWidth="2" rx="3" />
            <text x="42" y="65" textAnchor="middle" fill="#10b981" fontSize="12">+</text>
            <text x="42" y="165" textAnchor="middle" fill="#ef4444" fontSize="12">-</text>
            <text x="42" y="115" textAnchor="middle" fill="white" fontSize="10">{voltage}V</text>
            
            {/* Wires */}
            <line x1="55" y1="80" x2="120" y2="80" stroke="#10b981" strokeWidth="2" />
            <line x1="280" y1="80" x2="350" y2="80" stroke="#10b981" strokeWidth="2" />
            <line x1="350" y1="80" x2="350" y2="140" stroke="#10b981" strokeWidth="2" />
            <line x1="350" y1="140" x2="55" y2="140" stroke="#10b981" strokeWidth="2" />
            
            {/* Resistor */}
            <rect x="120" y="65" width="60" height="30" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" rx="3" />
            <text x="150" y="85" textAnchor="middle" fill="white" fontSize="10">{resistance}Ω</text>
            
            {/* LED */}
            <line x1="180" y1="80" x2="220" y2="80" stroke="#10b981" strokeWidth="2" />
            <polygon points="220,60 220,100 255,80" fill={current > 0 ? ledColors[ledColor] : "#333"} 
                     stroke={ledColors[ledColor]} strokeWidth="2" />
            <line x1="255" y1="55" x2="255" y2="105" stroke={ledColors[ledColor]} strokeWidth="3" />
            <line x1="255" y1="80" x2="280" y2="80" stroke="#10b981" strokeWidth="2" />
            
            {/* Light rays */}
            {current > 0 && (
              <g opacity={brightness}>
                <line x1="240" y1="45" x2="250" y2="30" stroke={ledColors[ledColor]} strokeWidth="2" />
                <line x1="255" y1="45" x2="255" y2="25" stroke={ledColors[ledColor]} strokeWidth="2" />
                <line x1="270" y1="50" x2="285" y2="35" stroke={ledColors[ledColor]} strokeWidth="2" />
                <circle cx="237" cy="80" r={15 + brightness * 20} fill={ledColors[ledColor]} opacity={brightness * 0.3} />
              </g>
            )}
            
            {/* Current indicator */}
            {current > 0 && (
              <text x="200" y="130" textAnchor="middle" fill="#f59e0b" fontSize="11">
                I = {(current * 1000).toFixed(1)}mA
              </text>
            )}
            
            {/* Warning */}
            {current > 0.02 && (
              <text x="200" y="200" textAnchor="middle" fill="#ef4444" fontSize="12" className="animate-pulse">
                ⚠️ Current too high! LED may burn out!
              </text>
            )}
          </svg>
        </div>

        {/* LED Color selector */}
        <div className="flex gap-2 mb-4">
          {(['red', 'green', 'blue', 'white'] as const).map(color => (
            <button
              key={color}
              onClick={() => setLedColor(color)}
              className={`flex-1 py-3 rounded-lg font-bold capitalize transition-all ${
                ledColor === color ? 'ring-2 ring-white' : ''
              }`}
              style={{ backgroundColor: ledColors[color], color: color === 'white' ? 'black' : 'white' }}
            >
              {color}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-gray-300 text-sm">Supply Voltage: {voltage}V</label>
            <input type="range" min="3" max="12" step="0.5" value={voltage} 
                   onChange={(e) => setVoltage(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-gray-300 text-sm">Resistor: {resistance}Ω</label>
            <input type="range" min="100" max="1000" step="10" value={resistance} 
                   onChange={(e) => setResistance(Number(e.target.value))} className="w-full" />
          </div>
        </div>
      </div>

      <div>
        {/* Calculations */}
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-white mb-3">📊 LED Circuit Calculations</h3>
          <div className="bg-gray-800 p-4 rounded-lg mb-4 font-mono text-sm">
            <p className="text-gray-400">R = (Vs - Vf) / I</p>
            <p className="text-white mt-2">R = ({voltage}V - {vf}V) / {(current * 1000).toFixed(1)}mA</p>
            <p className="text-green-400 mt-2">R = {((voltage - vf) / 0.02).toFixed(0)}Ω (for 20mA)</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Forward Voltage</p>
              <p className="text-xl font-bold text-blue-400">{vf}V</p>
            </div>
            <div className={`p-3 rounded-lg ${current > 0.02 ? 'bg-red-900/50' : 'bg-green-900/50'}`}>
              <p className="text-gray-400 text-sm">Current</p>
              <p className={`text-xl font-bold ${current > 0.02 ? 'text-red-400' : 'text-green-400'}`}>
                {(current * 1000).toFixed(1)}mA
              </p>
            </div>
            <div className="bg-purple-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">LED Power</p>
              <p className="text-xl font-bold text-purple-400">{(vf * current * 1000).toFixed(1)}mW</p>
            </div>
            <div className="bg-yellow-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Brightness</p>
              <p className="text-xl font-bold text-yellow-400">{(brightness * 100).toFixed(0)}%</p>
            </div>
          </div>
        </div>

        {/* LED Reference */}
        <div className="bg-gray-900 rounded-xl p-4">
          <h3 className="text-lg font-bold text-white mb-3">💡 LED Forward Voltages</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400">
                <th className="text-left p-2">Color</th>
                <th className="text-center p-2">Vf</th>
                <th className="text-center p-2">Typical I</th>
              </tr>
            </thead>
            <tbody>
              {[
                { color: 'Red', vf: '1.8-2.2V', i: '20mA', bg: '#ef4444' },
                { color: 'Green', vf: '2.0-2.4V', i: '20mA', bg: '#22c55e' },
                { color: 'Blue', vf: '3.0-3.4V', i: '20mA', bg: '#3b82f6' },
                { color: 'White', vf: '3.2-3.6V', i: '20mA', bg: '#f8fafc' },
              ].map(led => (
                <tr key={led.color} className="border-t border-gray-700">
                  <td className="p-2 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full" style={{ backgroundColor: led.bg }}></span>
                    {led.color}
                  </td>
                  <td className="text-center p-2 text-white">{led.vf}</td>
                  <td className="text-center p-2 text-green-400">{led.i}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// BJT Lab
function BJTLab() {
  const [vcc, setVcc] = useState(12);
  const [rb, setRb] = useState(100000);
  const [rc, setRc] = useState(1000);
  const [beta, setBeta] = useState(100);
  const [mode, setMode] = useState<'npn' | 'pnp'>('npn');

  const vbe = 0.7;
  const ib = (vcc - vbe) / rb;
  const ic = Math.min(ib * beta, vcc / rc);
  const vce = vcc - (ic * rc);
  const region = vce < 0.3 ? 'Saturation' : ib <= 0 ? 'Cutoff' : 'Active';

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold text-purple-400 mb-4">BJT Transistor ({mode.toUpperCase()})</h2>
        
        <div className="flex gap-2 mb-4">
          <button onClick={() => setMode('npn')} 
                  className={`flex-1 py-2 rounded-lg font-bold ${mode === 'npn' ? 'bg-blue-600' : 'bg-gray-700'}`}>
            NPN
          </button>
          <button onClick={() => setMode('pnp')} 
                  className={`flex-1 py-2 rounded-lg font-bold ${mode === 'pnp' ? 'bg-pink-600' : 'bg-gray-700'}`}>
            PNP
          </button>
        </div>

        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <svg viewBox="0 0 400 280" className="w-full">
            {/* Vcc */}
            <text x="320" y="30" textAnchor="middle" fill="#ef4444" fontSize="12">Vcc = {vcc}V</text>
            <line x1="320" y1="35" x2="320" y2="70" stroke="#ef4444" strokeWidth="2" />
            
            {/* Rc */}
            <rect x="295" y="70" width="50" height="40" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" rx="3" />
            <text x="320" y="95" textAnchor="middle" fill="white" fontSize="10">Rc</text>
            <text x="360" y="95" fill="#3b82f6" fontSize="10">{rc}Ω</text>
            
            <line x1="320" y1="110" x2="320" y2="140" stroke="#10b981" strokeWidth="2" />
            
            {/* Transistor */}
            <circle cx="260" cy="170" r="40" fill="none" stroke="#8b5cf6" strokeWidth="2" />
            
            {/* Base */}
            <line x1="170" y1="170" x2="220" y2="170" stroke="#10b981" strokeWidth="2" />
            <line x1="220" y1="150" x2="220" y2="190" stroke="#8b5cf6" strokeWidth="3" />
            
            {/* Collector */}
            <line x1="220" y1="155" x2="260" y2="140" stroke="#8b5cf6" strokeWidth="2" />
            <line x1="260" y1="140" x2="320" y2="140" stroke="#10b981" strokeWidth="2" />
            
            {/* Emitter with arrow */}
            <line x1="220" y1="185" x2="260" y2="200" stroke="#8b5cf6" strokeWidth="2" />
            {mode === 'npn' ? (
              <polygon points="250,195 260,200 252,205" fill="#8b5cf6" />
            ) : (
              <polygon points="230,185 220,185 228,193" fill="#8b5cf6" />
            )}
            <line x1="260" y1="200" x2="260" y2="240" stroke="#10b981" strokeWidth="2" />
            
            {/* Ground */}
            <line x1="245" y1="240" x2="275" y2="240" stroke="#666" strokeWidth="3" />
            
            {/* Rb */}
            <rect x="90" y="155" width="50" height="30" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" rx="3" />
            <text x="115" y="175" textAnchor="middle" fill="white" fontSize="10">Rb</text>
            <text x="115" y="200" textAnchor="middle" fill="#3b82f6" fontSize="9">{(rb/1000)}kΩ</text>
            
            <line x1="140" y1="170" x2="170" y2="170" stroke="#10b981" strokeWidth="2" />
            <line x1="50" y1="170" x2="90" y2="170" stroke="#10b981" strokeWidth="2" />
            <text x="50" y="165" fill="#10b981" fontSize="10">Vin</text>
            
            {/* Labels */}
            <text x="200" y="160" fill="white" fontSize="10">B</text>
            <text x="285" y="135" fill="white" fontSize="10">C</text>
            <text x="265" y="220" fill="white" fontSize="10">E</text>
            
            {/* Current arrows */}
            <text x="135" y="145" fill="#f59e0b" fontSize="9">Ib = {(ib * 1000000).toFixed(1)}µA</text>
            <text x="330" y="135" fill="#f59e0b" fontSize="9">Ic = {(ic * 1000).toFixed(2)}mA</text>
            
            {/* Region indicator */}
            <rect x="20" y="20" width="100" height="30" fill={region === 'Active' ? '#22c55e' : region === 'Saturation' ? '#f59e0b' : '#ef4444'} rx="5" opacity="0.3" />
            <text x="70" y="40" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">{region}</text>
          </svg>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-gray-300 text-sm">Vcc: {vcc}V</label>
            <input type="range" min="5" max="24" value={vcc} onChange={(e) => setVcc(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-gray-300 text-sm">Rb: {(rb/1000).toFixed(0)}kΩ</label>
            <input type="range" min="10000" max="500000" step="10000" value={rb} onChange={(e) => setRb(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-gray-300 text-sm">Rc: {rc}Ω</label>
            <input type="range" min="100" max="10000" step="100" value={rc} onChange={(e) => setRc(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-gray-300 text-sm">β (hFE): {beta}</label>
            <input type="range" min="50" max="300" value={beta} onChange={(e) => setBeta(Number(e.target.value))} className="w-full" />
          </div>
        </div>
      </div>

      <div>
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-white mb-3">📊 BJT Analysis</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Base Current (Ib)</p>
              <p className="text-xl font-bold text-blue-400">{(ib * 1000000).toFixed(2)} µA</p>
            </div>
            <div className="bg-green-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Collector Current (Ic)</p>
              <p className="text-xl font-bold text-green-400">{(ic * 1000).toFixed(2)} mA</p>
            </div>
            <div className="bg-purple-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Vce</p>
              <p className="text-xl font-bold text-purple-400">{vce.toFixed(2)} V</p>
            </div>
            <div className="bg-yellow-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Power (Pc)</p>
              <p className="text-xl font-bold text-yellow-400">{(vce * ic * 1000).toFixed(2)} mW</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-4">
          <h3 className="text-lg font-bold text-white mb-3">📐 BJT Formulas</h3>
          <div className="space-y-2 font-mono text-sm bg-gray-800 p-4 rounded-lg">
            <p className="text-cyan-400">Ic = β × Ib</p>
            <p className="text-green-400">Ie = Ic + Ib ≈ Ic</p>
            <p className="text-yellow-400">Ib = (Vin - Vbe) / Rb</p>
            <p className="text-purple-400">Vce = Vcc - (Ic × Rc)</p>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
            <div className="bg-green-900/30 p-2 rounded text-center">
              <p className="text-green-400 font-bold">Active</p>
              <p className="text-gray-400">Amplifier</p>
            </div>
            <div className="bg-yellow-900/30 p-2 rounded text-center">
              <p className="text-yellow-400 font-bold">Saturation</p>
              <p className="text-gray-400">Switch ON</p>
            </div>
            <div className="bg-red-900/30 p-2 rounded text-center">
              <p className="text-red-400 font-bold">Cutoff</p>
              <p className="text-gray-400">Switch OFF</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// MOSFET Lab
function MOSFETLab() {
  const [vgs, setVgs] = useState(5);
  const [vds, setVds] = useState(10);
  const [vth] = useState(2);
  const [kn] = useState(0.002);
  const [mode, setMode] = useState<'nmos' | 'pmos'>('nmos');

  const isOn = vgs > vth;
  const id = isOn ? (vgs - vth > vds ? kn * ((vgs - vth) * vds - 0.5 * vds * vds) : 0.5 * kn * Math.pow(vgs - vth, 2)) : 0;
  const region = !isOn ? 'Cutoff' : (vgs - vth > vds) ? 'Linear' : 'Saturation';

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold text-purple-400 mb-4">MOSFET ({mode.toUpperCase()})</h2>
        
        <div className="flex gap-2 mb-4">
          <button onClick={() => setMode('nmos')} 
                  className={`flex-1 py-2 rounded-lg font-bold ${mode === 'nmos' ? 'bg-blue-600' : 'bg-gray-700'}`}>
            N-Channel
          </button>
          <button onClick={() => setMode('pmos')} 
                  className={`flex-1 py-2 rounded-lg font-bold ${mode === 'pmos' ? 'bg-pink-600' : 'bg-gray-700'}`}>
            P-Channel
          </button>
        </div>

        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <svg viewBox="0 0 350 250" className="w-full">
            {/* MOSFET Symbol */}
            <circle cx="180" cy="125" r="50" fill="none" stroke="#8b5cf6" strokeWidth="2" />
            
            {/* Gate */}
            <line x1="80" y1="125" x2="130" y2="125" stroke="#10b981" strokeWidth="2" />
            <line x1="130" y1="85" x2="130" y2="165" stroke="#8b5cf6" strokeWidth="3" />
            <text x="100" y="115" fill="white" fontSize="12">G</text>
            <text x="60" y="130" fill="#10b981" fontSize="10">Vgs={vgs}V</text>
            
            {/* Channel */}
            <line x1="145" y1="85" x2="145" y2="100" stroke="#8b5cf6" strokeWidth="2" />
            <line x1="145" y1="115" x2="145" y2="135" stroke="#8b5cf6" strokeWidth="2" />
            <line x1="145" y1="150" x2="145" y2="165" stroke="#8b5cf6" strokeWidth="2" />
            
            {/* Drain */}
            <line x1="145" y1="85" x2="180" y2="85" stroke="#8b5cf6" strokeWidth="2" />
            <line x1="180" y1="85" x2="180" y2="50" stroke="#10b981" strokeWidth="2" />
            <text x="195" y="75" fill="white" fontSize="12">D</text>
            <line x1="180" y1="50" x2="280" y2="50" stroke="#10b981" strokeWidth="2" />
            <text x="280" y="45" fill="#ef4444" fontSize="10">Vdd</text>
            
            {/* Source */}
            <line x1="145" y1="165" x2="180" y2="165" stroke="#8b5cf6" strokeWidth="2" />
            {mode === 'nmos' ? (
              <polygon points="155,165 165,160 165,170" fill="#8b5cf6" />
            ) : (
              <polygon points="175,165 165,160 165,170" fill="#8b5cf6" />
            )}
            <line x1="180" y1="165" x2="180" y2="200" stroke="#10b981" strokeWidth="2" />
            <text x="195" y="185" fill="white" fontSize="12">S</text>
            
            {/* Ground */}
            <line x1="165" y1="200" x2="195" y2="200" stroke="#666" strokeWidth="3" />
            
            {/* Body diode */}
            <line x1="180" y1="100" x2="180" y2="150" stroke="#8b5cf6" strokeWidth="2" />
            
            {/* Current */}
            {isOn && (
              <text x="240" y="130" fill="#f59e0b" fontSize="11">Id = {(id * 1000).toFixed(2)}mA</text>
            )}
            
            {/* Region */}
            <rect x="20" y="20" width="80" height="25" rx="5" 
                  fill={region === 'Saturation' ? '#22c55e' : region === 'Linear' ? '#3b82f6' : '#ef4444'} opacity="0.3" />
            <text x="60" y="38" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{region}</text>
          </svg>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-gray-300 text-sm">Vgs: {vgs}V (Vth = {vth}V)</label>
            <input type="range" min="0" max="10" step="0.5" value={vgs} onChange={(e) => setVgs(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-gray-300 text-sm">Vds: {vds}V</label>
            <input type="range" min="0" max="20" step="0.5" value={vds} onChange={(e) => setVds(Number(e.target.value))} className="w-full" />
          </div>
        </div>
      </div>

      <div>
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-white mb-3">📊 MOSFET Analysis</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className={`p-3 rounded-lg ${isOn ? 'bg-green-900/50' : 'bg-red-900/50'}`}>
              <p className="text-gray-400 text-sm">Status</p>
              <p className={`text-xl font-bold ${isOn ? 'text-green-400' : 'text-red-400'}`}>
                {isOn ? 'ON' : 'OFF'}
              </p>
            </div>
            <div className="bg-blue-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Drain Current (Id)</p>
              <p className="text-xl font-bold text-blue-400">{(id * 1000).toFixed(2)} mA</p>
            </div>
            <div className="bg-purple-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Vgs - Vth</p>
              <p className="text-xl font-bold text-purple-400">{(vgs - vth).toFixed(1)} V</p>
            </div>
            <div className="bg-yellow-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Power</p>
              <p className="text-xl font-bold text-yellow-400">{(vds * id * 1000).toFixed(2)} mW</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-4">
          <h3 className="text-lg font-bold text-white mb-3">📐 MOSFET Regions</h3>
          <div className="space-y-3">
            <div className={`p-3 rounded-lg border ${region === 'Cutoff' ? 'border-red-500 bg-red-900/30' : 'border-gray-600'}`}>
              <p className="font-bold text-red-400">Cutoff (Vgs &lt; Vth)</p>
              <p className="text-gray-400 text-sm">No current flows, transistor is OFF</p>
            </div>
            <div className={`p-3 rounded-lg border ${region === 'Linear' ? 'border-blue-500 bg-blue-900/30' : 'border-gray-600'}`}>
              <p className="font-bold text-blue-400">Linear/Triode (Vds &lt; Vgs-Vth)</p>
              <p className="text-gray-400 text-sm">Acts like variable resistor</p>
            </div>
            <div className={`p-3 rounded-lg border ${region === 'Saturation' ? 'border-green-500 bg-green-900/30' : 'border-gray-600'}`}>
              <p className="font-bold text-green-400">Saturation (Vds &gt; Vgs-Vth)</p>
              <p className="text-gray-400 text-sm">Current source, amplifier region</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Zener Diode Lab
function ZenerLab() {
  const [vin, setVin] = useState(12);
  const [rSeries, setRSeries] = useState(470);
  const [vz] = useState(5.1);
  const [rLoad, setRLoad] = useState(1000);

  const isRegulating = vin > vz;
  const iTotal = isRegulating ? (vin - vz) / rSeries : 0;
  const iLoad = vz / rLoad;
  const iZener = isRegulating ? iTotal - iLoad : 0;
  const vOut = isRegulating ? vz : vin * (rLoad / (rSeries + rLoad));

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold text-purple-400 mb-4">Zener Voltage Regulator</h2>
        
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <svg viewBox="0 0 400 250" className="w-full">
            {/* Input */}
            <text x="40" y="50" fill="#f59e0b" fontSize="12">Vin = {vin}V</text>
            <line x1="50" y1="60" x2="50" y2="80" stroke="#f59e0b" strokeWidth="2" />
            
            {/* Series Resistor */}
            <line x1="50" y1="80" x2="100" y2="80" stroke="#10b981" strokeWidth="2" />
            <rect x="100" y="65" width="60" height="30" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" rx="3" />
            <text x="130" y="85" textAnchor="middle" fill="white" fontSize="10">Rs</text>
            <text x="130" y="110" textAnchor="middle" fill="#3b82f6" fontSize="9">{rSeries}Ω</text>
            
            <line x1="160" y1="80" x2="200" y2="80" stroke="#10b981" strokeWidth="2" />
            
            {/* Junction */}
            <circle cx="200" cy="80" r="4" fill="#10b981" />
            <line x1="200" y1="80" x2="200" y2="100" stroke="#10b981" strokeWidth="2" />
            
            {/* Zener Diode */}
            <polygon points="180,140 220,140 200,100" fill={isRegulating ? "#8b5cf6" : "#444"} stroke="#8b5cf6" strokeWidth="2" />
            <path d="M 180,140 L 175,145 M 180,140 L 220,140 M 220,140 L 225,135" stroke="#8b5cf6" strokeWidth="2" fill="none" />
            <text x="155" y="125" fill="#8b5cf6" fontSize="10">Vz={vz}V</text>
            
            <line x1="200" y1="140" x2="200" y2="180" stroke="#10b981" strokeWidth="2" />
            
            {/* Ground */}
            <line x1="50" y1="180" x2="320" y2="180" stroke="#10b981" strokeWidth="2" />
            <line x1="50" y1="80" x2="50" y2="180" stroke="#10b981" strokeWidth="2" />
            
            {/* Load */}
            <line x1="200" y1="80" x2="280" y2="80" stroke="#10b981" strokeWidth="2" />
            <rect x="280" y="95" width="30" height="60" fill="#1e3a5f" stroke="#22c55e" strokeWidth="2" rx="3" />
            <text x="295" y="130" textAnchor="middle" fill="white" fontSize="10" transform="rotate(90, 295, 130)">RL</text>
            <text x="325" y="130" fill="#22c55e" fontSize="9">{rLoad}Ω</text>
            <line x1="295" y1="155" x2="295" y2="180" stroke="#10b981" strokeWidth="2" />
            
            {/* Output voltage */}
            <text x="280" y="70" fill="#10b981" fontSize="11">Vout = {vOut.toFixed(2)}V</text>
            
            {/* Current labels */}
            <text x="130" y="55" fill="#f59e0b" fontSize="9">Is = {(iTotal * 1000).toFixed(2)}mA</text>
            {isRegulating && (
              <>
                <text x="230" y="120" fill="#8b5cf6" fontSize="9">Iz = {(iZener * 1000).toFixed(2)}mA</text>
                <text x="320" y="90" fill="#22c55e" fontSize="9">IL = {(iLoad * 1000).toFixed(2)}mA</text>
              </>
            )}
          </svg>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-gray-300 text-sm">Input Voltage: {vin}V</label>
            <input type="range" min="3" max="20" step="0.5" value={vin} onChange={(e) => setVin(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-gray-300 text-sm">Series Resistor: {rSeries}Ω</label>
            <input type="range" min="100" max="1000" step="10" value={rSeries} onChange={(e) => setRSeries(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-gray-300 text-sm">Load Resistor: {rLoad}Ω</label>
            <input type="range" min="500" max="5000" step="100" value={rLoad} onChange={(e) => setRLoad(Number(e.target.value))} className="w-full" />
          </div>
        </div>
      </div>

      <div>
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-white mb-3">📊 Regulator Status</h3>
          <div className={`p-4 rounded-xl mb-4 ${isRegulating ? 'bg-green-900/50 border border-green-500' : 'bg-red-900/50 border border-red-500'}`}>
            <p className="text-lg font-bold text-center">
              {isRegulating ? '✓ Regulating' : '✗ Not Regulating'}
            </p>
            <p className="text-center text-gray-300 text-sm">
              {isRegulating ? `Output stable at ${vz}V` : `Vin (${vin}V) < Vz (${vz}V)`}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Output Voltage</p>
              <p className="text-2xl font-bold text-green-400">{vOut.toFixed(2)}V</p>
            </div>
            <div className="bg-purple-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Zener Current</p>
              <p className="text-xl font-bold text-purple-400">{(iZener * 1000).toFixed(2)}mA</p>
            </div>
            <div className="bg-blue-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Load Current</p>
              <p className="text-xl font-bold text-blue-400">{(iLoad * 1000).toFixed(2)}mA</p>
            </div>
            <div className="bg-yellow-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Zener Power</p>
              <p className="text-xl font-bold text-yellow-400">{(vz * iZener * 1000).toFixed(1)}mW</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-4">
          <h3 className="text-lg font-bold text-white mb-3">⚡ How It Works</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• Zener operates in reverse breakdown</li>
            <li>• Maintains constant voltage across load</li>
            <li>• Rs limits current to prevent damage</li>
            <li>• Excess current flows through zener</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Photodiode Lab
function PhotodiodeLab() {
  const [lightIntensity, setLightIntensity] = useState(50);
  const [mode, setMode] = useState<'photodiode' | 'phototransistor'>('photodiode');
  const [bias, setBias] = useState(5);

  const photocurrent = (lightIntensity / 100) * (mode === 'photodiode' ? 0.001 : 0.05);
  const outputVoltage = bias - (photocurrent * 1000);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold text-purple-400 mb-4">Photo Devices</h2>
        
        <div className="flex gap-2 mb-4">
          <button onClick={() => setMode('photodiode')} 
                  className={`flex-1 py-2 rounded-lg font-bold ${mode === 'photodiode' ? 'bg-blue-600' : 'bg-gray-700'}`}>
            Photodiode
          </button>
          <button onClick={() => setMode('phototransistor')} 
                  className={`flex-1 py-2 rounded-lg font-bold ${mode === 'phototransistor' ? 'bg-green-600' : 'bg-gray-700'}`}>
            Phototransistor
          </button>
        </div>

        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <svg viewBox="0 0 350 250" className="w-full">
            {/* Light source */}
            <circle cx="80" cy="100" r="30" fill={`rgba(255, 200, 50, ${lightIntensity / 100})`} />
            <text x="80" y="105" textAnchor="middle" fill="black" fontSize="20">☀️</text>
            
            {/* Light rays */}
            {[...Array(5)].map((_, i) => (
              <line 
                key={i}
                x1="110" y1={80 + i * 10} 
                x2="150" y2={90 + i * 5}
                stroke={`rgba(255, 200, 50, ${lightIntensity / 100})`}
                strokeWidth="2"
                strokeDasharray="5,3"
              />
            ))}
            
            {/* Device */}
            <rect x="150" y="70" width="60" height="60" fill="#1a1a2e" stroke="#8b5cf6" strokeWidth="2" rx="5" />
            
            {mode === 'photodiode' ? (
              <>
                <polygon points="165,85 165,115 195,100" fill="#8b5cf6" />
                <line x1="195" y1="85" x2="195" y2="115" stroke="#8b5cf6" strokeWidth="2" />
              </>
            ) : (
              <>
                <circle cx="180" cy="100" r="20" fill="none" stroke="#8b5cf6" strokeWidth="2" />
                <line x1="165" y1="100" x2="180" y2="100" stroke="#8b5cf6" strokeWidth="2" />
                <line x1="180" y1="85" x2="195" y2="75" stroke="#8b5cf6" strokeWidth="2" />
                <line x1="180" y1="115" x2="195" y2="125" stroke="#8b5cf6" strokeWidth="2" />
              </>
            )}
            
            {/* Circuit */}
            <line x1="210" y1="100" x2="280" y2="100" stroke="#10b981" strokeWidth="2" />
            <rect x="280" y="85" width="30" height="30" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" rx="3" />
            <text x="295" y="105" textAnchor="middle" fill="white" fontSize="10">R</text>
            <line x1="295" y1="115" x2="295" y2="150" stroke="#10b981" strokeWidth="2" />
            
            {/* Output */}
            <text x="250" y="80" fill="#f59e0b" fontSize="10">
              I = {(photocurrent * 1000000).toFixed(1)}µA
            </text>
            <text x="250" y="180" fill="#10b981" fontSize="11">
              Vout = {Math.max(0, outputVoltage).toFixed(2)}V
            </text>
          </svg>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-gray-300 text-sm">Light Intensity: {lightIntensity}%</label>
            <input type="range" min="0" max="100" value={lightIntensity} 
                   onChange={(e) => setLightIntensity(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-gray-300 text-sm">Bias Voltage: {bias}V</label>
            <input type="range" min="3" max="12" step="0.5" value={bias} 
                   onChange={(e) => setBias(Number(e.target.value))} className="w-full" />
          </div>
        </div>
      </div>

      <div>
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-white mb-3">📊 Measurements</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-yellow-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Light Level</p>
              <p className="text-2xl font-bold text-yellow-400">{lightIntensity}%</p>
            </div>
            <div className="bg-blue-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Photocurrent</p>
              <p className="text-xl font-bold text-blue-400">{(photocurrent * 1000000).toFixed(1)} µA</p>
            </div>
            <div className="bg-green-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Output Voltage</p>
              <p className="text-xl font-bold text-green-400">{Math.max(0, outputVoltage).toFixed(2)}V</p>
            </div>
            <div className="bg-purple-900/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Sensitivity</p>
              <p className="text-xl font-bold text-purple-400">
                {mode === 'photodiode' ? 'High Speed' : 'High Gain'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-4">
          <h3 className="text-lg font-bold text-white mb-3">📚 Comparison</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400">
                <th className="text-left p-2">Property</th>
                <th className="text-center p-2">Photodiode</th>
                <th className="text-center p-2">Phototransistor</th>
              </tr>
            </thead>
            <tbody className="text-white">
              <tr className="border-t border-gray-700">
                <td className="p-2">Speed</td>
                <td className="text-center p-2 text-green-400">Fast</td>
                <td className="text-center p-2 text-yellow-400">Slower</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="p-2">Sensitivity</td>
                <td className="text-center p-2 text-yellow-400">Lower</td>
                <td className="text-center p-2 text-green-400">Higher</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="p-2">Current</td>
                <td className="text-center p-2">µA range</td>
                <td className="text-center p-2">mA range</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
