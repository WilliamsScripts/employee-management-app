import { useThemeColor } from "@/hooks/useThemeColor";
import { FontAwesome, FontAwesome6, Fontisto } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { router } from "expo-router";
import { formatDate } from "@/utils/formatDate";
import useEmployeeHook from "@/hooks/useEmployeeHook";

const Card: React.FC<{ item: any }> = ({ item }) => {
  const { item: employee } = item;
  const color = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const backgroundColorTint = useThemeColor({}, "iconBg");
  const goToEdit = (id: string) => router.push(`/edit/${id}`);

  const { useArchiveEmployee } = useEmployeeHook();
  const { mutateAsync, isPending } = useArchiveEmployee(employee.id);
  const handleArchive = async () => {
    await mutateAsync(employee.id);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onLongPress={() => () => console.log("show edit")}
      style={{ position: "relative" }}
    >
      <ThemedView
        style={{
          padding: 16,
          marginBottom: 10,
          marginHorizontal: 16,
          borderRadius: 8,
          minHeight: 160,
        }}
      >
        {isPending ? (
          <ActivityIndicator />
        ) : (
          <>
            <View style={{ flexDirection: "row", gap: 7, marginBottom: 5 }}>
              <ThemedText type="subtitle">{employee.name}</ThemedText>
              {employee.archivedAt && (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "red",
                    borderRadius: 8,
                    paddingHorizontal: 8,
                    width: "auto",
                  }}
                >
                  <ThemedText
                    type="default"
                    style={{ color: "red", fontSize: 11 }}
                  >
                    Archived
                  </ThemedText>
                </View>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 5,
                marginTop: 5,
              }}
            >
              <ContentRenderer
                title="Role"
                value={employee.jobRole}
                icon={<FontAwesome name="suitcase" size={15} color={color} />}
              />
              <ContentRenderer
                title="Department"
                value={employee.department}
                icon={
                  <FontAwesome name="folder-open-o" size={15} color={color} />
                }
              />
              <ContentRenderer
                title="Start Date"
                value={formatDate(employee.startDate)}
                icon={<Fontisto name="date" size={15} color={color} />}
              />
              <ContentRenderer
                title="Date of Birth"
                value={formatDate(employee.birthday)}
                icon={<Fontisto name="date" size={15} color={color} />}
              />
            </View>
            <Menu
              style={{
                position: "absolute",
                right: 10,
                top: 16,
              }}
            >
              <MenuTrigger
                style={{
                  height: 30,
                  width: 30,
                  backgroundColor: backgroundColorTint,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 100,
                }}
              >
                <FontAwesome6
                  name="ellipsis-vertical"
                  size={20}
                  color={color}
                />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption
                  style={{
                    padding: 10,
                    height: 40,
                    justifyContent: "center",
                    backgroundColor,
                  }}
                  onSelect={() => goToEdit(employee.id)}
                >
                  <Text style={{ color }}>Edit</Text>
                </MenuOption>
                {!employee.archivedAt && (
                  <MenuOption
                    style={{
                      height: 40,
                      justifyContent: "center",
                      padding: 10,
                      backgroundColor,
                    }}
                    onSelect={handleArchive}
                  >
                    <Text style={{ color: "red" }}>Archive</Text>
                  </MenuOption>
                )}
              </MenuOptions>
            </Menu>
          </>
        )}
      </ThemedView>
    </TouchableOpacity>
  );
};

type ContentRendererProps = {
  title: string;
  value?: string;
  icon: React.ReactNode;
};

const ContentRenderer: React.FC<ContentRendererProps> = ({
  title,
  value,
  icon,
}) => {
  const backgroundColorTint = useThemeColor({}, "iconBg");

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
        alignItems: "flex-start",
        width: "47%",
        marginBottom: 5,
      }}
    >
      <View
        style={{
          gap: 5,
          height: 30,
          width: 30,
          backgroundColor: backgroundColorTint,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 100,
        }}
      >
        {icon}
      </View>
      <View>
        {title && <ThemedText type="defaultSemiBold">{title}:</ThemedText>}
        {value && <ThemedText>{value}</ThemedText>}
      </View>
    </View>
  );
};

export default Card;
