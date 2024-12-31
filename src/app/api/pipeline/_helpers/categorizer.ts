const { WATSONX_AI_APIKEY, WATSONX_AI_SERVICE_URL } = process.env;

const AUTH_URL = 'https://iam.cloud.ibm.com/identity/token';
const ML_MODEL_URL = new URL(
  '/ml/v4/deployments/6b2fbae0-25b4-4ee8-a0d9-3325bd6aeb82/predictions?version=2021-05-01',
  WATSONX_AI_SERVICE_URL
);

interface CategorizerRes {
  predictions: {
    fields: string[];
    values: [string, number[]][];
  }[];
}

async function getToken() {
  const body = new URLSearchParams({
    grant_type: 'urn:ibm:params:oauth:grant-type:apikey',
    apikey: WATSONX_AI_APIKEY as string
  });

  const res = await fetch(AUTH_URL, {
    method: 'POST',
    body: body.toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    }
  }).then((r) => r.json());

  if ('errorCode' in res) return null;
  return res.access_token as string;
}

export default async function riskCategorizer(summaries: string[]) {
  const token = await getToken();

  const payload = {
    input_data: [
      {
        fields: ['text_body'],
        values: summaries.map((s) => [s])
      }
    ]
  };

  const res = (await fetch(ML_MODEL_URL, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }).then((r) => r.json())) as CategorizerRes;

  console.log(res);

  return res.predictions[0].values;
}
