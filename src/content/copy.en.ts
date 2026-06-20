// ---------------------------------------------------------------------------
// Copy Bank (English). Conversational, sentence case, active voice, no jargon.
// Errors/empty states are directive, not apologetic. (plan.md §12)
// All on-screen strings live here so a Hindi file can drop in later.
// ---------------------------------------------------------------------------

import type { MotivationType, UrgencyBand } from '../app/types'

export const copy = {
  appName: 'Kal Nahi, Aaj',
  tagline: 'Not tomorrow, today.',

  common: {
    continue: 'Continue',
    back: 'Back',
    skip: 'Skip',
    gotIt: 'Got it',
    notADiagnosis: "This isn't a diagnosis — it's a nudge to get the right person to look.",
    privacyLine: 'Nothing leaves your phone.',
  },

  welcome: {
    title: 'Something on your mind about your health?',
    sub: "Let's take a quiet, private look — about 2 minutes.",
    cta: 'Start',
    finePrint: 'No account. Nothing leaves your phone.',
    // Returning greeting (10.1) — warm + specific, remembered only on this device.
    returning: (lastConcern: string, when?: string) =>
      `Welcome back. You took a brave step ${when ? when + ' ' : ''}about ${lastConcern}. How are you feeling today?`,
    returningSub: 'Picking up only on this phone — your circle and your last plan are still here.',
    returningCta: 'Start today’s check-in',
    clearData: 'Start fresh',
    clearConfirmQ: 'Clear everything saved on this phone?',
    clearConfirmYes: 'Yes, clear it',
    clearConfirmNo: 'Keep it',
    clearNote: 'This only affects this device — nothing was ever uploaded.',
  },

  // Scroll-animated landing sections (first-time home page). The Start CTA stays
  // sticky; these reveal as you scroll. (Phase 3)
  landing: {
    heroEyebrow: 'A quiet health companion',
    heroTitle: 'Something on your mind about your health?',
    heroSub: 'A private space to turn that quiet worry into one small, doable step. About two minutes.',
    scrollCue: 'See how it works',
    insight: {
      eyebrow: 'The real barrier',
      title: 'Most people don’t skip care because they can’t reach it.',
      body: 'They skip it because something inside whispers “it’s probably nothing.” This is a space made for exactly that moment.',
    },
    promise: {
      eyebrow: 'A quiet promise',
      title: 'Private, the whole way through.',
      // points reused from `privacy.points`
    },
    goal: {
      eyebrow: 'What we do',
      title: 'We turn hesitation into one small step.',
      body: 'A calm walk in six gentle beats — never a lecture, never a dead end.',
    },
    barriers: {
      eyebrow: 'Whatever’s holding you back',
      title: 'We meet it gently — not with pressure.',
      items: ['Fear of the result', 'What people think', '“I’ll be fine”', 'The cost', 'No time', 'Just not sure'],
    },
    closer: {
      title: 'Ready when you are.',
      body: 'No account. Nothing leaves your phone. Two quiet minutes.',
    },
  },

  privacy: {
    // Kept: `points` is reused by the landing "promise" section.
    points: [
      { title: 'Anonymous', body: 'No name, no number, no sign-up.' },
      { title: 'No login', body: 'You just start. Nothing to remember.' },
      { title: "You're in control", body: 'Everything stays on this phone. You can clear it anytime.' },
    ],
  },

  motivation: {
    title: 'Before we start —',
    question: 'Who or what do you most want to stay healthy for?',
    helper: 'Pick whoever comes to mind first. There is no wrong answer.',
    photoCta: 'Use a photo',
    photoChange: 'Change photo',
    photoRemove: 'Use an illustration instead',
    photoNote: 'Your photo stays on this phone — it’s never uploaded.',
    photoFallbackLabel: 'the people I love',
    cta: 'Continue',
  },

  reflection: {
    // One warm, identity-congruent line per choice.
    lines: {
      kids: 'Looking after yourself is one of the strongest things you can do for them.',
      parents: 'Staying well is how you keep showing up for the people who raised you.',
      partner: "The strongest thing you can do for them is make sure you're around.",
      self: 'Choosing yourself today is strength, not selfishness.',
      work: "You can't pour from an empty cup. Caring for yourself protects everything you're building.",
      other: 'Taking care of yourself ripples out to everyone who counts on you.',
    } satisfies Record<MotivationType, string>,
    cta: 'Continue',
  },

  // Masculinity-aware copy bank (10.3) — reframe care as strength / protection,
  // identity-congruent rather than lecturing, and universal enough for everyone.
  // Surfaced at the Affirm, Understand, and Act moments. A "self/work" variant
  // avoids the odd "for them" phrasing when the person is their own motivation.
  strength: {
    reflection: (t: MotivationType) =>
      t === 'self' || t === 'work'
        ? 'Looking after yourself isn’t weakness — it’s how you keep going.'
        : 'You service your bike before it breaks down. Do the same for yourself.',
    understand: (t: MotivationType) =>
      t === 'self' || t === 'work'
        ? 'This isn’t about being sick. It’s about being there for your own life.'
        : 'This isn’t about being sick. It’s about staying the person they count on.',
    act: (t: MotivationType) =>
      t === 'self' || t === 'work'
        ? 'Booking this is you backing yourself — that’s strength.'
        : 'Booking this is how you stay the one they rely on.',
  },

  concern: {
    title: "What's on your mind?",
    sub: 'Say it however feels natural. Tap a part of the body, type, or speak.',
    bodyHeading: 'Where is it?',
    textHeading: 'Or tell us in your own words',
    textPlaceholder: "e.g. a tightness in my chest when I climb stairs",
    moodTile: 'I just feel off / low / tired',
    cta: 'Continue',
    skipText: 'I’m not sure how to describe it',
    // Voice input (Web Speech API)
    listening: 'Listening… just talk, in any language you like.',
    listeningHint: 'Listening… tap the square to stop.',
    voiceNote: 'Tap the mic to speak instead. Voice uses your browser’s speech service.',
  },

  followups: {
    progress: ['A couple of gentle questions.', 'Almost done.', 'Last one.'],
    interstitial: 'Thanks — that helps.',
    questions: [
      {
        id: 'duration',
        prompt: 'How long has this been going on?',
        options: ['Just today', 'A few days', 'A couple of weeks', 'A month or more'],
      },
      {
        id: 'severity',
        prompt: 'How much is it bothering you?',
        options: ['Barely', 'A little', 'Quite a bit', "It's hard to ignore"],
      },
      {
        id: 'change',
        prompt: 'Is it getting worse, or about the same?',
        options: ['Getting better', 'About the same', 'Getting worse'],
      },
    ],
    cta: 'See what this might mean',
  },

  understand: {
    overlay: "You're doing this for them. Let's take the next step.",
    bands: {
      'when-you-can': {
        label: 'Good to check when you can',
        why: 'Nothing here points to an emergency. A relaxed check-up will put your mind at ease.',
      },
      soon: {
        label: 'Worth a check soon',
        why: "What you described is worth a proper look in the next few days — not urgent, but don't let it drift.",
      },
      today: {
        label: 'Best to see someone today',
        why: "A few of your answers are worth getting looked at promptly. Today, if you can.",
      },
    } satisfies Record<UrgencyBand, { label: string; why: string }>,
    disclaimer: "This isn't a diagnosis — it's a nudge to get the right person to look.",
    cta: 'What I can do about it',
  },

  reassure: {
    title: "You're not overreacting.",
    body: 'Most people who checked a concern like this said they felt relieved afterwards — whatever the result.',
    sub: 'Asking is the strong move, not the anxious one.',
    cta: 'Show me one easy step',
  },

  nextStep: {
    title: 'One easy next step.',
    sub: 'Pick whatever feels lightest. Each one ends with a real person.',
    notReady: 'Not ready yet?',
    cta: 'Continue',
  },

  plan: {
    title: "Let's make it stick.",
    sub: 'A plan tied to something you already do is far more likely to happen.',
    cueHeading: 'When works?',
    cues: [
      'After I drop the kids tomorrow',
      'After dinner tonight',
      'Saturday morning',
      'On my lunch break',
    ],
    timeHeading: 'Around what time?',
    line: (cue: string, time: string) =>
      `${cue}, around ${time}. A 2-minute call — that's all.`,
    reminderHeading: 'Want a nudge?',
    addToCalendar: 'Add to calendar',
    addedToCalendar: 'Added — check your downloads',
    remindHere: 'Remind me here',
    remindHereSet: 'Okay — I’ll ping you while this stays open.',
    // (former placeholder note removed — reminders are real now)
    notifBlocked: 'Notifications are blocked in your browser. The calendar event still works.',
    notifUnsupported: 'This browser can’t do in-app reminders — use the calendar.',
    reminderHonest: 'The calendar works even when this app is closed. The in-app ping only works while this tab is open.',
    icsSummary: 'My 2-minute health call',
    pingTitle: 'Kal Nahi, Aaj',
    pingBody: (time: string) =>
      `It’s almost ${time}. You promised yourself a 2-minute call — you’ve got this.`,
    cta: "That's my plan",
  },

  careCircle: {
    title: 'Who’s in your corner?',
    sub: 'Add the people you’re staying well for. You can nudge them to check in too — caring goes both ways.',
    privacyNote: 'They live only on this phone. Nothing is shared unless you tap to send it.',
    addCta: 'Add someone',
    namePlaceholder: 'Their name or nickname',
    relationHeading: 'Who are they to you?',
    relations: {
      parent: 'Parent',
      partner: 'Partner',
      friend: 'Friend',
      sibling: 'Sibling',
      child: 'Child',
      other: 'Someone else',
    },
    save: 'Add to my circle',
    cancel: 'Cancel',
    statusNone: 'Not checked in yet',
    statusNudged: 'You sent them a nudge',
    statusCheckedIn: 'Checked in ✓',
    remind: 'Remind them',
    markCheckedIn: 'Mark as checked in',
    // The caring nudge message ({link} replaced with the app URL)
    nudgeMessage: (name: string, link: string) =>
      `Hey ${name}, take 2 minutes for yourself today — I just did a quick, private health check-in and thought of you. Want to do it too? ${link}`,
    syncNote: 'Seeing when they actually check in (on their own phone) is coming with a future update.',
    continueCta: 'Continue',
    skip: 'Skip — just me for now',
  },

  confirmation: {
    title: 'You took the first step.',
    body: (forWhom: string) => `That took courage. You've planned this — for ${forWhom}, and for you.`,
    bodyNoMotivation: "That took courage. You've planned this — for you.",
    progressNote: 'One small step, done.',
    shareHeading: 'Let someone know?',
    shareSub: 'A quiet word can mean a lot — and might nudge them to look after themselves too.',
    shareCta: 'Share that I took my step',
    shareMessage: (link: string) =>
      `I just took a small step for my health today. It felt good. If you’ve been putting something off, maybe take 2 private minutes too: ${link}`,
    cta: 'See what happens later',
  },

  followuplater: {
    title: 'Later, a gentle check-in.',
    sub: 'No nagging. Just one warm nudge when your time comes around.',
    previewCta: 'Show me what the reminder looks like',
    reminderTitle: "It's almost time.",
    reminderBody: 'You promised yourself a 2-minute call. Here is the number — you’ve got this.',
    howDidItGo: 'How did it go?',
    options: ['I went ✓', "Couldn't make it", 'Rescheduling'],
    doneTitle: 'Proud of you.',
    doneBody: 'Whatever the result, you showed up for yourself. That is the whole point.',
    restart: 'Start over',
  },

  redFlag: {
    title: 'Worth looking at right away — not tomorrow.',
    body: "Some of what you've described is best checked promptly by a real person. This app doesn't diagnose, but it won't sit on something that might matter.",
    actions: [
      { id: 'emergency', label: 'Call emergency (112)', note: 'Free · 24×7' },
      { id: 'hospital', label: 'Nearest hospital', note: 'Opens maps' },
      { id: 'doctor', label: 'Talk to a doctor now', note: 'Teleconsult' },
    ],
    disclaimer: "This app doesn't diagnose. When in doubt, get a real person to look.",
    back: 'Back to my answers',
  },

  notReady: {
    title: "That's okay. The door stays open.",
    sub: 'No pressure, no guilt. Pick whatever feels right.',
    options: [
      { id: 'save', title: 'Save this and remind me later', body: 'We’ll keep your spot, only on this phone.' },
      { id: 'expect', title: 'Read what to expect', body: 'A quick, calm idea of how a check-up goes.' },
      { id: 'callback', title: 'Just get a callback', body: 'A health worker reaches out. You don’t make the first move.' },
    ],
    back: 'Actually, show me the steps',
  },
} as const

export type Copy = typeof copy
