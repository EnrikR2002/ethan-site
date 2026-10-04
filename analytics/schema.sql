CREATE TABLE IF NOT EXISTS funnel_events (
  event_id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  occurred_at TEXT NOT NULL,
  event TEXT NOT NULL,
  page TEXT NOT NULL,
  destination TEXT NOT NULL,
  placement TEXT NOT NULL,
  source TEXT NOT NULL,
  device TEXT NOT NULL,
  study TEXT NOT NULL,
  received_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS funnel_session_received ON funnel_events(session_id,received_at);
CREATE INDEX IF NOT EXISTS funnel_received ON funnel_events(received_at,event_id);
CREATE INDEX IF NOT EXISTS funnel_occurred ON funnel_events(occurred_at);
CREATE TRIGGER IF NOT EXISTS funnel_retention AFTER INSERT ON funnel_events BEGIN
  DELETE FROM funnel_events WHERE received_at < strftime('%Y-%m-%dT%H:%M:%fZ','now','-90 days');
END;
