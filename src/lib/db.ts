import Dexie, { type Table } from 'dexie';
import { type Patient, type Visit } from './types';

export class MumsyDB extends Dexie {
  patients!: Table<Patient, number>;
  visits!: Table<Visit, number>;

  constructor() {
    super('MumsyDatabase');
    this.version(1).stores({
      patients: '++id, name, phone, village, createdAt',
      visits: '++id, patientId, date, createdAt' // We only index fields we search by frequently
    });
  }
}

export const db = new MumsyDB();
