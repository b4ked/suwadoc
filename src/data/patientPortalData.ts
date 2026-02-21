import type { ChatMessage } from './mockData'

// ============================================================
// CARE TEAM
// ============================================================

export interface CareTeamMember {
  name: string
  role: string
  clinic: string
  status: 'active' | 'inactive'
}

export const CARE_TEAM: CareTeamMember[] = [
  {
    name: 'Dr. Sarah Jenkins',
    role: 'Internal Medicine',
    clinic: 'Harbor View Medical Center',
    status: 'active',
  },
]

// ============================================================
// RECENT ACTIVITY
// ============================================================

export interface ActivityItem {
  text: string
  time: string
  icon: 'eye' | 'check-circle' | 'upload'
}

export const RECENT_ACTIVITY: ActivityItem[] = [
  {
    text: 'Dr. Sarah Jenkins viewed your October Lipid Panel',
    time: '2 days ago',
    icon: 'eye',
  },
  {
    text: 'Your CBC results were processed',
    time: '5 days ago',
    icon: 'check-circle',
  },
  {
    text: 'Echocardiogram Results uploaded',
    time: '3 weeks ago',
    icon: 'upload',
  },
]

// ============================================================
// PATIENT PORTAL CHAT MESSAGES
// ============================================================

export const PATIENT_PORTAL_CHAT: ChatMessage[] = [
  {
    id: 'pt-msg-1',
    role: 'user',
    content: "What does 'elevated LDL' mean on my lipid panel?",
    timestamp: '2024-12-10T09:00:00Z',
    sources: [],
  },
  {
    id: 'pt-msg-2',
    role: 'assistant',
    content:
      "Great question, Michael. LDL stands for **Low-Density Lipoprotein** — often called \"bad cholesterol\" because it can build up on the walls of your arteries over time.\n\nYour October Lipid Panel showed your LDL at **138 mg/dL**. For someone with your health history, the goal is to keep it below 100 mg/dL. So yours is a bit above where we'd like it to be.\n\nThis doesn't mean you need to panic — it's something your doctor is already aware of and working with you to manage through your current medication (Atorvastatin). Your next appointment with Dr. Jenkins is a great opportunity to discuss next steps.\n\n**Remember:** This information is based on your uploaded records. Please talk to Dr. Jenkins before making any changes to your diet or medication.",
    timestamp: '2024-12-10T09:00:15Z',
    sources: [
      { label: 'View Source: Oct Lipid Panel', documentId: 'doc-001', paragraphId: 'p3' },
    ],
  },
  {
    id: 'pt-msg-3',
    role: 'user',
    content: 'Should I be worried about my blood pressure?',
    timestamp: '2024-12-10T09:02:00Z',
    sources: [],
  },
  {
    id: 'pt-msg-4',
    role: 'assistant',
    content:
      "Your blood pressure reading of **128/82 mmHg** (from your most recent records) is described as \"slightly elevated\" — also called Stage 1 hypertension. To put it in plain terms:\n\n- The **top number (128)** measures the pressure when your heart beats. Ideally, this should be below 120.\n- The **bottom number (82)** measures pressure when your heart rests between beats. Ideally, below 80.\n\nYours is just above those targets, but it has actually **improved** compared to a few months ago — which is good news! This is likely because your doctor increased your Lisinopril dose in November.\n\nThe most important thing is to **keep your next appointment with Dr. Jenkins** so she can continue monitoring your progress. In the meantime, things like reducing salt in your diet, regular light exercise, and limiting alcohol can help.\n\n_Based on your November 12 clinical note and most recent vitals. Always consult Dr. Jenkins for personalised advice._",
    timestamp: '2024-12-10T09:02:15Z',
    sources: [
      { label: 'View Source: Nov Clinical Note', documentId: 'doc-002', paragraphId: 'p3' },
    ],
  },
]

// ============================================================
// PLAIN ENGLISH SUMMARIES
// ============================================================

export const PLAIN_ENGLISH_SUMMARIES: Record<string, string> = {
  'doc-001':
    `Your lipid panel checks the fat levels in your blood. Think of it as a report card for your cholesterol.\n\n**What was tested:**\n- **LDL ("bad" cholesterol): 138 mg/dL** — This is higher than the goal of below 100. High LDL can slowly build up in your arteries, which increases the risk of heart disease over time.\n- **HDL ("good" cholesterol): 48 mg/dL** — This is in the normal range. HDL helps remove bad cholesterol from your blood.\n- **Triglycerides: 178 mg/dL** — Slightly above the ideal level of below 150. Triglycerides are a type of fat that can come from eating too many sweets or fatty foods.\n- **Total Cholesterol: 214 mg/dL** — A little above the ideal of below 200.\n\n**What this means for you:**\nYou're already taking a medication called Atorvastatin to help lower your cholesterol. Your doctor may discuss adjusting the dose at your next visit to help bring your LDL closer to the goal.\n\n**Next step:** Talk to Dr. Jenkins about your cholesterol results and ask about any lifestyle changes that might help.`,
  'doc-002':
    "This is a summary of your visit with Dr. Smith on November 12, 2024.\n\n**Why you came in:**\nYou visited for a routine check-up to monitor your blood pressure and cholesterol. You mentioned having mild morning headaches, but no chest pain or shortness of breath.\n\n**Your numbers that day:**\n- Blood pressure: 132/84 — slightly above target\n- Heart rate: 76 — normal and healthy\n- Weight: 83.2 kg, BMI: 27.5\n\n**What changed:**\n- Your doctor increased your blood pressure medication (Lisinopril) from 10mg to 20mg per day. This is a common adjustment to help bring your blood pressure down to a healthier level.\n- Dr. Smith also ordered a heart ultrasound (echocardiogram) to take a closer look at your heart. This is a standard precaution when blood pressure has been elevated for a while.\n\n**Your updated medications:**\n- Lisinopril 20mg — once daily (increased)\n- Atorvastatin 40mg — at bedtime (unchanged)\n- Aspirin 81mg — once daily (unchanged)\n\n**Next step:** Follow up in 6 weeks for a blood pressure re-check. Keep taking your medications as prescribed.",
  'doc-003':
    "An echocardiogram is an ultrasound of your heart — similar to a pregnancy ultrasound, but for your heart. It's painless and takes pictures of how your heart is working.\n\n**What was found:**\n- **Your heart is pumping well.** Your ejection fraction (the amount of blood your heart pumps out with each beat) is 62%, which is in the normal range. This is reassuring!\n- **Mild thickening of the heart wall.** The walls of your heart are slightly thicker than ideal. This is a common finding when blood pressure has been elevated for a long time — it's your heart adapting to work harder. It's called \"mild LVH\" in medical terms.\n- **Minor stiffness.** There's a small amount of stiffness in how your heart relaxes between beats. This is called \"Grade I diastolic dysfunction\" — it's mild and manageable.\n- **Slightly enlarged left upper chamber.** The left atrium (top-left chamber of your heart) is very slightly enlarged, which can happen alongside the stiffness mentioned above.\n\n**What this means for you:**\nThe most important thing you can do is keep your blood pressure well-controlled. Your doctor will likely want to repeat this test in about 12 months to see if things improve with better blood pressure management.\n\n**Next step:** Continue your blood pressure medications and attend your next appointment with Dr. Jenkins.",
}
