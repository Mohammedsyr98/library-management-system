import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

export {};

declare global {
  interface SignInFormData {
    email: string;
    password: string;
  }
  interface SignUpFormData {
    full_name: string;
    email: string;
    university_id: number;
    password: string;
  }
  type TypedSupabaseClient = SupabaseClient<Database>;

  interface IUser {
    created_at: Date;
    email: string;
    full_name: string;
    id: string;
    last_activity_date: string;
    role: "USER" | "ADMIN";
    status: "APPROVED" | "PENDING" | "REJECTED";
    university_id: number;
  }
  interface IResponse {
    data?: IUser;
    error?: string;
  }

  interface IErrorResponse {
    message: string;
  }
  interface ISignOutResponse {
    message: string;
  }

  type IUsers = {
    id: string;
    fullName: string;
    email: string;
    created_at: string;
    role: "ADMIN" | "USER";
    books_borrowed: any[];
    university_id: number;
  };
}
