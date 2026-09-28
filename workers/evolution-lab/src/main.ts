import { SCAFFOLD_CAPABILITIES } from '@teloforge/contracts';
console.log(JSON.stringify({
  worker: 'evolution-lab', stage: SCAFFOLD_CAPABILITIES.stage,
  enabled: false, message: 'Candidate search and autonomous improvement are not implemented.',
}));
// This entry point reports its disabled state and exits; it starts no jobs.
