import { NextResponse } from "next/server";
import { getAdminSupabase } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const clientId = searchParams.get("client_id");

    if (!token && !clientId) {
      return NextResponse.json(
        { valid: false, error: "Missing review invitation token or client identifier." },
        { status: 400 }
      );
    }

    const supabase = getAdminSupabase();

    if (token) {
      const { data: reqData, error } = await supabase
        .from("review_requests")
        .select("id, client_id, client_name, client_email, used, expires_at")
        .eq("token", token)
        .maybeSingle();

      if (error || !reqData) {
        return NextResponse.json(
          { valid: false, error: "Invalid or expired review invitation token." },
          { status: 404 }
        );
      }

      if (reqData.used) {
        return NextResponse.json(
          { valid: false, error: "This review invitation link has already been used." },
          { status: 400 }
        );
      }

      if (reqData.expires_at && new Date(reqData.expires_at) < new Date()) {
        return NextResponse.json(
          { valid: false, error: "This review invitation link has expired." },
          { status: 400 }
        );
      }

      // Fetch client details if linked
      let clientCompany = "";
      if (reqData.client_id) {
        const { data: clientData } = await supabase
          .from("clients")
          .select("company")
          .eq("id", reqData.client_id)
          .maybeSingle();
        if (clientData?.company) clientCompany = clientData.company;
      }

      return NextResponse.json({
        valid: true,
        review_request_id: reqData.id,
        client_id: reqData.client_id,
        client_name: reqData.client_name,
        client_email: reqData.client_email,
        company: clientCompany,
      });
    }

    if (clientId) {
      const { data: clientData, error } = await supabase
        .from("clients")
        .select("id, name, company, email")
        .eq("id", clientId)
        .maybeSingle();

      if (error || !clientData) {
        return NextResponse.json(
          { valid: false, error: "Client record not found." },
          { status: 404 }
        );
      }

      return NextResponse.json({
        valid: true,
        client_id: clientData.id,
        client_name: clientData.name,
        client_email: clientData.email,
        company: clientData.company || "",
      });
    }

    return NextResponse.json({ valid: false, error: "Invalid request parameters." }, { status: 400 });
  } catch (err: unknown) {
    console.error("API review verify error:", err);
    return NextResponse.json(
      { valid: false, error: (err as Error).message || "Failed to verify review invitation." },
      { status: 500 }
    );
  }
}
