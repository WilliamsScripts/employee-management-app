import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { ThemedText } from "@/components/ThemedText";
import Wrapper from "@/components/Wrapper";
import { primaryColor } from "@/constants/Colors";
import useAuthentication from "@/hooks/useAuthentication";
import { LoginDto } from "@/types/auth.type";
import { loginValidation } from "@/validations/auth.validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView } from "react-native";

const Login = () => {
  const gotoRegister = () => router.push("/sign-up");
  const { useLogin } = useAuthentication();
  const { mutateAsync, isPending } = useLogin;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    resolver: yupResolver(loginValidation),
  });

  const onSubmit = async (data: LoginDto) => {
    mutateAsync(data);
  };

  return (
    <Wrapper>
      <ScrollView
        style={{ paddingHorizontal: 16, paddingVertical: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText type="title" style={{ marginVertical: 40 }}>
          Login Here
        </ThemedText>

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

        <CustomButton
          title="Login"
          style={{ marginBottom: 20 }}
          onPress={handleSubmit(onSubmit)}
          loading={isPending}
        />

        <ThemedText
          style={{
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          Don't have an account?{" "}
          <ThemedText
            onPress={gotoRegister}
            style={{ color: primaryColor }}
            type="defaultSemiBold"
          >
            Sign Up
          </ThemedText>
        </ThemedText>
      </ScrollView>
    </Wrapper>
  );
};

export default Login;
