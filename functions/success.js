// Handle POST requests to /success
export async function onRequest(context) {
  const { request, env } = context;
  
  // If this is a POST request, redirect with 303 to convert POST to GET
  if (request.method === 'POST') {
    const url = new URL(request.url);
    return Response.redirect(url.href, 303);
  }
  
  // For GET requests, serve the static file
  return env.ASSETS.fetch(request);
}
