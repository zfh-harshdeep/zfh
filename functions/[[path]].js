// Cloudflare Pages Function - catch-all fallback
// Specific routes like /success and /success.html are handled by their own functions
export async function onRequest(context) {
  const { request, env } = context;
  
  // Simply serve all static assets
  // Specific routes with their own function files will be handled first
  return env.ASSETS.fetch(request);
}
