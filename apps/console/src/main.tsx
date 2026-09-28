import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SCAFFOLD_CAPABILITIES } from '@teloforge/contracts';
import './style.css';

const capabilities = [
  ['Intent persistence', SCAFFOLD_CAPABILITIES.intentPersistence],
  ['Authenticated admission', SCAFFOLD_CAPABILITIES.runAdmission],
  ['Provider execution', SCAFFOLD_CAPABILITIES.providerExecution],
  ['Independent evaluation', SCAFFOLD_CAPABILITIES.independentEvaluation],
  ['Automatic promotion', SCAFFOLD_CAPABILITIES.automaticPromotion],
] as const;

function App() {
  return <main>
    <header><span className="wordmark">TELOFORGE</span><span className="badge">Scaffold · 0.0.0</span></header>
    <section className="intro">
      <p className="eyebrow">Intent and continuous improvement</p>
      <h1>Give the work a purpose.<br />Make progress measurable.</h1>
      <p className="lede">The project structure is ready for implementation. Agent execution, stored intents,
        and learning are not available in this version.</p>
    </section>
    <section aria-labelledby="capabilities-heading">
      <h2 id="capabilities-heading">Implementation status</h2>
      <p>Declared scaffold capabilities; this page does not poll a running service.</p>
      <ul className="capabilities">{capabilities.map(([name, enabled]) =>
        <li key={name}><span>{name}</span><strong>{enabled ? 'Available' : 'Not implemented'}</strong></li>)}</ul>
    </section>
    <section className="roadmap" aria-labelledby="roadmap-heading">
      <h2 id="roadmap-heading">Start with the execution foundation</h2>
      <p>Read SPEC.md, then implement T01: intent ownership, atomic admission, action receipts,
        revocation, and a qualified runner. Measurement and evaluated learning follow that foundation.</p>
      <p className="muted">Performance, accuracy, quality, cost, and token efficiency will be measured against accepted outcomes.</p>
    </section>
    <footer>Architecture review is complete. Runtime implementation and verification remain ahead.</footer>
  </main>;
}
const container = document.getElementById('root');
if (!container) throw new Error('Root element is missing.');
createRoot(container).render(<StrictMode><App /></StrictMode>);
