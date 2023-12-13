import { api } from '@/config';

export type UpdateSettingsPayload = {
  id: string;
  notify: string;
  name?: string;
  email?: string;
  // first_login?: boolean;
};
export type UpdateSettingsResponse = boolean;

export class SettingsService {
  static async updateSettings(payload: UpdateSettingsPayload) {
    const { data } = await api.put<UpdateSettingsResponse>(
      `/user/${payload.id}`,
      payload,
    );
    return data;
  }
}
