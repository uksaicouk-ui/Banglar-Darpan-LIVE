---
name: Clerk authentication
description: Durable auth architecture and environment behavior for Banglar Darpan.
---

Use Replit-managed Clerk for the Banglar Darpan web app. The browser uses Clerk's cookie-based session transport; do not add bearer-token handling to web requests. The API server mounts the Clerk proxy before body parsing and uses Clerk middleware before API routes. Sign-in and sign-up are dedicated path routes with branded appearance and a custom logo.

**Why:** Replit provisions separate development and production Clerk environments and supplies the publishable/secret keys automatically, while the app's web API calls remain same-origin.

**How to apply:** Keep the public viewer accessible, protect the admin control room with Clerk session state, and preserve full base-prefixed `/sign-in/*?` and `/sign-up/*?` route patterns when changing routing.