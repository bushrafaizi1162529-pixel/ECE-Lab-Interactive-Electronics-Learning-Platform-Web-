import { useState, useEffect } from 'react';
import BasicElectronicsLab from './components/BasicElectronicsLab';
import SemiconductorLab from './components/SemiconductorLab';
import AnalogCircuitsLab from './components/AnalogCircuitsLab';
import DigitalElectronicsLab from './components/DigitalElectronicsLab';
import OhmsLawLab from './components/OhmsLawLab';
import ResistorColorCodeLab from './components/ResistorColorCodeLab';
import LEDCircuitLab from './components/LEDCircuitLab';
import RCCircuitLab from './components/RCCircuitLab';
import OpAmpLab from './components/OpAmpLab';
import LogicGatesLab from './components/LogicGatesLab';
import VirtualOscilloscopeLab from './components/VirtualOscilloscopeLab';
import ComponentLibraryLab from './components/ComponentLibraryLab';
import MicrocontrollerLab from './components/MicrocontrollerLab';

type Lab = 'home' | 'basic' | 'semiconductor' | 'analog' | 'digital' | 'ohmslaw' | 'resistor' | 'led' | 'rc' | 'opamp' | 'logic' | 'scope' | 'components' | 'mcu';

function App() {
  const [currentLab, setCurrentLab] = useState<Lab>('home');

  if (currentLab === 'basic') return <BasicElectronicsLab onBack={() => setCurrentLab('home')} />;
  if (currentLab === 'semiconductor') return <SemiconductorLab onBack={() => setCurrentLab('home')} />;
  if (currentLab === 'analog') return <AnalogCircuitsLab onBack={() => setCurrentLab('home')} />;
  if (currentLab === 'digital') return <DigitalElectronicsLab onBack={() => setCurrentLab('home')} />;
  if (currentLab === 'ohmslaw') return <OhmsLawLab onBack={() => setCurrentLab('home')} />;
  if (currentLab === 'resistor') return <ResistorColorCodeLab onBack={() => setCurrentLab('home')} />;
  if (currentLab === 'led') return <LEDCircuitLab onBack={() => setCurrentLab('home')} />;
  if (currentLab === 'rc') return <RCCircuitLab onBack={() => setCurrentLab('home')} />;
  if (currentLab === 'opamp') return <OpAmpLab onBack={() => setCurrentLab('home')} />;
  if (currentLab === 'logic') return <LogicGatesLab onBack={() => setCurrentLab('home')} />;
  if (currentLab === 'scope') return <VirtualOscilloscopeLab onBack={() => setCurrentLab('home')} />;
  if (currentLab === 'components') return <ComponentLibraryLab onBack={() => setCurrentLab('home')} />;
  if (currentLab === 'mcu') return <MicrocontrollerLab onBack={() => setCurrentLab('home')} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white">
      {/* Header */}
      <header className="bg-black/40 border-b border-gray-700/50 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/30 mb-3">
            <span className="text-2xl">🔬</span>
            <span className="text-blue-400 font-semibold text-sm">ECE Virtual Lab</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Interactive Electronics Learning Platform
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Explore virtual labs, calculators, and simulations to master electronics concepts. Perfect for ECE students and hobbyists.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Virtual Labs & Tools - 8 Cards Grid */}
        <section className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Ohm's Law Lab */}
            <div
              onClick={() => setCurrentLab('ohmslaw')}
              className="group bg-gradient-to-br from-yellow-900/30 to-yellow-800/10 rounded-xl p-4 border border-yellow-500/40 hover:border-yellow-400 cursor-pointer transition-all hover:shadow-lg hover:shadow-yellow-500/20 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">⚡</div>
              <h3 className="font-bold text-yellow-400 text-base mb-1">Ohm's Law Lab</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Interactive V=IR calculator with circuit visualization</p>
            </div>

            {/* Resistor Color Code */}
            <div
              onClick={() => setCurrentLab('resistor')}
              className="group bg-gradient-to-br from-red-900/30 to-red-800/10 rounded-xl p-4 border border-red-500/40 hover:border-red-400 cursor-pointer transition-all hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">🎨</div>
              <h3 className="font-bold text-red-400 text-base mb-1">Resistor Color Code</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Decode resistor values from color bands</p>
            </div>

            {/* LED Circuit Designer */}
            <div
              onClick={() => setCurrentLab('led')}
              className="group bg-gradient-to-br from-green-900/30 to-green-800/10 rounded-xl p-4 border border-green-500/40 hover:border-green-400 cursor-pointer transition-all hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">💡</div>
              <h3 className="font-bold text-green-400 text-base mb-1">LED Circuit Designer</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Calculate LED resistor values and build circuits</p>
            </div>

            {/* Capacitor & RC Circuits */}
            <div
              onClick={() => setCurrentLab('rc')}
              className="group bg-gradient-to-br from-blue-900/30 to-blue-800/10 rounded-xl p-4 border border-blue-500/40 hover:border-blue-400 cursor-pointer transition-all hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">🔋</div>
              <h3 className="font-bold text-blue-400 text-base mb-1">Capacitor & RC Circuits</h3>
              <p className="text-gray-400 text-xs leading-relaxed">RC time constant calculator and charging curves</p>
            </div>

            {/* Op-Amp Configurations */}
            <div
              onClick={() => setCurrentLab('opamp')}
              className="group bg-gradient-to-br from-emerald-900/30 to-emerald-800/10 rounded-xl p-4 border border-emerald-500/40 hover:border-emerald-400 cursor-pointer transition-all hover:shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">📈</div>
              <h3 className="font-bold text-emerald-400 text-base mb-1">Op-Amp Configurations</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Explore inverting, non-inverting, and more</p>
            </div>

            {/* Digital Logic Gates */}
            <div
              onClick={() => setCurrentLab('logic')}
              className="group bg-gradient-to-br from-cyan-900/30 to-cyan-800/10 rounded-xl p-4 border border-cyan-500/40 hover:border-cyan-400 cursor-pointer transition-all hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">🔲</div>
              <h3 className="font-bold text-cyan-400 text-base mb-1">Digital Logic Gates</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Interactive truth tables and gate simulator</p>
            </div>

            {/* Virtual Oscilloscope */}
            <div
              onClick={() => setCurrentLab('scope')}
              className="group bg-gradient-to-br from-purple-900/30 to-purple-800/10 rounded-xl p-4 border border-purple-500/40 hover:border-purple-400 cursor-pointer transition-all hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">📊</div>
              <h3 className="font-bold text-purple-400 text-base mb-1">Virtual Oscilloscope</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Visualize waveforms: sine, square, triangle</p>
            </div>

            {/* Component Library */}
            <div
              onClick={() => setCurrentLab('components')}
              className="group bg-gradient-to-br from-pink-900/30 to-pink-800/10 rounded-xl p-4 border border-pink-500/40 hover:border-pink-400 cursor-pointer transition-all hover:shadow-lg hover:shadow-pink-500/20 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">📚</div>
              <h3 className="font-bold text-pink-400 text-base mb-1">Component Library</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Learn about electronic components</p>
            </div>
          </div>
        </section>

        {/* Learn Electronics Interactively */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl">🎓</span>
            <h2 className="text-xl font-bold text-white">Learn Electronics Interactively</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {/* Hands-on Practice */}
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 rounded-xl p-5 border border-blue-500/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-xl">🔧</div>
                <div>
                  <h3 className="font-bold text-blue-400 text-base">Hands-on Practice</h3>
                  <p className="text-gray-500 text-xs">Build virtual circuits and see real-time results without any hardware</p>
                </div>
              </div>
              <MiniCircuitDemo />
              <p className="text-center text-blue-400/70 text-xs mt-3">💡 Try adjusting the voltage and resistance!</p>
            </div>

            {/* Instant Calculations */}
            <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 rounded-xl p-5 border border-green-500/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-xl">📐</div>
                <div>
                  <h3 className="font-bold text-green-400 text-base">Instant Calculations</h3>
                  <p className="text-gray-500 text-xs">Calculate resistor values, LED circuits, and RC time constants instantly</p>
                </div>
              </div>
              <MiniCalculatorDemo />
              <button onClick={() => setCurrentLab('led')} className="w-full mt-3 py-2 bg-green-500/20 text-green-400 rounded-lg text-xs font-semibold hover:bg-green-500/30 transition-colors">
                Open Full LED Circuit Designer →
              </button>
            </div>

            {/* Visual Learning */}
            <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 rounded-xl p-5 border border-purple-500/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-xl">📊</div>
                <div>
                  <h3 className="font-bold text-purple-400 text-base">Visual Learning</h3>
                  <p className="text-gray-500 text-xs">See waveforms, logic outputs, and circuit behavior in real-time</p>
                </div>
              </div>
              <MiniOscilloscopeDemo />
              <MiniLogicGateDemo />
              <div className="flex gap-2 mt-3">
                <button onClick={() => setCurrentLab('scope')} className="flex-1 py-2 bg-purple-500/20 text-purple-400 rounded-lg text-xs font-semibold hover:bg-purple-500/30 transition-colors">
                  Oscilloscope →
                </button>
                <button onClick={() => setCurrentLab('logic')} className="flex-1 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg text-xs font-semibold hover:bg-cyan-500/30 transition-colors">
                  Logic Gates →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Topics */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl">📖</span>
            <h2 className="text-xl font-bold text-white">Learning Topics</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {/* Basic Electronics */}
            <div 
              onClick={() => setCurrentLab('basic')}
              className="group bg-gradient-to-br from-yellow-900/20 to-orange-900/10 rounded-xl p-4 border border-yellow-500/30 hover:border-yellow-400 cursor-pointer transition-all hover:shadow-lg hover:shadow-yellow-500/10"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">⚡</span>
                <h3 className="font-bold text-yellow-400 text-sm">Basic Electronics</h3>
                <span className="ml-auto text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </div>
              <ul className="space-y-1.5 text-gray-400 text-xs">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-yellow-500 rounded-full"></span>
                  Ohm's Law & Kirchhoff's Laws
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-yellow-500 rounded-full"></span>
                  Resistors, Capacitors, Inductors
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-yellow-500 rounded-full"></span>
                  Series & Parallel Circuits
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-yellow-500 rounded-full"></span>
                  Voltage Dividers
                </li>
              </ul>
            </div>

            {/* Semiconductor Devices */}
            <div 
              onClick={() => setCurrentLab('semiconductor')}
              className="group bg-gradient-to-br from-purple-900/20 to-pink-900/10 rounded-xl p-4 border border-purple-500/30 hover:border-purple-400 cursor-pointer transition-all hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🔌</span>
                <h3 className="font-bold text-purple-400 text-sm">Semiconductor Devices</h3>
                <span className="ml-auto text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </div>
              <ul className="space-y-1.5 text-gray-400 text-xs">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                  Diodes & LEDs
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                  Transistors (BJT & MOSFET)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                  Zener Diodes
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                  Photodiodes & Phototransistors
                </li>
              </ul>
            </div>

            {/* Analog Circuits */}
            <div 
              onClick={() => setCurrentLab('analog')}
              className="group bg-gradient-to-br from-green-900/20 to-emerald-900/10 rounded-xl p-4 border border-green-500/30 hover:border-green-400 cursor-pointer transition-all hover:shadow-lg hover:shadow-green-500/10"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">📈</span>
                <h3 className="font-bold text-green-400 text-sm">Analog Circuits</h3>
                <span className="ml-auto text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </div>
              <ul className="space-y-1.5 text-gray-400 text-xs">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                  Op-Amp Configurations
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                  Filters (Low-pass, High-pass)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                  Amplifier Circuits
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                  Oscillators
                </li>
              </ul>
            </div>

            {/* Digital Electronics */}
            <div 
              onClick={() => setCurrentLab('digital')}
              className="group bg-gradient-to-br from-cyan-900/20 to-blue-900/10 rounded-xl p-4 border border-cyan-500/30 hover:border-cyan-400 cursor-pointer transition-all hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🔲</span>
                <h3 className="font-bold text-cyan-400 text-sm">Digital Electronics</h3>
                <span className="ml-auto text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </div>
              <ul className="space-y-1.5 text-gray-400 text-xs">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-cyan-500 rounded-full"></span>
                  Logic Gates & Boolean Algebra
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-cyan-500 rounded-full"></span>
                  Combinational Circuits
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-cyan-500 rounded-full"></span>
                  Flip-Flops & Counters
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-cyan-500 rounded-full"></span>
                  Microcontrollers
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Microcontroller Lab Card */}
        <section className="mb-8">
          <div
            onClick={() => setCurrentLab('mcu')}
            className="group bg-gradient-to-r from-orange-900/30 via-red-900/20 to-orange-900/30 rounded-xl p-6 border border-orange-500/40 hover:border-orange-400 cursor-pointer transition-all hover:shadow-lg hover:shadow-orange-500/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-orange-500/20 flex items-center justify-center text-3xl">🎛️</div>
                <div>
                  <h3 className="font-bold text-orange-400 text-lg mb-1">Microcontroller Lab</h3>
                  <p className="text-gray-400 text-sm">Arduino, ESP32, STM32, Raspberry Pi Pico & more - Interactive pin diagrams & simulations</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded text-xs">8+ MCUs</span>
                    <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded text-xs">Pin Diagrams</span>
                    <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded text-xs">GPIO Simulation</span>
                  </div>
                </div>
              </div>
              <span className="text-orange-400 text-2xl opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-4 bg-black/30">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Built with ❤️ by <span className="text-blue-400 font-semibold">Pavan Kumar</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

// Mini Circuit Demo
function MiniCircuitDemo() {
  const [isOn, setIsOn] = useState(false);
  const [voltage, setVoltage] = useState(5);
  const [resistance, setResistance] = useState(220);
  const current = isOn ? ((voltage / resistance) * 1000) : 0;
  
  return (
    <div className="bg-black/40 rounded-lg p-3 border border-blue-500/20">
      <svg viewBox="0 0 200 80" className="w-full">
        {/* Battery */}
        <rect x="10" y="25" width="20" height="30" fill="#1a1a2e" stroke="#f59e0b" strokeWidth="2" rx="3" />
        <text x="20" y="42" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">+{voltage}V</text>
        
        {/* Top wire */}
        <path d="M30 35 L55 35" stroke={isOn ? '#22c55e' : '#444'} strokeWidth="2.5" />
        
        {/* Switch */}
        <circle cx="55" cy="35" r="4" fill={isOn ? '#22c55e' : '#666'} stroke="#888" strokeWidth="1" />
        <line x1="55" y1="35" x2={isOn ? "75" : "70"} y2={isOn ? "35" : "22"} stroke={isOn ? '#22c55e' : '#666'} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="75" cy="35" r="4" fill={isOn ? '#22c55e' : '#666'} stroke="#888" strokeWidth="1" />
        <text x="65" y="18" textAnchor="middle" fill="#888" fontSize="8">Switch</text>
        
        {/* Wire to resistor */}
        <line x1="79" y1="35" x2="95" y2="35" stroke={isOn ? '#22c55e' : '#444'} strokeWidth="2.5" />
        
        {/* Resistor */}
        <rect x="95" y="28" width="30" height="14" fill="#1a1a2e" stroke="#3b82f6" strokeWidth="2" rx="2" />
        <text x="110" y="38" textAnchor="middle" fill="#3b82f6" fontSize="8" fontWeight="bold">{resistance}Ω</text>
        
        {/* Wire to LED */}
        <line x1="125" y1="35" x2="145" y2="35" stroke={isOn ? '#22c55e' : '#444'} strokeWidth="2.5" />
        
        {/* LED */}
        <polygon points="145,22 145,48 170,35" fill={isOn ? '#22c55e' : '#1a1a2e'} stroke="#22c55e" strokeWidth="2" />
        <line x1="170" y1="22" x2="170" y2="48" stroke="#22c55e" strokeWidth="2.5" />
        {isOn && (
          <>
            <circle cx="155" cy="35" r="15" fill="#22c55e" opacity="0.3" />
            <circle cx="155" cy="35" r="10" fill="#22c55e" opacity="0.2" />
          </>
        )}
        
        {/* Bottom wire */}
        <path d="M170 48 L170 65 L20 65 L20 55" stroke={isOn ? '#22c55e' : '#444'} strokeWidth="2.5" />
        
        {/* Current flow animation */}
        {isOn && (
          <circle r="3" fill="#22c55e">
            <animateMotion dur="1.5s" repeatCount="indefinite" path="M30 35 L55 35 L75 35 L125 35 L170 35 L170 65 L20 65 L20 35" />
          </circle>
        )}
      </svg>
      
      <div className="grid grid-cols-2 gap-3 mt-3">
        <div>
          <label className="text-xs text-gray-400 block mb-1">Supply Voltage</label>
          <div className="flex items-center gap-2">
            <input 
              type="range" min="3" max="12" value={voltage}
              onChange={(e) => setVoltage(Number(e.target.value))}
              className="flex-1 h-1.5 accent-yellow-500 cursor-pointer"
            />
            <span className="text-yellow-400 text-sm font-bold w-8">{voltage}V</span>
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-400 block mb-1">Resistor Value</label>
          <div className="flex items-center gap-2">
            <input 
              type="range" min="100" max="1000" step="10" value={resistance}
              onChange={(e) => setResistance(Number(e.target.value))}
              className="flex-1 h-1.5 accent-blue-500 cursor-pointer"
            />
            <span className="text-blue-400 text-sm font-bold w-12">{resistance}Ω</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700">
        <div>
          <span className="text-xs text-gray-500">Current Flow (I = V/R)</span>
          <p className="text-lg font-bold text-cyan-400">{current.toFixed(2)} <span className="text-sm">mA</span></p>
        </div>
        <button 
          onClick={() => setIsOn(!isOn)}
          className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
            isOn 
              ? 'bg-green-500 text-white shadow-lg shadow-green-500/40' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Power {isOn ? 'ON' : 'OFF'}
        </button>
      </div>
    </div>
  );
}

// Mini Calculator Demo
function MiniCalculatorDemo() {
  const [supplyVoltage, setSupplyVoltage] = useState(5);
  const [ledVoltage, setLedVoltage] = useState(2);
  const [ledCurrent, setLedCurrent] = useState(20);
  
  const resistance = ((supplyVoltage - ledVoltage) / (ledCurrent / 1000));
  const power = (supplyVoltage - ledVoltage) * (ledCurrent / 1000) * 1000;
  
  const standardValues = [10, 22, 33, 47, 68, 100, 150, 220, 330, 470, 680, 1000];
  const nearestStandard = standardValues.reduce((prev, curr) => 
    Math.abs(curr - resistance) < Math.abs(prev - resistance) ? curr : prev
  );
  
  return (
    <div className="bg-black/40 rounded-lg p-3 border border-green-500/20">
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Supply Voltage (Vs)</span>
            <span className="text-yellow-400 font-semibold">{supplyVoltage}V</span>
          </div>
          <input 
            type="range" min="3" max="24" value={supplyVoltage}
            onChange={(e) => setSupplyVoltage(Number(e.target.value))}
            className="w-full h-2 accent-yellow-500 cursor-pointer"
          />
        </div>
        
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">LED Forward Voltage (Vf)</span>
            <span className="text-green-400 font-semibold">{ledVoltage}V</span>
          </div>
          <input 
            type="range" min="1.5" max="3.5" step="0.1" value={ledVoltage}
            onChange={(e) => setLedVoltage(Number(e.target.value))}
            className="w-full h-2 accent-green-500 cursor-pointer"
          />
        </div>
        
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">LED Current (If)</span>
            <span className="text-blue-400 font-semibold">{ledCurrent}mA</span>
          </div>
          <input 
            type="range" min="5" max="30" value={ledCurrent}
            onChange={(e) => setLedCurrent(Number(e.target.value))}
            className="w-full h-2 accent-blue-500 cursor-pointer"
          />
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-gray-800/60 rounded-lg border border-gray-700">
        <p className="text-xs text-gray-500 text-center mb-2">
          Formula: R = (Vs - Vf) / If
        </p>
        <p className="text-xs text-gray-400 text-center mb-2">
          R = ({supplyVoltage} - {ledVoltage}) / {(ledCurrent/1000).toFixed(3)}
        </p>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-green-500/10 rounded p-2">
            <p className="text-xl font-bold text-green-400">{resistance.toFixed(0)}Ω</p>
            <p className="text-[10px] text-gray-500">Calculated</p>
          </div>
          <div className="bg-blue-500/10 rounded p-2">
            <p className="text-xl font-bold text-blue-400">{nearestStandard}Ω</p>
            <p className="text-[10px] text-gray-500">Standard</p>
          </div>
          <div className="bg-yellow-500/10 rounded p-2">
            <p className="text-xl font-bold text-yellow-400">{power.toFixed(1)}</p>
            <p className="text-[10px] text-gray-500">mW Power</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mini Oscilloscope Demo
function MiniOscilloscopeDemo() {
  const [waveType, setWaveType] = useState<'sine' | 'square' | 'triangle'>('sine');
  const [time, setTime] = useState(0);
  const [frequency, setFrequency] = useState(1);
  
  useEffect(() => {
    const interval = setInterval(() => setTime(t => t + 0.1), 50);
    return () => clearInterval(interval);
  }, []);

  const generateWave = (x: number) => {
    const phase = x * 0.15 * frequency + time;
    switch (waveType) {
      case 'sine': return Math.sin(phase) * 20;
      case 'square': return Math.sin(phase) > 0 ? 20 : -20;
      case 'triangle': return (Math.asin(Math.sin(phase)) / Math.PI * 2) * 20;
    }
  };
  
  return (
    <div className="bg-black rounded-lg border border-gray-700 overflow-hidden mb-3">
      <div className="p-2 border-b border-gray-700 flex items-center justify-between">
        <span className="text-xs text-gray-400">Live Waveform Display</span>
        <div className="flex gap-1">
          {(['sine', 'square', 'triangle'] as const).map(type => (
            <button 
              key={type}
              onClick={() => setWaveType(type)}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                waveType === type ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <div className="p-1">
        <svg viewBox="0 0 180 60" className="w-full">
          {/* Grid */}
          {[...Array(9)].map((_, i) => (
            <line key={`v${i}`} x1={i * 22.5} y1="0" x2={i * 22.5} y2="60" stroke="#1a3a1a" strokeWidth="0.5" />
          ))}
          {[...Array(5)].map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 15} x2="180" y2={i * 15} stroke="#1a3a1a" strokeWidth="0.5" />
          ))}
          <line x1="0" y1="30" x2="180" y2="30" stroke="#2a5a2a" strokeWidth="1" />
          
          {/* Waveform */}
          <path
            d={`M 0,${30 - generateWave(0)} ${[...Array(180)].map((_, i) => `L ${i},${30 - generateWave(i)}`).join(' ')}`}
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
            style={{ filter: 'drop-shadow(0 0 4px #22c55e)' }}
          />
        </svg>
      </div>
      <div className="p-2 border-t border-gray-700 flex items-center gap-2">
        <span className="text-[10px] text-gray-500">Freq:</span>
        <input 
          type="range" min="0.5" max="3" step="0.1" value={frequency}
          onChange={(e) => setFrequency(Number(e.target.value))}
          className="flex-1 h-1 accent-green-500"
        />
      </div>
    </div>
  );
}

// Mini Logic Gate Demo
function MiniLogicGateDemo() {
  const [gateType, setGateType] = useState<'AND' | 'OR' | 'XOR'>('AND');
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);
  
  const output = gateType === 'AND' 
    ? inputA && inputB 
    : gateType === 'OR' 
      ? inputA || inputB 
      : inputA !== inputB;
  
  return (
    <div className="bg-black/40 rounded-lg p-3 border border-cyan-500/20">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-400">Interactive Logic Gate</span>
        <div className="flex gap-1">
          {(['AND', 'OR', 'XOR'] as const).map(type => (
            <button 
              key={type}
              onClick={() => setGateType(type)}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                gateType === type ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-3">
        {/* Input A */}
        <button 
          onClick={() => setInputA(!inputA)}
          className={`w-10 h-10 rounded-lg text-base font-bold transition-all ${
            inputA ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' : 'bg-gray-700 text-gray-400'
          }`}
        >
          {inputA ? '1' : '0'}
        </button>
        <span className="text-xs text-gray-500">A</span>
        
        {/* Gate Symbol */}
        <div className="px-3 py-2 bg-gray-800 rounded-lg border border-gray-600">
          <span className="text-cyan-400 font-bold text-sm">{gateType}</span>
        </div>
        
        <span className="text-xs text-gray-500">B</span>
        {/* Input B */}
        <button 
          onClick={() => setInputB(!inputB)}
          className={`w-10 h-10 rounded-lg text-base font-bold transition-all ${
            inputB ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' : 'bg-gray-700 text-gray-400'
          }`}
        >
          {inputB ? '1' : '0'}
        </button>
        
        <span className="text-gray-500 text-lg">→</span>
        
        {/* Output */}
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-base font-bold transition-all ${
          output ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'bg-gray-700 text-gray-400'
        }`}>
          {output ? '1' : '0'}
        </div>
      </div>
      
      <p className="text-center text-xs text-gray-500 mt-2">
        {inputA ? '1' : '0'} {gateType} {inputB ? '1' : '0'} = {output ? '1' : '0'}
      </p>
    </div>
  );
}

export default App;
