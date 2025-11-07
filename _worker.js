// Advanced Mode Worker - handles ALL requests
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Handle POST requests to /success or /success.html
    if ((url.pathname === '/success' || url.pathname === '/success.html') && request.method === 'POST') {
      // Fetch the static success.html file
      // Create a new GET request for success.html to fetch the static asset
      const successHtmlRequest = new Request(new URL('/success.html', request.url), { method: 'GET' });
      const successHtmlResponse = await env.ASSETS.fetch(successHtmlRequest);      
      // Return it with 200 status
      return new Response(successHtmlResponse.body, {
        status: 200,
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
        },
      });
    }
    
    // For all other requests, serve static assets normally
    return env.ASSETS.fetch(request);
  }
}
