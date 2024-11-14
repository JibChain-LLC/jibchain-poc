# JibChain COEUS

Built using:

- [Next.js](https://nextjs.org/docs)
- [Supabase](https://supabase.com/docs)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)

## Getting Started Locally

As a pre-requisite, start by creating a `.env` file at the project root. It should contain these environment variables:

| Name                            | Description               |
| ------------------------------- | ------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Used in Supabase auth     |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Used in Supabase auth     |
| `DATABASE_URL`                  | Connection string to DB   |
| `WATSONX_AI_AUTH_TYPE`          | Used in IBM SDK           |
| `WATSONX_AI_SERVICE_URL`        | Used in IBM SDK           |
| `WATSONX_AI_APIKEY`             | Used in IBM SDK           |
| `WATSONX_AI_PROJECT_ID`         | Used in IBM SDK           |
| `WATSONX_AI_CLASSIFIER_ID`      | Used in IBM SDK           |
| `NEWS_API_KEY`                  | Used in EventRegistry SDK |
| `NEWS_API_TOPIC_URI`            | Used in EventRegistry SDK |

After this, you can then install dependencies via:

```bash
npm ci
```

> Ensure you Node version is >=18.8.0

After that, you run the local development server with:

```bash
npm run dev
```

The development version of the site will now be available at [http://localhost:3000](http://localhost:3000).

## Deployment

N/A
