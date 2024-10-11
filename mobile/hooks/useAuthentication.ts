import { AuthContext } from '@/contexts/AuthContext';
import { loginRequest, registerRequest } from '@/services/auth';
import { LoginDto, RegisterDto, UserResponse } from '@/types/auth.type';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useContext } from 'react';
import Toast from 'react-native-root-toast';


const useAuthentication = () => {
  const { storeUser } = useContext(AuthContext);

  const saveUserData = (data: UserResponse): boolean | void => {
    if (!storeUser) {
      return false
    }
    storeUser({ token: data.token, data: data.user, isLoggedIn: true });
  }

  const useLogin = useMutation({
    mutationFn: (data: LoginDto) => loginRequest(data),
    onSuccess: (response) => {
      saveUserData(response.data);
      Toast.show(response.message, {
        duration: Toast.durations.LONG,
        backgroundColor: 'green',
        position: Toast.positions.TOP
      });
      router.replace('/(employees)')
    },
    onError: (response: any) => {
      Toast.show(response.error, {
        duration: Toast.durations.LONG,
        backgroundColor: 'red'
      })
    }
  })

  const useRegister = useMutation({
    mutationFn: (data: RegisterDto) => registerRequest(data),
    onSuccess: (response) => {
      saveUserData(response.data);
      Toast.show(response.message, {
        duration: Toast.durations.LONG,
        backgroundColor: 'green',
        position: Toast.positions.TOP
      });
      router.replace('/(employees)')
    },
    onError: (response: any) => {
      Toast.show(response.error, {
        duration: Toast.durations.LONG,
        backgroundColor: 'red'
      });
    }
  })

  return {
    useLogin,
    useRegister
  }
}

export default useAuthentication