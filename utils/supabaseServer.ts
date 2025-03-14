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

export async function recordVisit(isMobile: boolean) {
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
                user_agent: userAgent,
                is_mobile: isMobile
            })
            
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

export const recordChat = async (chat: string, author: string  ) => {
    try {
        const supabase = await createClient();
        const headersList = headers();
        const xForwardedFor = headersList.get('x-forwarded-for');
        const ip = xForwardedFor || 'unknown';

        const { data, error } = await supabase
            .from("chats")
            .insert({
                text: chat,
                author: author,
                ip: ip
            })
            
        if (error) {
            console.error('Error recording chat:', error);
            return { success: false, error };
        }
        
        // console.log('Chat recorded successfully:', data);
        return { success: true, data };
    } catch (err) {
        console.error('Exception recording chat:', err);
        return { success: false, error: err };
    }
}

export const getStats = async () => {
    try {
        const supabase = await createClient();
        
        // Get total visits
        const { data: totalVisits, error: totalVisitsError } = await supabase
            .from("visits")
            .select("*", { count: "exact" });
            
        if (totalVisitsError) {
            console.error('Error getting total visits:', totalVisitsError);
            return null;
        }
        
        // Get visits in the last 24 hours
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        const { data: recentVisits, error: recentVisitsError } = await supabase
            .from("visits")
            .select("*", { count: "exact" })
            .gte('created_at', yesterday.toISOString());
            
        if (recentVisitsError) {
            console.error('Error getting recent visits:', recentVisitsError);
            return null;
        }
        
        // Get unique visitors (count distinct IPs)
        const { data: uniqueVisitors, error: uniqueVisitorsError } = await supabase
            .from("visits")
            .select("ip")
            .limit(1000); // Limit to avoid excessive data
            
        if (uniqueVisitorsError) {
            console.error('Error getting unique visitors:', uniqueVisitorsError);
            return null;
        }
        
        // Count unique IPs
        const uniqueIPs = new Set(uniqueVisitors.map(visit => visit.ip)).size;
        
        // Get total chats
        const { data: totalChats, error: totalChatsError } = await supabase
            .from("chats")
            .select("*", { count: "exact" });
            
        if (totalChatsError) {
            console.error('Error getting total chats:', totalChatsError);
            return null;
        }
        
        // Get chats in the last 24 hours
        const { data: recentChats, error: recentChatsError } = await supabase
            .from("chats")
            .select("*", { count: "exact" })
            .gte('created_at', yesterday.toISOString());
            
        if (recentChatsError) {
            console.error('Error getting recent chats:', recentChatsError);
            return null;
        }
        
        // Get mobile visitors count
        const { data: mobileVisits, error: mobileVisitsError } = await supabase
            .from("visits")
            .select("*", { count: "exact" })
            .eq('is_mobile', true);
            
        if (mobileVisitsError) {
            console.error('Error getting mobile visits:', mobileVisitsError);
            return null;
        }
        
        // Calculate desktop visitors by subtracting mobile from total
        const desktopVisits = totalVisits.length - mobileVisits.length;
        
        return {
            total_visits: totalVisits.length,
            total_visits_in_last_24_hours: recentVisits.length,
            total_unique_visitors: uniqueIPs,
            total_mobile_visitors: mobileVisits.length,
            total_desktop_visitors: desktopVisits,
            total_chats: Math.ceil(totalChats.length/2),
            total_chats_in_last_24_hours: Math.ceil(recentChats.length/2)
        };
    } catch (err) {
        console.error('Exception getting stats:', err);
        return null;
    }
}
