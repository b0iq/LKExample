import {API_URL} from '@env';

async function createToken(publisher: boolean = false): Promise<string> {
  try {
    const request = await fetch(`${API_URL}/lk/create-token`, {
      method: 'POST',
      body: JSON.stringify({publisher}),
    });
    const response = await request.json();
    if (!response.data.token) {
      throw new Error('Token not found');
    }
    return response.data.token;
  } catch (error) {
    throw error;
  }
}
export default createToken;
