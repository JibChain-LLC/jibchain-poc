import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import getUserCurrentOrg from '../actions/shared/get-current-org';

// these routes require auth but no current org
const NO_MEMBER_ROUTES = [
  '/',
  '/organization/no-member',
  '/organization/create',
  '/organization/join'
];

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  let supabaseResponse = NextResponse.next({
    request
  });

  const cookieStore = await cookies();
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
          supabaseResponse = NextResponse.next({
            request
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        }
      }
    }
  );

  // refreshing the auth token
  const {
    data: { user }
  } = await supabase.auth.getUser();

  // terminate early if no user of logging out
  if (!user || pathname.startsWith('/logout')) return supabaseResponse;

  // if attempting to access an authed route with no org membership
  const currentOrg = cookieStore.get('current-org')?.value;
  if (!currentOrg && !NO_MEMBER_ROUTES.includes(pathname)) {
    // find the first org theyre a member of
    const orgId = await getUserCurrentOrg(user.id);

    // if not a member of any org redirect to no member page
    if (!orgId) {
      const url = request.nextUrl.clone();
      url.pathname = '/organization/no-member';
      return Response.redirect(url.toString());
    }

    // otherwise set the cookie
    supabaseResponse.cookies.set('current-org', orgId);
  }
  // if attempting to access any route with a cookie
  else if (currentOrg) {
    // ensure cookie is valid
    const res = await supabase
      .from('roles')
      .select('org_id')
      .eq('org_id', currentOrg)
      .eq('user_id', user.id)
      .maybeSingle();

    // if not a memer delete the cookie
    if (!res.data) supabaseResponse.cookies.delete('current-org');
  }

  return supabaseResponse;
}
