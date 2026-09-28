/** Metadata-only bootstrap events; authoritative decisions belong in the database. */
export type BootstrapEvent =
  | { readonly event: 'control.started'; readonly port: number; readonly stage: 'scaffold' }
  | { readonly event: 'control.stopped'; readonly signal: string }
  | { readonly event: 'control.error'; readonly code: string };
export function logBootstrapEvent(event: BootstrapEvent): void {
  process.stdout.write(`${JSON.stringify({ time: new Date().toISOString(), ...event })}\n`);
}
