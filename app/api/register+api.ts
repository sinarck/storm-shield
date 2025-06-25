import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client (no auth storage needed)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { shiftId, userId } = body;

    if (!shiftId || !userId) {
      return new Response(
        JSON.stringify({ error: "Shift ID and User ID are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if already registered
    const { data: existing, error: selectError } = await supabase
      .from("shift_registrations")
      .select("id")
      .eq("shift_id", shiftId)
      .eq("user_id", userId)
      .maybeSingle();

    if (selectError) {
      return new Response(JSON.stringify({ error: selectError.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (existing) {
      // Return existing registration
      const { data: refetched, error: refetchError } = await supabase
        .from("shift_registrations")
        .select("*")
        .eq("id", existing.id)
        .single();

      if (refetchError) {
        return new Response(JSON.stringify({ error: refetchError.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }

      return Response.json(refetched);
    }

    // Insert new registration
    const { data, error } = await supabase
      .from("shift_registrations")
      .insert({ shift_id: shiftId, user_id: userId, status: "confirmed" })
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return Response.json(data);
  } catch (error) {
    console.error("Error registering shift:", error);

    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

