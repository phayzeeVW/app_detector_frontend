import { api } from "./client";
import type {
  ApplicationWithoutSessions,
  ApplicationWithSessions,
} from "../types/application";

export const applicationsApi = {
  getAll: () => api.get<ApplicationWithoutSessions[]>("/applications"),
  getById: (id: number) =>
    api.get<ApplicationWithSessions>(`/applications/id/${id}`),

  update: (application: ApplicationWithoutSessions) =>
    api.put<ApplicationWithoutSessions>(
      `/applications/${application.id}`,
      application,
    ),
};
