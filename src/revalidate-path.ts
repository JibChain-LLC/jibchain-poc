'use server';

import { revalidatePath } from 'next/cache';

export default async function revalidateAllPath() {
  revalidatePath('/', 'layout');
  return null;
}
