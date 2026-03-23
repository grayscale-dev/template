import { createClient, type SupabaseClient } from '@supabase/supabase-js'

import { remodelConfig } from './config'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

const shouldInitializeSupabase =
  remodelConfig.useSupabase && Boolean(supabaseUrl) && Boolean(supabaseAnonKey)

// Supabase is intentionally optional in this template.
// Future Codex runs can use this client for form submissions, auth,
// lightweight CMS workflows, or content syncing when a project needs it.
export const supabase: SupabaseClient | null = shouldInitializeSupabase
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null

export const isSupabaseConfigured = supabase !== null
