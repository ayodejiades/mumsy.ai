# Mumsy.ai — Empowering CHWs to Bridge Facility and Community Care

Mumsy.ai is an offline-first AI action tool designed for Community Health Workers (CHWs) to bridge the gap in maternal healthcare in Nigeria. While facility-based care has seen improvements, thousands of women still miss routine Antenatal Care (ANC) visits due to transport costs or distance, leading to preventable maternal deaths from conditions like preeclampsia and anemia. Mumsy.ai turns targeted home visits into decisive action by providing CHWs with an intelligent, offline screening and prioritization tool.

## The Story and Reality: Why Mumsy.ai?
Consider Aisha, a pregnant mother who attended one ANC visit but missed subsequent ones due to location barriers. Despite Nigeria recording progress in reducing facility-based maternal deaths, the country still accounts for a massive share of global maternal mortality. Preeclampsia and anemia remain leading preventable causes when women fall through the cracks between facility visits. 

CHWs are the essential safety net, responsible for identifying these women and encouraging facility visits. However, without smart tools, manual processes make it nearly impossible to prioritize who needs urgent follow-ups this week, often missing the subtle early signs of rising blood pressure, alarming weight trends, or severe fatigue. Mumsy.ai solves this by analyzing just 7 simple data points on the CHW's device and generating a personalized Weekly Action Plan.

## What We Have Built (The MVP)
We have successfully developed the core Mumsy.ai application, focusing entirely on offline resilience, speed, and real-world CHW workflows.

1. **Fully Offline-First PWA Architecture**
Built using Next.js, TypeScript, and Serwist, the application is a Progressive Web App that works seamlessly on basic Android devices without an internet connection. Asset caching ensures instantaneous load times in the field.

2. **On-Device Data Persistence**
We integrated Dexie.js (IndexedDB) to ensure that all patient profiles and longitudinal visit data are securely stored locally on the device until synchronization is possible.

3. **On-Device AI Risk Engine**
A lightweight, transparent algorithm evaluates the 7 critical metrics recorded during a visit: Blood Pressure, Weight, Symptoms, Gestational Age, Previous Complications, Distance to Facility, and Last Visit Date. It cross-references current vitals against historical trends to calculate a prioritized risk level (Low/Medium/High) specifically for Preeclampsia and Anemia.

4. **Automated Weekly Action Plans**
Rather than presenting a raw data dashboard, the application translates inputs into immediate guidance. CHWs receive a prioritized list of mothers who need urgent follow-up visits, complete with explainable AI reasoning (e.g., "Risk is High because BP increased by 18 mmHg since last visit and headache reported").

5. **Patient Profiles and Visual Trends**
The app maintains a comprehensive history for every enrolled mother. By utilizing Recharts, CHWs can visually track systolic and diastolic blood pressure trajectories to identify subtle spikes across multiple weeks.

## What We Can Do Better (Future Roadmap)
To scale Mumsy.ai successfully across LGAs (Local Government Areas) and secure Outcome-Based Contracts with State Governments, we have identified several key architectural and functional improvements:

1. **Machine Learning Model Integration**
Currently, the risk engine utilizes clinical rule-based logic. We plan to replace or augment this with an actual locally run ML model (e.g., TensorFlow.js compilation) trained on regional maternal health datasets to provide highly predictive, localized risk scoring.

2. **Background Syncing and Cloud Infrastructure**
We need to implement the Service Worker Background Sync API alongside a secure backend (such as Supabase). When a CHW successfully connects to a cellular network, the app should automatically and silently push local records to the cloud and pull newly assigned patients down to the device.

3. **Data Licensing Pipeline**
One of the core business models involves licensing anonymized longitudinal CHW datasets to NGOs, researchers, and WHO. We must build robust anonymization and export pipelines on the backend to package this data securely, replacing the reliance on costly traditional surveys.

4. **Speech-to-Text Integration**
To accommodate low-literacy users further, we aim to integrate the Web Speech API to allow CHWs to capture symptoms and details using localized voice input (supporting English and Pidgin).

5. **Automated SMS Escalation Hooks**
While the MVP currently triggers a local SMS template for referral, future versions should interface natively with webhook-based SMS gateways (like Twilio or Africa's Talking) to automatically alert the nearest primary health center when a high-risk mother is identified in the field, ensuring the facility is prepared for her arrival.

6. **Biometric Security**
With sensitive health data living on the device, we eventually must implement PIN locks and WebAuthn biometric security to ensure that if a CHW's phone is lost or stolen, the patient data remains entirely encrypted and inaccessible.
