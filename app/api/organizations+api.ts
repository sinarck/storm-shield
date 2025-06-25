import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client (no auth storage needed)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (id) {
      // Get specific organization with reviews and shifts
      const { data, error } = await supabase
        .from("organizations")
        .select("*, organization_reviews(*, users(full_name)), shifts(*)")
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
      // Get all organizations
      const { data, error } = await supabase.from("organizations").select("*");

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }

      return Response.json(data || []);
    }
  } catch (error) {
    console.error("Error fetching organizations:", error);

    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

