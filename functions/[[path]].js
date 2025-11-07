// Cloudflare Pages Function to handle POST redirects
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // Handle POST requests to success pages
  if (url.pathname.includes('/success') && request.method === 'POST') {
    // Redirect with 303 See Other status code
    // This converts POST to GET automatically
    return Response.redirect(url.href, 303);
  }

  // For all other requests, serve the static asset
  return env.ASSETS.fetch(request);
}
