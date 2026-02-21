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
// CHAT MESSAGES
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
