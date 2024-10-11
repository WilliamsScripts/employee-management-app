import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import Wrapper from "@/components/Wrapper";
import CustomInput from "@/components/CustomInput";
import {
  TouchableOpacity,
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { primaryColor } from "@/constants/Colors";
import { router } from "expo-router";
import { MenuProvider } from "react-native-popup-menu";
import useEmployeeHook from "@/hooks/useEmployeeHook";
import WelcomeCard from "@/components/WelcomeCard";
import EmptyList from "@/components/EmptyList";

const index = () => {
  const [search, setSearch] = useState<string>("");
  const handleGotoAdd = () => router.push("/add-employee");
  const { useFetchEmployees } = useEmployeeHook();
  const {
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useFetchEmployees(`?limit=10&search=${search}&page=`);

  const flatData = data?.pages.flatMap((page) => page.data) || [];
  const employees = flatData?.flatMap((item) => item.data);

  const handleSearchInput = (payload: string) => {
    setSearch(payload);
  };

  useEffect(() => {
    const fetchTimeout = setTimeout(() => {
      refetch();
    }, 1000);

    return () => clearTimeout(fetchTimeout);
  }, [search]);

  return (
    <Wrapper>
      <WelcomeCard />

      <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
        <CustomInput
          type="default"
          search={true}
          placeholder="Search employee name to find..."
          onChange={handleSearchInput}
          value={search}
        />
      </View>

      <MenuProvider skipInstanceCheck>
        {isFetching && employees.length === 0 ? (
          <ActivityIndicator size="large" color={primaryColor} />
        ) : (
          <FlatList
            data={employees}
            renderItem={(item) => <Card {...{ item }} />}
            keyExtractor={(item: any) => item.id.toString()}
            ListEmptyComponent={EmptyList}
            onEndReached={() => {
              if (hasNextPage) {
                fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.5}
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={refetch} />
            }
            ListFooterComponent={
              isFetchingNextPage ? <ActivityIndicator /> : null
            }
          />
        )}
      </MenuProvider>

      <TouchableOpacity
        style={{
          height: 50,
          width: 50,
          borderRadius: 100,
          backgroundColor: primaryColor,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: 30,
          right: 20,
        }}
        onPress={handleGotoAdd}
      >
        <AntDesign name="plus" size={30} color="white" />
      </TouchableOpacity>
    </Wrapper>
  );
};

export default index;
