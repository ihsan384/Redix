import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function GET() {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        configured: false,
        data: [],
        message: "Supabase is not configured. Falling back to default verified client testimonials.",
      });
    }

    // Only fetch reviews that have status = 'approved' (Requirement 4)
    const { data, error } = await supabase
      .from("client_reviews")
      .select("*")
      .eq("status", "approved")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase fetch client_reviews error:", error);
      return NextResponse.json({
        configured: true,
        data: [],
        error: error.message,
      });
    }

    return NextResponse.json({
      configured: true,
      data: data || [],
    });
  } catch (err: unknown) {
    console.error("API testimonials error:", err);
    return NextResponse.json(
      { error: (err as Error).message || "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
