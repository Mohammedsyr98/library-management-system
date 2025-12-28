"use client";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import { useForm } from "react-hook-form";
import FormInput from "../form-components/FormInput";
import { signInSchema } from "@/validations/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSignIn } from "@/hooks/useAuth";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";
import { useToast } from "../../hooks/useToast";
import { useState } from "react";
import { DEMO_ACCOUNTS } from "@/constants/constants";
import { signOut } from "@/services/actions/actions.auth";

type DemoRole = keyof typeof DEMO_ACCOUNTS;

const SignInForm = ({
  setFormStep,
}: {
  setFormStep: (value: string) => void;
}) => {
  const [demoRole, setDemoRole] = useState<DemoRole>("USER");
  const router = useRouter();
  const { showToast } = useToast();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: DEMO_ACCOUNTS[demoRole].email,
      password: DEMO_ACCOUNTS[demoRole].password,
    },
  });
  const { mutate: signIn, isPending } = useSignIn();
  const onSubmit = async (data: SignInFormData) => {
    signIn(data, {
      onSuccess: (data) => {
        showToast(data.message, "success");
        router.refresh();
      },
      onError: async (error: { message: string }) => {
        showToast(error.message, "error");
        await signOut();
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
            <div className="mt-6">
              {" "}
              <p className="mb-3 text-sm text-[#D6E0FF]">Demo account</p>{" "}
              <div className="flex gap-6">
                {" "}
                {(["USER", "ADMIN"] as DemoRole[]).map((role) => (
                  <label
                    key={role}
                    className="flex items-center gap-2 cursor-pointer">
                    {" "}
                    <input
                      type="radio"
                      checked={demoRole === role}
                      onChange={() => {
                        setDemoRole(role);
                        setValue("email", DEMO_ACCOUNTS[role].email);
                        setValue("password", DEMO_ACCOUNTS[role].password);
                      }}
                      className="accent-[#E7C9A5]"
                    />{" "}
                    <span className="capitalize">{role}</span>{" "}
                  </label>
                ))}{" "}
              </div>{" "}
              <p className="mt-2 text-xs text-[#9DA8C3]">
                {" "}
                Selecting a demo account will auto-fill credentials{" "}
              </p>{" "}
            </div>
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
