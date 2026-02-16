import { useState, useEffect } from 'react';

type SubLab = 'logic-gates' | 'boolean' | 'combinational' | 'flipflops' | 'counters' | 'microcontroller';

export default function DigitalElectronicsLab({ onBack }: { onBack: () => void }) {
  const [subLab, setSubLab] = useState<SubLab>('logic-gates');

  const subLabs = [
    { id: 'logic-gates', name: 'Logic Gates', icon: '🔲' },
    { id: 'boolean', name: 'Boolean Algebra', icon: '📝' },
    { id: 'combinational', name: 'Combinational', icon: '🔀' },
    { id: 'flipflops', name: 'Flip-Flops', icon: '🔄' },
    { id: 'counters', name: 'Counters', icon: '🔢' },
    { id: 'microcontroller', name: 'Microcontroller', icon: '🎛️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-cyan-900 to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-4">
          ← Back to Labs
        </button>
        
        <h1 className="text-3xl font-bold text-white mb-6">🔲 Digital Electronics Lab</h1>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {subLabs.map(lab => (
            <button
              key={lab.id}
              onClick={() => setSubLab(lab.id as SubLab)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                subLab === lab.id
                  ? 'bg-cyan-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {lab.icon} {lab.name}
            </button>
          ))}
        </div>

        <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-gray-700">
          {subLab === 'logic-gates' && <LogicGatesLab />}
          {subLab === 'boolean' && <BooleanAlgebraLab />}
          {subLab === 'combinational' && <CombinationalLab />}
          {subLab === 'flipflops' && <FlipFlopsLab />}
          {subLab === 'counters' && <CountersLab />}
          {subLab === 'microcontroller' && <MicrocontrollerLab />}
        </div>
      </div>
    </div>
  );
}

// Logic Gates Lab
function LogicGatesLab() {
  const [gate, setGate] = useState<'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR' | 'XNOR'>('AND');
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);

  const gates = ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'] as const;

  const getOutput = () => {
    switch (gate) {
      case 'AND': return inputA && inputB;
      case 'OR': return inputA || inputB;
      case 'NOT': return !inputA;
      case 'NAND': return !(inputA && inputB);
      case 'NOR': return !(inputA || inputB);
      case 'XOR': return inputA !== inputB;
      case 'XNOR': return inputA === inputB;
    }
  };

  const output = getOutput();

  const getTruthTable = () => {
    const rows = [];
    for (let a = 0; a <= 1; a++) {
      for (let b = 0; b <= 1; b++) {
        let out = false;
        switch (gate) {
          case 'AND': out = Boolean(a && b); break;
          case 'OR': out = Boolean(a || b); break;
          case 'NOT': out = !Boolean(a); break;
          case 'NAND': out = !(a && b); break;
          case 'NOR': out = !(a || b); break;
          case 'XOR': out = Boolean(a) !== Boolean(b); break;
          case 'XNOR': out = Boolean(a) === Boolean(b); break;
        }
        rows.push({ a, b, out: out ? 1 : 0 });
      }
    }
    return rows;
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Logic Gates Simulator</h2>
        
        {/* Gate selector */}
        <div className="flex flex-wrap gap-2 mb-4">
          {gates.map(g => (
            <button
              key={g}
              onClick={() => setGate(g)}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                gate === g ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Gate visualization */}
        <div className="bg-gray-900 rounded-xl p-6">
          <svg viewBox="0 0 350 200" className="w-full">
            {/* Input A */}
            <line x1="30" y1="70" x2="100" y2="70" stroke={inputA ? '#10b981' : '#666'} strokeWidth="3" />
            <circle cx="20" cy="70" r="12" fill={inputA ? '#10b981' : '#1a1a2e'} stroke="#10b981" strokeWidth="2" 
                    className="cursor-pointer" onClick={() => setInputA(!inputA)} />
            <text x="20" y="75" textAnchor="middle" fill="white" fontSize="12">{inputA ? '1' : '0'}</text>
            <text x="45" y="60" fill="#10b981" fontSize="10">A</text>
            
            {/* Input B (if not NOT gate) */}
            {gate !== 'NOT' && (
              <>
                <line x1="30" y1="130" x2="100" y2="130" stroke={inputB ? '#10b981' : '#666'} strokeWidth="3" />
                <circle cx="20" cy="130" r="12" fill={inputB ? '#10b981' : '#1a1a2e'} stroke="#10b981" strokeWidth="2"
                        className="cursor-pointer" onClick={() => setInputB(!inputB)} />
                <text x="20" y="135" textAnchor="middle" fill="white" fontSize="12">{inputB ? '1' : '0'}</text>
                <text x="45" y="120" fill="#10b981" fontSize="10">B</text>
              </>
            )}
            
            {/* Gate symbol */}
            {gate === 'AND' && (
              <path d="M 100,50 L 100,150 L 150,150 Q 200,150 200,100 Q 200,50 150,50 Z" 
                    fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" />
            )}
            {gate === 'OR' && (
              <path d="M 100,50 Q 130,100 100,150 Q 160,150 200,100 Q 160,50 100,50" 
                    fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2" />
            )}
            {gate === 'NOT' && (
              <>
                <polygon points="100,50 100,150 180,100" fill="#1e3a5f" stroke="#ef4444" strokeWidth="2" />
                <circle cx="190" cy="100" r="10" fill="#1a1a2e" stroke="#ef4444" strokeWidth="2" />
              </>
            )}
            {gate === 'NAND' && (
              <>
                <path d="M 100,50 L 100,150 L 150,150 Q 200,150 200,100 Q 200,50 150,50 Z" 
                      fill="#1e3a5f" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="210" cy="100" r="10" fill="#1a1a2e" stroke="#f59e0b" strokeWidth="2" />
              </>
            )}
            {gate === 'NOR' && (
              <>
                <path d="M 100,50 Q 130,100 100,150 Q 160,150 200,100 Q 160,50 100,50" 
                      fill="#1e3a5f" stroke="#ec4899" strokeWidth="2" />
                <circle cx="210" cy="100" r="10" fill="#1a1a2e" stroke="#ec4899" strokeWidth="2" />
              </>
            )}
            {gate === 'XOR' && (
              <>
                <path d="M 90,50 Q 120,100 90,150" fill="none" stroke="#22c55e" strokeWidth="2" />
                <path d="M 100,50 Q 130,100 100,150 Q 160,150 200,100 Q 160,50 100,50" 
                      fill="#1e3a5f" stroke="#22c55e" strokeWidth="2" />
              </>
            )}
            {gate === 'XNOR' && (
              <>
                <path d="M 90,50 Q 120,100 90,150" fill="none" stroke="#06b6d4" strokeWidth="2" />
                <path d="M 100,50 Q 130,100 100,150 Q 160,150 200,100 Q 160,50 100,50" 
                      fill="#1e3a5f" stroke="#06b6d4" strokeWidth="2" />
                <circle cx="210" cy="100" r="10" fill="#1a1a2e" stroke="#06b6d4" strokeWidth="2" />
              </>
            )}
            
            {/* Output */}
            <line x1={gate === 'NOT' ? 200 : (gate === 'AND' || gate === 'OR' ? 200 : 220)} y1="100" x2="300" y2="100" 
                  stroke={output ? '#10b981' : '#666'} strokeWidth="3" />
            <circle cx="320" cy="100" r="15" fill={output ? '#10b981' : '#1a1a2e'} stroke="#10b981" strokeWidth="2">
              {output && <animate attributeName="r" values="15;18;15" dur="0.5s" repeatCount="indefinite" />}
            </circle>
            <text x="320" y="105" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">{output ? '1' : '0'}</text>
            <text x="320" y="135" textAnchor="middle" fill="#10b981" fontSize="10">OUT</text>
          </svg>
        </div>

        <p className="text-center text-gray-400 mt-3 text-sm">Click on input circles to toggle values</p>
      </div>

      <div>
        {/* Truth Table */}
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-white mb-3">📋 Truth Table</h3>
          <table className="w-full text-center">
            <thead>
              <tr className="text-cyan-400">
                <th className="p-2 border-b border-gray-700">A</th>
                {gate !== 'NOT' && <th className="p-2 border-b border-gray-700">B</th>}
                <th className="p-2 border-b border-gray-700">Output</th>
              </tr>
            </thead>
            <tbody>
              {getTruthTable().slice(0, gate === 'NOT' ? 2 : 4).map((row, i) => (
                <tr key={i} className={
                  (row.a === (inputA ? 1 : 0) && (gate === 'NOT' || row.b === (inputB ? 1 : 0)))
                    ? 'bg-cyan-900/50'
                    : ''
                }>
                  <td className="p-2 border-b border-gray-700">{row.a}</td>
                  {gate !== 'NOT' && <td className="p-2 border-b border-gray-700">{row.b}</td>}
                  <td className={`p-2 border-b border-gray-700 font-bold ${row.out ? 'text-green-400' : 'text-red-400'}`}>
                    {row.out}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Boolean Expression */}
        <div className="bg-gray-900 rounded-xl p-4">
          <h3 className="text-lg font-bold text-white mb-3">📐 Boolean Expression</h3>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <p className="text-2xl font-mono text-cyan-400">
              {gate === 'AND' && 'Y = A · B'}
              {gate === 'OR' && 'Y = A + B'}
              {gate === 'NOT' && "Y = A'"}
              {gate === 'NAND' && "(A · B)'"}
              {gate === 'NOR' && "(A + B)'"}
              {gate === 'XOR' && 'Y = A ⊕ B'}
              {gate === 'XNOR' && 'Y = A ⊙ B'}
            </p>
          </div>
          
          <div className="mt-4 text-sm text-gray-400">
            <p><span className="text-cyan-400">IC:</span> {
              gate === 'AND' ? '7408' :
              gate === 'OR' ? '7432' :
              gate === 'NOT' ? '7404' :
              gate === 'NAND' ? '7400' :
              gate === 'NOR' ? '7402' :
              gate === 'XOR' ? '7486' : '74266'
            }</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Boolean Algebra Lab
function BooleanAlgebraLab() {
  const [expression, setExpression] = useState('A AND B');
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const [c, setC] = useState(false);

  const evaluate = (expr: string, va: boolean, vb: boolean, vc: boolean): boolean => {
    let result = expr.toUpperCase()
      .replace(/\bA\b/g, va ? '1' : '0')
      .replace(/\bB\b/g, vb ? '1' : '0')
      .replace(/\bC\b/g, vc ? '1' : '0')
      .replace(/\bAND\b/g, '&&')
      .replace(/\bOR\b/g, '||')
      .replace(/\bNOT\b/g, '!')
      .replace(/'/g, '!')
      .replace(/·/g, '&&')
      .replace(/\+/g, '||');
    
    try {
      return eval(result);
    } catch {
      return false;
    }
  };

  const output = evaluate(expression, a, b, c);

  const laws = [
    { name: 'Identity', expr1: 'A + 0 = A', expr2: 'A · 1 = A' },
    { name: 'Null', expr1: 'A + 1 = 1', expr2: 'A · 0 = 0' },
    { name: 'Idempotent', expr1: 'A + A = A', expr2: 'A · A = A' },
    { name: 'Complement', expr1: "A + A' = 1", expr2: "A · A' = 0" },
    { name: 'De Morgan', expr1: "(A + B)' = A' · B'", expr2: "(A · B)' = A' + B'" },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Boolean Algebra Evaluator</h2>
        
        {/* Expression input */}
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <label className="text-gray-300 text-sm mb-2 block">Enter Boolean Expression:</label>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 font-mono"
            placeholder="e.g., A AND B, (A OR B) AND NOT C"
          />
          <p className="text-gray-500 text-xs mt-2">Use: AND, OR, NOT, ' (NOT), · (AND), + (OR)</p>
        </div>

        {/* Variable inputs */}
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <h3 className="text-white font-bold mb-3">Variable Values:</h3>
          <div className="flex gap-4">
            {[
              { name: 'A', value: a, setter: setA },
              { name: 'B', value: b, setter: setB },
              { name: 'C', value: c, setter: setC },
            ].map(v => (
              <button
                key={v.name}
                onClick={() => v.setter(!v.value)}
                className={`flex-1 py-4 rounded-xl font-bold text-xl transition-all ${
                  v.value ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400'
                }`}
              >
                {v.name} = {v.value ? '1' : '0'}
              </button>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className={`rounded-xl p-6 text-center ${output ? 'bg-green-900/50 border-2 border-green-500' : 'bg-red-900/50 border-2 border-red-500'}`}>
          <p className="text-gray-400 text-sm">Result:</p>
          <p className={`text-5xl font-bold ${output ? 'text-green-400' : 'text-red-400'}`}>
            {output ? '1 (TRUE)' : '0 (FALSE)'}
          </p>
        </div>
      </div>

      <div>
        {/* Boolean Laws */}
        <div className="bg-gray-900 rounded-xl p-4">
          <h3 className="text-lg font-bold text-white mb-4">📜 Boolean Laws</h3>
          <div className="space-y-3">
            {laws.map(law => (
              <div key={law.name} className="bg-gray-800 p-3 rounded-lg">
                <p className="text-cyan-400 font-bold text-sm mb-1">{law.name} Law</p>
                <div className="flex gap-4 font-mono text-sm">
                  <span className="text-green-400">{law.expr1}</span>
                  <span className="text-purple-400">{law.expr2}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick expressions */}
        <div className="mt-4 bg-gray-900 rounded-xl p-4">
          <h3 className="text-lg font-bold text-white mb-3">⚡ Quick Examples</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              'A AND B',
              'A OR B',
              'NOT A',
              "(A AND B)'",
              'A XOR B',
              '(A OR B) AND C',
            ].map(expr => (
              <button
                key={expr}
                onClick={() => setExpression(expr)}
                className="bg-gray-700 hover:bg-gray-600 text-gray-300 p-2 rounded-lg text-sm font-mono"
              >
                {expr}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Combinational Circuits Lab
function CombinationalLab() {
  const [circuit, setCircuit] = useState<'halfadder' | 'fulladder' | 'mux' | 'decoder'>('halfadder');
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const [cin, setCin] = useState(false);
  const [sel, setSel] = useState([false, false]);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Combinational Circuits</h2>
        
        {/* Circuit selector */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { id: 'halfadder', name: 'Half Adder' },
            { id: 'fulladder', name: 'Full Adder' },
            { id: 'mux', name: '4:1 MUX' },
            { id: 'decoder', name: '2:4 Decoder' },
          ].map(c => (
            <button
              key={c.id}
              onClick={() => setCircuit(c.id as typeof circuit)}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                circuit === c.id ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Circuit visualization */}
        <div className="bg-gray-900 rounded-xl p-4">
          {circuit === 'halfadder' && (
            <div>
              <svg viewBox="0 0 350 200" className="w-full">
                <rect x="100" y="40" width="150" height="120" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" rx="8" />
                <text x="175" y="105" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">HALF ADDER</text>
                
                {/* Inputs */}
                <line x1="30" y1="70" x2="100" y2="70" stroke={a ? '#10b981' : '#666'} strokeWidth="3" />
                <circle cx="20" cy="70" r="10" fill={a ? '#10b981' : '#1a1a2e'} stroke="#10b981" strokeWidth="2" 
                        className="cursor-pointer" onClick={() => setA(!a)} />
                <text x="20" y="75" textAnchor="middle" fill="white" fontSize="10">{a ? '1' : '0'}</text>
                <text x="60" y="60" fill="#10b981" fontSize="10">A</text>
                
                <line x1="30" y1="130" x2="100" y2="130" stroke={b ? '#10b981' : '#666'} strokeWidth="3" />
                <circle cx="20" cy="130" r="10" fill={b ? '#10b981' : '#1a1a2e'} stroke="#10b981" strokeWidth="2"
                        className="cursor-pointer" onClick={() => setB(!b)} />
                <text x="20" y="135" textAnchor="middle" fill="white" fontSize="10">{b ? '1' : '0'}</text>
                <text x="60" y="120" fill="#10b981" fontSize="10">B</text>
                
                {/* Outputs */}
                <line x1="250" y1="70" x2="320" y2="70" stroke={(a !== b) ? '#10b981' : '#666'} strokeWidth="3" />
                <circle cx="330" cy="70" r="10" fill={(a !== b) ? '#10b981' : '#1a1a2e'} stroke="#10b981" strokeWidth="2" />
                <text x="330" y="75" textAnchor="middle" fill="white" fontSize="10">{(a !== b) ? '1' : '0'}</text>
                <text x="285" y="60" fill="#f59e0b" fontSize="10">Sum</text>
                
                <line x1="250" y1="130" x2="320" y2="130" stroke={(a && b) ? '#10b981' : '#666'} strokeWidth="3" />
                <circle cx="330" cy="130" r="10" fill={(a && b) ? '#10b981' : '#1a1a2e'} stroke="#10b981" strokeWidth="2" />
                <text x="330" y="135" textAnchor="middle" fill="white" fontSize="10">{(a && b) ? '1' : '0'}</text>
                <text x="285" y="120" fill="#f59e0b" fontSize="10">Carry</text>
              </svg>
              
              <div className="mt-4 bg-gray-800 p-3 rounded-lg font-mono text-sm">
                <p className="text-cyan-400">Sum = A ⊕ B = {(a !== b) ? '1' : '0'}</p>
                <p className="text-purple-400">Carry = A · B = {(a && b) ? '1' : '0'}</p>
              </div>
            </div>
          )}

          {circuit === 'fulladder' && (
            <div>
              <svg viewBox="0 0 350 220" className="w-full">
                <rect x="100" y="30" width="150" height="160" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" rx="8" />
                <text x="175" y="115" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">FULL ADDER</text>
                
                {/* Inputs */}
                {[
                  { name: 'A', y: 60, val: a, set: setA },
                  { name: 'B', y: 110, val: b, set: setB },
                  { name: 'Cin', y: 160, val: cin, set: setCin },
                ].map(inp => (
                  <g key={inp.name}>
                    <line x1="30" y1={inp.y} x2="100" y2={inp.y} stroke={inp.val ? '#10b981' : '#666'} strokeWidth="3" />
                    <circle cx="20" cy={inp.y} r="10" fill={inp.val ? '#10b981' : '#1a1a2e'} stroke="#10b981" strokeWidth="2"
                            className="cursor-pointer" onClick={() => inp.set(!inp.val)} />
                    <text x="20" y={inp.y + 4} textAnchor="middle" fill="white" fontSize="10">{inp.val ? '1' : '0'}</text>
                    <text x="60" y={inp.y - 10} fill="#10b981" fontSize="10">{inp.name}</text>
                  </g>
                ))}
                
                {/* Outputs */}
                {(() => {
                  const sum = (a !== b) !== cin;
                  const cout = (a && b) || (cin && (a !== b));
                  return (
                    <>
                      <line x1="250" y1="80" x2="320" y2="80" stroke={sum ? '#10b981' : '#666'} strokeWidth="3" />
                      <circle cx="330" cy="80" r="10" fill={sum ? '#10b981' : '#1a1a2e'} stroke="#10b981" strokeWidth="2" />
                      <text x="330" y="84" textAnchor="middle" fill="white" fontSize="10">{sum ? '1' : '0'}</text>
                      <text x="285" y="70" fill="#f59e0b" fontSize="10">Sum</text>
                      
                      <line x1="250" y1="140" x2="320" y2="140" stroke={cout ? '#10b981' : '#666'} strokeWidth="3" />
                      <circle cx="330" cy="140" r="10" fill={cout ? '#10b981' : '#1a1a2e'} stroke="#10b981" strokeWidth="2" />
                      <text x="330" y="144" textAnchor="middle" fill="white" fontSize="10">{cout ? '1' : '0'}</text>
                      <text x="285" y="130" fill="#f59e0b" fontSize="10">Cout</text>
                    </>
                  );
                })()}
              </svg>
              
              <div className="mt-2 bg-gray-800 p-3 rounded-lg font-mono text-xs">
                <p className="text-cyan-400">Sum = A ⊕ B ⊕ Cin</p>
                <p className="text-purple-400">Cout = (A · B) + (Cin · (A ⊕ B))</p>
              </div>
            </div>
          )}

          {circuit === 'mux' && (
            <div>
              <p className="text-white mb-4">4:1 Multiplexer - Select one of four inputs</p>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className={`p-3 rounded-lg text-center ${
                    (sel[0] ? 2 : 0) + (sel[1] ? 1 : 0) === i ? 'bg-green-600' : 'bg-gray-700'
                  }`}>
                    <p className="text-gray-400 text-xs">I{i}</p>
                    <p className="text-white font-bold">{i % 2}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 justify-center mb-4">
                {[0, 1].map(i => (
                  <button
                    key={i}
                    onClick={() => {
                      const newSel = [...sel];
                      newSel[i] = !newSel[i];
                      setSel(newSel);
                    }}
                    className={`px-6 py-3 rounded-lg font-bold ${
                      sel[i] ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    S{i} = {sel[i] ? '1' : '0'}
                  </button>
                ))}
              </div>
              <div className="bg-green-900/50 p-4 rounded-lg text-center">
                <p className="text-gray-400">Output (Y):</p>
                <p className="text-3xl font-bold text-green-400">
                  I{(sel[0] ? 2 : 0) + (sel[1] ? 1 : 0)} selected
                </p>
              </div>
            </div>
          )}

          {circuit === 'decoder' && (
            <div>
              <p className="text-white mb-4">2:4 Decoder - Activates one of four outputs</p>
              <div className="flex gap-4 justify-center mb-4">
                {[0, 1].map(i => (
                  <button
                    key={i}
                    onClick={() => {
                      const newSel = [...sel];
                      newSel[i] = !newSel[i];
                      setSel(newSel);
                    }}
                    className={`px-6 py-3 rounded-lg font-bold ${
                      sel[i] ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    A{i} = {sel[i] ? '1' : '0'}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[0, 1, 2, 3].map(i => {
                  const active = (sel[1] ? 2 : 0) + (sel[0] ? 1 : 0) === i;
                  return (
                    <div key={i} className={`p-4 rounded-lg text-center transition-all ${
                      active ? 'bg-green-500 scale-110' : 'bg-gray-700'
                    }`}>
                      <p className="text-white font-bold">Y{i}</p>
                      <p className="text-2xl">{active ? '1' : '0'}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-white mb-3">📋 Truth Table</h3>
          {circuit === 'halfadder' && (
            <table className="w-full text-center text-sm">
              <thead>
                <tr className="text-cyan-400">
                  <th className="p-2 border-b border-gray-700">A</th>
                  <th className="p-2 border-b border-gray-700">B</th>
                  <th className="p-2 border-b border-gray-700">Sum</th>
                  <th className="p-2 border-b border-gray-700">Carry</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {[[0,0,0,0], [0,1,1,0], [1,0,1,0], [1,1,0,1]].map((row, i) => (
                  <tr key={i} className={a === Boolean(row[0]) && b === Boolean(row[1]) ? 'bg-cyan-900/50' : ''}>
                    {row.map((v, j) => (
                      <td key={j} className={`p-2 border-b border-gray-700 ${j >= 2 ? (v ? 'text-green-400' : 'text-gray-500') : ''}`}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {circuit === 'fulladder' && (
            <table className="w-full text-center text-xs">
              <thead>
                <tr className="text-cyan-400">
                  <th className="p-1 border-b border-gray-700">A</th>
                  <th className="p-1 border-b border-gray-700">B</th>
                  <th className="p-1 border-b border-gray-700">Cin</th>
                  <th className="p-1 border-b border-gray-700">Sum</th>
                  <th className="p-1 border-b border-gray-700">Cout</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {[
                  [0,0,0,0,0], [0,0,1,1,0], [0,1,0,1,0], [0,1,1,0,1],
                  [1,0,0,1,0], [1,0,1,0,1], [1,1,0,0,1], [1,1,1,1,1]
                ].map((row, i) => (
                  <tr key={i} className={
                    a === Boolean(row[0]) && b === Boolean(row[1]) && cin === Boolean(row[2]) ? 'bg-cyan-900/50' : ''
                  }>
                    {row.map((v, j) => (
                      <td key={j} className={`p-1 border-b border-gray-700 ${j >= 3 ? (v ? 'text-green-400' : 'text-gray-500') : ''}`}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="bg-gray-900 rounded-xl p-4">
          <h3 className="text-lg font-bold text-white mb-3">📚 Applications</h3>
          <ul className="text-gray-300 text-sm space-y-2">
            {circuit === 'halfadder' && (
              <>
                <li>• LSB addition in multi-bit adders</li>
                <li>• Building block for full adders</li>
                <li>• Simple binary arithmetic</li>
              </>
            )}
            {circuit === 'fulladder' && (
              <>
                <li>• Multi-bit binary addition (ripple carry)</li>
                <li>• ALU arithmetic operations</li>
                <li>• Digital signal processing</li>
              </>
            )}
            {circuit === 'mux' && (
              <>
                <li>• Data selection/routing</li>
                <li>• Implementing logic functions</li>
                <li>• Memory address decoding</li>
              </>
            )}
            {circuit === 'decoder' && (
              <>
                <li>• Memory address decoding</li>
                <li>• Seven-segment displays</li>
                <li>• Instruction decoding in CPUs</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Flip-Flops Lab
function FlipFlopsLab() {
  const [ffType, setFfType] = useState<'sr' | 'd' | 'jk' | 't'>('sr');
  const [s, setS] = useState(false);
  const [r, setR] = useState(false);
  const [d, setD] = useState(false);
  const [j, setJ] = useState(false);
  const [k, setK] = useState(false);
  const [t, setT] = useState(false);
  const [q, setQ] = useState(false);
  const [clk, setClk] = useState(false);

  const clock = () => {
    setClk(true);
    setTimeout(() => {
      switch (ffType) {
        case 'sr':
          if (s && !r) setQ(true);
          else if (!s && r) setQ(false);
          break;
        case 'd':
          setQ(d);
          break;
        case 'jk':
          if (j && !k) setQ(true);
          else if (!j && k) setQ(false);
          else if (j && k) setQ(!q);
          break;
        case 't':
          if (t) setQ(!q);
          break;
      }
      setClk(false);
    }, 200);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Flip-Flops</h2>
        
        {/* FF selector */}
        <div className="flex gap-2 mb-4">
          {[
            { id: 'sr', name: 'SR' },
            { id: 'd', name: 'D' },
            { id: 'jk', name: 'JK' },
            { id: 't', name: 'T' },
          ].map(ff => (
            <button
              key={ff.id}
              onClick={() => setFfType(ff.id as typeof ffType)}
              className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                ffType === ff.id ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              {ff.name}
            </button>
          ))}
        </div>

        {/* FF visualization */}
        <div className="bg-gray-900 rounded-xl p-4">
          <svg viewBox="0 0 350 200" className="w-full">
            <rect x="100" y="30" width="150" height="140" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" rx="8" />
            <text x="175" y="105" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">{ffType.toUpperCase()} FF</text>
            
            {/* Clock */}
            <line x1="175" y1="170" x2="175" y2="200" stroke={clk ? '#f59e0b' : '#666'} strokeWidth="3" />
            <polygon points="165,170 185,170 175,155" fill={clk ? '#f59e0b' : '#666'} />
            <text x="175" y="215" textAnchor="middle" fill="#f59e0b" fontSize="10">CLK</text>
            
            {/* Inputs based on type */}
            {ffType === 'sr' && (
              <>
                <line x1="30" y1="60" x2="100" y2="60" stroke={s ? '#10b981' : '#666'} strokeWidth="3" />
                <circle cx="20" cy="60" r="10" fill={s ? '#10b981' : '#1a1a2e'} stroke="#10b981" strokeWidth="2"
                        className="cursor-pointer" onClick={() => setS(!s)} />
                <text x="20" y="64" textAnchor="middle" fill="white" fontSize="10">{s ? '1' : '0'}</text>
                <text x="60" y="50" fill="#10b981" fontSize="12">S</text>
                
                <line x1="30" y1="140" x2="100" y2="140" stroke={r ? '#10b981' : '#666'} strokeWidth="3" />
                <circle cx="20" cy="140" r="10" fill={r ? '#10b981' : '#1a1a2e'} stroke="#10b981" strokeWidth="2"
                        className="cursor-pointer" onClick={() => setR(!r)} />
                <text x="20" y="144" textAnchor="middle" fill="white" fontSize="10">{r ? '1' : '0'}</text>
                <text x="60" y="130" fill="#ef4444" fontSize="12">R</text>
              </>
            )}
            
            {ffType === 'd' && (
              <>
                <line x1="30" y1="100" x2="100" y2="100" stroke={d ? '#10b981' : '#666'} strokeWidth="3" />
                <circle cx="20" cy="100" r="10" fill={d ? '#10b981' : '#1a1a2e'} stroke="#10b981" strokeWidth="2"
                        className="cursor-pointer" onClick={() => setD(!d)} />
                <text x="20" y="104" textAnchor="middle" fill="white" fontSize="10">{d ? '1' : '0'}</text>
                <text x="60" y="90" fill="#10b981" fontSize="12">D</text>
              </>
            )}
            
            {ffType === 'jk' && (
              <>
                <line x1="30" y1="60" x2="100" y2="60" stroke={j ? '#10b981' : '#666'} strokeWidth="3" />
                <circle cx="20" cy="60" r="10" fill={j ? '#10b981' : '#1a1a2e'} stroke="#10b981" strokeWidth="2"
                        className="cursor-pointer" onClick={() => setJ(!j)} />
                <text x="20" y="64" textAnchor="middle" fill="white" fontSize="10">{j ? '1' : '0'}</text>
                <text x="60" y="50" fill="#10b981" fontSize="12">J</text>
                
                <line x1="30" y1="140" x2="100" y2="140" stroke={k ? '#10b981' : '#666'} strokeWidth="3" />
                <circle cx="20" cy="140" r="10" fill={k ? '#10b981' : '#1a1a2e'} stroke="#10b981" strokeWidth="2"
                        className="cursor-pointer" onClick={() => setK(!k)} />
                <text x="20" y="144" textAnchor="middle" fill="white" fontSize="10">{k ? '1' : '0'}</text>
                <text x="60" y="130" fill="#ef4444" fontSize="12">K</text>
              </>
            )}
            
            {ffType === 't' && (
              <>
                <line x1="30" y1="100" x2="100" y2="100" stroke={t ? '#10b981' : '#666'} strokeWidth="3" />
                <circle cx="20" cy="100" r="10" fill={t ? '#10b981' : '#1a1a2e'} stroke="#10b981" strokeWidth="2"
                        className="cursor-pointer" onClick={() => setT(!t)} />
                <text x="20" y="104" textAnchor="middle" fill="white" fontSize="10">{t ? '1' : '0'}</text>
                <text x="60" y="90" fill="#10b981" fontSize="12">T</text>
              </>
            )}
            
            {/* Outputs */}
            <line x1="250" y1="70" x2="320" y2="70" stroke={q ? '#10b981' : '#666'} strokeWidth="3" />
            <circle cx="330" cy="70" r="12" fill={q ? '#10b981' : '#1a1a2e'} stroke="#10b981" strokeWidth="2" />
            <text x="330" y="74" textAnchor="middle" fill="white" fontSize="12">{q ? '1' : '0'}</text>
            <text x="285" y="60" fill="#f59e0b" fontSize="12">Q</text>
            
            <line x1="250" y1="130" x2="320" y2="130" stroke={!q ? '#10b981' : '#666'} strokeWidth="3" />
            <circle cx="330" cy="130" r="12" fill={!q ? '#10b981' : '#1a1a2e'} stroke="#10b981" strokeWidth="2" />
            <text x="330" y="134" textAnchor="middle" fill="white" fontSize="12">{!q ? '1' : '0'}</text>
            <text x="285" y="120" fill="#f59e0b" fontSize="12">Q'</text>
          </svg>
          
          {/* Clock button */}
          <button
            onClick={clock}
            disabled={clk}
            className={`w-full mt-4 py-3 rounded-xl font-bold text-lg transition-all ${
              clk ? 'bg-yellow-500 text-black' : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
          >
            {clk ? '⏱️ Clocking...' : '🕐 Apply Clock Pulse'}
          </button>
        </div>
      </div>

      <div>
        {/* Current state */}
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-white mb-3">📊 Current State</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl text-center ${q ? 'bg-green-900/50 border-2 border-green-500' : 'bg-gray-700'}`}>
              <p className="text-gray-400 text-sm">Q</p>
              <p className={`text-4xl font-bold ${q ? 'text-green-400' : 'text-gray-500'}`}>{q ? '1' : '0'}</p>
            </div>
            <div className={`p-4 rounded-xl text-center ${!q ? 'bg-red-900/50 border-2 border-red-500' : 'bg-gray-700'}`}>
              <p className="text-gray-400 text-sm">Q'</p>
              <p className={`text-4xl font-bold ${!q ? 'text-red-400' : 'text-gray-500'}`}>{!q ? '1' : '0'}</p>
            </div>
          </div>
        </div>

        {/* Characteristic */}
        <div className="bg-gray-900 rounded-xl p-4">
          <h3 className="text-lg font-bold text-white mb-3">📐 Characteristic</h3>
          <div className="bg-gray-800 p-4 rounded-lg">
            {ffType === 'sr' && (
              <>
                <p className="text-cyan-400 font-mono">If S=1, R=0: Q → 1 (SET)</p>
                <p className="text-cyan-400 font-mono">If S=0, R=1: Q → 0 (RESET)</p>
                <p className="text-red-400 font-mono">If S=1, R=1: Invalid!</p>
              </>
            )}
            {ffType === 'd' && (
              <p className="text-cyan-400 font-mono">Q(next) = D</p>
            )}
            {ffType === 'jk' && (
              <>
                <p className="text-cyan-400 font-mono">J=0, K=0: No change</p>
                <p className="text-cyan-400 font-mono">J=1, K=0: SET (Q=1)</p>
                <p className="text-cyan-400 font-mono">J=0, K=1: RESET (Q=0)</p>
                <p className="text-cyan-400 font-mono">J=1, K=1: TOGGLE</p>
              </>
            )}
            {ffType === 't' && (
              <>
                <p className="text-cyan-400 font-mono">T=0: No change</p>
                <p className="text-cyan-400 font-mono">T=1: TOGGLE (Q → Q')</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Counters Lab
function CountersLab() {
  const [counterType, setCounterType] = useState<'binary' | 'decade' | 'updown'>('binary');
  const [count, setCount] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const [isRunning, setIsRunning] = useState(false);

  const maxCount = counterType === 'decade' ? 9 : 15;

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setCount(c => {
        if (direction === 'up') {
          return c >= maxCount ? 0 : c + 1;
        } else {
          return c <= 0 ? maxCount : c - 1;
        }
      });
    }, 500);
    return () => clearInterval(interval);
  }, [isRunning, direction, maxCount]);

  const binary = count.toString(2).padStart(4, '0');

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Digital Counters</h2>
        
        {/* Counter type */}
        <div className="flex gap-2 mb-4">
          {[
            { id: 'binary', name: '4-bit Binary' },
            { id: 'decade', name: 'Decade (0-9)' },
            { id: 'updown', name: 'Up/Down' },
          ].map(ct => (
            <button
              key={ct.id}
              onClick={() => { setCounterType(ct.id as typeof counterType); setCount(0); }}
              className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${
                counterType === ct.id ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              {ct.name}
            </button>
          ))}
        </div>

        {/* Counter display */}
        <div className="bg-gray-900 rounded-xl p-6">
          {/* Binary LEDs */}
          <div className="flex justify-center gap-4 mb-6">
            {binary.split('').map((bit, i) => (
              <div key={i} className="text-center">
                <div className={`w-12 h-12 rounded-full ${
                  bit === '1' ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-gray-700'
                } flex items-center justify-center mb-2`}>
                  <span className="text-white font-bold text-xl">{bit}</span>
                </div>
                <span className="text-gray-400 text-xs">Q{3 - i}</span>
              </div>
            ))}
          </div>

          {/* Decimal display */}
          <div className="bg-black rounded-xl p-6 text-center mb-6">
            <p className="text-gray-500 text-sm">COUNT</p>
            <p className="text-6xl font-mono font-bold text-green-400" style={{ textShadow: '0 0 20px #22c55e' }}>
              {count.toString().padStart(2, '0')}
            </p>
            <p className="text-gray-500 text-sm mt-2">Binary: {binary}</p>
          </div>

          {/* Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex-1 py-3 rounded-lg font-bold ${
                isRunning ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
              }`}
            >
              {isRunning ? '⏹ Stop' : '▶ Start'}
            </button>
            <button
              onClick={() => setCount(c => direction === 'up' ? (c >= maxCount ? 0 : c + 1) : (c <= 0 ? maxCount : c - 1))}
              disabled={isRunning}
              className="flex-1 py-3 rounded-lg font-bold bg-gray-700 text-white disabled:opacity-50"
            >
              ⏭ Step
            </button>
            <button
              onClick={() => setCount(0)}
              className="flex-1 py-3 rounded-lg font-bold bg-gray-700 text-white"
            >
              ↺ Reset
            </button>
          </div>

          {counterType === 'updown' && (
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setDirection('up')}
                className={`flex-1 py-2 rounded-lg font-bold ${
                  direction === 'up' ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                ↑ Count Up
              </button>
              <button
                onClick={() => setDirection('down')}
                className={`flex-1 py-2 rounded-lg font-bold ${
                  direction === 'down' ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                ↓ Count Down
              </button>
            </div>
          )}
        </div>
      </div>

      <div>
        {/* Counter sequence */}
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-white mb-3">📊 Count Sequence</h3>
          <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
            {[...Array(maxCount + 1)].map((_, i) => (
              <div
                key={i}
                className={`p-2 rounded text-center text-sm ${
                  count === i ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-gray-400'
                }`}
              >
                <p className="font-bold">{i}</p>
                <p className="text-xs font-mono">{i.toString(2).padStart(4, '0')}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="bg-gray-900 rounded-xl p-4">
          <h3 className="text-lg font-bold text-white mb-3">📚 Counter Types</h3>
          <div className="space-y-3 text-sm">
            <div className={`p-3 rounded-lg ${counterType === 'binary' ? 'bg-cyan-900/50 border border-cyan-500' : 'bg-gray-800'}`}>
              <p className="font-bold text-cyan-400">4-bit Binary Counter</p>
              <p className="text-gray-400">Counts 0-15 (0000-1111)</p>
            </div>
            <div className={`p-3 rounded-lg ${counterType === 'decade' ? 'bg-cyan-900/50 border border-cyan-500' : 'bg-gray-800'}`}>
              <p className="font-bold text-cyan-400">Decade Counter (BCD)</p>
              <p className="text-gray-400">Counts 0-9, resets at 10</p>
            </div>
            <div className={`p-3 rounded-lg ${counterType === 'updown' ? 'bg-cyan-900/50 border border-cyan-500' : 'bg-gray-800'}`}>
              <p className="font-bold text-cyan-400">Up/Down Counter</p>
              <p className="text-gray-400">Bidirectional counting</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Microcontroller Lab
function MicrocontrollerLab() {
  const [pins, setPins] = useState<boolean[]>(Array(8).fill(false));
  const [program, setProgram] = useState<'blink' | 'chase' | 'binary' | 'custom'>('blink');
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      setStep(s => s + 1);
      
      setPins(prev => {
        const newPins = [...prev];
        switch (program) {
          case 'blink':
            return newPins.map(() => step % 2 === 0);
          case 'chase':
            return newPins.map((_, i) => i === step % 8);
          case 'binary':
            const val = step % 256;
            return newPins.map((_, i) => Boolean(val & (1 << (7 - i))));
          default:
            return prev;
        }
      });
    }, 300);
    
    return () => clearInterval(interval);
  }, [isRunning, program, step]);

  const togglePin = (index: number) => {
    if (program === 'custom' && !isRunning) {
      setPins(prev => {
        const newPins = [...prev];
        newPins[index] = !newPins[index];
        return newPins;
      });
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Microcontroller GPIO Simulator</h2>
        
        {/* MCU visualization */}
        <div className="bg-gray-900 rounded-xl p-6">
          <svg viewBox="0 0 350 250" className="w-full">
            {/* MCU chip */}
            <rect x="100" y="60" width="150" height="130" fill="#1a1a2e" stroke="#3b82f6" strokeWidth="2" rx="8" />
            <text x="175" y="130" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">ATmega328</text>
            <text x="175" y="150" textAnchor="middle" fill="#666" fontSize="10">Microcontroller</text>
            
            {/* Pin 1 marker */}
            <circle cx="115" cy="75" r="4" fill="#f59e0b" />
            
            {/* GPIO Pins (Port D) */}
            {pins.map((on, i) => (
              <g key={i}>
                {/* Pin */}
                <rect x="250" y={70 + i * 14} width="30" height="10" fill="#666" stroke="#888" />
                <text x="265" y={78 + i * 14} textAnchor="middle" fill="white" fontSize="8">D{i}</text>
                
                {/* LED */}
                <circle 
                  cx="310" 
                  cy={75 + i * 14} 
                  r="8" 
                  fill={on ? '#22c55e' : '#1a1a2e'} 
                  stroke="#22c55e" 
                  strokeWidth="2"
                  className="cursor-pointer"
                  onClick={() => togglePin(i)}
                />
                {on && (
                  <circle cx="310" cy={75 + i * 14} r="12" fill="#22c55e" opacity="0.3">
                    <animate attributeName="r" values="12;16;12" dur="0.5s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            ))}
            
            {/* Power pins */}
            <rect x="70" y="80" width="30" height="10" fill="#ef4444" stroke="#ef4444" />
            <text x="60" y="88" textAnchor="end" fill="#ef4444" fontSize="8">VCC</text>
            <rect x="70" y="100" width="30" height="10" fill="#333" stroke="#666" />
            <text x="60" y="108" textAnchor="end" fill="#666" fontSize="8">GND</text>
            
            {/* Crystal */}
            <rect x="125" y="190" width="40" height="15" fill="#444" stroke="#888" rx="3" />
            <text x="145" y="200" textAnchor="middle" fill="white" fontSize="7">16MHz</text>
          </svg>
        </div>

        {/* Program selector */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {[
            { id: 'blink', name: '💡 Blink All' },
            { id: 'chase', name: '🏃 LED Chase' },
            { id: 'binary', name: '🔢 Binary Count' },
            { id: 'custom', name: '✏️ Custom' },
          ].map(p => (
            <button
              key={p.id}
              onClick={() => { setProgram(p.id as typeof program); setStep(0); }}
              className={`py-2 rounded-lg font-bold text-sm transition-all ${
                program === p.id ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Control buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex-1 py-3 rounded-lg font-bold ${
              isRunning ? 'bg-red-500' : 'bg-green-500'
            } text-white`}
          >
            {isRunning ? '⏹ Stop' : '▶ Run Program'}
          </button>
          <button
            onClick={() => { setPins(Array(8).fill(false)); setStep(0); }}
            className="px-6 py-3 rounded-lg font-bold bg-gray-700 text-white"
          >
            ↺ Reset
          </button>
        </div>
      </div>

      <div>
        {/* Code display */}
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <h3 className="text-lg font-bold text-white mb-3">📝 Arduino Code</h3>
          <pre className="bg-black p-4 rounded-lg text-xs font-mono overflow-x-auto">
            <code className="text-green-400">
              {program === 'blink' && `void setup() {
  DDRD = 0xFF; // All pins output
}

void loop() {
  PORTD = 0xFF; // All HIGH
  delay(300);
  PORTD = 0x00; // All LOW
  delay(300);
}`}
              {program === 'chase' && `int led = 0;

void setup() {
  DDRD = 0xFF;
}

void loop() {
  PORTD = (1 << led);
  led = (led + 1) % 8;
  delay(300);
}`}
              {program === 'binary' && `int count = 0;

void setup() {
  DDRD = 0xFF;
}

void loop() {
  PORTD = count;
  count = (count + 1) % 256;
  delay(300);
}`}
              {program === 'custom' && `// Custom mode
// Click LEDs to toggle
// Write your own pattern!

void setup() {
  DDRD = 0xFF;
}

void loop() {
  // Your code here
}`}
            </code>
          </pre>
        </div>

        {/* Port register */}
        <div className="bg-gray-900 rounded-xl p-4">
          <h3 className="text-lg font-bold text-white mb-3">📊 Port D Register</h3>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              {[7, 6, 5, 4, 3, 2, 1, 0].map(i => (
                <span key={i} className="text-gray-400 text-xs">D{i}</span>
              ))}
            </div>
            <div className="flex justify-between">
              {pins.map((on, i) => (
                <span key={i} className={`text-lg font-mono font-bold ${on ? 'text-green-400' : 'text-gray-600'}`}>
                  {on ? '1' : '0'}
                </span>
              ))}
            </div>
            <p className="text-center mt-3 font-mono text-cyan-400">
              PORTD = 0x{parseInt(pins.map(p => p ? '1' : '0').join(''), 2).toString(16).toUpperCase().padStart(2, '0')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
