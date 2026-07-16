import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

type SeedResult = {
  created: boolean;
  userId: string;
  email: string;
  role: string;
};

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function decodeJwtRole(key: string): string | null {
  try {
    const payload = key.split('.')[1];
    if (!payload) return null;
    const json = Buffer.from(payload, 'base64url').toString('utf8');
    return (JSON.parse(json) as { role?: string }).role ?? null;
  } catch {
    return null;
  }
}

async function seedAdmin(): Promise<SeedResult> {
  const supabaseUrl = requireEnv('SUPABASE_URL');
  const serviceRoleKey = requireEnv('SUPABASE_SERVICE_ROLE_KEY');
  const adminEmail = requireEnv('ADMIN_EMAIL');
  const adminPassword = requireEnv('ADMIN_PASSWORD');
  const adminFullName = process.env.ADMIN_FULL_NAME?.trim() || 'Portfolio Admin';

  const keyRole = decodeJwtRole(serviceRoleKey);
  if (keyRole && keyRole !== 'service_role') {
    throw new Error(
      `SUPABASE_SERVICE_ROLE_KEY looks like a "${keyRole}" key. ` +
        'Use the service_role secret from Supabase → Project Settings → API.',
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const { data: existingAdmins, error: adminQueryError } = await supabase
    .from('profiles')
    .select('id, email, role')
    .eq('role', 'admin')
    .limit(1);

  if (adminQueryError) {
    throw new Error(
      `Could not query profiles table: ${adminQueryError.message}. ` +
        'Run supabase/migrations/20260716000000_create_profiles.sql first.',
    );
  }

  if (existingAdmins && existingAdmins.length > 0) {
    const existing = existingAdmins[0];
    console.log('Admin user already exists — skipping creation.');
    console.log(`  id:    ${existing.id}`);
    console.log(`  email: ${existing.email}`);
    console.log(`  role:  ${existing.role}`);

    return {
      created: false,
      userId: existing.id,
      email: existing.email,
      role: existing.role,
    };
  }

  const { data: listed, error: listError } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });

  if (listError) {
    throw new Error(`Failed to list auth users: ${listError.message}`);
  }

  const existingAuthUser = listed.users.find(
    (user) => user.email?.toLowerCase() === adminEmail.toLowerCase(),
  );

  let userId: string;

  if (existingAuthUser) {
    userId = existingAuthUser.id;

    const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: { full_name: adminFullName },
      app_metadata: { role: 'admin' },
    });

    if (updateError) {
      throw new Error(`Failed to promote existing user to admin: ${updateError.message}`);
    }

    console.log(`Promoted existing user to admin: ${adminEmail}`);
  } else {
    const { data: created, error: createError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: { full_name: adminFullName },
      app_metadata: { role: 'admin' },
    });

    if (createError || !created.user) {
      throw new Error(
        `Failed to create admin user: ${createError?.message ?? 'Unknown error'}`,
      );
    }

    userId = created.user.id;
    console.log(`Created admin auth user: ${adminEmail}`);
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .upsert(
      {
        id: userId,
        email: adminEmail,
        full_name: adminFullName,
        role: 'admin',
      },
      { onConflict: 'id' },
    )
    .select('id, email, role')
    .single();

  if (profileError || !profile) {
    throw new Error(
      `Failed to upsert admin profile: ${profileError?.message ?? 'Unknown error'}`,
    );
  }

  console.log('Admin user ready.');
  console.log(`  id:    ${profile.id}`);
  console.log(`  email: ${profile.email}`);
  console.log(`  role:  ${profile.role}`);

  return {
    created: true,
    userId: profile.id,
    email: profile.email,
    role: profile.role,
  };
}

seedAdmin()
  .then(() => {
    process.exit(0);
  })
  .catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    console.error('seed-admin failed:', message);
    process.exit(1);
  });
