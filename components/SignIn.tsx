"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();

  const handleGoogle = async () => {
    try {
      const resp = await signIn("google", {
        callbackUrl: "/",
        redirect: true,
      });
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          paddingTop: 8,
          paddingBottom: 8,
          paddingRight: 16,
          paddingLeft: 16,
          backgroundColor: "rgba(255, 165, 70)",
        }}
      >
        <p style={{ fontFamily: "Roboto", fontSize: 32 }}>Charts</p>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div
          style={{
            width: "30vw",
            height: "30vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            borderRadius: 16,
            backgroundColor: "white",
          }}
        >
          <h1 className="text-3xl font-bold mb-4" style={{ color: "black" }}>
            Sign In
          </h1>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleGoogle();
            }}
            className="bg-gray-200 text-white px-4 py-2 rounded flex items-center"
          >
            <Image
              src={"/google.svg"}
              alt="google"
              width={20}
              height={20}
              style={{ marginRight: "12px" }}
            />
            <p style={{ color: "black" }}>Sign in with Google</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default SignIn;
