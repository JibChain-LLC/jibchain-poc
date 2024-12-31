import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import getUserCurrentOrg from './lib/server/shared/get-current-org';
import { FLAT_ROUTE_TREE, ROUTE_MAP } from './routes';

// routes that need no user logged in
const NO_AUTH_NEEDED = Object.values(FLAT_ROUTE_TREE)
  .filter((r) => !r.auth)
  .map((r) => r.slug);

// routes that require a logged in user with org cookie
const ORG_NEEDED = Object.values(FLAT_ROUTE_TREE)
  .filter((r) => r.org && r.auth)
  .map((r) => r.slug);

// route that require a logged in user with no org cookie
const NO_ORG_NEEDED = Object.values(FLAT_ROUTE_TREE)
  .filter((r) => !r.org && r.auth)
  .map((r) => r.slug);

function doesPathMatch(target: string, pathList: string[]) {
  const rx = (path: string) =>
    new RegExp('^' + path.replace(/\*/g, '.*') + '$');

  return pathList.some((i) => {
    const regex = rx(i);
    return regex.test(target);
  });
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cookieStore = await cookies();
  const currentOrg = cookieStore.get('current-org')?.value;
  let response = NextResponse.next({
    request
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        }
      }
    }
  );

  const d = await supabase.auth.getUser();
  const user = d.data.user;

  const noAuth = doesPathMatch(pathname, NO_AUTH_NEEDED);
  const needsOrg = doesPathMatch(pathname, ORG_NEEDED);
  const noOrgNeeded = doesPathMatch(pathname, NO_ORG_NEEDED);

  // api routes will handle auth themselves
  if (pathname.startsWith('/api') || noAuth) return response;

  // if trying to route to an authed route with no user
  if (!user && (needsOrg || noOrgNeeded))
    return NextResponse.redirect(new URL(ROUTE_MAP.LOGIN, request.url));

  // if theres a authed user we can route as no org check is needed
  if (user && noOrgNeeded) return response;

  // if trying to access a route that needs an authed user
  // with no current org cookie
  if (user && needsOrg && !currentOrg) {
    const orgId = await getUserCurrentOrg(user.id);

    // user has no membership in any org
    if (!orgId)
      return NextResponse.redirect(
        new URL(ROUTE_MAP['GET_STARTED'], request.url)
      );
    response.cookies.set('current-org', orgId);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
};
