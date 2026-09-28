import { SCAFFOLD_CAPABILITIES } from '@teloforge/contracts';
console.log(JSON.stringify({
  worker: 'evaluator', stage: SCAFFOLD_CAPABILITIES.stage,
  enabled: false, message: 'Independent evaluation is not implemented.',
}));
// This entry point reports its disabled state and exits; it starts no jobs.
