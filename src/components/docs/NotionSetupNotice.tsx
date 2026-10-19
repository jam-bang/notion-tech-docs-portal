import { EmptyState } from "./EmptyState";

/** NOTION_API_KEY / NOTION_DATABASE_ID 미설정 시 안내 */
export function NotionSetupNotice() {
  return (
    <EmptyState
      title="Notion 연결이 설정되지 않았습니다."
      description=".env.local(또는 Vercel 환경 변수)에 NOTION_API_KEY와 NOTION_DATABASE_ID를 설정하세요."
    />
  );
}
