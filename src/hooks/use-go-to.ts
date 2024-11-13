import { useRouter } from 'next/navigation';

export default function useGoTo() {
  const router = useRouter();

  const goTo = (to: string) => {
    return () => router.push(to);
  };

  return goTo;
}
