import { supabase } from '../lib/supabase';
import { getDivisionById } from '../constants/divisions';

const DIVISION_NAME_MAP = {
  ashbal: 'ashbal',
  scouts: 'scouts',
  rovers: 'rovers',
};

const DIVISION_ID_MAP = {
  ashbal: process.env.EXPO_PUBLIC_DIVISION_ASHBAL_ID,
  scouts: process.env.EXPO_PUBLIC_DIVISION_SCOUTS_ID,
  rovers: process.env.EXPO_PUBLIC_DIVISION_ROVERS_ID,
};

const uniqueList = (list = []) =>
  Array.from(new Set(list.filter(Boolean)));

function normalizeDivision(row, slug) {
  if (!row) return null;

  const base = getDivisionById(slug) || {};
  const skills = Array.isArray(row.skills)
    ? row.skills
    : Array.isArray(base.skills)
    ? base.skills
    : [];

  return {
    id: row.id || base.id || slug,
    name: row.name || base.name || '',
    ageRange: row.age_range || row.ageRange || base.ageRange || '',
    description: row.description || base.description || '',
    mission: row.mission || base.mission || '',
    skills,
    icon: row.icon || base.icon || null,
    heroImage: row.hero_image || row.heroImage || base.heroImage || null,
    activities: Array.isArray(row.activities)
      ? row.activities
      : base.activities || [],
  };
}

function normalizeMember(row) {
  if (!row) return null;
  const role = row.role || row.scout_roles || {};

  return {
    id: row.id,
    name: row.full_name || row.name || '',
    avatar: row.avatar_url || row.avatar || null,
    joinedAt: row.joined_at || row.joinedAt || null,
    role: role.name || row.role || '',
    badge: row.badge || null,
    isLead:
      typeof row.is_lead === 'boolean'
        ? row.is_lead
        : typeof row.isLead === 'boolean'
        ? row.isLead
        : !!role.is_lead,
  };
}

export async function getDivisionData(slug) {
  const divisionName = DIVISION_NAME_MAP[slug] || slug;
  const staticDivision = getDivisionById(slug) || {};
  if (!divisionName) {
    return {
      division: null,
      leaders: [],
      members: [],
      error: new Error('Division slug is required'),
    };
  }

  let divisionRow = null;
  let divisionError = null;

  const namesToTry = [divisionName, staticDivision.name].filter(Boolean);

  for (const name of namesToTry) {
    const pattern =
      typeof name === 'string' && !name.includes('%')
        ? `%${name}%`
        : name;

    const { data, error } = await supabase
      .from('scout_divisions')
      .select('*')
      .ilike('name', pattern)
      .maybeSingle();

    if (data) {
      divisionRow = data;
      divisionError = null;
      break;
    }

    if (error) {
      divisionError = error;
      break;
    }
  }

  const divisionIds = uniqueList([
    divisionRow?.id,
    DIVISION_ID_MAP[slug],
    staticDivision.supabaseId,
    staticDivision.divisionId,
  ]);

  let memberRows = [];
  let memberError = null;

  try {
    let memberQuery = supabase
      .from('scout_members')
      .select(
        `
        id,
        division_id,
        full_name,
        avatar_url,
        joined_at,
        role:scout_roles (
          id,
          name,
          is_lead
        )
      `
      )
      .order('joined_at', { ascending: true });

    if (divisionIds.length === 1) {
      memberQuery = memberQuery.eq('division_id', divisionIds[0]);
    } else if (divisionIds.length > 1) {
      memberQuery = memberQuery.in('division_id', divisionIds);
    }

    const { data, error } = await memberQuery;

    if (error) {
      throw error;
    }

    memberRows = data || [];
  } catch (err) {
    memberError = err;
  }

  const normalizedMembers = (memberRows || [])
    .map(normalizeMember)
    .filter(Boolean);

  const leaderCandidates = normalizedMembers.filter(
    (member) => member.isLead
  );
  const memberCandidates = normalizedMembers.filter(
    (member) => !member.isLead
  );

  const leaders = leaderCandidates;
  const members = memberCandidates;
  const hasMemberData =
    leaders.length > 0 || members.length > 0;
  const division = normalizeDivision(
    divisionRow || staticDivision,
    slug
  );

  return {
    division,
    leaders,
    members,
    error:
      memberError && !hasMemberData
        ? memberError
        : divisionError && !division
        ? divisionError
        : null,
  };
}

export default getDivisionData;
