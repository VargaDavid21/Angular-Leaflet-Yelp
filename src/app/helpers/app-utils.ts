export function generateIconArrayFromBusinessRating(rating: number): string[] {
  return [
    ...[].constructor(Math.floor(rating)).fill('star'),
    ...[].constructor(rating % 1 ? 1 : 0).fill('star_half'),
    ...[].constructor(5 - Math.ceil(rating)).fill('star_border'),
  ];
}
