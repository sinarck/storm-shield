import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client (no auth storage needed)
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (id) {
      // Get specific shift with organization details
      const { data, error } = await supabase
        .from("shifts")
        .select(
          "*, organizations(id, name, logo_url, website_url, contact_phone)"
        )
        .eq("id", id)
        .single();

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }

      return Response.json(data);
    } else {
      // Get all shifts with organization details
      const { data, error } = await supabase
        .from("shifts")
        .select(
          "*, organizations(id, name, logo_url, website_url, contact_phone)"
        );

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }

      return Response.json(data || []);
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

