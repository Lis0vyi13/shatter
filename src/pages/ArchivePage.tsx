import { Helmet } from "react-helmet-async";

import ChatWrapper from "@/components/pages/Chat/ChatWrapper";

const ArchivePage = () => {
  return (
    <>
      <Helmet>
        <title>Archive</title>
        <meta name="description" content="Archive page" />
      </Helmet>
      <div className="chat-page overflow-hidden flex flex-1">
        <ChatWrapper />
      </div>
    </>
  );
};

export default ArchivePage;
