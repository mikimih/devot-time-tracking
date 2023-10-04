import { useQuery, useQueryClient, useMutation } from 'react-query';
import routeService from './routeService';
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
    mutationFn: routeService.createUserTask,
    mutationKey: ['userTask'],
  });
};
export const useActiveUserTasks = () => {
  return useQuery({
    queryKey: ['userTask'],
    queryFn: async () => {
      const response = await routeService.getActiveUserTasks();
      return response.data;
    },
    cacheTime: Infinity,
  });
};

export const useAllPosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => routeService.getAllPosts(),
  });
};

// const usePostById = () => {
//   return useQuery(['posts'], routeService.getByPostId());
// };

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return routeService.addPost();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
      },
    }
  );
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return routeService.updatePost();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
      },
    }
  );
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return routeService.deletePost();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
      },
    }
  );
};
