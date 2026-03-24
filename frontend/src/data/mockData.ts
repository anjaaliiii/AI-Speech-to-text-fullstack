export interface TranscriptSegment {
  id: string;
  timestamp: string;
  speaker: string;
  text: string;
  startSeconds: number;
  sentiment?: string;
}

export const mockTranscript: TranscriptSegment[] = [
  { id: "1", timestamp: "00:00", speaker: "Alex Chen", text: "Good morning everyone. Let's kick off the quarterly product review. I want to start by looking at our roadmap progress and then move into the discussion around Q3 priorities.", startSeconds: 0, sentiment: "Organized" },
  { id: "2", timestamp: "00:15", speaker: "Sarah Kim", text: "Thanks Alex. I've prepared the metrics dashboard. Our user engagement is up 23% this quarter, and the new onboarding flow has reduced churn by about 12 percentage points.", startSeconds: 15, sentiment: "Confident" },
  { id: "3", timestamp: "00:38", speaker: "Alex Chen", text: "That's a solid improvement. Can you break down the engagement numbers by feature? I'm curious if the collaboration tools are driving most of that growth.", startSeconds: 38, sentiment: "Curious" },
  { id: "4", timestamp: "00:52", speaker: "Sarah Kim", text: "Absolutely. The real-time collaboration feature accounts for about 60% of the engagement lift. Document sharing is up 45%, and the new commenting system has been adopted by 78% of active teams.", startSeconds: 52, sentiment: "Enthusiastic" },
  { id: "5", timestamp: "01:15", speaker: "Marcus Johnson", text: "On the engineering side, we shipped 14 features this quarter against a target of 12. The API performance improvements reduced average response times by 40 milliseconds.", startSeconds: 75, sentiment: "Proud" },
  { id: "6", timestamp: "01:35", speaker: "Alex Chen", text: "That's excellent work from the team. What about the mobile experience? I've been hearing mixed feedback from the beta testers.", startSeconds: 95, sentiment: "Concerned" },
  { id: "7", timestamp: "01:52", speaker: "Marcus Johnson", text: "We identified three main pain points in the mobile app — navigation complexity, slow image loading, and the lack of offline support. We're addressing all three in the next sprint.", startSeconds: 112, sentiment: "Collaborative" },
  { id: "8", timestamp: "02:10", speaker: "Priya Patel", text: "From the design perspective, we've completed the accessibility audit. We found 17 issues, 12 of which are already resolved. The remaining five are scheduled for next week.", startSeconds: 130, sentiment: "Thorough" },
  { id: "9", timestamp: "02:30", speaker: "Sarah Kim", text: "One thing I want to flag is the customer support ticket volume. It's increased by 30% but mostly around the new features, which suggests adoption is high but documentation needs improvement.", startSeconds: 150, sentiment: "Analytical" },
  { id: "10", timestamp: "02:55", speaker: "Alex Chen", text: "Good point. Let's make documentation a priority for Q3. I'd also like to discuss the enterprise tier — we've had 8 inbound requests this month from companies with over 500 employees.", startSeconds: 175, sentiment: "Strategic" },
  { id: "11", timestamp: "03:18", speaker: "Marcus Johnson", text: "For the enterprise tier, we'll need to build out SSO integration, advanced permissions, and audit logging. I'd estimate about 6 weeks of engineering work with the current team.", startSeconds: 198, sentiment: "Pragmatic" },
  { id: "12", timestamp: "03:40", speaker: "Priya Patel", text: "I can have the enterprise dashboard mockups ready by end of next week. We should also consider a dedicated admin panel for managing team-wide settings and usage analytics.", startSeconds: 220, sentiment: "Collaborative" },
];

export const mockMeetings = [
  { id: "m1", title: "Q2 Product Review", date: "Mar 15, 2026", duration: "45 min", segments: 12 },
  { id: "m2", title: "Design Sprint Kickoff", date: "Mar 12, 2026", duration: "32 min", segments: 8 },
  { id: "m3", title: "Engineering Standup", date: "Mar 11, 2026", duration: "15 min", segments: 5 },
  { id: "m4", title: "Client Onboarding Call", date: "Mar 10, 2026", duration: "28 min", segments: 9 },
  { id: "m5", title: "Marketing Sync", date: "Mar 8, 2026", duration: "22 min", segments: 6 },
];
