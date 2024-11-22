import { api } from "@/lib/axios/api";
import {
  type RegisterInput,
  type RegisterOutput,
  type UpdateUserInput,
  type UpdateUserOutput,
  type UserWithoutPassword,
} from "@/services/user/types/";

export const user = {
  me: async () => {
    try {
      const response = await api.get<UserWithoutPassword>("/auth/me");
      return response;
    } catch (error) {
      return null;
    }
  },
  register: async ({ email, name, password }: RegisterInput) => {
    const response = await api.post<RegisterOutput>("/auth/user", {
      email,
      name,
      password,
    });
    return response.data;
  },
  updatePassword: async ({
    password,
    newPassword,
  }: {
    password: string;
    newPassword: string;
  }) => {
    await api.patch("/user/password", {
      password: password,
      newPassword: newPassword,
    });
  },
  delete: async () => {
    await api.delete("/user");
  },
  updateUser: async ({ name, email, phone }: UpdateUserInput) => {
    const updatedUser = await api.patch<UpdateUserOutput>("/user", {
      name,
      email,
      phone,
    });
    return updatedUser.data;
  },
};
