import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Get parameters from URL
    const title = searchParams.get("title") ?? "Secret Share";
    const description =
      searchParams.get("description") ??
      "Share encrypted secrets that can only be viewed once";
    const page = searchParams.get("page") ?? "home";
    const theme = searchParams.get("theme") ?? "blue"; // blue or green

    // Color palette based on theme parameter
    const isGreenTheme = theme === "green";

    // Define colors
    const primaryColor = isGreenTheme ? "#10b981" : "#3b82f6";
    const primaryColorLight = isGreenTheme ? "#10b98180" : "#3b82f680";
    const primaryColorDark = isGreenTheme ? "#065f46" : "#1e3a8a";
    const primaryColorDarkLight = isGreenTheme ? "#065f4620" : "#1e3a8a20";
    const primaryColorAlpha50 = isGreenTheme ? "#10b98150" : "#3b82f650";
    const primaryColorAlpha30 = isGreenTheme ? "#10b98130" : "#3b82f630";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            backgroundColor: "#000000",
            fontFamily: "system-ui, -apple-system, sans-serif",
            position: "relative",
          }}
        >
          {/* Left side - Main content (2/3) */}
          <div
            style={{
              width: "66.666%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "60px",
              position: "relative",
            }}
          >
            {/* Shield icon with glow */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "40px",
                padding: "20px 0", // Add padding to prevent glow cropping
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100px", // Reduce container margins
                  height: "100px",
                  marginRight: "20px",
                }}
              >
                <svg
                  width="190"
                  height="190"
                  viewBox="-12 -12 48 48"
                  fill="none"
                  stroke={primaryColor}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    filter: `drop-shadow(0 0 25px ${primaryColor}) drop-shadow(0 0 50px ${primaryColorAlpha50})`,
                  }}
                >
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
            </div>

            {/* Title with glow */}
            <div
              style={{
                fontSize: "56px",
                fontWeight: "800",
                color: "white",
                marginBottom: "24px",
                lineHeight: "1.1",
                textShadow: "0 0 30px rgba(255,255,255,0.3)",
              }}
            >
              {title}
            </div>

            {/* Description */}
            <div
              style={{
                fontSize: "22px",
                color: "#a1a1aa",
                lineHeight: "1.4",
                marginBottom: "40px",
                maxWidth: "500px",
              }}
            >
              {description}
            </div>

            {/* Badge with neon glow */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                backgroundColor: "#000000",
                color: primaryColor,
                padding: "18px 32px",
                borderRadius: "30px",
                fontSize: "16px",
                fontWeight: "700",
                border: `2px solid ${primaryColor}`,
                boxShadow: `0 0 12px ${primaryColor}, 0 0 25px ${primaryColorAlpha30}, inset 0 0 10px ${primaryColorDarkLight}`,
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <circle cx="12" cy="16" r="1" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              End-to-End Encrypted
            </div>
          </div>

          {/* Right side - Chat visualization (overlapping) */}
          <div
            style={{
              position: "absolute",
              right: "0",
              top: "0",
              width: "38%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "80px 60px 80px 0",
              background:
                "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,1) 100%)",
            }}
          >
            {/* Chat conversation flow */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "40px",
                height: "100%",
                justifyContent: "center",
              }}
            >
              {/* Top conversation */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {/* Message 1 - incoming */}
                <div
                  style={{
                    background: "rgba(26, 26, 26, 0.9)",
                    padding: "16px 20px",
                    borderRadius: "24px 24px 24px 8px",
                    fontSize: "16px",
                    color: "#ffffff",
                    border: "1px solid rgba(51, 51, 51, 0.8)",
                    maxWidth: "90%",
                    backdropFilter: "blur(15px)",
                  }}
                >
                  Can you share that password?
                </div>

                {/* Message 2 - outgoing simple */}
                <div
                  style={{
                    background: `rgba(${isGreenTheme ? "6, 95, 70" : "30, 58, 138"}, 0.9)`,
                    color: "white",
                    padding: "16px 20px",
                    borderRadius: "24px 24px 8px 24px",
                    fontSize: "16px",
                    alignSelf: "flex-end",
                    border: `1px solid ${primaryColor}`,
                    boxShadow: `0 0 20px ${primaryColorAlpha30}`,
                    backdropFilter: "blur(15px)",
                  }}
                >
                  Sure! 👍
                </div>
                {/* Secure link preview - main visual focus */}
                <div
                  style={{
                    alignSelf: "flex-end",
                    background: `rgba(${isGreenTheme ? "6, 95, 70" : "30, 58, 138"}, 0.95)`,
                    padding: "28px",
                    borderRadius: "28px 28px 8px 28px",
                    border: `3px solid ${primaryColor}`,
                    boxShadow: `0 0 40px ${primaryColorAlpha50}, 0 0 80px ${primaryColorAlpha30}`,
                    backdropFilter: "blur(20px)",
                    maxWidth: "90%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  {/* Large lock icon */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "60px",
                      height: "60px",
                      background: `rgba(0, 0, 0, 0.3)`,
                      borderRadius: "50%",
                      border: `2px solid ${primaryColor}`,
                      boxShadow: `0 0 20px ${primaryColorAlpha50}`,
                    }}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={primaryColor}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <circle cx="12" cy="16" r="1" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>

                  {/* Minimal text */}
                  <div
                    style={{
                      color: "white",
                      fontSize: "16px",
                      fontWeight: "700",
                      textAlign: "center",
                    }}
                  >
                    🔗 Secure Link
                  </div>

                  {/* Visual indicator */}
                  <div
                    style={{
                      color: primaryColor,
                      fontSize: "12px",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        background: primaryColor,
                        borderRadius: "50%",
                        boxShadow: `0 0 8px ${primaryColor}`,
                      }}
                    />
                    End-to-end encrypted
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e) {
    console.log(`${e instanceof Error ? e.message : "Unknown error"}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
