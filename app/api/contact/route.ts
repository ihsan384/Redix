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
        { error: "Too many requests. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const name = sanitizeString(body.name);
    const email = sanitizeString(body.email).toLowerCase();
    const service = sanitizeString(body.service);
    const budget = sanitizeString(body.budget);
    const messageContent = sanitizeString(body.message);

    if (!name || !email || !messageContent) {
      return NextResponse.json(
        { error: "Name, valid email, and message are required fields." },
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
          source: "website_contact",
          status: "new",
          notes: `Interested in ${service || "General Services"}. Budget: ${budget || "N/A"}`,
        })
        .select("id")
        .single();
      if (newLead) leadId = newLead.id;
    }

    // 2. Insert into Messages table (ERP Inbox)
    const { data: msgData, error: msgError } = await supabase
      .from("messages")
      .insert({
        lead_id: leadId,
        type: "contact",
        name,
        email,
        subject: service ? `New Inquiry: ${service}` : "New Website Contact",
        content: messageContent,
        status: "unread",
        metadata: { service, budget },
      })
      .select()
      .single();

    if (msgError) {
      console.error("Messages insert error:", msgError);
      return NextResponse.json(
        { error: "Failed to store message in ERP inbox." },
        { status: 500 }
      );
    }

    // 3. Create Notification for ERP Admins
    await supabase.from("notifications").insert({
      title: "New Contact Message",
      message: `${name} sent a message regarding "${service || "General Inquiry"}"`,
      type: "message",
      reference_id: msgData.id,
      read: false,
    });

    return NextResponse.json(
      { success: true, message: "Thank you for reaching out! We will get back to you shortly." },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("API contact error:", err);
    return NextResponse.json(
      { error: (err as Error).message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
