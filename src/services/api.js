const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const config = {
    ...options,
    headers
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    try {
      const parsed = JSON.parse(errorText);
      errorMessage = parsed.message || parsed.error || errorMessage;
    } catch {
      if (errorText) errorMessage = errorText;
    }
    throw new Error(errorMessage);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const api = {
  // Composite CV Data
  getCv: () => request('/api/cv'),
  seedCv: (overwrite = false) => request(`/api/cv/seed?overwrite=${overwrite}`, { method: 'POST' }),

  // Personal Info
  getPersonalInfo: () => request('/api/cv/personal'),
  updatePersonalInfo: (data) => request('/api/cv/personal', {
    method: 'PUT',
    body: JSON.stringify(data)
  }),

  // Stats
  getStats: () => request('/api/cv/stats'),
  createStat: (data) => request('/api/cv/stats', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateStat: (id, data) => request(`/api/cv/stats/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  deleteStat: (id) => request(`/api/cv/stats/${id}`, {
    method: 'DELETE'
  }),

  // Experiences
  getExperiences: () => request('/api/cv/experiences'),
  createExperience: (data) => request('/api/cv/experiences', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateExperience: (id, data) => request(`/api/cv/experiences/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  deleteExperience: (id) => request(`/api/cv/experiences/${id}`, {
    method: 'DELETE'
  }),

  // Skills
  getSkillCategories: () => request('/api/cv/skills'),
  createSkillCategory: (data) => request('/api/cv/skills/categories', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateSkillCategory: (id, data) => request(`/api/cv/skills/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  deleteSkillCategory: (id) => request(`/api/cv/skills/categories/${id}`, {
    method: 'DELETE'
  }),
  deleteSkillItem: (id) => request(`/api/cv/skills/items/${id}`, {
    method: 'DELETE'
  }),

  // System Showcases
  getShowcases: () => request('/api/cv/showcases'),
  createShowcase: (data) => request('/api/cv/showcases', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateShowcase: (id, data) => request(`/api/cv/showcases/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  deleteShowcase: (id) => request(`/api/cv/showcases/${id}`, {
    method: 'DELETE'
  }),

  // Education
  getEducation: () => request('/api/cv/education'),
  createEducation: (data) => request('/api/cv/education', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateEducation: (id, data) => request(`/api/cv/education/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  deleteEducation: (id) => request(`/api/cv/education/${id}`, {
    method: 'DELETE'
  }),

  // Contact Messages
  submitContact: (data) => request('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getContactMessages: () => request('/api/contact'),
  markContactAsRead: (id) => request(`/api/contact/${id}/read`, {
    method: 'PATCH'
  }),
  deleteContactMessage: (id) => request(`/api/contact/${id}`, {
    method: 'DELETE'
  })
};
