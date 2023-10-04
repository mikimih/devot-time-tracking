import axios, { AxiosResponse } from 'axios';
import { Task, UpdateTaskType } from '@/firebase/firestore/types';
import { SignUpFormData } from '@/components/Forms/SignUpForm';
import api from '@/lib/axios';

type tokenRes = {
  token: string;
};
class AxiosService {
  async login(password: string, displayName: string) {
    return axios.post<tokenRes>('/api/signInWithUsername', {
      password,
      displayName,
    });
  }
  async register({ email, displayName, password }: SignUpFormData) {
    return axios.post<tokenRes>('/api/createUserAndGetToken', {
      email,
      password,
      displayName,
    });
  }

  async createUserTask() {
    return api.post('/api/userTasks');
  }
  async getActiveUserTasks() {
    return api.get<AxiosResponse<Task[]>>('/api/activeUserTasks');
  }
  async updateUserTask(req: UpdateTaskType) {
    return api.patch(`/api/userTasks/${req.id}`, { ...req });
  }
  async markAllStopped(req: UpdateTaskType[]) {
    return api.post('/api/userTasks/markStopped', req);
  }
  async deleteUserTask(id: string) {
    return api.delete(`/api/userTasks/${id}`);
  }
}

export default new AxiosService();
