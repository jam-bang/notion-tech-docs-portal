import "server-only";
import { Client } from "@notionhq/client";

/** Notion 설정이 되어 있는지 여부 (미설정 시 화면에 안내 표시) */
export function isNotionConfigured(): boolean {
  return Boolean(process.env.NOTION_API_KEY && process.env.NOTION_DATABASE_ID);
}

let client: Client | null = null;

export function getNotionClient(): Client {
  const auth = process.env.NOTION_API_KEY;
  if (!auth) {
    throw new Error("NOTION_API_KEY 환경 변수가 설정되지 않았습니다. .env.local을 확인하세요.");
  }
  client ??= new Client({ auth });
  return client;
}

export function getDatabaseId(): string {
  const id = process.env.NOTION_DATABASE_ID;
  if (!id) {
    throw new Error("NOTION_DATABASE_ID 환경 변수가 설정되지 않았습니다. .env.local을 확인하세요.");
  }
  return id;
}
