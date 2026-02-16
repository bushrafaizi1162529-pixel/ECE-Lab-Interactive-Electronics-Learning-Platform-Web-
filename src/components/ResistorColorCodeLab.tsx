import { useState } from 'react';

interface Props {
  onBack: () => void;
}

const COLORS = [
  { name: 'Black', value: 0, multiplier: 1, hex: '#000000', tolerance: null },
  { name: 'Brown', value: 1, multiplier: 10, hex: '#8B4513', tolerance: 1 },
  { name: 'Red', value: 2, multiplier: 100, hex: '#FF0000', tolerance: 2 },
  { name: 'Orange', value: 3, multiplier: 1000, hex: '#FFA500', tolerance: null },
  { name: 'Yellow', value: 4, multiplier: 10000, hex: '#FFFF00', tolerance: null },
  { name: 'Green', value: 5, multiplier: 100000, hex: '#00FF00', tolerance: 0.5 },
  { name: 'Blue', value: 6, multiplier: 1000000, hex: '#0000FF', tolerance: 0.25 },
  { name: 'Violet', value: 7, multiplier: 10000000, hex: '#EE82EE', tolerance: 0.1 },
  { name: 'Gray', value: 8, multiplier: 100000000, hex: '#808080', tolerance: 0.05 },
  { name: 'White', value: 9, multiplier: 1000000000, hex: '#FFFFFF', tolerance: null },
  { name: 'Gold', value: -1, multiplier: 0.1, hex: '#FFD700', tolerance: 5 },
  { name: 'Silver', value: -2, multiplier: 0.01, hex: '#C0C0C0', tolerance: 10 },
];

export default function ResistorColorCodeLab({ onBack }: Props) {
  const [bands, setBands] = useState([1, 0, 2, 10]); // Brown, Black, Red, Gold

  const digit1 = COLORS[bands[0]].value;
  const digit2 = COLORS[bands[1]].value;
  const multiplier = COLORS[bands[2]].multiplier;
  const toleranceColor = COLORS[bands[3]];
  const tolerance = toleranceColor.tolerance || 20;
  
  const resistance = (digit1 * 10 + digit2) * multiplier;
  
  const formatResistance = (r: number) => {
    if (r >= 1000000) return (r / 1000000).toFixed(2) + ' MΩ';
    if (r >= 1000) return (r / 1000).toFixed(2) + ' kΩ';
    return r.toFixed(2) + ' Ω';
  };

  const minR = resistance * (1 - tolerance / 100);
  const maxR = resistance * (1 + tolerance / 100);

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white p-4">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors">
        <span>←</span> Back to Labs
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
            🎨 Resistor Color Code
          </h1>
          <p className="text-gray-400 text-sm">Decode resistor values from color bands</p>
        </div>

        {/* Resistor Visualization */}
        <div className="bg-gray-900/80 rounded-xl p-6 border border-gray-700 mb-4">
          <svg viewBox="0 0 400 120" className="w-full max-w-lg mx-auto">
            {/* Wires */}
            <line x1="0" y1="60" x2="80" y2="60" stroke="#888" strokeWidth="4" />
            <line x1="320" y1="60" x2="400" y2="60" stroke="#888" strokeWidth="4" />
            
            {/* Resistor body */}
            <rect x="80" y="30" width="240" height="60" rx="10" fill="#D2B48C" stroke="#8B7355" strokeWidth="2" />
            
            {/* Color bands */}
            <rect x="110" y="25" width="25" height="70" rx="3" fill={COLORS[bands[0]].hex} stroke="#333" strokeWidth="1" />
            <rect x="150" y="25" width="25" height="70" rx="3" fill={COLORS[bands[1]].hex} stroke="#333" strokeWidth="1" />
            <rect x="190" y="25" width="25" height="70" rx="3" fill={COLORS[bands[2]].hex} stroke="#333" strokeWidth="1" />
            <rect x="260" y="25" width="25" height="70" rx="3" fill={COLORS[bands[3]].hex} stroke="#333" strokeWidth="1" />
            
            {/* Band labels */}
            <text x="122" y="115" textAnchor="middle" fill="#888" fontSize="10">1st</text>
            <text x="162" y="115" textAnchor="middle" fill="#888" fontSize="10">2nd</text>
            <text x="202" y="115" textAnchor="middle" fill="#888" fontSize="10">Mult</text>
            <text x="272" y="115" textAnchor="middle" fill="#888" fontSize="10">Tol</text>
          </svg>

          {/* Result Display */}
          <div className="text-center mt-4 bg-black/50 rounded-lg p-4">
            <p className="text-3xl font-bold text-yellow-400 mb-2">{formatResistance(resistance)}</p>
            <p className="text-sm text-gray-400">±{tolerance}% tolerance</p>
            <p className="text-xs text-gray-500 mt-1">
              Range: {formatResistance(minR)} - {formatResistance(maxR)}
            </p>
          </div>
        </div>

        {/* Band Selectors */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {['1st Digit', '2nd Digit', 'Multiplier', 'Tolerance'].map((label, bandIndex) => (
            <div key={label} className="bg-gray-900/80 rounded-xl p-3 border border-gray-700">
              <h4 className="text-sm font-bold text-gray-400 mb-2 text-center">{label}</h4>
              <div className="grid grid-cols-4 gap-1">
                {COLORS.filter((c, idx) => {
                  if (bandIndex === 0 || bandIndex === 1) return idx < 10; // Digits 0-9
                  if (bandIndex === 2) return true; // All for multiplier
                  return c.tolerance !== null; // Only with tolerance
                }).map((color) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      const newBands = [...bands];
                      newBands[bandIndex] = COLORS.findIndex(c => c.name === color.name);
                      setBands(newBands);
                    }}
                    className={`w-6 h-6 rounded border-2 transition-all ${
                      COLORS[bands[bandIndex]].name === color.name
                        ? 'border-white scale-110'
                        : 'border-transparent hover:border-gray-500'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Color Code Reference */}
        <div className="bg-gray-900/80 rounded-xl p-4 border border-gray-700">
          <h3 className="font-bold text-white mb-3 text-center">Color Code Reference</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-gray-400">
                  <th className="p-2">Color</th>
                  <th className="p-2">Digit</th>
                  <th className="p-2">Multiplier</th>
                  <th className="p-2">Tolerance</th>
                </tr>
              </thead>
              <tbody>
                {COLORS.slice(0, 10).map((color) => (
                  <tr key={color.name} className="border-t border-gray-800">
                    <td className="p-2 flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: color.hex, border: color.name === 'Black' ? '1px solid #333' : 'none' }} />
                      <span className="text-white">{color.name}</span>
                    </td>
                    <td className="p-2 text-center text-white">{color.value}</td>
                    <td className="p-2 text-center text-yellow-400">×{color.multiplier >= 1000000 ? (color.multiplier / 1000000) + 'M' : color.multiplier >= 1000 ? (color.multiplier / 1000) + 'k' : color.multiplier}</td>
                    <td className="p-2 text-center text-gray-400">{color.tolerance ? `±${color.tolerance}%` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-gray-500 text-xs mt-3">
            💡 Mnemonic: <span className="text-yellow-400">B</span>etter <span className="text-yellow-400">B</span>e <span className="text-yellow-400">R</span>ight <span className="text-yellow-400">O</span>r <span className="text-yellow-400">Y</span>our <span className="text-yellow-400">G</span>reat <span className="text-yellow-400">B</span>ig <span className="text-yellow-400">V</span>enture <span className="text-yellow-400">G</span>oes <span className="text-yellow-400">W</span>rong
          </p>
        </div>
      </div>
    </div>
  );
}
