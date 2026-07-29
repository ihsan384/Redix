import { NextResponse } from "next/server";
import { getAdminSupabase } from "@/lib/supabase";
import {
  checkRateLimit,
  getClientIp,
  sanitizeString,
  isValidEmail,
} from "@/lib/security";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const { allowed } = checkRateLimit(ip, 10, 5 * 60 * 1000);

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many attempts. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const email = sanitizeString(body.email).toLowerCase();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const supabase = getAdminSupabase();

    // Check if already subscribed
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("id, status")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      if (existing.status === "subscribed") {
        return NextResponse.json(
          { success: true, message: "You are already subscribed to our newsletter!" },
          { status: 200 }
        );
      }
      // Re-subscribe if previously unsubscribed
      await supabase
        .from("newsletter_subscribers")
        .update({ status: "subscribed" })
        .eq("id", existing.id);
    } else {
      const { error: insertError } = await supabase
        .from("newsletter_subscribers")
        .insert({ email, status: "subscribed" });

      if (insertError) {
        console.error("Newsletter subscription error:", insertError);
        return NextResponse.json(
          { error: "Failed to subscribe. Please try again." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { success: true, message: "Successfully subscribed to REDIX newsletter!" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("API newsletter error:", err);
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
