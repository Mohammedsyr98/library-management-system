import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./database.types";
import * as yup from "yup";
import { BookFormSchema } from "@/validations/validations";
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
  type IUser = Database["public"]["Tables"]["users"]["Row"];

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

  interface UpdateUserRolePayload {
    userId: string;
    newRole: Database["public"]["Enums"]["role"];
  }
  interface ResourceTableProps<T> {
    data: T[];
    currentUserId?: string;
    total: number;
    page: number;
    limit: number;
  }

  type BookRow = Database["public"]["Tables"]["books"]["Row"];
  type BookRequestRow =
    Database["public"]["Functions"]["search_borrow_requests"]["Returns"][number];

  type BookFormData = yup.InferType<typeof BookFormSchema>;

  interface UpdateBorrowStatusParams {
    borrowId: Database["public"]["Tables"]["borrow_requests"]["Row"]["id"];
    newStatus: Database["public"]["Enums"]["borrow_status_enum"];
  }
}
