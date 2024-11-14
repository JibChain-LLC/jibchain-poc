import { type User } from '@supabase/supabase-js';
import { type EmptyObject } from 'type-fest';

export type WithAuthOpts =
  | { fallback: React.FC | React.ReactNode }
  | { redirectTo: string };

export type AuthWrapperProps = {
  children: React.ReactNode | React.FC<{ user: User }>;
} & (WithAuthOpts | EmptyObject);
