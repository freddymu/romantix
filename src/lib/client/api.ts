type ApiResponse<T> = {
  data?: T
  error?: string
}

const API_BASE_URL = '/api' // Adjust this if your API has a different base URL

async function fetchApi<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: object,
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.error('API request failed:', error)
    return { error: error instanceof Error ? error.message : 'An unknown error occurred' }
  }
}

// User API
export const userApi = {
  getUser: (id: string) => fetchApi<User>(`/users/${id}`),
  createUser: (userData: Partial<User>) => fetchApi<User>('/users', 'POST', userData),
  updateUser: (id: string, userData: Partial<User>) =>
    fetchApi<User>(`/users/${id}`, 'PUT', userData),
  deleteUser: (id: string) => fetchApi(`/users/${id}`, 'DELETE'),
}

// Relationship API
export const relationshipApi = {
  getRelationships: (userId: string) => fetchApi<Relationship[]>(`/relationships?user=${userId}`),
  createRelationship: (relationshipData: Partial<Relationship>) =>
    fetchApi<Relationship>('/relationships', 'POST', relationshipData),
  updateRelationship: (id: string, relationshipData: Partial<Relationship>) =>
    fetchApi<Relationship>(`/relationships/${id}`, 'PUT', relationshipData),
  deleteRelationship: (id: string) => fetchApi(`/relationships/${id}`, 'DELETE'),
}

// Milestone API
export const milestoneApi = {
  getMilestones: (userId: string) => fetchApi<Milestone[]>(`/milestones?user=${userId}`),
  createMilestone: (milestoneData: Partial<Milestone>) =>
    fetchApi<Milestone>('/milestones', 'POST', milestoneData),
  updateMilestone: (id: string, milestoneData: Partial<Milestone>) =>
    fetchApi<Milestone>(`/milestones/${id}`, 'PUT', milestoneData),
  deleteMilestone: (id: string) => fetchApi(`/milestones/${id}`, 'DELETE'),
}

// Feedback API
export const feedbackApi = {
  getFeedback: (userId: string) => fetchApi<Feedback[]>(`/feedbacks?user=${userId}`),
  createFeedback: (feedbackData: Partial<Feedback>) =>
    fetchApi<Feedback>('/feedbacks', 'POST', feedbackData),
  updateFeedback: (id: string, feedbackData: Partial<Feedback>) =>
    fetchApi<Feedback>(`/feedbacks/${id}`, 'PUT', feedbackData),
  deleteFeedback: (id: string) => fetchApi(`/feedbacks/${id}`, 'DELETE'),
}

// Love Language API
export const loveLanguageApi = {
  getLoveLanguage: (userId: string) => fetchApi<LoveLanguage>(`/love-languages?user=${userId}`),
  createLoveLanguage: (loveLanguageData: Partial<LoveLanguage>) =>
    fetchApi<LoveLanguage>('/love-languages', 'POST', loveLanguageData),
  updateLoveLanguage: (id: string, loveLanguageData: Partial<LoveLanguage>) =>
    fetchApi<LoveLanguage>(`/love-languages/${id}`, 'PUT', loveLanguageData),
}

// Attachment Style API
export const attachmentStyleApi = {
  getAttachmentStyle: (userId: string) =>
    fetchApi<AttachmentStyle>(`/attachment-styles?user=${userId}`),
  createAttachmentStyle: (attachmentStyleData: Partial<AttachmentStyle>) =>
    fetchApi<AttachmentStyle>('/attachment-styles', 'POST', attachmentStyleData),
  updateAttachmentStyle: (id: string, attachmentStyleData: Partial<AttachmentStyle>) =>
    fetchApi<AttachmentStyle>(`/attachment-styles/${id}`, 'PUT', attachmentStyleData),
}

// Conflict Resolution API
export const conflictResolutionApi = {
  getConflictResolutions: (userId: string) =>
    fetchApi<ConflictResolution[]>(`/conflict-resolutions?user=${userId}`),
  createConflictResolution: (conflictResolutionData: Partial<ConflictResolution>) =>
    fetchApi<ConflictResolution>('/conflict-resolutions', 'POST', conflictResolutionData),
  updateConflictResolution: (id: string, conflictResolutionData: Partial<ConflictResolution>) =>
    fetchApi<ConflictResolution>(`/conflict-resolutions/${id}`, 'PUT', conflictResolutionData),
  deleteConflictResolution: (id: string) => fetchApi(`/conflict-resolutions/${id}`, 'DELETE'),
}

// Health Assessment API
export const healthAssessmentApi = {
  getHealthAssessments: (userId: string) =>
    fetchApi<HealthAssessment[]>(`/health-assessments?user=${userId}`),
  createHealthAssessment: (healthAssessmentData: Partial<HealthAssessment>) =>
    fetchApi<HealthAssessment>('/health-assessments', 'POST', healthAssessmentData),
  updateHealthAssessment: (id: string, healthAssessmentData: Partial<HealthAssessment>) =>
    fetchApi<HealthAssessment>(`/health-assessments/${id}`, 'PUT', healthAssessmentData),
  deleteHealthAssessment: (id: string) => fetchApi(`/health-assessments/${id}`, 'DELETE'),
}

// Setting API
export const settingApi = {
  getSettings: (userId: string) => fetchApi<Setting>(`/settings?user=${userId}`),
  updateSettings: (id: string, settingData: Partial<Setting>) =>
    fetchApi<Setting>(`/settings/${id}`, 'PUT', settingData),
}

// Subscription API
export const subscriptionApi = {
  getSubscription: (userId: string) => fetchApi<Subscription>(`/subscriptions?user=${userId}`),
  createSubscription: (subscriptionData: Partial<Subscription>) =>
    fetchApi<Subscription>('/subscriptions', 'POST', subscriptionData),
  updateSubscription: (id: string, subscriptionData: Partial<Subscription>) =>
    fetchApi<Subscription>(`/subscriptions/${id}`, 'PUT', subscriptionData),
  cancelSubscription: (id: string) => fetchApi<Subscription>(`/subscriptions/${id}/cancel`, 'PUT'),
}

// Types (you may want to move these to a separate types file)
type User = {
  id: string
  email: string
  name?: string
}

type Relationship = {
  id: string
  name: string
  user: string
}

type Milestone = {
  id: string
  title: string
  date: string
  user: string
}

type Feedback = {
  id: string
  subject: string
  content: string
  user: string
}

type LoveLanguage = {
  id: string
  user: string
  result: Record<string, number>
  date: string
}

type AttachmentStyle = {
  id: string
  user: string
  result: string
  date: string
}

type ConflictResolution = {
  id: string
  user: string
  scenario: string
  response: string
  date: string
}

type HealthAssessment = {
  id: string
  user: string
  score: number
  details: Record<string, any>
  date: string
}

type Setting = {
  id: string
  user: string
  preferences: Record<string, any>
}

type Subscription = {
  id: string
  user: string
  plan: 'free' | 'premium' | 'pro'
  startDate: string
  endDate?: string
  isActive: boolean
}

export const api = {
  user: userApi,
  relationship: relationshipApi,
  milestone: milestoneApi,
  feedback: feedbackApi,
  loveLanguage: loveLanguageApi,
  attachmentStyle: attachmentStyleApi,
  conflictResolution: conflictResolutionApi,
  healthAssessment: healthAssessmentApi,
  setting: settingApi,
  subscription: subscriptionApi,
}

export default api
