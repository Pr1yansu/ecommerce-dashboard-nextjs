import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="min-h-screen flex justify-center items-center">
      {children}
    </section>
  );
};

export default AuthLayout;
