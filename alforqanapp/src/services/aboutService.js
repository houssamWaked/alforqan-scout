import { ABOUT_TEXT } from '../../constants/texts/aboutTexts';

function normalizeHero(hero) {
  if (!hero) return null;

  if (typeof hero === 'string') {
    return { image: null, text: hero };
  }

  const image =
    hero.image ||
    hero.image_url ||
    hero.hero_image ||
    hero.heroImage ||
    null;

  const text =
    hero.text ||
    hero.hero_text ||
    hero.heroText ||
    '';

  if (!image && !text) return null;

  return { image, text };
}

function normalizeAbout(data) {
  if (!data) return null;

  const sections = Array.isArray(data.sections)
    ? data.sections.map((section, index) => ({
        title: section?.title || '',
        description: section?.description || '',
        order:
          typeof section?.order === 'number'
            ? section.order
            : index,
      }))
    : [];

  const timeline = Array.isArray(data.timeline)
    ? data.timeline.map((entry, index) => ({
        year: entry?.year || '',
        title: entry?.title || '',
        description: entry?.description || '',
        order:
          typeof entry?.order === 'number'
            ? entry.order
            : index,
      }))
    : [];

  const units = Array.isArray(data.units)
    ? data.units.map((unit, index) => ({
        title: unit?.title || '',
        description: unit?.description || '',
        age: unit?.age || unit?.age_range || '',
        icon: unit?.icon || unit?.emoji || '',
        divisionId:
          unit?.divisionId ||
          unit?.division_id ||
          unit?.division ||
          null,
        order:
          typeof unit?.order === 'number'
            ? unit.order
            : index,
      }))
    : [];

  const hero = normalizeHero(
    data.hero || {
      image: data.hero_image || data.heroImage,
      text: data.hero_text || data.heroText,
    }
  );

  const normalized = {
    title: data.title || '',
    sections,
    timeline,
    timelineLabel:
      data.timelineLabel ||
      data.timeline_label ||
      '',
    units,
    unitsLabel:
      data.unitsLabel || data.units_label || '',
    hero,
    unitButtonLabel:
      data.unitButtonLabel ||
      data.unit_button_label ||
      data.cta_label ||
      '',
  };

  const hasContent =
    normalized.title ||
    sections.length > 0 ||
    timeline.length > 0 ||
    units.length > 0 ||
    (normalized.hero &&
      (normalized.hero.text || normalized.hero.image));

  return hasContent ? normalized : null;
}

export async function getAbout() {
  const about = normalizeAbout(ABOUT_TEXT);
  return { about, error: null };
}

export default getAbout;
