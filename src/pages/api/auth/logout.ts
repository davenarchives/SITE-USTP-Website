
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ cookies }) => {
    cookies.delete("site_admin_access", {
        path: "/",
    });

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
    });
}
