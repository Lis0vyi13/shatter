import { Helmet } from "react-helmet-async";

import HelmetDescription from "@/components/common/HelmetDescription";
import HelmetTitle from "@/components/common/HelmetTitle";
import ChatBlock from "@/components/pages/Chat/ChatBlock";

const ArchivePage = () => {
  return (
    <>
      <Helmet>
        <HelmetTitle>Archive</HelmetTitle>
        <HelmetDescription content="Archive page" />
      </Helmet>
      <div className="chat-page overflow-hidden flex flex-1">
        <ChatBlock />
      </div>
    </>
  );
};

export default ArchivePage;
