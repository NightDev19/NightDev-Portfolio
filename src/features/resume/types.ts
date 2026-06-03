export interface ResumeSection {
  id: string
  section_type: 'personal_info' | 'experience' | 'education' | 'awards' | 'skills'
  title: string | null
  subtitle: string | null
  description: string | null
  metadata: Record<string, unknown>
  order_index: number
  created_at: string
  updated_at: string
}

// Convenience types for the public resume page
export interface PersonalInfo {
  name: string
  title: string
  summary: string
  email: string
  phone: string
  location: string
  linkedin: string
  website: string
}

export interface ResumeExperience {
  id: string
  company: string
  role: string
  period: string
  location: string
  description: string
  tech_stack: string[]
}

export interface ResumeEducation {
  id: string
  school: string
  degree: string
  period: string
  location: string
}

export interface ResumeAward {
  id: string
  title: string
  year: string
}

export interface ResumeSkills {
  core: string[]
  technical: string[]
  soft: string[]
}

export interface ResumeData {
  personalInfo: PersonalInfo
  experience: ResumeExperience[]
  education: ResumeEducation[]
  awards: ResumeAward[]
  skills: ResumeSkills
}
