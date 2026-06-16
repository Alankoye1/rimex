# Security Specification - Academic AI

This specification details the security invariants, threat vectors, and mock payloads to evaluate the security of the Firestore instance for Academic AI.

## 1. Data Invariants

- **User Profiles (`/users/{userId}`)**:
  - Only the authenticated user who owns the profile can read or write to it.
  - Users are strictly forbidden from self-assigning privileges (e.g. `role`, `isPro`).
  - Admins (identified securely by verified email `acadimecstaf2003@gmail.com`) have full access to view, query (list), and update user profiles (to manage `isPro` status).
  
- **App and Ad Configurations (`/config/{configId}`)**:
  - Publicly readable (anyone can load ads or contact info).
  - Strictly write-restricted to authenticated administrators (`isAdmin()`). Any attempt to alter this from regular clients must yield `PERMISSION_DENIED`.

- **Chats (`/chats/{chatId}`)** and **History (`/history/{historyId}`)**:
  - Strictly isolated to the owner of the session/item (`userId == request.auth.uid`). No other regular user can list, read, update, or delete resource data.

---

## 2. Threat Scenarios & Payload Audits

Here is the audit assessment of the "Dirty Dozen" attack vectors:

| Attack Scenario | Attack Payload | Expected Result | Protected By |
| --- | --- | --- | --- |
| **1. Privilege Escalation (Self-assign Pro)** | Create or update user profile with `isPro: true` | `PERMISSION_DENIED` | `isValidUser()` checks that `isPro` cannot be set initially, and regular update `hasOnly()` excludes `isPro`. |
| **2. Identity Spoofing (Write to another user)** | Auth UID: `Alice` -> Attempt write on `/users/Bob` | `PERMISSION_DENIED` | Checked via `isOwner(userId)` matching `request.auth.uid`. |
| **3. Privilege Escalation (Self-assign Admin)** | Create user profile with `role: 'admin'` | `PERMISSION_DENIED` | `isValidUser()` enforces `role == 'user'` (or omitting the field). |
| **4. Denial of Wallet (Giant Config ID)** | Write config doc with ID of size 1MB | `PERMISSION_DENIED` | Path variable checked against `isValidId()`. |
| **5. Resource Poisoning (Giant Text field)** | Write user profile with 10MB displayName | `PERMISSION_DENIED` | `displayName.size() <= 256` constraint. |
| **6. Spoofing Administrator** | Alter payload fields using client logic | `PERMISSION_DENIED` | Admin status is determined purely by verified email on server-side token (`request.auth.token.email`). |
| **7. Cross-Tenant Query Scraping** | Execute unbounded list query on `/users` | `PERMISSION_DENIED` | Regular users are blocked from listing `/users` collection. |
| **8. Unauthenticated Writes** | Write to `/users/any` without auth token | `PERMISSION_DENIED` | `isSignedIn()` global guard. |
| **9. Stale State Bypass** | Modify `createdAt` after profile creation | `PERMISSION_DENIED` | Profile updates enforce `incoming().createdAt == existing().createdAt`. |
| **10. Rogue Config Manipulation** | Unauthenticated write to `/config/ads` | `PERMISSION_DENIED` | Write restricted to authenticated validated admins. |
| **11. Spoofing verified email claims** | Log in with unverified email matching admin address | `PERMISSION_DENIED` | Rules strictly verify `request.auth.token.email_verified == true`. |
| **12. Ghost Fields (Shadow Update)** | Write to chat with undocumented fields | `PERMISSION_DENIED` | `hasOnly()` guards on update operations. |
