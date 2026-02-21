## Release Notes: Admin Portal & Deployment Architecture

This release introduces the Admin Portal for officer management, migrates storage to Cloudinary, and restructures the application for serverless deployment on Vercel.

### 🔐 Authentication
*   **Firebase OAuth Integration**: Implemented Google Sign-In using Firebase Authentication (`src/pages/admin.astro`).
*   **Role-Based Access Control**: Restricted access to the Admin Portal to specific email addresses defined in `ADMIN_EMAILS`.
*   **Session Management**: Added client-side session checks to protect the `/officerPictureChange` route.

### 📸 Officer Picture Manager
*   **Profile Picture Management**: Added a new dashboard (`/officerPictureChange`) for updating officer profile pictures.
*   **Dynamic Data**: Replaced hardcoded image paths with dynamic links stored in Firebase Firestore (`settings/officerProfilePictures`).
*   **Cloudinary Integration**: Migrated image storage from the local file system to **Cloudinary** for scalable, cloud-based hosting.

### 🚀 Architecture & Deployment
*   **Serverless API Routes**:
    *   Migrated the image upload logic from a separate Express backend to a native Astro API Route (`src/pages/api/upload.ts`).
    *   This eliminates the need for a separate backend server, simplifying the architecture.
*   **Vercel Adapter**:
    *   Installed `@astrojs/vercel` and configured `astro.config.mjs` with `output: 'server'`.
    *   Enabled Server-Side Rendering (SSR) to support the new API routes and dynamic functionality.
*   **Dependency Updates**:
    *   Removed `multer` and `express` dependencies from the core workflow (still present in legacy `backend/` folder but unused).
    *   Added `cloudinary` SDK to the main project dependencies.

### ⚠️ Important for Deployment
*   **Environment Variables**: The following variables must be set in the Vercel project settings:
    *   `ADMIN_EMAILS`
    *   `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
    *   `PUBLIC_FIREBASE_API_KEY`, `PUBLIC_FIREBASE_AUTH_DOMAIN`, etc.
