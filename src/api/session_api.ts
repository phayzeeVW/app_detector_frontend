import { api } from './client';
import type {Session, SessionSummary} from '../types/session';

export const sessionsApi = {
    getAllSessionsSummary: () => api.get<SessionSummary[]>('/sessions'),
    getAll: () => api.get<Session[]>('/sessions'),
    getById: (id: number) => api.get<Session>(`/sessions/${id}`),
    getByApplication: (applicationId: number) =>
        api.get<Session[]>(`/applications/${applicationId}/sessions`),
};
