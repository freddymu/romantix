import * as migration_20250212_035821 from './20250212_035821';

export const migrations = [
  {
    up: migration_20250212_035821.up,
    down: migration_20250212_035821.down,
    name: '20250212_035821'
  },
];
