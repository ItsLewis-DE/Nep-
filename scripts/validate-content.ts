import { validateContent } from '../src/content/index.ts';

const result = validateContent();
console.log('=== VALIDATION REPORT ===');
console.log('Valid:', result.valid);
if (result.errors.length > 0) {
  console.error('Errors:', result.errors);
}
console.log('Stats:', JSON.stringify(result.stats, null, 2));
if (result.warnings.length > 0) {
  console.warn('Warnings:', result.warnings);
}
