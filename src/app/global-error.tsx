'use client';

import ErrorPage from '#/components/error-page';

export default function GlobalError() {
  return <ErrorPage code={500} />;
}
