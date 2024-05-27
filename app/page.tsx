"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
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
            backgroundColor: "rgba(255, 165, 0)",
          }}
        >
          <p style={{ fontFamily: "Roboto", fontSize: 32 }}>Charts</p>
        </div>
        <div className="min-h-screen flex items-center justify-center">
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
            <h1 className="text-3xl font-bold" style={{ color: "black" }}>
              Welcome to the Home Page
            </h1>
            <p style={{ color: "black" }}>You are successfully logged in .</p>
            <button
              onClick={() => router.push("/chart")}
              className="bg-green-500 text-white px-4 py-2 rounded flex items-center my-2"
            >
              Go to Charts
            </button>
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default Home;
