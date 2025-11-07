// Handle POST requests from PayU payment gateway to /success.html
export async function onRequest(context) {
  const { request, env } = context;

  // If this is a POST request, fetch and return the success.html file
  // This allows payment gateways to POST payment data to this page
  if (request.method === 'POST') {
    // Fetch the static success.html file
    const htmlResponse = await env.ASSETS.fetch(new URL('/success.html', request.url));
    
    // Return the HTML with 200 status code
    // Important: Don't redirect POST requests - serve the page directly
    return new Response(htmlResponse.body, {
      status: 200,
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
      },
    });
  }

  // For GET requests, serve the static file normally
  return env.ASSETS.fetch(request);
}
