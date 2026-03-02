import { supabase } from '../lib/supabase';

function normalizeDivision(row) {
  if (!row) return null;

  return {
    id: row.id,
    name: row.name || '',
    ageRange: row.age_range || '',
  };
}

function normalizeMember(row, divisionsById = {}) {
  if (!row) return null;

  const role = row.role || row.scout_roles || null;

  return {
    id: row.id,
    division_id: row.division_id || '',
    divisionName: divisionsById[row.division_id]?.name || '',
    full_name: row.full_name || '',
    avatar_url: row.avatar_url || '',
    joined_at: row.joined_at || '',
    role_id: row.role_id || null,
    role_name: role?.name || '',
    is_lead: !!role?.is_lead,
  };
}

export async function listDivisionOptions() {
  try {
    const { data, error } = await supabase
      .from('scout_divisions')
      .select('id, name, age_range')
      .order('name', { ascending: true });

    if (error) {
      throw error;
    }

    return {
      divisions: (data || []).map(normalizeDivision).filter(Boolean),
      error: null,
    };
  } catch (err) {
    return {
      divisions: [],
      error: err,
    };
  }
}

async function ensureRole({ roleName, isLead }) {
  const normalizedName = String(roleName || '').trim();

  if (!normalizedName) {
    throw new Error('اسم الدور مطلوب.');
  }

  const { data: existing, error: existingError } = await supabase
    .from('scout_roles')
    .select('id, name, is_lead')
    .eq('name', normalizedName)
    .eq('is_lead', !!isLead)
    .limit(1)
    .maybeSingle();

  if (existingError) {
    throw existingError;
  }

  if (existing?.id) {
    return existing.id;
  }

  const { data: created, error: createError } = await supabase
    .from('scout_roles')
    .insert([
      {
        name: normalizedName,
        is_lead: !!isLead,
      },
    ])
    .select('id')
    .maybeSingle();

  if (createError) {
    throw createError;
  }

  if (!created?.id) {
    throw new Error('تعذر إنشاء الدور.');
  }

  return created.id;
}

export async function listDivisionMembers() {
  try {
    const [{ divisions, error: divisionError }, membersResult] = await Promise.all([
      listDivisionOptions(),
      supabase
        .from('scout_members')
        .select(
          `
          id,
          division_id,
          full_name,
          avatar_url,
          joined_at,
          role_id,
          role:scout_roles (
            id,
            name,
            is_lead
          )
        `
        )
        .order('joined_at', { ascending: true }),
    ]);

    if (divisionError) {
      throw divisionError;
    }

    if (membersResult.error) {
      throw membersResult.error;
    }

    const divisionsById = Object.fromEntries(
      divisions.map((division) => [division.id, division])
    );

    return {
      rows: (membersResult.data || [])
        .map((row) => normalizeMember(row, divisionsById))
        .filter(Boolean),
      divisions,
      error: null,
    };
  } catch (err) {
    return {
      rows: [],
      divisions: [],
      error: err,
    };
  }
}

export async function saveDivisionMember({ id, values }) {
  const divisionId = String(values?.division_id || '').trim();
  const fullName = String(values?.full_name || '').trim();
  const joinedAt = String(values?.joined_at || '').trim();
  const avatarUrl = String(values?.avatar_url || '').trim();
  const roleName = String(values?.role_name || '').trim();
  const isLead = !!values?.is_lead;

  if (!divisionId) {
    return { row: null, error: new Error('الوحدة مطلوبة.') };
  }

  if (!fullName) {
    return { row: null, error: new Error('اسم العضو مطلوب.') };
  }

  if (!joinedAt) {
    return { row: null, error: new Error('تاريخ الانضمام مطلوب.') };
  }

  try {
    const roleId = await ensureRole({ roleName, isLead });

    const payload = {
      division_id: divisionId,
      full_name: fullName,
      avatar_url: avatarUrl || null,
      joined_at: joinedAt,
      role_id: roleId,
    };

    const query = id
      ? supabase.from('scout_members').update(payload).eq('id', id)
      : supabase.from('scout_members').insert([payload]);

    const { data, error } = await query
      .select(
        `
        id,
        division_id,
        full_name,
        avatar_url,
        joined_at,
        role_id,
        role:scout_roles (
          id,
          name,
          is_lead
        )
      `
      )
      .maybeSingle();

    if (error) {
      throw error;
    }

    const { divisions } = await listDivisionOptions();
    const divisionsById = Object.fromEntries(
      divisions.map((division) => [division.id, division])
    );

    return {
      row: normalizeMember(data, divisionsById),
      error: null,
    };
  } catch (err) {
    return {
      row: null,
      error: err,
    };
  }
}

export async function deleteDivisionMember(id) {
  if (!id) {
    return { error: new Error('معرف العضو مطلوب.') };
  }

  try {
    const { error } = await supabase.from('scout_members').delete().eq('id', id);

    if (error) {
      throw error;
    }

    return { error: null };
  } catch (err) {
    return { error: err };
  }
}

export default {
  listDivisionOptions,
  listDivisionMembers,
  saveDivisionMember,
  deleteDivisionMember,
};
