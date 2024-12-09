import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import getUserOrg from '#/lib/server/shared/get-current-org';

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  let supabaseResponse = NextResponse.next({
    request
  });

  if (pathname.startsWith('/api/trpc')) return supabaseResponse;

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

  if (!user || pathname.startsWith('/logout')) return supabaseResponse;

  const currentOrg = cookieStore.get('current-org')?.value;
  if (
    !currentOrg &&
    pathname !== '/' &&
    !pathname.startsWith('/organization/no-member') &&
    !pathname.startsWith('/organization/create') &&
    !pathname.startsWith('/organization/join')
  ) {
    const currentOrgId = await getUserOrg(user.id);
    if (!currentOrgId) {
      const url = request.nextUrl.clone();
      url.pathname = '/organization/no-member';
      return Response.redirect(url.toString());
    }

    supabaseResponse.cookies.set('current-org', currentOrgId);
  } else if (currentOrg) {
    const res = await supabase
      .from('roles')
      .select('org_id')
      .eq('org_id', currentOrg)
      .eq('user_id', user.id)
      .maybeSingle();

    if (!res.data) supabaseResponse.cookies.delete('current-org');
  }

  return supabaseResponse;
}
