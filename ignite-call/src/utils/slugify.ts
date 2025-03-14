export default function slugify(text: string) {
  const slugText = text
    .normalize('NFKD')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/_/g, '-')
    .replace(/[^a-zA-Z0-9\\-]+/g, '')
    .replace(/--/g, '-')
    .replace(/^-+|-+$/g, '');

  return slugText;
}