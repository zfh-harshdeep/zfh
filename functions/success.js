// Handle POST requests only - for PayU payment gateway redirects
export async function onRequestPost(context) {  
  const { request, env } = context;
  
  // Fetch the success.html content
  const htmlResponse = await env.ASSETS.fetch(new URL('/success.html', request.url));
  
  // Return it with 200 status
  return new Response(htmlResponse.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
    },
  });
}
