"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { KeyIcon } from "~/components/diagram/key-icon";
import { LockIcon } from "~/components/diagram/lock-icon";
import { Arrow } from "~/components/diagram/arrow";
import { CrossIcon } from "~/components/diagram/cross-icon";
import { BugIcon } from "~/components/diagram/bug-icon";
import { ChatUI } from "~/components/diagram/chat-ui";
import { UserIcon } from "~/components/diagram/user-icon";
import { IdBadge } from "~/components/diagram/id-badge";
import { TextContent } from "~/components/diagram/text-content";
import { Spinner } from "~/components/diagram/spinner";
import { UrlComponent } from "~/components/diagram/url-component";
import { CursorPointer } from "~/components/diagram/cursor-pointer";

export default function DebugComponentsPage() {
  const [lockState, setLockState] = useState(true);
  const [highlightFragment, setHighlightFragment] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const sampleMessages = [
    {
      id: "1",
      component: <span className="text-sm">Hey, check this out!</span>,
      sender: "left" as const,
    },
    {
      id: "2",
      component: (
        <UrlComponent
          path="/decrypt/abc123"
          fragment="encryption-key-here"
          className="text-xs"
        />
      ),
      sender: "right" as const,
      isHighlighted: true,
    },
    {
      id: "3",
      component: <span className="text-sm">Thanks!</span>,
      sender: "left" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-light text-white">
            Diagram Component Library
          </h1>
          <p className="text-gray-400">
            Testing all reusable components for the interactive diagram
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Key Icon */}
          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader>
              <CardTitle className="text-lg text-white">Key Icon</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <KeyIcon size="sm" color="emerald" />
                <KeyIcon size="md" color="blue" />
                <KeyIcon size="lg" color="purple" />
              </div>
              <div className="text-sm text-gray-400">
                Sizes: sm, md, lg
                <br />
                Colors: emerald, blue, purple, gray
              </div>
            </CardContent>
          </Card>

          {/* Lock Icon */}
          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader>
              <CardTitle className="text-lg text-white">Lock Icon</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <LockIcon isLocked={lockState} animated />
                <Button
                  onClick={() => setLockState(!lockState)}
                  size="sm"
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Toggle
                </Button>
              </div>
              <div className="text-sm text-gray-400">
                States: locked/unlocked
                <br />
                Animated transitions available
              </div>
            </CardContent>
          </Card>

          {/* Arrow */}
          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader>
              <CardTitle className="text-lg text-white">Arrow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Arrow direction="right" color="emerald" />
                <Arrow direction="left" color="blue" />
                <Arrow direction="up" color="purple" />
                <Arrow direction="down" color="red" animated />
              </div>
              <div className="text-sm text-gray-400">
                Directions: right, left, up, down
                <br />
                Animated and dashed options
              </div>
            </CardContent>
          </Card>

          {/* Cross Icon */}
          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader>
              <CardTitle className="text-lg text-white">Cross Icon</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <CrossIcon size="sm" />
                <CrossIcon size="md" animated />
                <CrossIcon size="lg" />
              </div>
              <div className="text-sm text-gray-400">
                Red cross for deletion/error states
                <br />
                Zoom-in animation available
              </div>
            </CardContent>
          </Card>

          {/* Bug Icon */}
          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader>
              <CardTitle className="text-lg text-white">Bug Icon</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <BugIcon size="md" />
                <BugIcon size="lg" animated />
              </div>
              <div className="text-sm text-gray-400">
                Red bug for malicious users
                <br />
                Bounce animation available
              </div>
            </CardContent>
          </Card>

          {/* User Icon */}
          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader>
              <CardTitle className="text-lg text-white">User Icon</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <UserIcon size="sm" color="emerald" label="Creator" />
                <UserIcon size="md" color="purple" label="Receiver" />
                <UserIcon size="sm" color="red" label="Malicious" animated />
              </div>
              <div className="text-sm text-gray-400">
                Different colors for different actors
                <br />
                Optional labels and animations
              </div>
            </CardContent>
          </Card>

          {/* ID Badge */}
          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader>
              <CardTitle className="text-lg text-white">ID Badge</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <IdBadge id="abc123" color="blue" />
                <IdBadge id="xyz789" color="emerald" animated />
              </div>
              <div className="text-sm text-gray-400">
                Shows secret IDs
                <br />
                Fade-in animation available
              </div>
            </CardContent>
          </Card>

          {/* Text Content */}
          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader>
              <CardTitle className="text-lg text-white">Text Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <TextContent
                content="This is a secret message that needs to be protected."
                maxLines={2}
              />
              <TextContent
                content="This is a secret message that needs to be protected."
                encrypted
                animated
                maxLines={2}
              />
              <div className="text-sm text-gray-400">
                Plain and encrypted versions
                <br />
                Configurable line limits
              </div>
            </CardContent>
          </Card>

          {/* Spinner */}
          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader>
              <CardTitle className="text-lg text-white">Spinner</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Spinner size="sm" color="emerald" label="Encrypting..." />
                <Spinner size="md" color="blue" label="Processing..." />
                <Spinner size="lg" color="purple" />
              </div>
              <div className="text-sm text-gray-400">
                Loading states with optional labels
                <br />
                Different colors and sizes
              </div>
            </CardContent>
          </Card>

          {/* URL Component */}
          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader>
              <CardTitle className="text-lg text-white">
                URL Component
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <UrlComponent
                path="/decrypt/abc123"
                fragment="encryption-key-here"
                highlightFragment={highlightFragment}
                animated
              />
              <Button
                onClick={() => setHighlightFragment(!highlightFragment)}
                size="sm"
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                Toggle Highlight
              </Button>
              <div className="text-sm text-gray-400">
                Shows URL with path and fragment
                <br />
                Highlight fragment option
              </div>
            </CardContent>
          </Card>

          {/* Cursor Pointer */}
          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader>
              <CardTitle className="text-lg text-white">
                Cursor Pointer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <CursorPointer
                  onTriggerClick={() => setClickCount((prev) => prev + 1)}
                />
                <span className="text-white">Clicks: {clickCount}</span>
              </div>
              <div className="text-sm text-gray-400">
                Interactive cursor with click animation
                <br />
                Auto-click option available
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat UI - Full Width */}
        <Card className="mt-6 border-gray-800 bg-gray-900/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">Chat UI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <ChatUI
                messages={sampleMessages}
                title="Untrusted Channel (SMS/Email)"
                className="max-w-md"
              />
            </div>
            <div className="mt-4 text-center text-sm text-gray-400">
              Accepts array of message components
              <br />
              Supports left/right alignment and highlighting
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
