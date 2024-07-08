export async function GET(req: Request) {
  try {
    const resp = await fetch(
      `https://api.coinpaprika.com/v1/tickers/btc-bitcoin/historical?start=2024-01-01&interval=1d`
    );
    const data = await resp.json();
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
}
