// This is the code for your Cloudflare Worker
// (e.g., index.js or _worker.js)

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // --- THIS IS THE FIX ---
    // 1. Check if the request is from PayU (a POST to /success)
    if (url.pathname === '/success' && request.method === 'POST') {
      
      // 2. We accept the POST (no 405 error).
      // 3. We immediately tell the user's browser to redirect to the
      //    *same URL*, but as a GET request. (Status 302 = Temporary Redirect)
      return Response.redirect(url.href, 302);
    }
    // --- END OF FIX ---


    // This part handles all other GET requests (like loading your homepage or success page).
    // It assumes your static site is hosted on Cloudflare Pages or R2.
    // If you are still hosting the files on GitHub Pages, you must change the line below.
    try {
      // This line tries to get the file (e.g., index.html, success.html)
      // from your Cloudflare Pages/R2 bucket.
      // 'env.ASSETS' is the standard way to link a Worker to Cloudflare Pages.
      return env.ASSETS.fetch(request);
    } catch (e) {
      return new Response("An error occurred. Make sure your Worker is bound to your Pages project in Cloudflare settings.", { status: 500 });
    }
  },
};