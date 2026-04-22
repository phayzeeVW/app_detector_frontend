import { api } from './client';
import type { Application } from '../types/application';

export const applicationsApi = {
    getAll: () => api.get<Application[]>('/applications'),
    getById: (id: number) => api.get<Application>(`/id/${id}`),
};
