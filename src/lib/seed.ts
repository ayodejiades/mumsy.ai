import { db } from './db';
import { format, subDays, subWeeks } from 'date-fns';

export async function seedDatabase() {
  const patientCount = await db.patients.count();
  if (patientCount > 0) return; // Do not seed if already populated

  console.log('Seeding database...');
  
  const now = new Date();

  // Create some fake patients with Nigerian names
  const patients = [
    { name: "Aisha Mohammed", phone: "08012345678", village: "Kano Central", createdAt: new Date().toISOString() },
    { name: "Chidinma Eze", phone: "08123456789", village: "Enugu North", createdAt: new Date().toISOString() },
    { name: "Fatima Abubakar", phone: "07011223344", village: "Sokoto South", createdAt: new Date().toISOString() },
    { name: "Grace Ojo", phone: "08099887766", village: "Ibadan", createdAt: new Date().toISOString() },
    { name: "Ngozi Okafor", phone: "08100112233", village: "Abia", createdAt: new Date().toISOString() },
    { name: "Bosede Adeyemi", phone: "07033445566", village: "Lagos Mainland", createdAt: new Date().toISOString() },
    { name: "Halima Sani", phone: "08055667788", village: "Kaduna", createdAt: new Date().toISOString() },
    { name: "Joy Nwachukwu", phone: "08144556677", village: "Owerri", createdAt: new Date().toISOString() },
    { name: "Zainab Usman", phone: "09011223344", village: "Kastina", createdAt: new Date().toISOString() },
    { name: "Oluwakemi Balogun", phone: "08022334455", village: "Abeokuta", createdAt: new Date().toISOString() },
  ];

  const addedPatientIds = await Promise.all(
    patients.map(p => db.patients.add(p))
  );

  // Add visits to create varying risk profiles
  const visits = [
    // Aisha: High BP (High Risk PE)
    { patientId: addedPatientIds[0], date: format(subDays(now, 5), 'yyyy-MM-dd'), systolicBP: 150, diastolicBP: 95, weight: 70, symptoms: ["Headache", "Blurred vision"], gestationalWeeks: 28, previousComplications: [], distance: "<5km", createdAt: new Date().toISOString() },
    { patientId: addedPatientIds[0], date: format(subWeeks(now, 4), 'yyyy-MM-dd'), systolicBP: 130, diastolicBP: 85, weight: 68, symptoms: [], gestationalWeeks: 24, previousComplications: [], distance: "<5km", createdAt: new Date().toISOString() },
    
    // Chidinma: Low weight gain + Extreme fatigue (High Risk Anemia)
    { patientId: addedPatientIds[1], date: format(subDays(now, 2), 'yyyy-MM-dd'), systolicBP: 110, diastolicBP: 70, weight: 55, symptoms: ["Extreme fatigue", "Pallor (pale skin)"], gestationalWeeks: 32, previousComplications: ["Anemia", "Postpartum hemorrhage"], distance: "5-10km", createdAt: new Date().toISOString() },
    
    // Fatima: Healthy trajectory (Low Risk)
    { patientId: addedPatientIds[2], date: format(subDays(now, 10), 'yyyy-MM-dd'), systolicBP: 120, diastolicBP: 80, weight: 65, symptoms: [], gestationalWeeks: 20, previousComplications: [], distance: ">10km", createdAt: new Date().toISOString() },
    
    // Grace: Rising BP but borderline (Medium Risk PE)
    { patientId: addedPatientIds[3], date: format(subDays(now, 1), 'yyyy-MM-dd'), systolicBP: 135, diastolicBP: 85, weight: 75, symptoms: ["Swelling (hands/face)"], gestationalWeeks: 36, previousComplications: ["Preeclampsia"], distance: "<5km", createdAt: new Date().toISOString() },
  ];

  await Promise.all(
    visits.map(v => db.visits.add(v))
  );

  console.log('Database seeded successfully!');
}
