import { useState } from 'react';

interface Props {
  onBack: () => void;
}

interface Component {
  id: string;
  name: string;
  category: string;
  symbol: string;
  description: string;
  properties: string[];
  applications: string[];
}

const COMPONENTS: Component[] = [
  {
    id: 'resistor',
    name: 'Resistor',
    category: 'Passive',
    symbol: '⏛',
    description: 'Limits current flow and provides voltage drop in circuits.',
    properties: ['Resistance (Ω)', 'Power Rating (W)', 'Tolerance (%)'],
    applications: ['Current limiting', 'Voltage dividers', 'Pull-up/Pull-down']
  },
  {
    id: 'capacitor',
    name: 'Capacitor',
    category: 'Passive',
    symbol: '⫴',
    description: 'Stores electrical energy in an electric field.',
    properties: ['Capacitance (F)', 'Voltage Rating (V)', 'ESR'],
    applications: ['Filtering', 'Coupling', 'Energy storage', 'Timing']
  },
  {
    id: 'inductor',
    name: 'Inductor',
    category: 'Passive',
    symbol: '⌇',
    description: 'Stores energy in a magnetic field when current flows.',
    properties: ['Inductance (H)', 'Current Rating (A)', 'DC Resistance'],
    applications: ['Filters', 'Energy storage', 'Transformers']
  },
  {
    id: 'diode',
    name: 'Diode',
    category: 'Semiconductor',
    symbol: '▷|',
    description: 'Allows current flow in one direction only.',
    properties: ['Forward Voltage (V)', 'Max Current (A)', 'Reverse Voltage'],
    applications: ['Rectification', 'Protection', 'Signal clipping']
  },
  {
    id: 'led',
    name: 'LED',
    category: 'Semiconductor',
    symbol: '▷|*',
    description: 'Light Emitting Diode - emits light when forward biased.',
    properties: ['Forward Voltage', 'Max Current', 'Wavelength/Color'],
    applications: ['Indicators', 'Displays', 'Lighting', 'Optocouplers']
  },
  {
    id: 'transistor-bjt',
    name: 'BJT Transistor',
    category: 'Semiconductor',
    symbol: 'BJT',
    description: 'Bipolar Junction Transistor - current controlled amplifier.',
    properties: ['hFE (Gain)', 'Vce max', 'Ic max', 'Type (NPN/PNP)'],
    applications: ['Amplification', 'Switching', 'Current sources']
  },
  {
    id: 'transistor-mosfet',
    name: 'MOSFET',
    category: 'Semiconductor',
    symbol: 'MOS',
    description: 'Metal Oxide Field Effect Transistor - voltage controlled.',
    properties: ['Vgs(th)', 'Rds(on)', 'Id max', 'Type (N/P)'],
    applications: ['High-speed switching', 'Power control', 'Logic circuits']
  },
  {
    id: 'opamp',
    name: 'Op-Amp',
    category: 'IC',
    symbol: '▷',
    description: 'Operational Amplifier - high gain differential amplifier.',
    properties: ['Gain', 'Bandwidth', 'Slew Rate', 'Input Offset'],
    applications: ['Amplifiers', 'Filters', 'Comparators', 'Oscillators']
  },
  {
    id: '555',
    name: '555 Timer',
    category: 'IC',
    symbol: '555',
    description: 'Versatile timer IC for timing and oscillation.',
    properties: ['Operating Voltage', 'Output Current', 'Timing Range'],
    applications: ['PWM', 'Pulse generation', 'Oscillators', 'Delays']
  },
  {
    id: 'regulator',
    name: 'Voltage Regulator',
    category: 'IC',
    symbol: 'REG',
    description: 'Provides stable DC output voltage from varying input.',
    properties: ['Output Voltage', 'Max Current', 'Dropout Voltage'],
    applications: ['Power supplies', 'Battery charging', 'Reference voltage']
  },
  {
    id: 'relay',
    name: 'Relay',
    category: 'Electromechanical',
    symbol: 'RLY',
    description: 'Electrically operated switch using electromagnetic coil.',
    properties: ['Coil Voltage', 'Contact Rating', 'Type (SPST/DPDT)'],
    applications: ['Isolation', 'High power switching', 'Logic control']
  },
  {
    id: 'crystal',
    name: 'Crystal Oscillator',
    category: 'Passive',
    symbol: 'XTAL',
    description: 'Provides precise frequency reference using piezoelectric effect.',
    properties: ['Frequency', 'Load Capacitance', 'Tolerance (ppm)'],
    applications: ['Clock generation', 'Frequency reference', 'RF circuits']
  },
];

const CATEGORIES = ['All', 'Passive', 'Semiconductor', 'IC', 'Electromechanical'];

export default function ComponentLibraryLab({ onBack }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredComponents = COMPONENTS.filter(c => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Passive': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'Semiconductor': return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
      case 'IC': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'Electromechanical': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white p-4">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors">
        <span>←</span> Back to Labs
      </button>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            📚 Component Library
          </h1>
          <p className="text-gray-400 text-sm">Learn about electronic components</p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-wrap gap-3 mb-4">
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 min-w-[200px] px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-lg text-sm font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {/* Component Grid */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredComponents.map(component => (
              <div
                key={component.id}
                onClick={() => setSelectedComponent(component)}
                className={`bg-gray-900/80 rounded-xl p-4 border cursor-pointer transition-all hover:scale-105 ${
                  selectedComponent?.id === component.id
                    ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                {/* Symbol */}
                <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center mb-3">
                  <ComponentSymbol type={component.id} />
                </div>
                
                <h3 className="font-bold text-white text-sm mb-1">{component.name}</h3>
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${getCategoryColor(component.category)}`}>
                  {component.category}
                </span>
              </div>
            ))}
          </div>

          {/* Detail Panel */}
          <div className="bg-gray-900/80 rounded-xl p-4 border border-gray-700 h-fit sticky top-4">
            {selectedComponent ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gray-800 flex items-center justify-center">
                    <ComponentSymbol type={selectedComponent.id} size="large" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedComponent.name}</h2>
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold border ${getCategoryColor(selectedComponent.category)}`}>
                      {selectedComponent.category}
                    </span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4">{selectedComponent.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-bold text-gray-300 mb-2">Properties</h4>
                  <ul className="space-y-1">
                    {selectedComponent.properties.map((prop, i) => (
                      <li key={i} className="text-xs text-gray-500 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        {prop}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-300 mb-2">Applications</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedComponent.applications.map((app, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-400">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <span className="text-4xl mb-3 block">👆</span>
                <p>Select a component to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ComponentSymbol({ type, size = 'small' }: { type: string; size?: 'small' | 'large' }) {
  const scale = size === 'large' ? 1.5 : 1;
  const w = 40 * scale;
  const h = 30 * scale;

  return (
    <svg width={w} height={h} viewBox="0 0 40 30">
      {type === 'resistor' && (
        <>
          <line x1="0" y1="15" x2="8" y2="15" stroke="#3b82f6" strokeWidth="2" />
          <path d="M8 15 L10 8 L14 22 L18 8 L22 22 L26 8 L30 22 L32 15" stroke="#3b82f6" strokeWidth="2" fill="none" />
          <line x1="32" y1="15" x2="40" y2="15" stroke="#3b82f6" strokeWidth="2" />
        </>
      )}
      {type === 'capacitor' && (
        <>
          <line x1="0" y1="15" x2="16" y2="15" stroke="#3b82f6" strokeWidth="2" />
          <line x1="16" y1="5" x2="16" y2="25" stroke="#3b82f6" strokeWidth="2" />
          <line x1="24" y1="5" x2="24" y2="25" stroke="#3b82f6" strokeWidth="2" />
          <line x1="24" y1="15" x2="40" y2="15" stroke="#3b82f6" strokeWidth="2" />
        </>
      )}
      {type === 'inductor' && (
        <>
          <line x1="0" y1="15" x2="5" y2="15" stroke="#3b82f6" strokeWidth="2" />
          <path d="M5 15 Q10 5 15 15 Q20 25 25 15 Q30 5 35 15" stroke="#3b82f6" strokeWidth="2" fill="none" />
          <line x1="35" y1="15" x2="40" y2="15" stroke="#3b82f6" strokeWidth="2" />
        </>
      )}
      {type === 'diode' && (
        <>
          <line x1="0" y1="15" x2="12" y2="15" stroke="#a855f7" strokeWidth="2" />
          <polygon points="12,5 12,25 28,15" fill="#a855f7" />
          <line x1="28" y1="5" x2="28" y2="25" stroke="#a855f7" strokeWidth="2" />
          <line x1="28" y1="15" x2="40" y2="15" stroke="#a855f7" strokeWidth="2" />
        </>
      )}
      {type === 'led' && (
        <>
          <line x1="0" y1="15" x2="10" y2="15" stroke="#22c55e" strokeWidth="2" />
          <polygon points="10,5 10,25 25,15" fill="#22c55e" />
          <line x1="25" y1="5" x2="25" y2="25" stroke="#22c55e" strokeWidth="2" />
          <line x1="25" y1="15" x2="40" y2="15" stroke="#22c55e" strokeWidth="2" />
          <line x1="18" y1="3" x2="23" y2="0" stroke="#22c55e" strokeWidth="1" />
          <line x1="22" y1="5" x2="27" y2="2" stroke="#22c55e" strokeWidth="1" />
        </>
      )}
      {(type === 'transistor-bjt' || type === 'transistor-mosfet') && (
        <>
          <circle cx="20" cy="15" r="12" fill="none" stroke="#a855f7" strokeWidth="1.5" />
          <line x1="0" y1="15" x2="14" y2="15" stroke="#a855f7" strokeWidth="2" />
          <line x1="14" y1="8" x2="14" y2="22" stroke="#a855f7" strokeWidth="2" />
          <line x1="14" y1="10" x2="28" y2="4" stroke="#a855f7" strokeWidth="2" />
          <line x1="14" y1="20" x2="28" y2="26" stroke="#a855f7" strokeWidth="2" />
        </>
      )}
      {type === 'opamp' && (
        <>
          <polygon points="5,5 5,25 35,15" fill="none" stroke="#22c55e" strokeWidth="1.5" />
          <text x="10" y="12" fill="#22c55e" fontSize="8">−</text>
          <text x="10" y="21" fill="#22c55e" fontSize="8">+</text>
        </>
      )}
      {type === '555' && (
        <rect x="8" y="5" width="24" height="20" fill="none" stroke="#22c55e" strokeWidth="1.5" rx="2" />
      )}
      {type === 'regulator' && (
        <rect x="8" y="5" width="24" height="20" fill="none" stroke="#22c55e" strokeWidth="1.5" rx="2" />
      )}
      {type === 'relay' && (
        <>
          <rect x="10" y="8" width="20" height="14" fill="none" stroke="#f59e0b" strokeWidth="1.5" rx="2" />
          <line x1="15" y1="3" x2="25" y2="3" stroke="#f59e0b" strokeWidth="1.5" />
          <line x1="15" y1="27" x2="25" y2="27" stroke="#f59e0b" strokeWidth="1.5" />
        </>
      )}
      {type === 'crystal' && (
        <>
          <line x1="0" y1="15" x2="12" y2="15" stroke="#3b82f6" strokeWidth="2" />
          <rect x="12" y="8" width="16" height="14" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="10" y1="8" x2="10" y2="22" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="30" y1="8" x2="30" y2="22" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="28" y1="15" x2="40" y2="15" stroke="#3b82f6" strokeWidth="2" />
        </>
      )}
    </svg>
  );
}
