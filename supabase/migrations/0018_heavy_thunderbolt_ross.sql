-- Custom SQL migration file, put you code below! --
-- inserts a row into public.profiles
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, first_name, last_name, job_role)
  values (new.id, new.raw_user_meta_data ->> 'firstName', new.raw_user_meta_data ->> 'lastName', new.raw_user_meta_data ->> 'jobRole');
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
