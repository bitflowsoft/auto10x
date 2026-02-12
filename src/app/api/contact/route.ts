import { NextRequest, NextResponse } from "next/server";

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL || "";

const SOLUTION_LABELS: Record<string, string> = {
  "blog-solution": "네이버 블로그 솔루션 프로그램",
  "blogger-collector": "네이버 블로거 수집기",
  "cafe-posting": "네이버 카페 포스팅 자동화",
  "package-all": "올인원 패키지 (3개 전체)",
  "package-custom": "2개 조합 패키지",
  "custom-new": "맞춤 제작 - 새로운 자동화 개발",
  "custom-modify": "맞춤 제작 - 기존 프로그램 커스터마이징",
  "other": "기타 문의",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, contact, solution, message } = body;

    if (!name || !contact || !solution) {
      return NextResponse.json(
        { error: "필수 항목을 입력해주세요." },
        { status: 400 }
      );
    }

    const solutionLabel = SOLUTION_LABELS[solution] || solution;

    const slackMessage = {
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "🔔 AutoFlow 새 상담 문의",
            emoji: true,
          },
        },
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*담당자명*\n${name}` },
            { type: "mrkdwn", text: `*회사/업체명*\n${company || "-"}` },
          ],
        },
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*연락처*\n${contact}` },
            { type: "mrkdwn", text: `*관심 솔루션*\n${solutionLabel}` },
          ],
        },
        ...(message
          ? [
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `*문의 내용*\n${message}`,
                },
              },
            ]
          : []),
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*접수 시간*\n${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}`,
            },
          ],
        },
        { type: "divider" },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: "via <https://autoflow.newdev.it|AutoFlow 랜딩페이지>",
            },
          ],
        },
      ],
    };

    const slackRes = await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slackMessage),
    });

    if (!slackRes.ok) {
      console.error("Slack webhook error:", await slackRes.text());
      return NextResponse.json(
        { error: "알림 전송에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
