import { useQuery, useMutation } from 'react-query';
import routeService from '../routeService';
import { SignInFormData } from '@/components/Forms/SignInForm';
import { SignUpFormData } from '@/components/Forms/SignUpForm';

export const useLogIn = () => {
  return useMutation((data: SignInFormData) => {
    return routeService.login(data.password, data.displayName);
  });
};
export const useSignUp = () => {
  return useMutation((data: SignUpFormData) => {
    return routeService.register(data);
  });
};

export const useCreateUserTask = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await routeService.createUserTask();
      return response.data;
    },
    mutationKey: ['userTasks'],
  });
};
export const useMarkAllStopped = () => {
  return useMutation({
    mutationFn: routeService.markAllStopped,
    mutationKey: ['userTasks'],
  });
};
export const useActiveUserTasks = () => {
  return useQuery({
    queryKey: ['userTasks'],
    queryFn: async () => {
      const response = await routeService.getActiveUserTasks();
      return response.data;
    },
    cacheTime: Infinity,
    staleTime: Infinity,
  });
};
export const useUpdateUserTask = () => {
  return useMutation({
    mutationFn: routeService.updateUserTask,
    mutationKey: ['userTasks'],
  });
};
export const useDeleteUserTask = () => {
  return useMutation({
    mutationFn: routeService.deleteUserTask,
    mutationKey: ['userTasks'],
  });
};
