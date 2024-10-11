import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { ThemedText } from "@/components/ThemedText";
import Wrapper from "@/components/Wrapper";
import { primaryColor } from "@/constants/Colors";
import { RegisterDto } from "@/types/auth.type";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidation } from "@/validations/auth.validations";
import useAuthentication from "@/hooks/useAuthentication";

const SignUp = () => {
  const gotoLogin = () => router.back();
  const { useRegister } = useAuthentication();
  const { mutateAsync, isPending } = useRegister;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDto>({
    resolver: yupResolver(registerValidation),
  });

  const onSubmit = async (data: RegisterDto) => {
    mutateAsync(data);
  };

  return (
    <Wrapper>
      <ScrollView
        style={{ paddingHorizontal: 16, paddingVertical: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText type="title" style={{ marginVertical: 40 }}>
          Create an Account
        </ThemedText>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              type="default"
              title="Name"
              style={{ marginBottom: 30 }}
              placeholder="Enter your name"
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              error={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              type="email-address"
              title="Email address"
              style={{ marginBottom: 30 }}
              placeholder="Enter email address"
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              title="Password"
              style={{ marginBottom: 30 }}
              placeholder="Enter password"
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              error={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              title="Password"
              style={{ marginBottom: 30 }}
              placeholder="Enter password"
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              error={errors.confirmPassword?.message}
            />
          )}
        />

        <CustomButton
          title="Submit"
          style={{ marginBottom: 20 }}
          onPress={handleSubmit(onSubmit)}
          loading={isPending}
        />

        <ThemedText
          style={{
            textAlign: "center",
            marginBottom: 120,
          }}
        >
          Already have an account?{" "}
          <ThemedText
            onPress={gotoLogin}
            style={{ color: primaryColor }}
            type="defaultSemiBold"
          >
            Log in
          </ThemedText>
        </ThemedText>
      </ScrollView>
    </Wrapper>
  );
};

export default SignUp;
