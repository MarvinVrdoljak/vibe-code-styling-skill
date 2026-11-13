import createMiddleware from 'next-intl/middleware'
import {routing} from '@/i18n/routing'

// Next.js 16: this file is `proxy.ts` (formerly `middleware.ts`). It runs on
// the Node.js runtime and handles locale negotiation and redirects
// (e.g. `/` → `/en` when needed). With a default export nothing else changes.
export default createMiddleware(routing)

export const config = {
  // Match all paths except API routes, Next internals, and static files.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
