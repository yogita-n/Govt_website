import { readFileSync, writeFileSync } from 'fs';

const sa = JSON.parse(readFileSync('serviceAccountKey.json', 'utf8'));
const existing = readFileSync('.env', 'utf8').trimEnd();
const escapedKey = sa.private_key.replace(/\n/g, '\\n');

const additions = [
  '',
  'NODE_ENV=development',
  `FIREBASE_PROJECT_ID=${sa.project_id}`,
  `FIREBASE_CLIENT_EMAIL=${sa.client_email}`,
  `FIREBASE_PRIVATE_KEY="${escapedKey}"`,
  '',
].join('\n');

writeFileSync('.env', existing + additions);
console.log('Done! Firebase vars appended to .env');
