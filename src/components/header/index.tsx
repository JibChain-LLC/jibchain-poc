import AuthWrapper from '#/components/auth-wrapper';
import Logo from '../logo';
import AccountButtons from './account-buttons';
import HeaderLink from './header-link';
import ThemeButton from './theme-button';
import UserMenu from './user-menu';

export default function Header() {
  return (
    <header className='sticky top-0 z-50 flex h-[4.5rem] flex-row items-center gap-3 border-b border-border bg-background p-3'>
      <nav className='flex flex-row items-center gap-2'>
        <HeaderLink href={'/'}>Home</HeaderLink>
        <HeaderLink href={'/dashboard'}>Dashboard</HeaderLink>
      </nav>
      <Logo className='h-12 w-auto fill-current' />
      <div className='ml-auto flex flex-row gap-2'>
        <ThemeButton />
        <AuthWrapper fallback={<AccountButtons />}>
          {({ user }) => <UserMenu user={user} />}
        </AuthWrapper>
      </div>
    </header>
  );
}
