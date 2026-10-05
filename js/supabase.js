import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ryaepghrqgyjwjaweoml.supabase.co";
const supabaseKey = "sb_publishable_WAt-7vkuoUe5ouvWTIXoUg_-Ze953nI";

export const supabase = createClient(supabaseUrl, supabaseKey);