import React from "react";
import Form from "@/app/components/Form";
import Link from "next/link";

const Page = () => {
  const fields = [
    {
      name: "username",
      label: "Username",
      type: "text",
      autoComplete: "username",
      placeholder: "janesmith",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      autoComplete: "current-password",
      placeholder: "********",
    },
  ];

  return (
    <main className="h-screen w-full flex justify-center items-center ">
      <div className="p-4 lg:w-1/2 bg-slate-300 dark:bg-slate-300 dark:bg-inherit rounded-lg">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Login
        </h2>
        <Form fields={fields} />
        <div className="flex justify-center items-center">
          <Link className=" text-gray-800" href="/signup">
            Dont have an account? Signup
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Page;
