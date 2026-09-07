import { NextRequest, NextResponse } from 'next/server';

/**
 * Hostname-based routing for the LSP two-domain setup:
 *
 *   loanstreamlinepro.com → main public website
 *   lspoffer.app          → personalized /{short_code} PURL pages only
 *   *.vercel.app          → serves everything for preview/testing
 *
 * The PURL host may serve the API and static assets required by the
 * personalized page. Other routes are redirected to the same path on the
 * main LSP domain so legal/support links still land in the right place.
 */

// 5-character alphanumeric short code, e.g. /Kx9mQ or /JSYNB.
const UNIQUE_ID_PATH = /^\/[a-zA-Z0-9]{5}$/;

// Real site paths that must never be interpreted as short codes.
const RESERVED = new Set([
  'about',
  'terms',
  'legal',
  'blogs',
  'press',
  'apply',
  'loans',
  'admin',
  'login',
  'faqs1',
]);

const isUniqueId = (pathname: string) =>
  UNIQUE_ID_PATH.test(pathname) && !RESERVED.has(pathname.slice(1).toLowerCase());

// Operational paths the PURL domain must be able to serve directly.
const ALWAYS_ALLOW = /^\/(api|_next|images|fonts)(?:\/|$)|^\/(?:favicon\.ico|icon\.svg|robots\.txt)$/;

const MAIN_SITE = 'https://loanstreamlinepro.com';
const SHORT_HOSTS = ['lspoffer.app', 'www.lspoffer.app'];
const MAIN_HOSTS = ['loanstreamlinepro.com', 'www.loanstreamlinepro.com'];

export function proxy(req: NextRequest) {
  const host = (req.headers.get('host') ?? '').split(':')[0].toLowerCase();
  const { pathname, search } = req.nextUrl;
  const isShortHost = SHORT_HOSTS.includes(host);

  if (isShortHost) {
    // The short domain serves only valid-looking PURLs and required internals.
    if (isUniqueId(pathname) || ALWAYS_ALLOW.test(pathname)) {
      return NextResponse.next();
    }

    // Preserve the requested route when sending legal/support/site traffic
    // back to the main LSP domain.
    return NextResponse.redirect(`${MAIN_SITE}${pathname}${search}`, 302);
  }

  // Keep personalized PURLs off the main public domain. Vercel preview hosts
  // remain unrestricted so /{id} can still be tested before DNS cutover.
  if (MAIN_HOSTS.includes(host) && isUniqueId(pathname)) {
    return NextResponse.redirect(MAIN_SITE, 302);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
