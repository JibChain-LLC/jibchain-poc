interface ErrorPageProps {
  code: 400 | 401 | 404 | 500;
}

export default function ErrorPage(props: ErrorPageProps) {
  const { code } = props;
  return <div>{code}</div>;
}
