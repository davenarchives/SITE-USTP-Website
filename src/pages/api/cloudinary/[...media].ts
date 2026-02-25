// @ts-ignore
import { createMediaHandler } from "next-tinacms-cloudinary/dist/handlers";
import { isAuthorized } from "@tinacms/auth";
import type { APIRoute } from "astro";
import { Readable } from "stream";

export const ALL: APIRoute = async ({ request, params }) => {
    const mediaHandler = createMediaHandler({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
        api_key: process.env.CLOUDINARY_API_KEY || "",
        api_secret: process.env.CLOUDINARY_API_SECRET || "",
        authorized: async (req: any, _res: any) => {
            try {
                if (process.env.NODE_ENV === "development") {
                    return true;
                }

                const user = await isAuthorized(req);

                return !!(user && user.verified);
            } catch (e) {
                console.error(e);
                return false;
            }
        },
    });

    // Convert Astro Request to something like NextApiRequest
    const url = new URL(request.url);
    const query = Object.fromEntries(url.searchParams);

    // Create a mock response object to capture the output
    let responseData: any = null;
    let responseStatus = 200;
    let responseHeaders: Record<string, string> = {};

    const mockRes: any = {
        status: (code: number) => {
            responseStatus = code;
            return mockRes;
        },
        json: (data: any) => {
            responseData = data;
            return mockRes;
        },
        setHeader: (name: string, value: string) => {
            responseHeaders[name] = value;
            return mockRes;
        },
        end: (data: any) => {
            if (data) responseData = data;
            return mockRes;
        },
    };

    let mockReq: any;
    if (request.body) {
        mockReq = Readable.fromWeb(request.body as any);
    } else {
        mockReq = new Readable({
            read() {
                this.push(null);
            },
        });
    }

    mockReq.method = request.method;
    mockReq.query = {
        ...query,
        media: params.media?.split("/"),
    };
    mockReq.headers = Object.fromEntries(request.headers.entries());


    await mediaHandler(mockReq, mockRes);

    return new Response(
        typeof responseData === "string" ? responseData : JSON.stringify(responseData),
        {
            status: responseStatus,
            headers: {
                "Content-Type": "application/json",
                ...responseHeaders,
            },
        }
    );
};
