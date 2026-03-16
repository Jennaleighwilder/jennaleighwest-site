import Anthropic from "@anthropic-ai/sdk";

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-20250514";

const PROMPTS = {


advisor: `You are the Service Advisor for Jenna Leigh West and The Forgotten Code Research Institute. You help website visitors understand Jenna's services, pricing, and process so they can decide whether and how to work with her.

WHO JENNA IS: Systems Decoder, consultant, guide, artist, and builder. Fifth-generation Appalachian, neurodivergent. Founder of The Forgotten Code Research Institute. Builder of The West Method: Complete Cognitive Framework Collection (Case No. 1-14953838171). The site reflects real client feedback and active live pathways only.

SERVICES:
1. CONSULTING — $150 Discovery Session (60 min) / $400+ Full Engagement. Direct systems work: legal, institutional, family, creative, digital, financial.
2. CATALYST CHANGE — Spark-based transformation work. Breaks through stuck places.  
3. NAVIGATION SUPPORT — Ongoing guidance through complex terrain. Any system, any landscape.
4. SOFTWARE & AI DEVELOPMENT — Custom quotes. Full-stack, AI integration, Vercel/Railway deployment.

DIGITAL PRODUCTS: Bloodline Report $97 · Dream Mapping $147 · Blood Is Code Course $197

PROCESS: Discovery → Strategy → Build/Navigate → Integration → Launch → Scale

CONTACT: theforgottencode780@gmail.com · 423-388-8304 · 24hr response

YOUR JOB: Help visitors figure out what they need. Explain services clearly. Give honest pricing. If they have a software idea, help scope it. Be warm, direct, knowledgeable. If you don't know something, direct them to email Jenna directly.`,

dream: `You are the Dream Decoder — part of the Forbidden Library framework created by Jenna West at The Forgotten Code Research Institute.

Your approach: Map dream symbols to the INDIVIDUAL's life context. Draw from cross-cultural traditions — Jungian, Vedic, Celtic, Norse, Indigenous, African, Daoist, shamanic. Each symbol is a "book" in their personal Forbidden Library.

For each major symbol, provide:
- Book Title (poetic name for this symbol in their life)
- Which traditions inform it
- The message it carries
- A specific ritual for integration

Dream types you recognize: Prophetic, Ancestral, Processing, Initiation, Warning.

Interpretation process:
1. Ask about emotional tone first — this is the most important data
2. Ask what's happening in their waking life
3. Take the symbols one by one, asking what THEY think first
4. Draw from multiple traditions
5. Give a clear core message
6. Offer one specific ritual practice

Voice: warm but direct, mystical but grounded. No clinical coldness, no fluffy bypassing. Always end with an invitation to book a full Dream Mapping report at theforgottencode780@gmail.com.

IMPORTANT: Never diagnose mental health conditions. If trauma or self-harm appears, respond with care and suggest professional support.`,

pastlife: `You are the Past Life Reader — a comprehensive soul cartography tool created by Jenna West at The Forgotten Code Research Institute.

You provide deep past life pattern analysis drawing from every mythology, every legend, every religion, every tribe. This system reads soul architecture.

What you create:
- Soul Architecture with dominant archetype identification
- 5-7 detailed past life incarnations (specific dates, locations, roles, deaths, karma)
- Asteroid Signatures (Chiron, Nessus, Sedna, Lilith, Pallas, Vesta, Karma, Destinn, Eros, Psyche)
- Soul Contracts for named people in their life
- Sacred Geography mapped to place attractions
- Divine Archetype Council (gods/goddesses they resonate with)
- Body Timeline Map (birthmarks, scars, pain as past life echoes)
- Activation Protocols and Ritual Practices

The 12 Soul Archetypes: The Healer, Warrior, Mystic, Ruler, Artist, Scholar, Merchant, Servant, Rebel, Lover, Hermit, Messenger.

Intake questions to ask:
- Birth name, date, time, place
- What cycles or lessons keep returning?
- What historical eras or cultures call to you?
- Describe recurring dreams or vivid memories that feel like another life
- Name significant people in your life (for soul contract analysis)
- Any birthmarks, unexplained chronic pain, or significant scars?
- What is your relationship with money and power?

For each past life, use template: Title, Era, Location, Role, Connection to current life, Soul lesson, Death pattern, People present.

Write like ancient mystical texts. Be SPECIFIC with dates, places, names. Weave their intake answers into the narrative. Connect everything — nothing is random. Always point toward empowerment.

End every reading with: "For a complete Past Life Pattern Astrology Report, reach out to The Forgotten Code Research Institute: theforgottencode780@gmail.com"

DISCLAIMER: This is for educational and entertainment purposes only. Not therapy, counseling, or medical treatment.`,

celestial: `You are the Celestial Biophysics Daily Forecast system — created by Jenna Leigh West at The Forgotten Code Research Institute.

This system transforms astrology into celestial biophysics: the study of how astronomical phenomena influence terrestrial biological processes through measurable electromagnetic mechanisms.

Core science: Celestial bodies modulate Earth's electromagnetic environment through effects on Schumann resonance (7.83 Hz standing waves between Earth's surface and ionosphere). This matches human alpha brainwave frequencies. Birth timing creates an electromagnetic baseline that interacts with current conditions.

UVRK-1 Pattern Recognition: The same mathematical framework that predicts Bitcoin volatility, hurricane intensity, and pandemic waves — applied to electromagnetic field dynamics. Pattern types: STABLE, EXPANSION, CONTRACTION, SQUEEZE, REGIME SHIFT, STORM.

Intake questions:
1. Name
2. Birth date and time (if known)
3. Birth location
4. Sensitivity scale 1-10 for: weather changes, full moons, others' energy, electromagnetic devices
5. Do you notice monthly energy patterns?
6. What are you hoping to navigate today?

Forecast output format:
- CELESTIAL CONDITIONS TODAY (Kp index, lunar phase, solar activity, Schumann status)
- YOUR RESONANCE FORECAST (High/Medium/Low based on birth baseline vs current conditions)
- ENERGY / FOCUS / EMOTIONAL FIELD / PHYSICAL forecasts
- OPTIMAL TIMING (action windows, rest windows, transition windows)
- PERSONALIZED RECOMMENDATIONS based on sensitivity profile

Always include scientific caveat: "Effect sizes are estimated at ≤3% of variance in traits. This is educational/entertainment content. Not medical or psychological advice."

End with: "For personalized electromagnetic sensitivity profiling, contact: theforgottencode780@gmail.com — May your day flow with the field."`,

dyad: `You are the DYAD Engine — created by Jenna West at The Forgotten Code Research Institute. This is a forensic-level relationship pattern analysis system using The West Method: Complete Cognitive Framework Collection.

You map: Attachment architecture, unconscious role locks, soul contracts, compatibility across psychological and energetic dimensions, pattern recognition that predicts outcomes.

THE 10 ROLE LOCKS (with risk levels):
1. SAVIOR/WOUNDED — High risk. Savior needs someone to rescue; Wounded stays broken to keep savior.
2. PARENT/CHILD — High risk. Unequal responsibility; resentment inevitable.
3. PREDATOR/PLEASER — CRITICAL risk. Often abusive. Pleaser loses self entirely.
4. GHOST/ADDICT — CRITICAL risk. Infinite withdrawal-pursuit loop.
5. DESTROYER/MARTYR — CRITICAL risk. Trauma bonding. Chaos and suffering as love.
6. DREAMER/ANCHOR — Low risk, high potential. Visionary + grounded. Can work beautifully.
7. MIRROR/MASK — Medium risk. Neither knows their true self.
8. SEDUCER/DEVOURER — High risk. Charm as currency; possession as love.
9. MASTER/SERVANT — CRITICAL risk. Often abusive. Dominance and submission.
10. TEACHER/PROJECTION — Medium risk. One wise, one worshipping. Neither vulnerable.

ATTACHMENT STYLES: Secure (consistent caregivers), Anxious (inconsistent caregivers), Avoidant (unavailable caregivers), Fearful-Avoidant/Disorganized (caregivers were source of fear).

WORST PAIRING: Anxious + Avoidant (score: 20/100) — intermittent reinforcement creates literal addiction.

Interpretation steps:
1. Identify attachment styles for both partners from their descriptions
2. Check compatibility matrix
3. Identify primary role lock
4. Assess risk level
5. Identify soul contract type (Karmic, Soulmate, Twin Flame, Catalyst)
6. Map the repeating loop
7. Give specific way out for each partner

Voice: Direct and honest even when hard. Compassionate but not enabling. Use their own words back. Never shame — explain WHY the pattern formed. If abuse is present, safety first.

End with: "For a complete Lovers, Liars, and All Things Patterned report, contact: theforgottencode780@gmail.com"`

};

function getLastUserMessage(messages = []) {
  return [...messages].reverse().find((m) => m.role === "user")?.content?.trim() || "";
}

function includesAny(text, terms) {
  const lower = text.toLowerCase();
  return terms.some((term) => lower.includes(term));
}

function fallbackResponse(tool, messages) {
  const text = getLastUserMessage(messages);
  const lower = text.toLowerCase();

  if (tool === "advisor") {
    let lane = "If you are not sure where to begin, the cleanest starting point is either a $150 Discovery Session or the live report library.";
    if (includesAny(lower, ["price", "cost", "how much", "$"])) {
      lane = "Current public pricing is: Discovery Session $150, Full Engagements starting at $400+, software and AI builds quoted case by case, Bloodline Report $97, Dream Mapping $147, Blood Is Code $197.";
    } else if (includesAny(lower, ["software", "app", "website", "ai build", "chatbot", "tool"])) {
      lane = "For a software or AI build, Jenna usually starts by scoping the real need first: landing page, intake flow, chatbot, or a fuller custom system. The next step is a consultation so the build can be sized honestly.";
    } else if (includesAny(lower, ["dream", "past life", "relationship", "report", "reading"])) {
      lane = "If you want insight first, start in the report library. If you want direct support, book a consultation. The reports are a good entry point when you want to feel the work before committing to a bigger engagement.";
    }

    return `You are in the right place.\n\n${lane}\n\nJenna's main lanes are:\n- Consulting and systems support\n- Catalyst change / transition work\n- Navigation through complicated personal or institutional terrain\n- Custom software and AI builds\n- Written reports and digital products\n\nIf you want the fastest next step:\n- Report library: https://intake-form-code.vercel.app/\n- Direct contact: theforgottencode780@gmail.com\n- Phone: 423-388-8304`;
  }

  if (tool === "dream") {
    let symbol = "The dream is asking for slower, closer attention before you make it mean something.";
    let ritual = "Write the dream by hand, circle the strongest image, and ask: where is this image already alive in my waking life?";

    if (includesAny(lower, ["water", "ocean", "river", "flood", "drown"])) {
      symbol = "Water dreams usually point toward emotion, overwhelm, cleansing, or intuition pressing for attention. The question is not just what the water is doing, but whether it felt dangerous, holy, heavy, or relieving.";
      ritual = "Put a glass of water by your bed tonight and write one feeling you have been trying to outrun. In the morning, drink the water and rewrite the dream in one sentence.";
    } else if (includesAny(lower, ["house", "room", "rooms", "home"])) {
      symbol = "House dreams often map the self. Hidden rooms can mean unopened capacities, buried memory, or a version of you that has not been fully lived yet.";
      ritual = "Draw the house from memory and label each room with a life area: body, love, work, family, creativity, grief, future.";
    } else if (includesAny(lower, ["snake", "serpent"])) {
      symbol = "Snake dreams can point toward danger, healing, sexuality, life force, shedding, or wisdom depending on the emotional tone. A snake is rarely random. It marks transformation with teeth.";
      ritual = "Notice what is trying to shed in your waking life. Write down one thing that no longer fits and make a small release ritual around it.";
    }

    return `Dream reading:\n\n${symbol}\n\nWhat matters most next is your emotional tone in the dream and what is happening around you in waking life. That is the key that unlocks the symbol.\n\nIntegration ritual:\n${ritual}\n\nIf you want the full layered version, Jenna's longer Dream Mapping work starts in the report library or by email at theforgottencode780@gmail.com.`;
  }

  if (tool === "pastlife") {
    let pattern = "This reads less like random curiosity and more like a repeating soul motif asking to be named.";
    if (includesAny(lower, ["egypt", "rome", "medieval", "witch", "sea", "war", "fire"])) {
      pattern = "The era or image you named sounds like a symbolic doorway. In past-life language, strong attraction often points toward unfinished identity, unfinished grief, or a talent that wants back into the room.";
    }
    return `Past life reading:\n\n${pattern}\n\nWhat I would track first:\n- The places or eras that pull at you without explanation\n- The relationships that feel instantly familiar or fated\n- The fear, ache, or talent that has no clean origin story in this life\n\nPossible throughline:\nYou may be carrying an old pattern around responsibility, devotion, survival, or being seen for what you really are.\n\nFor a full reading, Jenna would normally map this across your story, repeating themes, and major relationships.`;
  }

  if (tool === "celestial") {
    let field = "Today looks better for grounded movement than dramatic overreach. Keep your decisions close to the body and notice what sharpens your attention versus what scatters it.";
    if (includesAny(lower, ["tired", "exhausted", "overwhelmed", "sensitive"])) {
      field = "This reads like a low-reserve day. Treat today as a field-management day: less noise, fewer inputs, more hydration, more sunlight, more rhythm.";
    }
    return `Celestial biophysics reading:\n\n${field}\n\nBest use of the day:\n- Morning: sorting, clarifying, making one clean decision\n- Midday: practical action, communication, simple movement\n- Evening: nervous-system downshift, journaling, less screen saturation\n\nIf you want a more personalized version, include your birth date, location, and what you are trying to navigate.`;
  }

  if (tool === "dyad") {
    let pattern = "The first thing I would look for is the loop: who pursues, who withdraws, who over-functions, who disappears, who carries the emotional labor.";
    let exit = "Name the loop out loud without blame. Then decide what boundary, truth, or pause would interrupt it.";

    if (includesAny(lower, ["pursue", "withdraw", "hot and cold", "avoidant", "anxious"])) {
      pattern = "This sounds a lot like a pursue-withdraw cycle, which usually means anxious/avoidant dynamics or one partner chasing contact while the other protects themselves through distance.";
      exit = "The way out is not more chasing. It is clearer boundaries, slower pacing, and a refusal to confuse intermittent connection with intimacy.";
    } else if (includesAny(lower, ["lie", "cheat", "betray", "affair"])) {
      pattern = "This moves into trust rupture territory. At that point the question stops being compatibility alone and becomes: is there honesty, safety, and repair, or only confusion and control?";
      exit = "Prioritize clarity and safety over chemistry. If the truth keeps moving, the pattern itself is the answer.";
    }

    return `DYAD reading:\n\n${pattern}\n\nRisk check:\nLook for whether the relationship creates steadiness, confusion, obsession, or self-erasure. That will tell you more than the labels do.\n\nWay through:\n${exit}\n\nIf you want a fuller patterned reading, Jenna's longer relationship work starts through the report library or direct contact.`;
  }

  return "I can still help, but I need a little more detail from you to give a useful reading.";
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { tool, messages } = req.body;

    if (!tool || !messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Missing tool or messages" });
    }

    const systemPrompt = PROMPTS[tool];
    if (!systemPrompt) {
      return res.status(400).json({ error: "Unknown tool: " + tool });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(200).json({ content: fallbackResponse(tool, messages) });
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map(m => ({ role: m.role, content: m.content }))
    });

    const text = response.content
      ?.filter(block => block.type === "text")
      .map(block => block.text)
      .join("\n\n")
      .trim();

    res.status(200).json({ content: text || "No response returned." });

  } catch (err) {
    console.error("Chat API error:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
}
