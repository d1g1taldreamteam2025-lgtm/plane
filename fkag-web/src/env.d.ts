/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL: string;
  readonly PUBLIC_SUPABASE_ANON_KEY: string;
  readonly PUBLIC_WEBHOOK_URL: string;
  readonly PUBLIC_CLOUDINARY_CLOUD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
