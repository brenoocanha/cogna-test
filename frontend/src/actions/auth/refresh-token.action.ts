'use server';

export async function refreshTokenAction(refreshToken: string) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_APP_URL + '/auth/refresh',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken,
      }),
    }
  );
  const data = await res.json();
  if (!res.ok) {
    return {
      error: true,
      message: data.message,
      status: res.status,
    };
  }

  return data;
}
