import { NextResponse } from "next/server";
import { getAdminSupabase } from "@/lib/supabase";
import {
  checkRateLimit,
  getClientIp,
  sanitizeString,
} from "@/lib/security";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const { allowed } = checkRateLimit(ip, 5, 10 * 60 * 1000);

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many review submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const token = sanitizeString(body.token);
    const client_id = sanitizeString(body.client_id);
    const review_request_id = sanitizeString(body.review_request_id);

    const name = sanitizeString(body.name);
    const company = sanitizeString(body.company);
    const position = sanitizeString(body.position);
    const service = sanitizeString(body.service);
    const rating = Math.min(5, Math.max(1, parseInt(body.rating || "5", 10)));
    const reviewText = sanitizeString(body.review || body.review_text);
    const logo_url = sanitizeString(body.logo_url || body.avatar_url);

    if (!name || !reviewText) {
      return NextResponse.json(
        { error: "Name and review text are required." },
        { status: 400 }
      );
    }

    const supabase = getAdminSupabase();

    // Verify token if provided
    if (token || review_request_id) {
      const query = supabase.from("review_requests").select("id, used, expires_at");
      if (review_request_id) query.eq("id", review_request_id);
      else if (token) query.eq("token", token);

      const { data: reqData } = await query.maybeSingle();

      if (reqData) {
        if (reqData.used) {
          return NextResponse.json(
            { error: "This review invitation token has already been used." },
            { status: 400 }
          );
        }
        // Mark token as used
        await supabase
          .from("review_requests")
          .update({ used: true })
          .eq("id", reqData.id);
      }
    }

    // Insert Review with PENDING status by default (Requirement 4)
    const { data: revData, error: revError } = await supabase
      .from("client_reviews")
      .insert({
        client_id: client_id || null,
        review_request_id: review_request_id || null,
        name,
        company,
        position,
        service: service || "Client Collaboration",
        rating,
        review: reviewText,
        logo_url: logo_url || null,
        status: "pending",
        featured: false,
        verified: true,
      })
      .select()
      .single();

    if (revError) {
      console.error("Client review insert error:", revError);
      return NextResponse.json(
        { error: "Failed to store client review." },
        { status: 500 }
      );
    }

    // Create Notification for ERP Admin moderation
    await supabase.from("notifications").insert({
      title: "New Verified Client Review Received",
      message: `${name} (${company || "Client"}) submitted a ${rating}-star review`,
      type: "review",
      reference_id: revData.id,
      read: false,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your review has been submitted and sent to our team for approval.",
        review_id: revData.id,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("API review submit error:", err);
    return NextResponse.json(
      { error: (err as Error).message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
