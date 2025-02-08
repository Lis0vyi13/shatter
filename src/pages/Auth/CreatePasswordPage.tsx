import { Helmet } from "react-helmet-async";

import CreatePassword from "@/components/pages/Authentication/CreatePassword";
import AuthFormWrapper from "@/components/pages/Authentication/AuthFormWrapper";
import AuthVideoBlock from "@/components/pages/Authentication/AuthVideoBlock";
import CustomLoadingBar from "@/components/ui/CustomLoadingBar";

const CreatePasswordPage = () => {
  return (
    <>
      <Helmet>
        <title>Create Password | Shatter</title>
        <meta name="description" content="Create Password Page" />
      </Helmet>
      <section className="overflow-hidden flex flex-col mdLg:flex-row gap-3 justify-center h-full items-center p-2">
        <CustomLoadingBar />
        <AuthFormWrapper>
          <CreatePassword />
        </AuthFormWrapper>
        <AuthVideoBlock />
      </section>
    </>
  );
};

export default CreatePasswordPage;
