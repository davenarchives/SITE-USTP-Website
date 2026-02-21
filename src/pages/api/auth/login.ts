
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies }) => {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return new Response(JSON.stringify({ error: "Email is required" }), {
                status: 400,
            });
        }

        const adminEmailsEnv = import.meta.env.ADMIN_EMAILS || "";
        const authorizedEmails = adminEmailsEnv.split(",").map((e: string) => e.trim());

        if (authorizedEmails.includes(email)) {
            // Set HTTP-only cookie
            cookies.set("site_admin_access", "true", {
                path: "/",
                httpOnly: true, // Not accessible via JS
                secure: import.meta.env.PROD, // Only send over HTTPS in production
                sameSite: "lax",
                maxAge: 60 * 60 * 24 // 1 day
            });

            return new Response(JSON.stringify({ success: true }), {
                status: 200,
            });
        } else {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
            });
        }
    } catch (error) {
        console.error("Auth API Error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
        });
    }
}
