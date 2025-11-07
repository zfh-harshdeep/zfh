// Handle POST requests from PayU payment gateway
export async function onRequestPost(context) {
    const { request, env } = context;
    
    try {
        // Fetch the static success.html file
        const htmlResponse = await env.ASSETS.fetch(new URL('/success.html', request.url));
        
        // Return the HTML with 200 status code
        // This serves the page directly without redirecting
        return new Response(htmlResponse.body, {
            status: 200,
            headers: {
                'Content-Type': 'text/html;charset=UTF-8',
            },
        });
    } catch (error) {
        console.error('Error serving success page:', error);
        
        // Fallback HTML in case the file can't be fetched
        return new Response(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Payment Successful</title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                <h1 style="color: green;">✓ Payment Successful!</h1>
                <p>Thank you for your purchase. Your payment has been processed successfully.</p>
                <p>You will receive a confirmation email shortly.</p>
                <a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;">Return to Homepage</a>
            </body>
            </html>
        `, {
            status: 200,
            headers: {
                'Content-Type': 'text/html;charset=UTF-8',
            },
        });
    }
}
