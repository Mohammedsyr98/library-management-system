"use client";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import { useForm } from "react-hook-form";
import FormInput from "../form-components/FormInput";
import { signInSchema } from "@/validations/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSignIn } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabaseClient";
import { getCurrentUser } from "@/Services/services";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";
import { useToast } from "../../hooks/useToast";

const SignInForm = ({
  setFormStep,
}: {
  setFormStep: (value: string) => void;
}) => {
  const router = useRouter();
  const { showToast } = useToast();

  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
  });
  const { mutate: signIn, isPending } = useSignIn();
  const onSubmit = async (data: SignInFormData) => {
    signIn(data, {
      onSuccess: async () => {
        const userRow = await getCurrentUser();

        if (userRow.error) {
          showToast(userRow.error, "error");
          await supabase.auth.signOut();
        } else {
          showToast(
            `Welcome ${userRow.data?.full_name}, you have logged in successfully!`,
            "success"
          );

          router.push(
            userRow.data?.role === "ADMIN" ? "/dashboard/home" : "/home-page"
          );
        }
      },
      onError: (error: { message: string }) => {
        showToast(error.message, "error");
      },
    });
  };
  return (
    <>
      <main className="bg-[#12141D] rounded-[20px] shadow-[0_4px_6px_rgba(0,0,0,0.2)]">
        <div className="p-10 text-white ">
          <Image src={logo} alt="BookWise logo" width={150} height={50} />

          <h1 className="mt-8 text-[28px] font-semibold">
            Welcome Back to the BookWise
          </h1>

          <p className="text-[18px] text-[#D6E0FF] mt-2">
            Access the vast collection of resources, and stay updated
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-5">
            <FormInput
              control={control}
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email address"
              className="mt-8"
              errors={errors}
            />

            <FormInput
              control={control}
              name="password"
              label="Password"
              type="password"
              placeholder="Enter a strong password"
              className="mt-8"
              errors={errors}
            />

            <Button
              label="Sign in"
              labelWhenPending="Signing In..."
              variant="lightOrange"
              isPending={isPending}
            />
          </form>

          {/* Login link */}
          <p className="flex items-center justify-center gap-1 font-medium mt-9 text-center">
            Don’t have an account already?
            <button
              onClick={() => setFormStep("sign-up")}
              className="text-[#E7C9A5] hover:underline">
              Register here
            </button>
          </p>
        </div>
      </main>
    </>
  );
};

export default SignInForm;
