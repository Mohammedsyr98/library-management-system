"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import libraryImg from "@/public/images/library.png";
import SignUpForm from "@/components/auth/SignUpForm";
import SignInForm from "@/components/auth/SignInForm";

const formVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

const AuthLayout = () => {
  const [formStep, setFormStep] = useState("login");

  return (
    <section className={`flex flex-col md:flex-row background`}>
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {formStep === "login" ? (
            <motion.div
              key="login"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}>
              <SignInForm setFormStep={setFormStep} />
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}>
              <SignUpForm setFormStep={setFormStep} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="hidden md:block flex-1 sticky top-0 h-screen">
        <Image
          className={` w-full max-h-screen object-cover`}
          src={libraryImg}
          alt="library-image"
          priority
        />
      </div>
    </section>
  );
};

export default AuthLayout;
