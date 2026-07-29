import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://dnzhkytalvlkpyiyexwt.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRuemhreXRhbHZsa3B5aXlleHd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3NDYyOTYsImV4cCI6MjA5ODMyMjI5Nn0.HT1oSQnrLQXTUG9TXJjhM7T1E8pMF1OoKP8WX7dfKeA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function getAdminSupabase() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (serviceRoleKey) {
    return createClient(supabaseUrl, serviceRoleKey);
  }
  return supabase;
}

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}
