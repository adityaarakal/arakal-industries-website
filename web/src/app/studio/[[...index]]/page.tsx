"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
  // Only render studio if projectId is configured
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Sanity Studio</h1>
          <p className="text-muted-foreground">
            Please configure NEXT_PUBLIC_SANITY_PROJECT_ID in your environment variables to access
            Sanity Studio.
          </p>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
