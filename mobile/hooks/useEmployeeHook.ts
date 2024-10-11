import { archiveEmployeeRequest, createNewEmployeeRequest, editEmployeeRequest, getEmployeeDetailRequest, getEmployeesRequest } from '@/services/employee.service';
import { EmployeeDto } from '@/types/employee.type';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import React from 'react'
import Toast from 'react-native-root-toast';

const useEmployeeHook = () => {
  const queryClient = useQueryClient()

  const useAddEmployee = () => useMutation({
    mutationFn: (data: EmployeeDto) => createNewEmployeeRequest(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['EMPLOYEES'] })
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

  const useEditEmployee = (id?: string) => useMutation({
    mutationFn: (data: EmployeeDto) => editEmployeeRequest(data, id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['EMPLOYEES'] })
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

  const useArchiveEmployee = (id: string) => useMutation({
    mutationFn: () => archiveEmployeeRequest(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['EMPLOYEES'] })
      Toast.show(response.message, {
        duration: Toast.durations.LONG,
        backgroundColor: 'green',
        position: Toast.positions.TOP
      });
    },
    onError: (response: any) => {
      Toast.show(response.error, {
        duration: Toast.durations.LONG,
        backgroundColor: 'red'
      })
    }
  })

  const useFetchEmployees = (query?: string) => useInfiniteQuery({
    queryFn: async ({ pageParam = 1 }) => {
      return await getEmployeesRequest(query ?? '', pageParam);
    },
    initialPageParam: 1,
    queryKey: ['EMPLOYEES'],
    getNextPageParam: (lastPage) => {
      const currentPage = parseInt(lastPage.data.pagination.currentPage);
      const totalPage = lastPage.data.pagination.totalPages;
      return currentPage < totalPage ? currentPage + 1 : undefined;
    },
  });

  const useGetEmployeeDetail = (id: string) => useQuery({
    queryFn: async () => {
      return await getEmployeeDetailRequest(id)
    },
    queryKey: [`EMPLOYEE_${id}`]
  })



  return {
    useAddEmployee,
    useEditEmployee,
    useArchiveEmployee,
    useFetchEmployees,
    useGetEmployeeDetail
  }
}

export default useEmployeeHook