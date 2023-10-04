import axios, { AxiosResponse } from 'axios';
import { User, Task } from '@/firebase/firestore/types';
import { SignUpFormData } from '@/components/Forms/SignUpForm';
import api from '@/lib/axios';

type tokenRes = {
  token: string;
};
class ExampleService {
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
    return api.post('/api/userTask');
  }
  async getActiveUserTasks() {
    return api.get<AxiosResponse<Task[]>>('/api/activeUserTasks');
  }
  async getAllPosts() {
    return await axios.get<User[]>('/posts');
  }

  getByPostId(): Promise<User[]> {
    return axios.get('/posts/1');
  }

  async addPost() {
    const res = await axios.post('/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return res;
  }

  async updatePost() {
    const res = await axios.put(
      'https://jsonplaceholder.typicode.com/posts/1',
      {
        method: 'PUT',
        body: JSON.stringify({
          id: 1,
          title: 'foo',
          body: 'bar',
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
    return res;
  }

  async deletePost() {
    const res = await axios.delete(
      'https://jsonplaceholder.typicode.com/posts/1',
      {
        method: 'DELETE',
      }
    );
    return res;
  }
}

export default new ExampleService();
