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
        { error: "Too many quote requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const name = sanitizeString(body.name);
    const email = sanitizeString(body.email).toLowerCase();
    const phone = sanitizeString(body.phone);
    const service = sanitizeString(body.service);
    const budget_range = sanitizeString(body.budget_range || body.budget);
    const details = sanitizeString(body.details || body.message);

    if (!name || !email || !service) {
      return NextResponse.json(
        { error: "Name, email, and service are required to request a quote." },
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
          source: "website_quote_request",
          status: "new",
          notes: `Quote Request for ${service}. Budget: ${budget_range}`,
        })
        .select("id")
        .single();
      if (newLead) leadId = newLead.id;
    }

    // 2. Insert into Quotes Table
    const quoteNumber = `Q-${Math.floor(1000 + Math.random() * 9000)}`;
    const { data: quoteData, error: quoteError } = await supabase
      .from("quotes")
      .insert({
        lead_id: leadId,
        quote_number: quoteNumber,
        name,
        email,
        service,
        budget_range,
        details,
        status: "pending",
      })
      .select()
      .single();

    if (quoteError) {
      console.error("Quote insert error:", quoteError);
      return NextResponse.json(
        { error: "Failed to submit quote request." },
        { status: 500 }
      );
    }

    // 3. Insert into Messages Table (Inbox entry)
    const { data: msgData } = await supabase
      .from("messages")
      .insert({
        lead_id: leadId,
        type: "quote",
        name,
        email,
        phone,
        subject: `Quote Request: ${service} (${quoteNumber})`,
        content: `Service requested: ${service}\nBudget Range: ${budget_range}\n\nProject Details:\n${details}`,
        status: "unread",
        metadata: { quote_id: quoteData.id, quote_number: quoteNumber, service, budget_range },
      })
      .select("id")
      .single();

    // 4. Create Notification
    await supabase.from("notifications").insert({
      title: "New Quote Request Received",
      message: `${name} requested a quote for ${service} (${budget_range})`,
      type: "quote",
      reference_id: quoteData.id,
      read: false,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your quote request has been submitted successfully!",
        quote_number: quoteNumber,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("API quote error:", err);
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
