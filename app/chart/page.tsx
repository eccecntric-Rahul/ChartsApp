"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Chart from "../../components/Chart";
import { useRouter } from "next/navigation";

const ChartPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleSignOut = () => {
    signOut();
    router.replace("/");
  };
  if (!session) {
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
          <button
            onClick={() => router.push("/")}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center my-2"
            style={{ width: "fit-content" }}
          >
            Sign in
          </button>
        </div>
        <div className="min-h-screen flex items-center justify-center">
          <div>
            <p>You are not signed in.</p>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
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
        <button
          onClick={() => handleSignOut()}
          className="bg-red-500 text-white px-4 py-2 rounded flex items-center my-2"
          style={{ width: "fit-content" }}
        >
          Sign out
        </button>
      </div>
      <Chart />
    </div>
  );
};

export default ChartPage;
