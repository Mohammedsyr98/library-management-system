import Image from "next/image";
import logo from "@/public/images/logo.png";
import { useForm } from "react-hook-form";
import FormInput from "../form-components/FormInput";
import { signUpSchema } from "@/validations/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSignUp } from "@/hooks/useAuth";
import { Button } from "../ui/Button";
import { useToast } from "../../hooks/useToast";

const SignUpForm = ({
  setFormStep,
}: {
  setFormStep: (value: string) => void;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
  });

  const { mutate: signUp, isPending } = useSignUp();
  const { showToast } = useToast();

  const onSubmit = (data: SignUpFormData) => {
    signUp(data, {
      onSuccess: () => {
        showToast(
          "Account created successfully. Please wait for admin approval to activate your account.",
          "success"
        );

        // redirect or do something
      },
      onError: (error: { message: string }) => {
        showToast(error.message, "error");
        console.log(error);
      },
    });
  };

  return (
    <>
      <main className="bg-[#12141D] m-20 rounded-[20px] shadow-[0_4px_6px_rgba(0,0,0,0.2)]">
        <div className="p-10 text-white ">
          <Image src={logo} alt="BookWise logo" width={150} height={50} />

          <h1 className="mt-8 text-[28px] font-semibold">
            Create Your Library Account
          </h1>

          <p className="text-[18px] text-[#D6E0FF] mt-2">
            Please complete all fields and upload a valid university ID to gain
            access to the library.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-5">
            <FormInput
              control={control}
              name="full_name"
              label="Full Name"
              placeholder="Enter your full name"
              errors={errors}
            />
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
              name="university_id"
              label="University ID Number"
              placeholder="Enter your university ID"
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
              label="Sign up"
              labelWhenPending="Signing Up..."
              variant="lightOrange"
              isPending={isPending}
            />
          </form>

          {/* Login link */}
          <p className="flex items-center justify-center gap-1 font-medium mt-9 text-center">
            Have an account already?
            <button
              onClick={() => setFormStep("login")}
              className="text-[#E7C9A5] hover:underline">
              Login
            </button>
          </p>
        </div>
      </main>
    </>
  );
};

export default SignUpForm;
