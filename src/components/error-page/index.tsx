import dynamic from 'next/dynamic';
import { EmptyObject } from 'type-fest';

const NotFoundSVG = dynamic(() => import('./files/404'));
const InternalErrorSVG = dynamic(() => import('./files/500'));

type ErrorCode = 404 | 500 | 401;

interface ErrorProps {
  code: ErrorCode;
}

const messages: Record<
  ErrorCode,
  { message: string; label: string; image: React.ComponentType<EmptyObject> }
> = {
  404: {
    message: 'Page Not Found',
    label: "Doh! This page doesn't exist.",
    image: NotFoundSVG
  },
  500: {
    message: 'Internal Error',
    label: 'Whoops! We got in a bit of a pickle!',
    image: InternalErrorSVG
  },
  401: {
    message: 'Unauthorized',
    label: "You don't have access to this!",
    image: NotFoundSVG
  }
};

export default function ErrorPage(props: ErrorProps) {
  const { code } = props;
  const { message, label, image: SVGElement } = messages[code];

  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <div className='flex flex-col items-center text-center'>
        <h1 className='text-xl font-extrabold uppercase text-green-500'>
          {code} {message}
        </h1>
        <p className='mb-9 text-4xl font-bold text-gray-900'>{label}</p>
        <SVGElement />
      </div>
    </div>
  );
}
