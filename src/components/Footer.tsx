export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-white font-bold text-lg mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" strokeLinecap="round"/>
                <rect x="9" y="3" width="6" height="4" rx="1" strokeLinecap="round"/>
                <path d="M9 12h6M9 16h4" strokeLinecap="round"/>
              </svg>
              ACT Score Converter
            </div>
            <p className="text-sm leading-relaxed">
              Free tool for students to convert ACT scores to SAT equivalents and understand their college competitiveness.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-3">Educational Resources</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'College Board', href: 'https://collegeboard.org' },
                { label: 'ACT Official Site', href: 'https://act.org' },
                { label: 'Khan Academy SAT Prep', href: 'https://khanacademy.org/sat' },
                { label: 'Common App', href: 'https://commonapp.org' },
              ].map(l => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer"
                    className="hover:text-blue-400 transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:info@actscoreconverter.com" className="hover:text-blue-400 transition-colors">
                  info@actscoreconverter.com
                </a>
              </li>
              <li className="text-gray-500">For educational use only.</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-xs text-gray-500 space-y-2">
          <p>
            <strong className="text-gray-400">Disclaimer:</strong> Score conversions are estimates based on the College Board's official ACT–SAT concordance tables. Actual equivalencies may vary. This tool is for informational purposes only and does not guarantee college admission outcomes.
          </p>
          <p className="text-center">© {new Date().getFullYear()} ACT Score Converter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
