import ChatWidget from "@/components/ChatWidget";

export default async function Page({ params }) {
  const { botId } = await params;

  return <ChatWidget botId={botId} />;
}