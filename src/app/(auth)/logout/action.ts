'use server';

import { revalidatePath } from 'next/cache';

export default async function invalidateAll() {
  revalidatePath('/', 'layout');

  return null;
}
