interface IMakeRequest {
  url: string;
  body?: Record<string, any>;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, any>;
}

export const makeRequest = async ({
  url,
  body = {},
  method = 'GET',
  headers = {},
}: IMakeRequest) => {
  const bodyString = JSON.stringify(body)
  let json

  const response = await fetch(url, {
    method,
    body: bodyString,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  })
  if (!response.ok) {
    let message = `Failed api request to ${url}`
    try {
      const responseText = await response.text()
      if (responseText) {
        message += responseText
      }
    } catch (e) {
      throw new Error(`Api request to ${url}: ${message} ${response.status}`)
    }
  }
  try {
    // incase the the server returns invalid json
    json = await response.json()
  } catch (e) {
    return ''
  }
  return json
}