/// <reference types="vitest/importMeta" />
import { NextRequest } from "next/server";
import { getRequestId } from "@/lib/api-response";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export function buildLivenessResponse(uptime: number, ts: string) {
  return { status: "ok", uptime, ts };
}

export function GET(req: NextRequest = new NextRequest("http://localhost/api/health/live")) {
  const response = Response.json(
    buildLivenessResponse(Math.floor(process.uptime()), new Date().toISOString()),
    { status: 200, headers: { "Cache-Control": "no-store" } },
  );
  response.headers.set("x-request-id", getRequestId(req));
  return response;
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe("liveness", () => {
    it("returns 200", async () => {
      const res = await GET(new NextRequest("http://localhost/api/health/live"));
      expect(res.status).toBe(200);
    });
  });
}