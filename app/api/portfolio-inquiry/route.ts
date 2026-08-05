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
        { error: "Too many inquiries. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const name = sanitizeString(body.name);
    const email = sanitizeString(body.email).toLowerCase();
    const phone = sanitizeString(body.phone);
    const projectTitle = sanitizeString(body.project_title || body.project);
    const messageContent = sanitizeString(body.message);

    if (!name || !email || !messageContent) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
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
          source: "portfolio_inquiry",
          status: "new",
          notes: `Interested in portfolio project: ${projectTitle || "General Portfolio"}`,
        })
        .select("id")
        .single();
      if (newLead) leadId = newLead.id;
    }

    // 2. Insert into Messages
    const { data: msgData, error: msgError } = await supabase
      .from("messages")
      .insert({
        lead_id: leadId,
        type: "portfolio",
        name,
        email,
        phone,
        subject: `Portfolio Inquiry: ${projectTitle || "Work Request"}`,
        content: `Referenced Work/Project: ${projectTitle || "N/A"}\n\nInquiry Details:\n${messageContent}`,
        status: "unread",
        metadata: { project_title: projectTitle },
      })
      .select()
      .single();

    if (msgError) {
      console.error("Portfolio inquiry insert error:", msgError);
      return NextResponse.json(
        { error: "Failed to submit portfolio inquiry." },
        { status: 500 }
      );
    }

    // 3. Notification for ERP
    await supabase.from("notifications").insert({
      title: "New Portfolio Inquiry",
      message: `${name} inquired about "${projectTitle || "a portfolio project"}"`,
      type: "message",
      reference_id: msgData.id,
      read: false,
    });

    return NextResponse.json(
      { success: true, message: "Inquiry received! We'll get back to you with details." },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("API portfolio inquiry error:", err);
    return NextResponse.json(
      { error: (err as Error).message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
