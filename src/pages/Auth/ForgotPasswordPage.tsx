import { Helmet } from "react-helmet-async";

import ForgotPassword from "@/components/pages/Authentication/ForgotPassword";
import AuthFormWrapper from "@/components/pages/Authentication/AuthFormWrapper";
import AuthVideoBlock from "@/components/pages/Authentication/AuthVideoBlock";
import CustomLoadingBar from "@/components/ui/CustomLoadingBar";

const ForgotPasswordPage = () => {
  return (
    <>
      <Helmet>
        <title>Forgot Password | Shatter</title>
        <meta name="description" content="Forgot Password Page" />
      </Helmet>
      <section className="overflow-hidden flex flex-col mdLg:flex-row gap-3 justify-center h-full items-center p-2">
        <CustomLoadingBar />
        <AuthFormWrapper>
          <ForgotPassword />
        </AuthFormWrapper>
        <AuthVideoBlock />
      </section>
    </>
  );
};

export default ForgotPasswordPage;
