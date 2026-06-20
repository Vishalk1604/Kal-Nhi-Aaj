<div align="center">

# Kal Nahi, Aaj
### *Not tomorrow, today.*

A warm, private health companion that turns hesitation into one small, doable step.

![React](https://img.shields.io/badge/React-18-149ECA?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?logo=framer&logoColor=white)

Built for **DesignVerse 2026**

</div>

---

## The problem

In India, most people don't skip healthcare because they *can't* reach it — hospitals, clinics, and teleconsults are widely available. They skip it because **something inside stops them.** Health-seeking-behaviour research points to the same culprits again and again:

- **Minimization is the #1 barrier** — the most common reason people give for delaying care is simply that they *didn't think it was serious* (~48%), ahead of cost (~33%) and access (~13%). The dominant inner voice is *"it's probably nothing, it'll pass."*
- **Stigma** turns seeking help into a perceived admission of weakness.
- **Masculinity norms** — a large share of men put off care as long as possible, avoiding the information itself.
- **Cost, time, and plain uncertainty** quietly do the rest.

**Kal Nahi, Aaj** is built for exactly that moment of hesitation.

## The solution

A calm, no-login journey the person completes in about two minutes — six gentle phases, each with a clear emotional job:

| Phase | What happens |
|-------|--------------|
| **Enter** | A private, judgment-free start. No account, nothing leaves the device. |
| **Affirm** | *Before* any health question, you choose **who or what you're protecting** — a values moment that lowers defensiveness and plants motivation. |
| **Share** | You say what's on your mind, gently, one question at a time. |
| **Understand** | A calm, calibrated read of *urgency* — explicitly **not a diagnosis** — over the people you love. |
| **Act** | One frictionless next step that always ends with a real person, with cost shown up front. |
| **Follow up** | A warm "you took the first step," then one gentle nudge later — never nagging. |

A **red-flag branch** routes anything urgent straight to real care, and a **"not ready yet"** path keeps hesitant users from being lost.

## ✨ The signature moment

When you begin, you pick **who you're protecting** — an illustrated avatar or a photo from your gallery (kept entirely on-device). At the pivotal *"is this worth checking?"* moment, that choice reappears **softly blurred** behind a single line:

> *"You're doing this for them. Let's take the next step."*

It's the emotional core of the product — the motivation you started with becomes the reason to act, and returns in focus when you do.

## Why it works (research-grounded)

Every screen maps to an evidence-based behaviour-change lever:

- **Self-affirmation before threat** — reflecting on personal values *first* reduces defensive processing of scary health information. *(This is why Affirm comes before Share.)*
- **Implementation intentions** — cue-linked "if-then" plans (*"after I drop the kids, I'll call at 9:15"*) reliably convert intention into action.
- **Identity-congruent reframing** — framing care as strength and protecting others aligns with a provider identity instead of threatening it.
- **Trusted, warm handoff** — modelled on India's ASHA program, every path ends with a human, never a dead-end info screen.
- **Anonymity reduces stigma** — fully local, no login.
- **Moderate, never high, threat** — high-fear messaging backfires, so the urgency read stays gentle by design.

Two rules the research is loud about, which shaped the whole build: **information alone changes nothing**, and **low engagement is how health apps die.** So the flow stays short, warm, personal — and always leads to a concrete action.

## Features

- 🔒 **No login, fully on-device** — everything persists in `localStorage`; a clear "start fresh" option wipes it.
- 🖼️ **The blur signature** — your chosen photo/avatar, blurred behind the pivotal moment, in focus at the finish.
- 💬 **Gentle, plain-language flow** — one question per screen, with optional **voice input** for low literacy.
- 📅 **Real reminders** — an if-then plan that downloads a working `.ics` calendar event.
- 🤝 **Care circle** — optionally nudge someone in your corner via a pre-filled share message.
- ↩️ **Returning greeting** — comes back on the same device with a warm, specific welcome.
- 🎨 **Warm, un-clinical design** — a "safe room at dawn" palette, rounded type, soft motion, and `prefers-reduced-motion` support.

## Tech stack

- **React 18 + Vite + TypeScript** — a fast, single guided flow; no backend needed.
- **Tailwind CSS** — custom warm design tokens.
- **Framer Motion** — gentle screen transitions, scroll-driven storytelling, micro-interactions.
- **lucide-react** — clean, friendly icons.
- **State** — a single `useJourney` hook (React context + reducer) backed by `localStorage`. Navigation is state-driven (no router).

## Getting started

> Requires **Node.js 18+**.

```bash
# install dependencies
npm install

# start the dev server (http://localhost:5173)
npm run dev

# production build
npm run build

# preview the production build locally
npm run preview
```

The app is designed mobile-first (390 × 844 baseline) and renders inside a phone frame on larger screens.

## Project structure

```
src/
  app/          state, reducer, localStorage sync, flow logic
  screens/      the guided journey, one file per screen + branches
  components/   PhoneFrame, ScreenShell, buttons, the blur signature, etc.
  content/      copy, urgency & red-flag heuristics, next-step options
  lib/          storage, .ics builder, notifications, image downscaling
  styles/       design tokens
```

## Accessibility

Large tap targets (≥48px), visible focus rings, sufficient contrast, alt text and `aria-label`s, reduced-motion support, optional voice input, and copy structured so a Hindi translation can drop in.

## ⚠️ Disclaimer

This is **not a medical or diagnostic tool.** The urgency bands are a gentle *nudge*, not advice, and the red-flag heuristics are intentionally conservative and **illustrative** — for any real-world use they must be reviewed by a qualified clinician. When in doubt, the app escalates to "see someone."

---

<div align="center">

*Spend your boldness on the moment that matters. Keep everything else quiet, warm, and kind.*

</div>
