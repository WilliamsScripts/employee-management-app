import EmployeeForm from "@/components/EmployeeForm";
import Wrapper from "@/components/Wrapper";
import useEmployeeHook from "@/hooks/useEmployeeHook";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator } from "react-native";

const EditEmployee = () => {
  const { id } = useLocalSearchParams();
  const { useGetEmployeeDetail } = useEmployeeHook();
  const { data, isPending } = useGetEmployeeDetail(id as string);

  return (
    <Wrapper paddingBottom={90}>
      {isPending ? (
        <ActivityIndicator />
      ) : (
        <EmployeeForm editId={id as string} employee={data.data} />
      )}
    </Wrapper>
  );
};

export default EditEmployee;
