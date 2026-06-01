import './index.css';
import { useRef } from 'react';
import { useDarkMode } from './hooks/useDarkMode';
import { useHistory } from './hooks/useHistory';
import Header from './components/Header';
import Hero from './components/Hero';
import Converter from './components/Converter';
import Percentiles from './components/Percentiles';
import Charts from './components/Charts';
import ConversionTable from './components/ConversionTable';
import History from './components/History';
import Footer from './components/Footer';

export default function App() {
  const { dark, toggle } = useDarkMode();
  const { history, add, clear } = useHistory();
  const converterRef = useRef<HTMLDivElement>(null);

  const scrollToConverter = () => {
    converterRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header dark={dark} onToggleDark={toggle} />
      <main>
        <Hero onStart={scrollToConverter} />
        <div ref={converterRef}>
          <Converter onResult={add} />
        </div>
        <History history={history} onClear={clear} />
        <Percentiles />
        <Charts dark={dark} />
        <ConversionTable />
      </main>
      <Footer />
    </div>
  );
}
