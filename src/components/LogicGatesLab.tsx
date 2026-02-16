import { useState } from 'react';

interface Props {
  onBack: () => void;
}

type GateType = 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR' | 'XNOR';

const GATES: { type: GateType; inputs: number; ic: string }[] = [
  { type: 'AND', inputs: 2, ic: '7408' },
  { type: 'OR', inputs: 2, ic: '7432' },
  { type: 'NOT', inputs: 1, ic: '7404' },
  { type: 'NAND', inputs: 2, ic: '7400' },
  { type: 'NOR', inputs: 2, ic: '7402' },
  { type: 'XOR', inputs: 2, ic: '7486' },
  { type: 'XNOR', inputs: 2, ic: '74266' },
];

export default function LogicGatesLab({ onBack }: Props) {
  const [selectedGate, setSelectedGate] = useState<GateType>('AND');
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);

  const calculateOutput = () => {
    switch (selectedGate) {
      case 'AND': return inputA && inputB;
      case 'OR': return inputA || inputB;
      case 'NOT': return !inputA;
      case 'NAND': return !(inputA && inputB);
      case 'NOR': return !(inputA || inputB);
      case 'XOR': return inputA !== inputB;
      case 'XNOR': return inputA === inputB;
    }
  };

  const output = calculateOutput();
  const gate = GATES.find(g => g.type === selectedGate)!;

  const getExpression = () => {
    switch (selectedGate) {
      case 'AND': return 'Y = A · B';
      case 'OR': return 'Y = A + B';
      case 'NOT': return 'Y = Ā';
      case 'NAND': return 'Y = (A · B)\'';
      case 'NOR': return 'Y = (A + B)\'';
      case 'XOR': return 'Y = A ⊕ B';
      case 'XNOR': return 'Y = A ⊙ B';
    }
  };

  const getTruthTable = () => {
    const rows: { a: number; b?: number; out: number }[] = [];
    if (selectedGate === 'NOT') {
      rows.push({ a: 0, out: 1 }, { a: 1, out: 0 });
    } else {
      for (let a = 0; a <= 1; a++) {
        for (let b = 0; b <= 1; b++) {
          let out: number;
          switch (selectedGate) {
            case 'AND': out = a & b; break;
            case 'OR': out = a | b; break;
            case 'NAND': out = (a & b) ? 0 : 1; break;
            case 'NOR': out = (a | b) ? 0 : 1; break;
            case 'XOR': out = a ^ b; break;
            case 'XNOR': out = (a ^ b) ? 0 : 1; break;
            default: out = 0;
          }
          rows.push({ a, b, out });
        }
      }
    }
    return rows;
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white p-4">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors">
        <span>←</span> Back to Labs
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            🔲 Digital Logic Gates
          </h1>
          <p className="text-gray-400 text-sm">Interactive truth tables and gate simulator</p>
        </div>

        {/* Gate Selector */}
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {GATES.map(g => (
            <button
              key={g.type}
              onClick={() => setSelectedGate(g.type)}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                selectedGate === g.type
                  ? 'bg-cyan-500 text-black'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {g.type}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Interactive Gate */}
          <div className="bg-gray-900/80 rounded-xl p-4 border border-cyan-500/30">
            <h3 className="font-bold text-cyan-400 mb-3 text-center">{selectedGate} Gate</h3>
            <svg viewBox="0 0 280 160" className="w-full">
              <rect width="280" height="160" fill="#0d1117" />
              
              {/* Input A */}
              <g onClick={() => setInputA(!inputA)} className="cursor-pointer">
                <rect x="10" y="35" width="50" height="30" rx="5" fill={inputA ? '#22c55e' : '#374151'} stroke={inputA ? '#22c55e' : '#555'} strokeWidth="2" />
                <text x="35" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">A = {inputA ? 1 : 0}</text>
              </g>
              <line x1="60" y1="50" x2="90" y2="50" stroke={inputA ? '#22c55e' : '#666'} strokeWidth="3" />

              {/* Input B */}
              {gate.inputs > 1 && (
                <>
                  <g onClick={() => setInputB(!inputB)} className="cursor-pointer">
                    <rect x="10" y="95" width="50" height="30" rx="5" fill={inputB ? '#22c55e' : '#374151'} stroke={inputB ? '#22c55e' : '#555'} strokeWidth="2" />
                    <text x="35" y="115" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">B = {inputB ? 1 : 0}</text>
                  </g>
                  <line x1="60" y1="110" x2="90" y2="110" stroke={inputB ? '#22c55e' : '#666'} strokeWidth="3" />
                </>
              )}

              {/* Gate Symbol */}
              {selectedGate === 'AND' && (
                <path d="M90 30 L130 30 Q170 30 170 80 Q170 130 130 130 L90 130 Z" fill="#1a1a2e" stroke="#22c55e" strokeWidth="2" />
              )}
              {selectedGate === 'OR' && (
                <path d="M90 30 Q110 80 90 130 Q140 130 170 80 Q140 30 90 30" fill="#1a1a2e" stroke="#22c55e" strokeWidth="2" />
              )}
              {selectedGate === 'NOT' && (
                <>
                  <polygon points="90,30 90,130 160,80" fill="#1a1a2e" stroke="#22c55e" strokeWidth="2" />
                  <circle cx="168" cy="80" r="8" fill="#1a1a2e" stroke="#22c55e" strokeWidth="2" />
                </>
              )}
              {selectedGate === 'NAND' && (
                <>
                  <path d="M90 30 L130 30 Q170 30 170 80 Q170 130 130 130 L90 130 Z" fill="#1a1a2e" stroke="#22c55e" strokeWidth="2" />
                  <circle cx="178" cy="80" r="8" fill="#1a1a2e" stroke="#22c55e" strokeWidth="2" />
                </>
              )}
              {selectedGate === 'NOR' && (
                <>
                  <path d="M90 30 Q110 80 90 130 Q140 130 170 80 Q140 30 90 30" fill="#1a1a2e" stroke="#22c55e" strokeWidth="2" />
                  <circle cx="178" cy="80" r="8" fill="#1a1a2e" stroke="#22c55e" strokeWidth="2" />
                </>
              )}
              {selectedGate === 'XOR' && (
                <>
                  <path d="M95 30 Q115 80 95 130 Q145 130 175 80 Q145 30 95 30" fill="#1a1a2e" stroke="#22c55e" strokeWidth="2" />
                  <path d="M85 30 Q105 80 85 130" fill="none" stroke="#22c55e" strokeWidth="2" />
                </>
              )}
              {selectedGate === 'XNOR' && (
                <>
                  <path d="M95 30 Q115 80 95 130 Q145 130 165 80 Q145 30 95 30" fill="#1a1a2e" stroke="#22c55e" strokeWidth="2" />
                  <path d="M85 30 Q105 80 85 130" fill="none" stroke="#22c55e" strokeWidth="2" />
                  <circle cx="173" cy="80" r="8" fill="#1a1a2e" stroke="#22c55e" strokeWidth="2" />
                </>
              )}

              {/* Gate label */}
              <text x="130" y="85" textAnchor="middle" fill="#888" fontSize="12">{selectedGate}</text>

              {/* Output wire */}
              <line x1={selectedGate === 'NOT' ? 176 : (selectedGate === 'NAND' || selectedGate === 'NOR' || selectedGate === 'XNOR') ? 186 : 170} y1="80" x2="210" y2="80" stroke={output ? '#22c55e' : '#666'} strokeWidth="3" />

              {/* Output LED */}
              <g>
                <rect x="210" y="55" width="60" height="50" rx="8" fill={output ? '#22c55e' : '#1a1a2e'} stroke={output ? '#22c55e' : '#555'} strokeWidth="2" />
                <text x="240" y="75" textAnchor="middle" fill={output ? '#000' : '#888'} fontSize="10">OUTPUT</text>
                <text x="240" y="95" textAnchor="middle" fill={output ? '#000' : '#fff'} fontSize="16" fontWeight="bold">{output ? 1 : 0}</text>
                {output && (
                  <rect x="210" y="55" width="60" height="50" rx="8" fill="#22c55e" opacity="0.3">
                    <animate attributeName="opacity" values="0.3;0.5;0.3" dur="1s" repeatCount="indefinite" />
                  </rect>
                )}
              </g>
            </svg>

            {/* Expression & IC */}
            <div className="flex justify-center gap-4 mt-3">
              <div className="bg-black/50 rounded px-4 py-2">
                <span className="text-cyan-400 font-mono text-lg">{getExpression()}</span>
              </div>
              <div className="bg-black/50 rounded px-4 py-2">
                <span className="text-gray-400 text-sm">IC: </span>
                <span className="text-yellow-400 font-bold">{gate.ic}</span>
              </div>
            </div>

            <p className="text-center text-gray-500 text-xs mt-2">Click inputs to toggle</p>
          </div>

          {/* Truth Table */}
          <div className="bg-gray-900/80 rounded-xl p-4 border border-gray-700">
            <h3 className="font-bold text-white mb-3 text-center">Truth Table</h3>
            <table className="w-full text-center">
              <thead>
                <tr className="bg-gray-800">
                  <th className="py-2 px-4 text-cyan-400">A</th>
                  {gate.inputs > 1 && <th className="py-2 px-4 text-cyan-400">B</th>}
                  <th className="py-2 px-4 text-green-400">Y</th>
                </tr>
              </thead>
              <tbody>
                {getTruthTable().map((row, i) => {
                  const isCurrentRow = gate.inputs === 1 
                    ? (row.a === (inputA ? 1 : 0))
                    : (row.a === (inputA ? 1 : 0) && row.b === (inputB ? 1 : 0));
                  return (
                    <tr 
                      key={i} 
                      className={`border-t border-gray-700 ${isCurrentRow ? 'bg-cyan-500/20' : ''}`}
                    >
                      <td className={`py-2 font-mono ${row.a ? 'text-green-400' : 'text-gray-500'}`}>{row.a}</td>
                      {gate.inputs > 1 && (
                        <td className={`py-2 font-mono ${row.b ? 'text-green-400' : 'text-gray-500'}`}>{row.b}</td>
                      )}
                      <td className={`py-2 font-mono font-bold ${row.out ? 'text-green-400' : 'text-gray-500'}`}>{row.out}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Gate Description */}
            <div className="mt-4 bg-black/50 rounded p-3">
              <h4 className="text-sm font-bold text-gray-400 mb-1">Description</h4>
              <p className="text-xs text-gray-500">
                {selectedGate === 'AND' && 'Output is HIGH only when ALL inputs are HIGH.'}
                {selectedGate === 'OR' && 'Output is HIGH when ANY input is HIGH.'}
                {selectedGate === 'NOT' && 'Output is the inverse of the input (Inverter).'}
                {selectedGate === 'NAND' && 'NOT-AND: Output is LOW only when ALL inputs are HIGH.'}
                {selectedGate === 'NOR' && 'NOT-OR: Output is HIGH only when ALL inputs are LOW.'}
                {selectedGate === 'XOR' && 'Exclusive OR: Output is HIGH when inputs are DIFFERENT.'}
                {selectedGate === 'XNOR' && 'Exclusive NOR: Output is HIGH when inputs are SAME.'}
              </p>
            </div>
          </div>
        </div>

        {/* All Gates Reference */}
        <div className="mt-4 bg-gray-900/80 rounded-xl p-4 border border-gray-700">
          <h3 className="font-bold text-white mb-3 text-center">Quick Reference</h3>
          <div className="grid grid-cols-7 gap-2">
            {GATES.map(g => (
              <div 
                key={g.type}
                className={`text-center p-2 rounded ${selectedGate === g.type ? 'bg-cyan-500/20 border border-cyan-500' : 'bg-gray-800'}`}
              >
                <p className="text-xs font-bold text-cyan-400">{g.type}</p>
                <p className="text-[10px] text-gray-500">{g.ic}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
