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
        { error: "Too many applications. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const name = sanitizeString(body.name);
    const email = sanitizeString(body.email).toLowerCase();
    const phone = sanitizeString(body.phone);
    const position = sanitizeString(body.position);
    const portfolio_url = sanitizeString(body.portfolio_url || body.portfolio);
    const resume_url = sanitizeString(body.resume_url || body.resume);
    const cover_letter = sanitizeString(body.cover_letter || body.message);

    if (!name || !email || !position) {
      return NextResponse.json(
        { error: "Name, email, and target position are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const supabase = getAdminSupabase();

    // 1. Create or Find Lead
    let leadId: string | null = null;
    const { data: existingLead } = await supabase
      .from("leads")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existingLead) {
      leadId = existingLead.id;
    } else {
      const { data: newLead } = await supabase
        .from("leads")
        .insert({
          name,
          email,
          phone,
          source: "career_application",
          status: "new",
          notes: `Job Application for ${position}`,
        })
        .select("id")
        .single();
      if (newLead) leadId = newLead.id;
    }

    // 2. Insert into Messages (ERP Inbox)
    const { data: msgData, error: msgError } = await supabase
      .from("messages")
      .insert({
        lead_id: leadId,
        type: "career",
        name,
        email,
        phone,
        subject: `Career Application: ${position}`,
        content: `Applied Position: ${position}\nPortfolio: ${portfolio_url || "N/A"}\nResume Link: ${resume_url || "N/A"}\n\nCover Letter / Intro:\n${cover_letter || "N/A"}`,
        status: "unread",
        metadata: { position, portfolio_url, resume_url },
      })
      .select()
      .single();

    if (msgError) {
      console.error("Career application insert error:", msgError);
      return NextResponse.json(
        { error: "Failed to submit career application." },
        { status: 500 }
      );
    }

    // 3. Notification for ERP
    await supabase.from("notifications").insert({
      title: "New Career Application",
      message: `${name} applied for "${position}" position`,
      type: "lead",
      reference_id: msgData.id,
      read: false,
    });

    return NextResponse.json(
      { success: true, message: "Your application has been received! Our hiring team will review it." },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("API career error:", err);
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
