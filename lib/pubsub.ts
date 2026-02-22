type EdgeEvent = { lotId: string; externalSpotRef: string; occupied: boolean; ts?: string };

export async function publishEdgeEvent(evt: EdgeEvent) {
  if (process.env.PUBSUB_ENABLED !== "true") return;

  // Optional: add @google-cloud/pubsub and implement publishing.
  // This stub keeps the repo deployable even without that dependency.
  // When ready:
  // 1) npm i @google-cloud/pubsub
  // 2) Create a topic (PUBSUB_TOPIC_EDGE_EVENTS)
  // 3) Publish JSON messages to the topic for downstream processors (analytics, pricing agent, alerts, etc.)
  console.log("[PUBSUB] Would publish:", JSON.stringify(evt));
}
