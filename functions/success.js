// Handle POST requests only - for PayU payment gateway redirects
export async function onRequestPost(context) {  
  const { request, env } = context;
  
  // Redirect POST request to success.html page
  return Response.redirect(new URL('/success.html', request.url), 302);
  

}
