import { createServer, type ServerResponse } from 'node:http';
import { SCAFFOLD_CAPABILITIES } from '@teloforge/contracts';
import { createScaffoldKernel } from '@teloforge/kernel';
import { logBootstrapEvent } from '@teloforge/observability';

const portText = process.env.TELOFORGE_PORT ?? '4100';
const port = Number(portText);
if (!/^\d+$/.test(portText) || !Number.isInteger(port) || port < 1024 || port > 65535) {
  throw new Error('TELOFORGE_PORT must be an integer between 1024 and 65535.');
}

// This bootstrap does not expose the kernel for execution until T01 is implemented.
export const kernel = createScaffoldKernel();

function respond(response: ServerResponse, status: number, body: unknown): void {
  response.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
  });
  response.end(JSON.stringify(body));
}

const server = createServer((request, response) => {
  const path = (request.url ?? '/').split('?')[0];
  if (request.method !== 'GET') {
    respond(response, 501, { code: 'SCAFFOLD_ONLY', message: 'Mutations and execution are not implemented.' });
    return;
  }
  switch (path) {
    case '/healthz':
      respond(response, 200, { status: 'alive', stage: 'scaffold' });
      return;
    case '/readyz':
      respond(response, 503, { status: 'not_ready', reason: 'authentication_and_persistence_not_implemented' });
      return;
    case '/v1/capabilities':
      respond(response, 200, SCAFFOLD_CAPABILITIES);
      return;
    default:
      respond(response, 404, { code: 'NOT_FOUND' });
  }
});
server.requestTimeout = 10_000;
server.headersTimeout = 5_000;
server.keepAliveTimeout = 5_000;
server.on('error', () => {
  logBootstrapEvent({ event: 'control.error', code: 'SERVER_ERROR' });
  process.exitCode = 1;
});
for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.once(signal, () => {
    logBootstrapEvent({ event: 'control.stopped', signal });
    server.close();
    server.closeAllConnections();
  });
}
server.listen(port, '127.0.0.1', () => {
  logBootstrapEvent({ event: 'control.started', port, stage: 'scaffold' });
});
