import React from "react";
import { Platform, ScrollView } from "react-native";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import CustomDatePicker from "./CustomDatePicker";
import { employeeValidation } from "@/validations/employee.validations";
import { EmployeeDto } from "@/types/employee.type";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useEmployeeHook from "@/hooks/useEmployeeHook";

type EmployeeFormType = {
  editId?: string;
  employee?: EmployeeDto;
};
const EmployeeForm: React.FC<EmployeeFormType> = ({ editId, employee }) => {
  const { useAddEmployee, useEditEmployee } = useEmployeeHook();
  const { mutateAsync: createNew, isPending: savingNewData } = useAddEmployee();
  const { mutateAsync: update, isPending: updatingData } =
    useEditEmployee(editId);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeDto>({
    resolver: yupResolver(employeeValidation),
    defaultValues: {
      name: employee?.name,
      department: employee?.department,
      jobRole: employee?.jobRole,
      birthday: employee?.birthday,
      startDate: employee?.startDate,
    },
  });

  const onSubmit = async (data: EmployeeDto) => {
    if (editId) {
      await update(data);
    } else {
      await createNew(data);
    }
  };

  return (
    <ScrollView
      style={{ paddingHorizontal: 16, flex: 1, paddingVertical: 30 }}
      showsVerticalScrollIndicator={false}
    >
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput
            type="default"
            title="Name"
            style={{ marginBottom: 30 }}
            placeholder="Enter employee's name"
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="startDate"
        render={({ field: { onChange, value } }) => (
          <CustomDatePicker
            title="Start Date"
            placeholder="Select Date"
            onchange={onChange}
            value={value}
            style={{ marginBottom: 30 }}
            error={errors.startDate?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="birthday"
        render={({ field: { onChange, value } }) => (
          <CustomDatePicker
            title="Date of Birth"
            placeholder="Select Date"
            onchange={onChange}
            value={value}
            style={{ marginBottom: 30 }}
            error={errors.birthday?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="jobRole"
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput
            type="default"
            title="Job Role"
            style={{ marginBottom: 30 }}
            placeholder="Enter employee's role"
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            error={errors.jobRole?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="department"
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput
            type="default"
            title="Department"
            style={{ marginBottom: 30 }}
            placeholder="Enter employee's department"
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            error={errors.department?.message}
          />
        )}
      />

      <CustomButton
        title="Submit"
        onPress={handleSubmit(onSubmit)}
        style={{ marginBottom: Platform.OS === "android" ? 50 : 170 }}
        loading={savingNewData || updatingData}
      />
    </ScrollView>
  );
};

export default EmployeeForm;
