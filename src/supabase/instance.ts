import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://wtaipawaoxefiohljmia.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0YWlwYXdhb3hlZmlvaGxqbWlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg4NjYyMzEsImV4cCI6MjA0NDQ0MjIzMX0.bbCQLweaHgmnq8r-8yZFmKIOwqMbTsp362SJrh3FH04",
);
