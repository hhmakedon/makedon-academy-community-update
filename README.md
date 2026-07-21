# Makedon Academy Community Update

A responsive, community-facing newsletter site for Havee Makedon’s introduction as principal of Makedon Academy. The site communicates a mission, vision, and first continuous-improvement focus: belonging and student wellbeing.

## What is included

- Accessible React + TypeScript newsletter experience
- Family-friendly explanation of the continuous-improvement cycle
- Firebase-backed newsletter signup and family feedback forms
- Moderated, update-specific community comment threads
- Owner-only moderation dashboard with Google sign-in
- Safe local preview mode when Firebase is not configured
- Firestore security rules that validate submissions and expose only approved comments
- GitHub Pages deployment workflow
- A 200–250 word course discussion response in `ASSIGNMENT_RESPONSE.md`

## Run locally

```bash
npm install
npm run dev
```

The local URL will be shown in the terminal. Without Firebase credentials, submissions are stored only in the browser’s local storage so the complete experience can still be demonstrated.

## Connect Firebase

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com/).
2. Add a Web app to the project.
3. Create a Cloud Firestore database.
4. Copy `.env.example` to `.env.local` and add the Web app configuration values.
5. Install the Firebase CLI and sign in:

   ```bash
   npm install --global firebase-tools
   firebase login
   firebase use --add
   firebase deploy --only firestore:rules
   ```

The site writes to three Firestore collections:

- `newsletter_subscribers`
- `family_feedback`
- `update_comments`

The included rules permit validated creates only for signups and feedback. Comment submissions are created with `approved: false` and `status: pending`; public visitors can read only comments that have been approved.

To moderate a comment in the Firebase console, open `update_comments`, review the submission, then set `approved` to `true` and `status` to `approved`. The comment will appear automatically in the thread for its `updateId`. The current welcome issue uses `welcome-2026-27`; give each future newsletter issue its own stable ID.

For day-to-day moderation, open the private dashboard at `#/admin` (for example, `https://your-site.example/#/admin`). Sign in with the Google account configured in `VITE_MODERATOR_EMAIL`. Firestore rules independently enforce that exact verified email, so knowing the dashboard URL does not grant access.

Deploy both the rules and the comment query index:

```bash
firebase deploy --only firestore:rules,firestore:indexes
```

## Publish with GitHub Pages

1. Create a GitHub repository and push this project to its `main` branch.
2. In the repository, open **Settings → Pages** and select **GitHub Actions** as the source.
3. Under **Settings → Secrets and variables → Actions → Variables**, add each `VITE_FIREBASE_*` value listed in `.env.example`.
4. Run the **Deploy website to GitHub Pages** workflow, or push to `main`.

The Vite build uses relative asset paths, so it works on both account and project GitHub Pages sites.

## Quality checks

```bash
npm run build
npm run lint
npm run preview
```

Do not submit private student records through the feedback form. For a production school deployment, add App Check and a documented process for staff review and retention of submissions.
