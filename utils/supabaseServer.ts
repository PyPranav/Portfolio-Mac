"use server"
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies, headers } from 'next/headers'

export async function createClient() {
const cookieStore = cookies()

return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
    cookies: {
        getAll() {
        return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
        try {
            cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
            )
        } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
        }
        },
    },
    }
)
}


// export async function getTweets(){
//     const supabase = await createClient();
//     const { data: tweets } = await supabase.from("tweets").select('*')
//     return tweets
// }

export async function recordVisit() {
    try {
        const supabase = await createClient();
        const headersList = headers();
        const xForwardedFor = headersList.get('x-forwarded-for');
        const ip = xForwardedFor || 'unknown';
        const userAgent = headersList.get('user-agent') || 'unknown';
        
        console.log('Attempting to record visit with:', { ip, userAgent });
        
        const { data, error } = await supabase
            .from("visits")
            .insert({
                ip: ip,
                user_agent: userAgent
            })
            .select('*');
            
        if (error) {
            console.error('Error recording visit:', error);
            return { success: false, error };
        }
        
        // console.log('Visit recorded successfully:', data);
        return { success: true, data };
    } catch (err) {
        console.error('Exception recording visit:', err);
        return { success: false, error: err };
    }
}

