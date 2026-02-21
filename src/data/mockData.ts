// ============================================================
// TYPES
// ============================================================

export type VitalStatus = 'normal' | 'elevated' | 'critical'
export type VitalTrend = 'up' | 'down' | 'stable'
export type DocumentStatus = 'processed' | 'processing' | 'pending'
export type DocumentType = 'lab_result' | 'clinical_note' | 'imaging' | 'procedure'
export type ChatRole = 'user' | 'assistant'
export type UploadStep = 'idle' | 'upload' | 'processing' | 'success'
export type FlagType = 'H' | 'L' | 'N'

export interface Vital {
  id: string
  label: string
  value: string
  unit: string
  status: VitalStatus
  trend: VitalTrend
  trendValue: string
  iconName: string
}

export interface DocumentTableRow {
  marker: string
  value: string
  unit: string
  referenceRange: string
  flag: FlagType
}

export interface AISummaryBullet {
  text: string
  citationId: string
  citationLabel: string
}

export interface AISummarySection {
  heading: string
  bullets: AISummaryBullet[]
}

export interface DocumentParagraph {
  id: string
  label: string
  content: string
  isTable?: boolean
  tableRows?: DocumentTableRow[]
}

export interface MedicalDocument {
  id: string
  title: string
  type: DocumentType
  status: DocumentStatus
  uploadedAt: string
  dateOfService: string
  provider: string
  paragraphs: DocumentParagraph[]
  aiSummary: AISummarySection[]
  aiInsight: string
}

export interface ChatMessageSource {
  label: string
  documentId: string
  paragraphId: string
}

export interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  timestamp: string
  sources: ChatMessageSource[]
}

export interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  type: 'lab' | 'visit' | 'imaging' | 'medication'
  documentId?: string
}

export interface Patient {
  id: string
  name: string
  age: number
  dob: string
  mrn: string
  diagnoses: string[]
  medications: string[]
  allergies: string[]
  vitals: Vital[]
  documents: string[]
  timeline: TimelineEvent[]
}

export interface CurrentUser {
  name: string
  title: string
  avatarInitials: string
  clinic: string
}

// ============================================================
// CURRENT USER
// ============================================================

export const CURRENT_USER: CurrentUser = {
  name: 'Dr. Sarah Jenkins',
  title: 'Internal Medicine',
  avatarInitials: 'SJ',
  clinic: 'Harbor View Medical Center',
}

// ============================================================
// VITALS
// ============================================================

export const MOCK_VITALS: Vital[] = [
  {
    id: 'v1',
    label: 'Blood Pressure',
    value: '128/82',
    unit: 'mmHg',
    status: 'elevated',
    trend: 'down',
    trendValue: '↓ 4 mmHg',
    iconName: 'heart-pulse',
  },
  {
    id: 'v2',
    label: 'Heart Rate',
    value: '74',
    unit: 'bpm',
    status: 'normal',
    trend: 'stable',
    trendValue: '→ Stable',
    iconName: 'activity',
  },
  {
    id: 'v3',
    label: 'Total Cholesterol',
    value: '214',
    unit: 'mg/dL',
    status: 'elevated',
    trend: 'up',
    trendValue: '↑ 6 mg/dL',
    iconName: 'droplets',
  },
  {
    id: 'v4',
    label: 'BMI',
    value: '27.4',
    unit: 'kg/m²',
    status: 'normal',
    trend: 'stable',
    trendValue: '→ Stable',
    iconName: 'scale',
  },
]

// ============================================================
// DOCUMENTS
// ============================================================

export const MOCK_DOCUMENTS: MedicalDocument[] = [
  {
    id: 'doc-001',
    title: 'October Lipid Panel',
    type: 'lab_result',
    status: 'processed',
    uploadedAt: '2024-10-15T09:30:00Z',
    dateOfService: '2024-10-14',
    provider: 'Quest Diagnostics',
    paragraphs: [
      {
        id: 'p1',
        label: 'Patient Information',
        content:
          'Patient: Michael Chen | DOB: 03/18/1979 | MRN: MRN-20241001\nOrdering Physician: Dr. Sarah Jenkins | Collected: 10/14/2024 07:45 AM\nSpecimen Type: Serum | Lab: Quest Diagnostics, Harbor View Site',
      },
      {
        id: 'p2',
        label: 'Clinical Indication',
        content:
          'Monitoring hyperlipidemia (E78.5) and cardiovascular risk in patient with essential hypertension (I10). Patient currently on Atorvastatin 40mg QHS and Aspirin 81mg QD. Follow-up lipid panel requested to assess therapeutic response.',
      },
      {
        id: 'p3',
        label: 'Lipid Panel Results',
        content: '',
        isTable: true,
        tableRows: [
          { marker: 'Total Cholesterol', value: '214', unit: 'mg/dL', referenceRange: '<200', flag: 'H' },
          { marker: 'LDL Cholesterol', value: '138', unit: 'mg/dL', referenceRange: '<100', flag: 'H' },
          { marker: 'HDL Cholesterol', value: '48', unit: 'mg/dL', referenceRange: '>40', flag: 'N' },
          { marker: 'Triglycerides', value: '178', unit: 'mg/dL', referenceRange: '<150', flag: 'H' },
          { marker: 'Non-HDL Cholesterol', value: '166', unit: 'mg/dL', referenceRange: '<130', flag: 'H' },
        ],
      },
      {
        id: 'p4',
        label: 'Interpretation',
        content:
          'LDL-C remains elevated at 138 mg/dL, above the therapeutic target of <100 mg/dL for this patient\'s 10-year ASCVD risk profile. Triglycerides mildly elevated at 178 mg/dL, consistent with metabolic syndrome risk. HDL at 48 mg/dL is within normal range but at lower boundary. Consider intensifying statin therapy or adding a PCSK9 inhibitor if LDL-C target not achievable with maximum statin dose.',
      },
    ],
    aiSummary: [
      {
        heading: 'Key Findings',
        bullets: [
          {
            text: 'LDL-C at 138 mg/dL is significantly above the <100 mg/dL target for this patient\'s cardiovascular risk profile.',
            citationId: 'p3',
            citationLabel: 'Table: Lipid Values',
          },
          {
            text: 'Triglycerides elevated at 178 mg/dL, indicating possible dietary or metabolic contribution.',
            citationId: 'p3',
            citationLabel: 'Table: Lipid Values',
          },
          {
            text: 'HDL at 48 mg/dL is within reference range but near the lower threshold.',
            citationId: 'p3',
            citationLabel: 'Table: Lipid Values',
          },
        ],
      },
      {
        heading: 'Clinical Context',
        bullets: [
          {
            text: 'Patient is currently on Atorvastatin 40mg — not yet at maximum dose (80mg). Dose escalation may be appropriate.',
            citationId: 'p2',
            citationLabel: 'Clinical Indication',
          },
          {
            text: 'Lipid panel ordered as part of routine monitoring for hyperlipidemia (E78.5) alongside existing hypertension management.',
            citationId: 'p2',
            citationLabel: 'Clinical Indication',
          },
        ],
      },
      {
        heading: 'Recommended Actions',
        bullets: [
          {
            text: 'Consider intensifying statin therapy (Atorvastatin 80mg) or adding ezetimibe to further reduce LDL-C.',
            citationId: 'p4',
            citationLabel: 'Interpretation',
          },
          {
            text: 'Evaluate dietary habits and lifestyle factors contributing to elevated triglycerides.',
            citationId: 'p4',
            citationLabel: 'Interpretation',
          },
        ],
      },
    ],
    aiInsight: 'LDL-C 138 mg/dL — above therapeutic target. Consider intensifying statin.',
  },

  {
    id: 'doc-002',
    title: 'Dr. Smith Clinical Note — Nov 12',
    type: 'clinical_note',
    status: 'processed',
    uploadedAt: '2024-11-13T14:00:00Z',
    dateOfService: '2024-11-12',
    provider: 'Dr. Robert Smith, MD',
    paragraphs: [
      {
        id: 'p1',
        label: 'Visit Summary',
        content:
          'Patient: Michael Chen | Date: November 12, 2024\nPhysician: Dr. Robert Smith, MD — Internal Medicine\nVisit Type: Established Patient Follow-up | Duration: 30 minutes',
      },
      {
        id: 'p2',
        label: 'Chief Complaint',
        content:
          'Follow-up for hypertension and hyperlipidemia. Patient reports mild headaches in the morning, denies chest pain, shortness of breath, or palpitations. Adherent to current medication regimen.',
      },
      {
        id: 'p3',
        label: 'Vital Signs',
        content:
          'Blood Pressure: 132/84 mmHg (elevated)\nHeart Rate: 76 bpm (normal)\nWeight: 83.2 kg | Height: 174 cm | BMI: 27.5\nTemperature: 36.8°C | SpO2: 99% on room air',
      },
      {
        id: 'p4',
        label: 'Assessment & Plan',
        content:
          '1. Essential Hypertension (I10): BP remains above target (130/80 mmHg). Decision to increase Lisinopril from 10mg to 20mg daily. Patient counseled on DASH diet and sodium restriction. Return in 6 weeks for BP re-check.\n\n2. Hyperlipidemia (E78.5): Reviewed October lipid panel — LDL 138 mg/dL above target. Will consider statin intensification at next visit pending BP stabilization.\n\n3. Cardiac Workup: Given BP control challenges, echocardiogram ordered to evaluate for left ventricular hypertrophy (LVH) as sequela of chronic hypertension. Referral placed to Cardiology Associates.',
      },
      {
        id: 'p5',
        label: 'Medications Updated',
        content:
          'Lisinopril: Increased from 10mg to 20mg daily (effective immediately)\nAtorvastatin: Continued at 40mg QHS\nAspirin: Continued at 81mg QD\nNew Rx sent to Harbor View Pharmacy.',
      },
    ],
    aiSummary: [
      {
        heading: 'Visit Highlights',
        bullets: [
          {
            text: 'Blood pressure recorded at 132/84 mmHg — above the 130/80 target for hypertension with cardiovascular risk.',
            citationId: 'p3',
            citationLabel: 'Vital Signs',
          },
          {
            text: 'Lisinopril dose increased from 10mg to 20mg daily to improve BP control.',
            citationId: 'p4',
            citationLabel: 'Assessment & Plan',
          },
          {
            text: 'Echocardiogram ordered to evaluate for left ventricular hypertrophy (LVH) given persistent hypertension.',
            citationId: 'p4',
            citationLabel: 'Assessment & Plan',
          },
        ],
      },
      {
        heading: 'Medication Changes',
        bullets: [
          {
            text: 'Lisinopril titrated up — patient counseled on monitoring for cough and dizziness with dose increase.',
            citationId: 'p5',
            citationLabel: 'Medications Updated',
          },
        ],
      },
    ],
    aiInsight: 'Lisinopril dose increased. Echocardiogram ordered for LVH workup.',
  },

  {
    id: 'doc-003',
    title: 'Echocardiogram Results',
    type: 'imaging',
    status: 'processed',
    uploadedAt: '2024-12-04T11:15:00Z',
    dateOfService: '2024-12-03',
    provider: 'Cardiology Associates',
    paragraphs: [
      {
        id: 'p1',
        label: 'Study Information',
        content:
          'Patient: Michael Chen | DOB: 03/18/1979 | MRN: MRN-20241001\nReferring Physician: Dr. Robert Smith, MD\nStudy Date: December 3, 2024 | Cardiology Associates — Echo Lab\nTechnician: M. Torres, RDCS | Interpreting: Dr. L. Park, MD, FACC',
      },
      {
        id: 'p2',
        label: 'Indication',
        content:
          'Evaluation for left ventricular hypertrophy (LVH) in patient with history of essential hypertension (I10) on Lisinopril. History of suboptimally controlled blood pressure. Assess LV function and structure.',
      },
      {
        id: 'p3',
        label: 'Findings',
        content:
          'Left Ventricle: Mild concentric left ventricular hypertrophy. Interventricular septum thickness 12mm (mildly increased). LV ejection fraction visually estimated at 62% (normal range ≥55%).\n\nDiastolic Function: Grade I diastolic dysfunction noted. E/A ratio 0.85, consistent with impaired relaxation pattern. No significant mitral regurgitation.\n\nOther Chambers: Right ventricle normal in size and function. Left atrium mildly dilated at 4.2 cm (upper limit 4.0 cm). No pericardial effusion.',
      },
      {
        id: 'p4',
        label: 'Impression',
        content:
          '1. Mild concentric LVH, consistent with hypertensive heart disease.\n2. Preserved left ventricular systolic function with EF 62%.\n3. Grade I diastolic dysfunction — recommend optimizing blood pressure control to prevent progression.\n4. Mild left atrial enlargement, likely secondary to diastolic dysfunction.\n\nRecommendation: Optimize antihypertensive therapy. Follow-up echo in 12 months or sooner if clinically indicated.',
      },
    ],
    aiSummary: [
      {
        heading: 'Echo Results',
        bullets: [
          {
            text: 'Mild concentric LVH confirmed — consistent with sequela of chronic hypertension.',
            citationId: 'p3',
            citationLabel: 'Findings',
          },
          {
            text: 'LV ejection fraction preserved at 62%, indicating maintained systolic function.',
            citationId: 'p3',
            citationLabel: 'Findings',
          },
          {
            text: 'Grade I diastolic dysfunction detected, with E/A ratio 0.85 indicating impaired relaxation.',
            citationId: 'p3',
            citationLabel: 'Findings',
          },
        ],
      },
      {
        heading: 'Clinical Implications',
        bullets: [
          {
            text: 'LVH and diastolic dysfunction underscore the urgency of achieving BP <130/80 mmHg.',
            citationId: 'p4',
            citationLabel: 'Impression',
          },
          {
            text: 'Follow-up echocardiogram recommended in 12 months to assess treatment response.',
            citationId: 'p4',
            citationLabel: 'Impression',
          },
        ],
      },
    ],
    aiInsight: 'Mild LVH confirmed. Preserved EF 62%. Optimize BP control.',
  },

  {
    id: 'doc-004',
    title: 'CBC with Differential — Jan 2025',
    type: 'lab_result',
    status: 'processed',
    uploadedAt: '2025-01-10T08:45:00Z',
    dateOfService: '2025-01-09',
    provider: 'Quest Diagnostics',
    paragraphs: [
      {
        id: 'p1',
        label: 'Patient Information',
        content:
          'Patient: Michael Chen | DOB: 03/18/1979 | MRN: MRN-20241001\nOrdering Physician: Dr. Sarah Jenkins | Collected: 01/09/2025 08:00 AM\nSpecimen Type: Whole Blood | Lab: Quest Diagnostics, Harbor View Site',
      },
      {
        id: 'p2',
        label: 'CBC Results',
        content: '',
        isTable: true,
        tableRows: [
          { marker: 'WBC', value: '6.8', unit: '×10³/µL', referenceRange: '4.5–11.0', flag: 'N' },
          { marker: 'RBC', value: '5.1', unit: '×10⁶/µL', referenceRange: '4.5–5.9', flag: 'N' },
          { marker: 'Hemoglobin', value: '15.2', unit: 'g/dL', referenceRange: '13.5–17.5', flag: 'N' },
          { marker: 'Hematocrit', value: '45.1', unit: '%', referenceRange: '41–53', flag: 'N' },
          { marker: 'MCV', value: '88', unit: 'fL', referenceRange: '80–100', flag: 'N' },
          { marker: 'Platelets', value: '228', unit: '×10³/µL', referenceRange: '150–400', flag: 'N' },
        ],
      },
    ],
    aiSummary: [
      {
        heading: 'CBC Summary',
        bullets: [
          {
            text: 'Complete blood count within normal limits. No evidence of anemia, infection, or thrombocytopenia.',
            citationId: 'p2',
            citationLabel: 'CBC Results',
          },
        ],
      },
    ],
    aiInsight: 'CBC within normal limits. No hematologic abnormalities detected.',
  },
]

// ============================================================
// TIMELINE
// ============================================================

export const MOCK_TIMELINE: TimelineEvent[] = [
  {
    id: 'tl1',
    date: '2025-01-09',
    title: 'CBC with Differential',
    description: 'Routine CBC ordered. All values within normal limits.',
    type: 'lab',
    documentId: 'doc-004',
  },
  {
    id: 'tl2',
    date: '2024-12-03',
    title: 'Echocardiogram',
    description: 'Mild concentric LVH found. EF 62%. Grade I diastolic dysfunction.',
    type: 'imaging',
    documentId: 'doc-003',
  },
  {
    id: 'tl3',
    date: '2024-11-12',
    title: 'Office Visit — Dr. Smith',
    description: 'BP 132/84. Lisinopril increased to 20mg. Echo ordered.',
    type: 'visit',
    documentId: 'doc-002',
  },
  {
    id: 'tl4',
    date: '2024-11-01',
    title: 'Lisinopril 20mg (Updated)',
    description: 'Dose increased from 10mg → 20mg daily.',
    type: 'medication',
  },
  {
    id: 'tl5',
    date: '2024-10-14',
    title: 'Lipid Panel',
    description: 'LDL 138 H, Total Chol 214 H. Statin intensification being considered.',
    type: 'lab',
    documentId: 'doc-001',
  },
]

// ============================================================
// PATIENT
// ============================================================

export const MOCK_PATIENT: Patient = {
  id: 'patient-001',
  name: 'Michael Chen',
  age: 45,
  dob: '1979-03-18',
  mrn: 'MRN-20241001',
  diagnoses: ['Essential Hypertension (I10)', 'Hyperlipidemia (E78.5)'],
  medications: ['Lisinopril 20mg QD', 'Atorvastatin 40mg QHS', 'Aspirin 81mg QD'],
  allergies: ['Penicillin', 'Sulfa drugs'],
  vitals: MOCK_VITALS,
  documents: ['doc-001', 'doc-002', 'doc-003'],
  timeline: MOCK_TIMELINE,
}

// ============================================================
// PATIENT 2 — SARAH MARTINEZ
// ============================================================

export const PATIENT2_VITALS: Vital[] = [
  {
    id: 'p2-v1',
    label: 'HbA1c',
    value: '9.2',
    unit: '%',
    status: 'critical',
    trend: 'up',
    trendValue: '↑ 0.4%',
    iconName: 'droplets',
  },
  {
    id: 'p2-v2',
    label: 'Fasting Glucose',
    value: '218',
    unit: 'mg/dL',
    status: 'critical',
    trend: 'up',
    trendValue: '↑ 12 mg/dL',
    iconName: 'activity',
  },
  {
    id: 'p2-v3',
    label: 'eGFR',
    value: '42',
    unit: 'mL/min/1.73m²',
    status: 'critical',
    trend: 'stable',
    trendValue: '→ Stable',
    iconName: 'heart-pulse',
  },
  {
    id: 'p2-v4',
    label: 'BMI',
    value: '31.2',
    unit: 'kg/m²',
    status: 'elevated',
    trend: 'stable',
    trendValue: '→ Stable',
    iconName: 'scale',
  },
]

export const PATIENT2_DOCUMENTS: MedicalDocument[] = [
  {
    id: 'doc-201',
    title: 'HbA1c & CMP Lab Panel',
    type: 'lab_result',
    status: 'processed',
    uploadedAt: '2024-10-20T09:00:00Z',
    dateOfService: '2024-10-19',
    provider: 'Quest Diagnostics',
    paragraphs: [
      {
        id: 'p1',
        label: 'Patient Information',
        content:
          'Patient: Sarah Martinez | DOB: 09/22/1966 | MRN: MRN-20241002\nOrdering Physician: Dr. Sarah Jenkins | Collected: 10/19/2024 07:30 AM\nSpecimen Type: Serum/Whole Blood | Lab: Quest Diagnostics, Harbor View Site',
      },
      {
        id: 'p2',
        label: 'Clinical Indication',
        content:
          'Monitoring Type 2 Diabetes Mellitus (E11.9) and Chronic Kidney Disease Stage 3 (N18.3). Patient on Metformin 1000mg BID and Insulin Glargine 30 units QHS. HbA1c and comprehensive metabolic panel ordered to assess glycemic control and renal function.',
      },
      {
        id: 'p3',
        label: 'HbA1c & Metabolic Results',
        content: '',
        isTable: true,
        tableRows: [
          { marker: 'HbA1c', value: '9.2', unit: '%', referenceRange: '<7.0', flag: 'H' },
          { marker: 'Fasting Glucose', value: '218', unit: 'mg/dL', referenceRange: '70–99', flag: 'H' },
          { marker: 'eGFR', value: '42', unit: 'mL/min/1.73m²', referenceRange: '>60', flag: 'L' },
          { marker: 'Creatinine', value: '1.6', unit: 'mg/dL', referenceRange: '0.6–1.1', flag: 'H' },
          { marker: 'BUN', value: '28', unit: 'mg/dL', referenceRange: '7–25', flag: 'H' },
          { marker: 'Potassium', value: '4.8', unit: 'mEq/L', referenceRange: '3.5–5.0', flag: 'N' },
        ],
      },
      {
        id: 'p4',
        label: 'Interpretation',
        content:
          'HbA1c of 9.2% is significantly above the ADA target of <7.0% for this patient, indicating poor glycemic control over the past 3 months. Fasting glucose of 218 mg/dL confirms ongoing hyperglycemia. eGFR of 42 mL/min/1.73m² consistent with CKD Stage 3b — Metformin should be evaluated for dose adjustment. Consider nephrology co-management and SGLT2 inhibitor for combined cardiorenal benefit if CKD staging allows.',
      },
    ],
    aiSummary: [
      {
        heading: 'Key Findings',
        bullets: [
          {
            text: 'HbA1c 9.2% — significantly above <7.0% ADA target. Indicates suboptimal glycemic control.',
            citationId: 'p3',
            citationLabel: 'Table: Lab Results',
          },
          {
            text: 'eGFR 42 mL/min/1.73m² — CKD Stage 3b. Renal function impacting medication choices.',
            citationId: 'p3',
            citationLabel: 'Table: Lab Results',
          },
        ],
      },
      {
        heading: 'Recommended Actions',
        bullets: [
          {
            text: 'Evaluate Metformin dosing given eGFR <45. Consider dose reduction or alternative agents.',
            citationId: 'p4',
            citationLabel: 'Interpretation',
          },
          {
            text: 'Consider SGLT2 inhibitor (Empagliflozin) for cardiorenal protective effects.',
            citationId: 'p4',
            citationLabel: 'Interpretation',
          },
        ],
      },
    ],
    aiInsight: 'HbA1c 9.2% — poor glycemic control. eGFR 42 — CKD Stage 3b. Medication review needed.',
  },
  {
    id: 'doc-202',
    title: 'Nephrology Consult Note',
    type: 'clinical_note',
    status: 'processed',
    uploadedAt: '2024-11-05T14:30:00Z',
    dateOfService: '2024-11-04',
    provider: 'Dr. Angela Rivera, MD, Nephrology',
    paragraphs: [
      {
        id: 'p1',
        label: 'Consultation Summary',
        content:
          'Patient: Sarah Martinez | Date: November 4, 2024\nConsulting: Dr. Angela Rivera, MD — Nephrology\nReferring: Dr. Sarah Jenkins — Internal Medicine\nReason: CKD Stage 3 management, progression risk assessment',
      },
      {
        id: 'p2',
        label: 'Assessment',
        content:
          'CKD Stage 3b with eGFR 42, likely diabetic nephropathy given T2DM history and albuminuria pattern. Blood pressure managed with Lisinopril — appropriate for renoprotection. Empagliflozin recently initiated — monitor eGFR and potassium closely. Risk of progression to Stage 4 if glycemic control not improved.',
      },
      {
        id: 'p3',
        label: 'Plan',
        content:
          '1. Continue Lisinopril 10mg for renoprotection and blood pressure management.\n2. Empagliflozin 10mg — monitor eGFR at 4 weeks (acceptable drop of up to 30% expected).\n3. Dietary referral for low-potassium, low-phosphorus, renal diet counseling.\n4. Repeat CMP in 4 weeks. Repeat eGFR in 3 months.\n5. Metformin — hold if eGFR drops below 30. Currently acceptable at eGFR 42.\n6. Target HbA1c <8% given CKD comorbidity (relaxed target to avoid hypoglycemia).',
      },
    ],
    aiSummary: [
      {
        heading: 'Nephrology Assessment',
        bullets: [
          {
            text: 'CKD Stage 3b attributed to diabetic nephropathy. Progression risk is elevated if glycemic control not improved.',
            citationId: 'p2',
            citationLabel: 'Assessment',
          },
          {
            text: 'Empagliflozin initiated — provides both glycemic and renoprotective benefits.',
            citationId: 'p3',
            citationLabel: 'Plan',
          },
        ],
      },
    ],
    aiInsight: 'Diabetic nephropathy (CKD 3b). Empagliflozin initiated for renoprotection.',
  },
  {
    id: 'doc-203',
    title: 'Renal Ultrasound',
    type: 'imaging',
    status: 'processed',
    uploadedAt: '2024-11-18T10:00:00Z',
    dateOfService: '2024-11-17',
    provider: 'Harbor View Radiology',
    paragraphs: [
      {
        id: 'p1',
        label: 'Study Information',
        content:
          'Patient: Sarah Martinez | DOB: 09/22/1966 | MRN: MRN-20241002\nStudy Date: November 17, 2024 | Harbor View Radiology\nTechnician: J. Kim, RDMS | Interpreting: Dr. P. Nguyen, MD',
      },
      {
        id: 'p2',
        label: 'Findings',
        content:
          'Right Kidney: 10.2 cm in length. Mildly increased parenchymal echogenicity, consistent with medical renal disease. No hydronephrosis. No calculi identified.\n\nLeft Kidney: 10.0 cm in length. Similar parenchymal echogenicity changes. No focal mass lesion. No perinephric fluid.\n\nBladder: Adequately distended. No wall thickening or mass.',
      },
      {
        id: 'p3',
        label: 'Impression',
        content:
          '1. Bilateral increased renal parenchymal echogenicity, consistent with medical renal disease (diabetic nephropathy in clinical context).\n2. No obstructive uropathy.\n3. Findings support diagnosis of CKD — clinical correlation advised.',
      },
    ],
    aiSummary: [
      {
        heading: 'Imaging Findings',
        bullets: [
          {
            text: 'Bilateral echogenicity changes consistent with medical renal disease (diabetic nephropathy).',
            citationId: 'p2',
            citationLabel: 'Findings',
          },
          {
            text: 'No obstructive uropathy or focal lesions identified.',
            citationId: 'p3',
            citationLabel: 'Impression',
          },
        ],
      },
    ],
    aiInsight: 'Renal ultrasound confirms medical renal disease pattern consistent with diabetic nephropathy.',
  },
  {
    id: 'doc-204',
    title: 'Endocrinology Follow-Up Note',
    type: 'clinical_note',
    status: 'processed',
    uploadedAt: '2024-12-10T11:00:00Z',
    dateOfService: '2024-12-09',
    provider: 'Dr. Michael Torres, MD, Endocrinology',
    paragraphs: [
      {
        id: 'p1',
        label: 'Visit Summary',
        content:
          'Patient: Sarah Martinez | Date: December 9, 2024\nPhysician: Dr. Michael Torres, MD — Endocrinology\nVisit Type: Established Follow-up — Diabetes Management',
      },
      {
        id: 'p2',
        label: 'Assessment & Plan',
        content:
          'HbA1c remains at 9.2%, well above target. Patient reports inconsistent carb counting and occasional missed insulin doses. Insulin Glargine increased from 26 to 30 units QHS. Added Empagliflozin 10mg QD for combined glycemic and renal benefit. Nutritionist referral placed. Target HbA1c <8.0% for next visit. Follow up in 3 months.',
      },
    ],
    aiSummary: [
      {
        heading: 'Endocrinology Plan',
        bullets: [
          {
            text: 'Insulin Glargine increased to 30 units QHS to improve overnight glycemic control.',
            citationId: 'p2',
            citationLabel: 'Assessment & Plan',
          },
          {
            text: 'Empagliflozin 10mg added — provides SGLT2 inhibition for both glucose lowering and renal protection.',
            citationId: 'p2',
            citationLabel: 'Assessment & Plan',
          },
        ],
      },
    ],
    aiInsight: 'Insulin uptitrated. Empagliflozin added. Target HbA1c <8% at next visit.',
  },
]

export const PATIENT2_TIMELINE: TimelineEvent[] = [
  {
    id: 'p2-tl1',
    date: '2024-12-09',
    title: 'Endocrinology Follow-Up',
    description: 'Insulin Glargine increased to 30u. Empagliflozin added. HbA1c still 9.2%.',
    type: 'visit',
    documentId: 'doc-204',
  },
  {
    id: 'p2-tl2',
    date: '2024-11-17',
    title: 'Renal Ultrasound',
    description: 'Bilateral echogenicity — diabetic nephropathy pattern. No obstruction.',
    type: 'imaging',
    documentId: 'doc-203',
  },
  {
    id: 'p2-tl3',
    date: '2024-11-04',
    title: 'Nephrology Consult',
    description: 'CKD Stage 3b confirmed. Empagliflozin recommended. Dietary referral placed.',
    type: 'visit',
    documentId: 'doc-202',
  },
  {
    id: 'p2-tl4',
    date: '2024-10-19',
    title: 'HbA1c & CMP Lab',
    description: 'HbA1c 9.2%, eGFR 42. Poor glycemic control. CKD Stage 3b confirmed.',
    type: 'lab',
    documentId: 'doc-201',
  },
]

export const PATIENT2: Patient = {
  id: 'patient-002',
  name: 'Sarah Martinez',
  age: 58,
  dob: '1966-09-22',
  mrn: 'MRN-20241002',
  diagnoses: ['Type 2 Diabetes Mellitus (E11.9)', 'Chronic Kidney Disease Stage 3 (N18.3)'],
  medications: [
    'Metformin 1000mg BID',
    'Insulin Glargine 30 units QHS',
    'Lisinopril 10mg QD',
    'Empagliflozin 10mg QD',
  ],
  allergies: ['Sulfonamides', 'Iodinated Contrast Dye'],
  vitals: PATIENT2_VITALS,
  documents: ['doc-201', 'doc-202', 'doc-203', 'doc-204'],
  timeline: PATIENT2_TIMELINE,
}

// ============================================================
// PATIENT 3 — JAMES THOMPSON
// ============================================================

export const PATIENT3_VITALS: Vital[] = [
  {
    id: 'p3-v1',
    label: 'Ejection Fraction',
    value: '32',
    unit: '%',
    status: 'critical',
    trend: 'down',
    trendValue: '↓ 3%',
    iconName: 'heart-pulse',
  },
  {
    id: 'p3-v2',
    label: 'BNP',
    value: '620',
    unit: 'pg/mL',
    status: 'critical',
    trend: 'up',
    trendValue: '↑ 85 pg/mL',
    iconName: 'activity',
  },
  {
    id: 'p3-v3',
    label: 'Heart Rate',
    value: '91',
    unit: 'bpm',
    status: 'elevated',
    trend: 'stable',
    trendValue: '→ Stable',
    iconName: 'heart-pulse',
  },
  {
    id: 'p3-v4',
    label: 'INR',
    value: '2.4',
    unit: '',
    status: 'normal',
    trend: 'stable',
    trendValue: '→ Therapeutic',
    iconName: 'droplets',
  },
]

export const PATIENT3_DOCUMENTS: MedicalDocument[] = [
  {
    id: 'doc-301',
    title: 'BNP & BMP Lab Panel',
    type: 'lab_result',
    status: 'processed',
    uploadedAt: '2024-10-22T08:30:00Z',
    dateOfService: '2024-10-21',
    provider: 'Quest Diagnostics',
    paragraphs: [
      {
        id: 'p1',
        label: 'Patient Information',
        content:
          'Patient: James Thompson | DOB: 04/10/1952 | MRN: MRN-20241003\nOrdering Physician: Dr. Sarah Jenkins | Collected: 10/21/2024 08:00 AM\nSpecimen Type: Serum/Whole Blood | Lab: Quest Diagnostics, Harbor View Site',
      },
      {
        id: 'p2',
        label: 'Clinical Indication',
        content:
          'Monitoring Congestive Heart Failure with reduced EF (I50.22) and Atrial Fibrillation (I48.91). Patient on Furosemide 40mg, Metoprolol Succinate 50mg, Warfarin 5mg, Digoxin 0.125mg, and Spironolactone 25mg. BNP and BMP ordered to assess volume status and electrolytes.',
      },
      {
        id: 'p3',
        label: 'Lab Results',
        content: '',
        isTable: true,
        tableRows: [
          { marker: 'BNP', value: '620', unit: 'pg/mL', referenceRange: '<100', flag: 'H' },
          { marker: 'Sodium', value: '138', unit: 'mEq/L', referenceRange: '136–145', flag: 'N' },
          { marker: 'Potassium', value: '4.1', unit: 'mEq/L', referenceRange: '3.5–5.0', flag: 'N' },
          { marker: 'BUN', value: '22', unit: 'mg/dL', referenceRange: '7–25', flag: 'N' },
          { marker: 'Creatinine', value: '1.1', unit: 'mg/dL', referenceRange: '0.6–1.1', flag: 'N' },
          { marker: 'INR', value: '2.4', unit: '', referenceRange: '2.0–3.0 (AFib)', flag: 'N' },
        ],
      },
      {
        id: 'p4',
        label: 'Interpretation',
        content:
          'BNP of 620 pg/mL is markedly elevated, indicating significant ventricular wall stress and ongoing heart failure decompensation. Electrolytes stable — Potassium 4.1 appropriate given Spironolactone use. INR 2.4 therapeutic for Atrial Fibrillation anticoagulation target (2.0–3.0). Renal function preserved. Consider uptitrating diuretic therapy or cardiology reassessment.',
      },
    ],
    aiSummary: [
      {
        heading: 'Key Findings',
        bullets: [
          {
            text: 'BNP 620 pg/mL — markedly elevated, indicating active heart failure decompensation.',
            citationId: 'p3',
            citationLabel: 'Table: Lab Results',
          },
          {
            text: 'INR 2.4 — therapeutic for AFib anticoagulation (target 2.0–3.0 on Warfarin).',
            citationId: 'p3',
            citationLabel: 'Table: Lab Results',
          },
        ],
      },
      {
        heading: 'Recommended Actions',
        bullets: [
          {
            text: 'Elevated BNP warrants urgent cardiology reassessment and possible diuretic uptitration.',
            citationId: 'p4',
            citationLabel: 'Interpretation',
          },
        ],
      },
    ],
    aiInsight: 'BNP 620 pg/mL — active HF decompensation. INR 2.4 therapeutic. Cardiology review needed.',
  },
  {
    id: 'doc-302',
    title: 'Echocardiogram Report',
    type: 'imaging',
    status: 'processed',
    uploadedAt: '2024-11-08T11:00:00Z',
    dateOfService: '2024-11-07',
    provider: 'Cardiology Associates',
    paragraphs: [
      {
        id: 'p1',
        label: 'Study Information',
        content:
          'Patient: James Thompson | DOB: 04/10/1952 | MRN: MRN-20241003\nStudy Date: November 7, 2024 | Cardiology Associates — Echo Lab\nTechnician: R. Santos, RDCS | Interpreting: Dr. L. Park, MD, FACC',
      },
      {
        id: 'p2',
        label: 'Indication',
        content:
          'Evaluation of left ventricular function in patient with known HFrEF. Prior EF 35% (6 months ago). Reassess LV function, chamber dimensions, and valvular disease.',
      },
      {
        id: 'p3',
        label: 'Findings',
        content:
          'Left Ventricle: Severely dilated LV. LV ejection fraction visually estimated at 32% (reduced, down from 35% at prior study). Diffuse hypokinesis noted — no focal wall motion abnormality to suggest acute ischemia.\n\nValves: Mild-to-moderate mitral regurgitation secondary to annular dilation. Tricuspid valve mildly regurgitant.\n\nRight Ventricle: Mildly dilated with preserved function. Estimated RVSP 38 mmHg.\n\nOther: Left atrium severely enlarged. No pericardial effusion.',
      },
      {
        id: 'p4',
        label: 'Impression',
        content:
          '1. HFrEF with worsening EF — 32% (down from 35%). Diffuse LV hypokinesis.\n2. Severe left atrial enlargement, consistent with long-standing AFib and elevated filling pressures.\n3. Mild-to-moderate mitral regurgitation secondary to dilated cardiomyopathy.\n\nRecommendation: Optimize GDMT — consider adding ARNI (sacubitril/valsartan) if not contraindicated. SGLT2 inhibitor for HF benefit. Urgent cardiology follow-up.',
      },
    ],
    aiSummary: [
      {
        heading: 'Echo Results',
        bullets: [
          {
            text: 'EF declined to 32% from 35% — worsening HFrEF. Urgent optimization of GDMT required.',
            citationId: 'p3',
            citationLabel: 'Findings',
          },
          {
            text: 'Severe left atrial enlargement consistent with long-standing AFib and elevated filling pressures.',
            citationId: 'p3',
            citationLabel: 'Findings',
          },
        ],
      },
      {
        heading: 'Clinical Implications',
        bullets: [
          {
            text: 'Consider ARNI (sacubitril/valsartan) replacement of current RAAS therapy for mortality benefit.',
            citationId: 'p4',
            citationLabel: 'Impression',
          },
        ],
      },
    ],
    aiInsight: 'EF 32% — worsening HFrEF. Consider ARNI + SGLT2 inhibitor for GDMT optimization.',
  },
  {
    id: 'doc-303',
    title: 'Cardiology Follow-Up Note',
    type: 'clinical_note',
    status: 'processed',
    uploadedAt: '2024-11-22T15:00:00Z',
    dateOfService: '2024-11-21',
    provider: 'Dr. L. Park, MD, FACC',
    paragraphs: [
      {
        id: 'p1',
        label: 'Visit Summary',
        content:
          'Patient: James Thompson | Date: November 21, 2024\nPhysician: Dr. L. Park, MD, FACC — Cardiology Associates\nVisit Type: Established HF Follow-up',
      },
      {
        id: 'p2',
        label: 'Assessment & Plan',
        content:
          'EF declined to 32% — worsening HFrEF despite current regimen. BNP continues to trend upward. Furosemide increased from 40mg to 60mg QD for better volume offloading. Discussing transition from Lisinopril to sacubitril/valsartan at next visit pending renal function. Patient counseled on fluid restriction (1.5L/day) and daily weight monitoring. Cardio-oncology referral deferred. ICD evaluation to be discussed if EF remains <35% at 3-month recheck.',
      },
    ],
    aiSummary: [
      {
        heading: 'Cardiology Plan',
        bullets: [
          {
            text: 'Furosemide increased to 60mg QD for volume management given elevated BNP and worsening EF.',
            citationId: 'p2',
            citationLabel: 'Assessment & Plan',
          },
          {
            text: 'ARNI transition planned — pending renal function review at next visit.',
            citationId: 'p2',
            citationLabel: 'Assessment & Plan',
          },
          {
            text: 'ICD evaluation to be considered if EF remains <35% at 3-month recheck.',
            citationId: 'p2',
            citationLabel: 'Assessment & Plan',
          },
        ],
      },
    ],
    aiInsight: 'Furosemide uptitrated. ARNI planned. ICD evaluation pending EF reassessment.',
  },
  {
    id: 'doc-304',
    title: 'INR & Coagulation Panel',
    type: 'lab_result',
    status: 'processed',
    uploadedAt: '2024-12-16T09:00:00Z',
    dateOfService: '2024-12-15',
    provider: 'Harbor View Lab',
    paragraphs: [
      {
        id: 'p1',
        label: 'Patient Information',
        content:
          'Patient: James Thompson | DOB: 04/10/1952 | MRN: MRN-20241003\nOrdering Physician: Dr. Sarah Jenkins | Collected: 12/15/2024 08:15 AM\nSpecimen Type: Citrated Plasma | Lab: Harbor View Lab',
      },
      {
        id: 'p2',
        label: 'Coagulation Results',
        content: '',
        isTable: true,
        tableRows: [
          { marker: 'INR', value: '2.4', unit: '', referenceRange: '2.0–3.0 (AFib target)', flag: 'N' },
          { marker: 'PT', value: '26.8', unit: 'seconds', referenceRange: '11–13.5', flag: 'H' },
          { marker: 'aPTT', value: '34', unit: 'seconds', referenceRange: '25–35', flag: 'N' },
        ],
      },
      {
        id: 'p3',
        label: 'Interpretation',
        content:
          'INR 2.4 is within the therapeutic range for Atrial Fibrillation anticoagulation (target 2.0–3.0). PT prolonged as expected on Warfarin therapy. aPTT normal. Continue current Warfarin 5mg QD dose. Next INR check in 4 weeks.',
      },
    ],
    aiSummary: [
      {
        heading: 'Coagulation Summary',
        bullets: [
          {
            text: 'INR 2.4 — within therapeutic range for AFib anticoagulation. Continue Warfarin 5mg QD.',
            citationId: 'p2',
            citationLabel: 'Table: Coagulation Results',
          },
        ],
      },
    ],
    aiInsight: 'INR 2.4 — therapeutic. Warfarin management stable. Next check in 4 weeks.',
  },
]

export const PATIENT3_TIMELINE: TimelineEvent[] = [
  {
    id: 'p3-tl1',
    date: '2024-12-15',
    title: 'INR & Coagulation Panel',
    description: 'INR 2.4 — therapeutic range. Warfarin continued at 5mg.',
    type: 'lab',
    documentId: 'doc-304',
  },
  {
    id: 'p3-tl2',
    date: '2024-11-21',
    title: 'Cardiology Follow-Up',
    description: 'Furosemide uptitrated. ARNI planned. ICD eval pending EF recheck.',
    type: 'visit',
    documentId: 'doc-303',
  },
  {
    id: 'p3-tl3',
    date: '2024-11-07',
    title: 'Echocardiogram',
    description: 'EF 32% (down from 35%). Severe LA enlargement. Worsening HFrEF.',
    type: 'imaging',
    documentId: 'doc-302',
  },
  {
    id: 'p3-tl4',
    date: '2024-10-21',
    title: 'BNP & BMP Lab',
    description: 'BNP 620 pg/mL — elevated. INR 2.4 therapeutic. Electrolytes stable.',
    type: 'lab',
    documentId: 'doc-301',
  },
]

export const PATIENT3: Patient = {
  id: 'patient-003',
  name: 'James Thompson',
  age: 72,
  dob: '1952-04-10',
  mrn: 'MRN-20241003',
  diagnoses: [
    'Congestive Heart Failure with Reduced EF (I50.22)',
    'Atrial Fibrillation (I48.91)',
  ],
  medications: [
    'Furosemide 40mg QD',
    'Metoprolol Succinate 50mg QD',
    'Warfarin 5mg QD',
    'Digoxin 0.125mg QD',
    'Spironolactone 25mg QD',
  ],
  allergies: ['ACE Inhibitors (dry cough)', 'NSAIDs (fluid retention risk)'],
  vitals: PATIENT3_VITALS,
  documents: ['doc-301', 'doc-302', 'doc-303', 'doc-304'],
  timeline: PATIENT3_TIMELINE,
}

// ============================================================
// ALL PATIENTS / ALL DOCUMENTS
// ============================================================

export const ALL_PATIENTS: Patient[] = [MOCK_PATIENT, PATIENT2, PATIENT3]

export const ALL_DOCUMENTS: MedicalDocument[] = [
  ...MOCK_DOCUMENTS.slice(0, 3),
  ...PATIENT2_DOCUMENTS,
  ...PATIENT3_DOCUMENTS,
]

// ============================================================
// CHAT MESSAGES — PATIENT 1 (MICHAEL CHEN)
// ============================================================

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    role: 'user',
    content: "What are Michael's latest A1C levels?",
    timestamp: '2024-12-10T09:00:00Z',
    sources: [],
  },
  {
    id: 'msg-2',
    role: 'assistant',
    content:
      "I don't have any A1C (hemoglobin A1C) results on file for Michael Chen. None of his uploaded documents include a metabolic panel or diabetes workup.\n\nHowever, his most recent lipid panel from October 14, 2024 shows elevated LDL-C at 138 mg/dL and triglycerides at 178 mg/dL. Given his cardiovascular risk factors, ordering a HbA1c alongside a comprehensive metabolic panel would be clinically relevant to screen for insulin resistance or pre-diabetes.",
    timestamp: '2024-12-10T09:00:15Z',
    sources: [
      { label: 'Oct Lipid Panel', documentId: 'doc-001', paragraphId: 'p3' },
    ],
  },
  {
    id: 'msg-3',
    role: 'user',
    content: "Given his LDL is elevated, what should we consider changing?",
    timestamp: '2024-12-10T09:01:00Z',
    sources: [],
  },
  {
    id: 'msg-4',
    role: 'assistant',
    content:
      "Based on Michael's current profile, here are the options to consider for LDL management:\n\n**1. Intensify Statin Therapy**\nHe's currently on Atorvastatin 40mg. Escalating to 80mg (maximum dose) could reduce LDL-C by an additional 6–8 mg/dL, potentially bringing him closer to the <100 mg/dL target.\n\n**2. Add Ezetimibe**\nEzetimibe 10mg can reduce LDL-C by ~18–20% on top of statin therapy, with a favorable side-effect profile.\n\n**3. PCSK9 Inhibitor**\nIf statin intensification + ezetimibe are insufficient, a PCSK9 inhibitor (e.g., evolocumab) could be considered given his cardiovascular risk.\n\nDr. Smith's November 12 note also flagged statin intensification as a pending decision pending BP stabilization — which is now improving with the Lisinopril dose increase.",
    timestamp: '2024-12-10T09:01:20Z',
    sources: [
      { label: 'Oct Lipid Panel', documentId: 'doc-001', paragraphId: 'p4' },
      { label: 'Nov Clinical Note', documentId: 'doc-002', paragraphId: 'p4' },
    ],
  },
  {
    id: 'msg-5',
    role: 'user',
    content: "Has his BP improved since starting the higher Lisinopril dose?",
    timestamp: '2024-12-10T09:02:00Z',
    sources: [],
  },
  {
    id: 'msg-6',
    role: 'assistant',
    content:
      "Yes — there's a modest but meaningful improvement.\n\n**November 12, 2024** (before dose increase): BP was **132/84 mmHg** at Dr. Smith's visit, which triggered the Lisinopril increase to 20mg.\n\n**Current reading** (most recent vital): BP is **128/82 mmHg** — a reduction of approximately 4/2 mmHg.\n\nWhile this is moving in the right direction, the target for Michael's risk profile is <130/80 mmHg. He's borderline — systolic is just below 130, but diastolic at 82 remains slightly above target. Continue current regimen and reassess at the next scheduled visit. Lifestyle modifications (DASH diet, sodium restriction) noted in Dr. Smith's plan should also be reinforced.",
    timestamp: '2024-12-10T09:02:25Z',
    sources: [
      { label: 'Nov Clinical Note', documentId: 'doc-002', paragraphId: 'p3' },
    ],
  },
]

// ============================================================
// CHAT MESSAGES — PATIENT 2 (SARAH MARTINEZ)
// ============================================================

export const PATIENT2_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'p2-msg-1',
    role: 'user',
    content: "What does Sarah's HbA1c of 9.2% mean for her diabetes management?",
    timestamp: '2024-12-11T10:00:00Z',
    sources: [],
  },
  {
    id: 'p2-msg-2',
    role: 'assistant',
    content:
      "Sarah's HbA1c of 9.2% is significantly above the ADA target of <7.0% for most adults with Type 2 Diabetes, and substantially above the relaxed target of <8.0% set by Dr. Rivera given her CKD comorbidity.\n\nAn HbA1c of 9.2% reflects average blood glucose of approximately **218 mg/dL** over the past 3 months — which aligns directly with her fasting glucose reading. This level indicates persistently poor glycemic control and significantly elevated risk for both microvascular complications (retinopathy, neuropathy) and accelerated CKD progression.\n\nKey contributing factors per the records: inconsistent carb counting and occasional missed insulin doses (per the December endocrinology note). Insulin Glargine has been uptitrated to 30 units QHS, and Empagliflozin 10mg was added for combined glycemic and renoprotective benefit.",
    timestamp: '2024-12-11T10:00:18Z',
    sources: [
      { label: 'HbA1c & CMP Lab', documentId: 'doc-201', paragraphId: 'p3' },
      { label: 'Endocrinology Note', documentId: 'doc-204', paragraphId: 'p2' },
    ],
  },
  {
    id: 'p2-msg-3',
    role: 'user',
    content: "How does her CKD affect which diabetes medications she can safely use?",
    timestamp: '2024-12-11T10:01:00Z',
    sources: [],
  },
  {
    id: 'p2-msg-4',
    role: 'assistant',
    content:
      "Sarah's eGFR of 42 mL/min/1.73m² (CKD Stage 3b) significantly constrains her medication options:\n\n**Metformin (currently on 1000mg BID)**\nMetformin is generally held at eGFR <30 and requires caution at eGFR <45. At 42, it's still technically permissible but nephrology has flagged it — if eGFR drops below 30, it must be stopped due to lactic acidosis risk. Dose reduction should be considered now.\n\n**Empagliflozin (recently added 10mg QD)**\nSGLT2 inhibitors now have an eGFR threshold of ≥20 for cardiorenal indication — making Empagliflozin appropriate here despite her CKD. It provides both modest glucose lowering and proven renoprotective benefit by reducing intraglomerular pressure.\n\n**Insulin Glargine (30 units QHS)**\nInsulin is safe in CKD and remains the preferred agent for achieving glycemic control. Careful monitoring is needed as insulin clearance decreases with declining renal function, increasing hypoglycemia risk.\n\n**What to avoid:** Sulfonylureas (hypoglycemia risk from active metabolite accumulation in CKD) and iodinated contrast dye (allergy listed).",
    timestamp: '2024-12-11T10:01:22Z',
    sources: [
      { label: 'HbA1c & CMP Lab', documentId: 'doc-201', paragraphId: 'p4' },
      { label: 'Nephrology Consult', documentId: 'doc-202', paragraphId: 'p3' },
    ],
  },
  {
    id: 'p2-msg-5',
    role: 'user',
    content: "What monitoring plan did nephrology put in place?",
    timestamp: '2024-12-11T10:02:00Z',
    sources: [],
  },
  {
    id: 'p2-msg-6',
    role: 'assistant',
    content:
      "Dr. Angela Rivera (Nephrology, November 4, 2024) outlined the following monitoring plan:\n\n**Near-term (4 weeks)**\n- Repeat CMP to check electrolytes, creatinine, and renal function\n- eGFR recheck after Empagliflozin initiation — an expected drop of up to 30% is hemodynamic (not harmful) and should not trigger discontinuation\n\n**Medium-term (3 months)**\n- Repeat eGFR to assess trajectory. If continues to decline toward Stage 4 (<30), Metformin must be held\n\n**Thresholds to act on**\n- Hold Metformin if eGFR <30\n- Empagliflozin: continue unless eGFR drops below 20\n- Potassium monitoring critical — patient on Lisinopril which can elevate K⁺ in CKD\n\n**Dietary**\n- Referral placed for low-potassium, low-phosphorus renal diet counseling\n\nThe nephrology note explicitly attributed CKD to diabetic nephropathy — making aggressive HbA1c improvement the single most impactful intervention to slow progression.",
    timestamp: '2024-12-11T10:02:28Z',
    sources: [
      { label: 'Nephrology Consult', documentId: 'doc-202', paragraphId: 'p3' },
      { label: 'HbA1c & CMP Lab', documentId: 'doc-201', paragraphId: 'p4' },
    ],
  },
]

// ============================================================
// CHAT MESSAGES — PATIENT 3 (JAMES THOMPSON)
// ============================================================

export const PATIENT3_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'p3-msg-1',
    role: 'user',
    content: "What does James's BNP of 620 pg/mL tell us about his heart failure?",
    timestamp: '2024-12-12T11:00:00Z',
    sources: [],
  },
  {
    id: 'p3-msg-2',
    role: 'assistant',
    content:
      "A BNP of 620 pg/mL is markedly elevated and a strong indicator of active heart failure decompensation.\n\nBNP (B-type natriuretic peptide) is released by ventricular myocytes in response to increased wall stress from volume or pressure overload. Reference: <100 pg/mL is normal; values >400 pg/mL are strongly associated with decompensated heart failure.\n\n**Clinical significance for James:**\n- His BNP has been **trending upward** (↑ 85 pg/mL from prior), suggesting worsening fluid retention despite current diuretic therapy\n- Corroborated by his echocardiogram showing EF decline from 35% → 32% and severe left atrial enlargement\n- Dr. Park's November 21 note directly tied the rising BNP to insufficient volume offloading and increased Furosemide from 40mg to 60mg QD\n\nA BNP at this level warrants close monitoring — ideally with daily weight logs and fluid restriction at 1.5L/day as instructed by cardiology.",
    timestamp: '2024-12-12T11:00:20Z',
    sources: [
      { label: 'BNP & BMP Lab', documentId: 'doc-301', paragraphId: 'p3' },
      { label: 'Cardiology Note', documentId: 'doc-303', paragraphId: 'p2' },
    ],
  },
  {
    id: 'p3-msg-3',
    role: 'user',
    content: "How has his ejection fraction changed and what are the implications?",
    timestamp: '2024-12-12T11:01:00Z',
    sources: [],
  },
  {
    id: 'p3-msg-4',
    role: 'assistant',
    content:
      "James's ejection fraction has declined from **35% → 32%** between echos — a 3-point drop that carries significant clinical implications.\n\n**Current echo (November 7, 2024):** EF 32% — classified as HFrEF (Heart Failure with Reduced Ejection Fraction, cutoff <40%)\n- Prior echo (approximately 6 months earlier): EF 35%\n- The November echo also showed diffuse LV hypokinesis, severe left atrial enlargement, and mild-to-moderate mitral regurgitation secondary to annular dilation\n\n**Why this matters:**\n- An EF of 32% despite current GDMT (Furosemide, Metoprolol, Spironolactone, Digoxin) signals undertreated HFrEF\n- Dr. Park flagged an **ICD evaluation** if EF remains <35% at the 3-month recheck — this threshold is guideline-driven (MADIT-II criteria)\n- Transition to **sacubitril/valsartan (ARNI)** is planned, which has demonstrated 20% relative reduction in cardiovascular death and HF hospitalization vs. ACE inhibitors\n- An SGLT2 inhibitor (Empagliflozin or Dapagliflozin) was also recommended for additional HF mortality benefit\n\n**Note:** James has a documented allergy to ACE Inhibitors (dry cough) — this makes the ARNI transition even more appropriate as it replaces the ACE inhibitor component.",
    timestamp: '2024-12-12T11:01:25Z',
    sources: [
      { label: 'Echocardiogram', documentId: 'doc-302', paragraphId: 'p3' },
      { label: 'Cardiology Note', documentId: 'doc-303', paragraphId: 'p2' },
    ],
  },
  {
    id: 'p3-msg-5',
    role: 'user',
    content: "Is his Warfarin dose appropriate for his AFib anticoagulation?",
    timestamp: '2024-12-12T11:02:00Z',
    sources: [],
  },
  {
    id: 'p3-msg-6',
    role: 'assistant',
    content:
      "Yes — James's INR is currently well-managed.\n\n**December 15, 2024 coagulation panel:** INR **2.4** — within the therapeutic target range of **2.0–3.0** for Atrial Fibrillation on Warfarin therapy.\n\nHis current dose of **Warfarin 5mg QD** is producing stable, therapeutic anticoagulation. The lab interpretation recommends continuing the current dose with the next INR check in 4 weeks.\n\n**Clinical context:**\n- For AFib, INR 2.0–3.0 balances stroke prevention against bleeding risk\n- James's CHA₂DS₂-VASc score is likely ≥4 given age (72), heart failure, and AFib — making anticoagulation strongly indicated\n- Warfarin is appropriate here; DOACs (e.g., apixaban) could be considered as an alternative with fewer monitoring requirements, but would require a transition plan\n\n**Important allergy note:** James is allergic to NSAIDs (fluid retention risk) — this is relevant as NSAIDs can interact with Warfarin and increase bleeding risk. This allergy is appropriately documented.",
    timestamp: '2024-12-12T11:02:30Z',
    sources: [
      { label: 'INR & Coagulation', documentId: 'doc-304', paragraphId: 'p2' },
      { label: 'INR & Coagulation', documentId: 'doc-304', paragraphId: 'p3' },
    ],
  },
]

// ============================================================
// CHAT MESSAGES BY PATIENT
// ============================================================

export const CHAT_MESSAGES_BY_PATIENT: Record<string, ChatMessage[]> = {
  'patient-001': INITIAL_CHAT_MESSAGES,
  'patient-002': PATIENT2_CHAT_MESSAGES,
  'patient-003': PATIENT3_CHAT_MESSAGES,
}

// ============================================================
// DEMO SCRIPTED RESPONSES
// ============================================================

export interface DemoResponse {
  content: string
  sources: ChatMessageSource[]
}

export const DEMO_RESPONSES: Record<string, DemoResponse> = {
  default: {
    content:
      "I've reviewed Michael Chen's medical records across all uploaded documents. Based on the available data, his primary concerns are hypertension management and lipid optimization. \n\nHis most recent labs show LDL-C at 138 mg/dL (above target), and his latest BP reading of 128/82 mmHg represents a modest improvement following the Lisinopril dose increase. The December echocardiogram confirmed mild LVH with preserved EF of 62%.\n\nIs there a specific aspect of his care you'd like to explore further?",
    sources: [
      { label: 'Oct Lipid Panel', documentId: 'doc-001', paragraphId: 'p3' },
      { label: 'Echo Results', documentId: 'doc-003', paragraphId: 'p4' },
    ],
  },
  echocardiogram: {
    content:
      "Michael's echocardiogram from December 3, 2024 showed **mild concentric LVH**, consistent with hypertensive heart disease. Key findings:\n\n- **EF: 62%** — preserved systolic function (normal ≥55%)\n- **Grade I diastolic dysfunction** — E/A ratio 0.85, impaired relaxation pattern\n- **Mild LA enlargement** — 4.2 cm (upper limit 4.0 cm)\n\nThe interpreting cardiologist (Dr. L. Park) recommends optimizing antihypertensive therapy and a follow-up echo in 12 months.",
    sources: [
      { label: 'Echo Results', documentId: 'doc-003', paragraphId: 'p3' },
    ],
  },
  medications: {
    content:
      "Michael's current medication list as of his last update:\n\n1. **Lisinopril 20mg** — once daily (increased from 10mg on Nov 12, 2024)\n2. **Atorvastatin 40mg** — QHS (at bedtime)\n3. **Aspirin 81mg** — once daily\n\n**Allergies**: Penicillin, Sulfa drugs\n\nNot at maximum statin dose yet — escalation to 80mg remains an option pending LDL reassessment.",
    sources: [
      { label: 'Nov Clinical Note', documentId: 'doc-002', paragraphId: 'p5' },
    ],
  },
  diagnosis: {
    content:
      "Michael Chen has two active diagnoses:\n\n1. **Essential Hypertension (I10)** — Managed with Lisinopril 20mg. BP trending down but not yet at target of <130/80. Mild LVH found on echo as end-organ sequela.\n\n2. **Hyperlipidemia (E78.5)** — LDL-C 138 mg/dL on Atorvastatin 40mg. Statin intensification under consideration pending BP stabilization.",
    sources: [
      { label: 'Nov Clinical Note', documentId: 'doc-002', paragraphId: 'p4' },
    ],
  },
}

// ============================================================
// DEMO RESPONSES — PATIENT 2 (SARAH MARTINEZ)
// ============================================================

export const DEMO_RESPONSES_PATIENT2: Record<string, DemoResponse> = {
  default: {
    content:
      "I've reviewed Sarah Martinez's records across 4 uploaded documents. Her two primary conditions are Type 2 Diabetes Mellitus (E11.9) and Chronic Kidney Disease Stage 3 (N18.3).\n\nKey concerns: HbA1c is 9.2% — significantly above target — and eGFR of 42 indicates CKD Stage 3b (diabetic nephropathy). Empagliflozin was recently added for both glycemic control and renal protection. Insulin Glargine was uptitrated to 30 units QHS.\n\nIs there a specific aspect of her diabetes management or kidney function you'd like to explore?",
    sources: [
      { label: 'HbA1c & CMP Lab', documentId: 'doc-201', paragraphId: 'p3' },
      { label: 'Nephrology Consult', documentId: 'doc-202', paragraphId: 'p2' },
    ],
  },
  hba1c: {
    content:
      "Sarah's HbA1c of **9.2%** reflects average blood glucose of ~218 mg/dL over the past 3 months — well above the ADA target of <7.0%, and also above the relaxed CKD target of <8.0%.\n\nContributing factors per the endocrinology note (December 9, 2024): inconsistent carbohydrate counting and occasional missed insulin doses.\n\n**Current glycemic regimen:**\n- Metformin 1000mg BID (dose adjustment pending eGFR monitoring)\n- Insulin Glargine 30 units QHS (recently increased from 26u)\n- Empagliflozin 10mg QD (added for SGLT2 inhibition + renal benefit)\n\nTarget for next visit: HbA1c <8.0% (adjusted given CKD comorbidity).",
    sources: [
      { label: 'HbA1c & CMP Lab', documentId: 'doc-201', paragraphId: 'p3' },
      { label: 'Endocrinology Note', documentId: 'doc-204', paragraphId: 'p2' },
    ],
  },
  kidney: {
    content:
      "Sarah's eGFR of **42 mL/min/1.73m²** places her at CKD Stage 3b. The renal ultrasound (November 17, 2024) confirmed bilateral parenchymal echogenicity changes consistent with diabetic nephropathy — no obstruction found.\n\n**Medication implications at eGFR 42:**\n- Metformin: still permissible but must be held if eGFR drops below 30\n- Empagliflozin: appropriate down to eGFR 20 for cardiorenal indication\n- Lisinopril: continued for renoprotection and blood pressure control\n\n**Monitoring plan (Dr. Rivera, Nephrology):**\n- CMP repeat in 4 weeks\n- eGFR recheck in 3 months\n- Potassium monitoring critical — Lisinopril + CKD raises hyperkalemia risk\n\nAggressive glycemic improvement is the single most impactful intervention to slow CKD progression.",
    sources: [
      { label: 'Nephrology Consult', documentId: 'doc-202', paragraphId: 'p2' },
      { label: 'Renal Ultrasound', documentId: 'doc-203', paragraphId: 'p3' },
    ],
  },
  medications: {
    content:
      "Sarah Martinez's current medication list:\n\n1. **Metformin 1000mg BID** — monitor at eGFR 42; hold if eGFR <30\n2. **Insulin Glargine 30 units QHS** — recently uptitrated from 26u\n3. **Lisinopril 10mg QD** — renoprotection and blood pressure\n4. **Empagliflozin 10mg QD** — newly added for SGLT2 benefit (glycemic + renal)\n\n**Allergies**: Sulfonamides, Iodinated Contrast Dye\n\nNote: Sulfonamide allergy precludes use of sulfonylureas for additional glycemic control. Contrast dye allergy must be flagged before any imaging requiring contrast.",
    sources: [
      { label: 'Endocrinology Note', documentId: 'doc-204', paragraphId: 'p2' },
      { label: 'Nephrology Consult', documentId: 'doc-202', paragraphId: 'p3' },
    ],
  },
}

// ============================================================
// DEMO RESPONSES — PATIENT 3 (JAMES THOMPSON)
// ============================================================

export const DEMO_RESPONSES_PATIENT3: Record<string, DemoResponse> = {
  default: {
    content:
      "I've reviewed James Thompson's records across 4 uploaded documents. His two primary conditions are Congestive Heart Failure with Reduced EF (I50.22) and Atrial Fibrillation (I48.91).\n\nKey concerns: EF has declined to 32% (from 35%), BNP is elevated at 620 pg/mL indicating ongoing decompensation, and cardiology has flagged the need for GDMT optimization — including an ARNI transition and possible ICD evaluation. INR is therapeutic at 2.4 on Warfarin.\n\nIs there a specific aspect of his heart failure management or anticoagulation you'd like to explore?",
    sources: [
      { label: 'BNP & BMP Lab', documentId: 'doc-301', paragraphId: 'p3' },
      { label: 'Echocardiogram', documentId: 'doc-302', paragraphId: 'p4' },
    ],
  },
  bnp: {
    content:
      "James's BNP of **620 pg/mL** is markedly elevated — normal is <100 pg/mL, and values >400 are strongly associated with decompensated heart failure.\n\nThis BNP has been **trending upward** (↑ 85 pg/mL), indicating worsening volume overload despite current diuretic therapy. Dr. Park's cardiology note (November 21, 2024) directly responded to this by increasing Furosemide from 40mg → 60mg QD.\n\n**Key correlations from the records:**\n- Consistent with the EF decline from 35% → 32% seen on echocardiogram\n- Severe left atrial enlargement on echo reflects chronically elevated filling pressures\n- Patient has been counseled on daily weight monitoring and 1.5L/day fluid restriction\n\nIf BNP remains elevated at next check, further diuretic uptitration or IV diuresis may be needed.",
    sources: [
      { label: 'BNP & BMP Lab', documentId: 'doc-301', paragraphId: 'p4' },
      { label: 'Cardiology Note', documentId: 'doc-303', paragraphId: 'p2' },
    ],
  },
  echo: {
    content:
      "James's November 7, 2024 echocardiogram showed significant findings:\n\n- **EF: 32%** — reduced from 35% at prior study (worsening HFrEF)\n- **Diffuse LV hypokinesis** — no focal wall motion abnormality (ischemia less likely)\n- **Severe left atrial enlargement** — consistent with long-standing AFib and elevated filling pressures\n- **Mild-to-moderate mitral regurgitation** — secondary to annular dilation from dilated cardiomyopathy\n- **RVSP ~38 mmHg** — mildly elevated, consistent with pulmonary congestion\n\n**Implications:** Dr. Park has flagged ICD evaluation if EF remains <35% at 3-month recheck (MADIT-II guideline threshold). ARNI (sacubitril/valsartan) transition is planned to replace ACE inhibitor — noting James has a documented ACE inhibitor allergy (dry cough), making ARNI appropriate.",
    sources: [
      { label: 'Echocardiogram', documentId: 'doc-302', paragraphId: 'p3' },
      { label: 'Echocardiogram', documentId: 'doc-302', paragraphId: 'p4' },
    ],
  },
  anticoagulation: {
    content:
      "James's anticoagulation is well-controlled.\n\n**December 15, 2024 coagulation panel:**\n- INR: **2.4** — within the therapeutic target of 2.0–3.0 for AFib\n- PT: 26.8 seconds (prolonged as expected on Warfarin)\n- aPTT: 34 seconds (normal)\n\nCurrent dose: **Warfarin 5mg QD** — no adjustment needed. Next INR check in 4 weeks.\n\n**CHA₂DS₂-VASc context:** James scores ≥4 (age 72, heart failure, AFib) — anticoagulation is strongly indicated for stroke prevention.\n\n**Allergy note:** NSAIDs are contraindicated (fluid retention risk and potential Warfarin interaction — documented allergy). This is important to flag for any pain management decisions.",
    sources: [
      { label: 'INR & Coagulation', documentId: 'doc-304', paragraphId: 'p2' },
      { label: 'INR & Coagulation', documentId: 'doc-304', paragraphId: 'p3' },
    ],
  },
}

// ============================================================
// DEMO RESPONSES BY PATIENT
// ============================================================

export const DEMO_RESPONSES_BY_PATIENT: Record<string, Record<string, DemoResponse>> = {
  'patient-001': DEMO_RESPONSES,
  'patient-002': DEMO_RESPONSES_PATIENT2,
  'patient-003': DEMO_RESPONSES_PATIENT3,
}
