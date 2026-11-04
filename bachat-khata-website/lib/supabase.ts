import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url || "https://placeholder.supabase.co", anonKey || "placeholder-anon-key");

export type Member = {
  id: string;
  name: string;
  role: string | null;
  phone: string | null;
  email: string | null;
  bio: string | null;
  photo_url: string | null;
  sort_order: number;
};

export async function getMembers(): Promise<Member[]> {
  if (!url || !anonKey) return [];
  const { data, error } = await supabase
    .from("members").select("*").order("sort_order", { ascending: true });
  if (error) {
    console.error("Unable to load members:", error.message);
    return [];
  }
  return (data ?? []) as Member[];
}
