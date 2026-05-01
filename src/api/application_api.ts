import {api} from './client';
import type {ApplicationSummary, ApplicationWithSessions} from '../types/application';

export const applicationsApi = {
  getAll: () => api.get<ApplicationSummary[]>('/applications'),
  getById: (id: number) => api.get<ApplicationWithSessions>(`/applications/id/${id}`),
};
