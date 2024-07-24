
import {createBrowserClient} from '@supabase/ssr'

const URL: string | null | undefined = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const ANON: string | null | undefined = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabaseClient = createBrowserClient(URL!, ANON!, {
    auth: {persistSession: false},
});