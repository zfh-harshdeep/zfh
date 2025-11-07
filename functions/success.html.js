// Handle all requests to /success.html - serve the static success page
export async function onRequest(context) {
    const { request, env } = context;
    
    // Always serve the static success.html file for any request method
    return env.ASSETS.fetch(request);
}
