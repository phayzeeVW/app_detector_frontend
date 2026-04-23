import type {TableConfig} from "../types/tableConfig.ts";
import {api} from "./client.ts";

const BASE_URL = '/tableConfig';

export const tableConfigApi = {
  read: (tableName: string) => api.get<TableConfig>(`${BASE_URL}/read/${tableName}`),
  write: (tableConfig: TableConfig) => api.post(`${BASE_URL}/write`, tableConfig)
}