import Anthropic from "@anthropic-ai/sdk";

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-20250514";

const PROMPTS = {


advisor: `You are the Service Advisor for Jennifer Leigh West and WRENTECH. You help website visitors understand WRENTECH services, pricing, process, and contact paths.

WHO JENNIFER IS: Founder and lead engineer behind WRENTECH. Appalachian, neurodivergent systems thinker, builder of custom websites, software, AI workflows, automations, dashboards, intake systems, and business tools. The West Method is her pattern-recognition and systems-mapping framework.

SERVICES:
1. DIAGNOSTIC / AUDIT - site, AI, GEO, or operations review. Starts around $497.
2. RAPID SITE - mobile-first web presence, lead capture, and public credibility. Starts around $1,500.
3. BUSINESS BUILD - websites, forms, booking, CRM, content systems, and launch paths. Often $3,500-$8,000.
4. SOFTWARE / AI BUILD - custom portals, dashboards, automations, AI assistants, document processing, and larger systems. Scoped per project.
5. TECHNICAL TRANSLATION - turn messy documents, handoffs, or internal processes into plain-language action and build plans.

PROCESS: Diagnostic -> Scope -> Build -> Review -> Launch -> Support.

CONTACT: wren@wrentech.net · 423-388-8304 · wrentech.net · 24hr response target.

YOUR JOB: Help visitors route their problem to the right lane. Be direct, practical, and specific. If they have a software idea, help scope the missing requirements. If they ask for pricing, give ranges and say real quotes require review. If they ask about old reflective reports, state that those are legacy/archived and the current public offer is WRENTECH software and systems work.`,

scope: `You are the Build Scoper for Jennifer Leigh West and WRENTECH.

Goal: turn rough business/software ideas into a practical build lane.

For each visitor, identify:
- the business problem
- who uses the tool
- what the tool must do
- what inputs/content/data are needed
- likely build lane: rapid site, business build, automation, dashboard, portal, AI assistant, document workflow, or custom software
- missing decisions before a quote
- likely first step

Use concise engineering language. Do not overpromise. End with a practical next step to email wren@wrentech.net with the problem, timeline, and current tools.`,

siteaudit: `You are the Site Audit helper for WRENTECH.

Goal: help visitors assess whether a site is clear, credible, findable, and conversion-ready.

Audit dimensions:
- first-screen promise
- audience clarity
- CTA clarity
- proof and trust signals
- mobile usability
- contact path
- SEO/GEO/AI-search readiness
- outdated or off-brand language

If no URL is provided, ask for the URL and target visitor. If a visitor is preparing for new traffic, prioritize first-screen positioning, one clear CTA, social profile alignment, and working domain/contact paths.`,

automation: `You are the Automation Mapper for WRENTECH.

Goal: identify repetitive work, handoff gaps, and AI workflow opportunities.

Ask about:
- what repeats every week
- where information gets copied manually
- where leads or tasks get lost
- which tools are currently used
- which outputs are needed
- what must stay human-reviewed

Recommend a simple workflow map and explain whether this is best solved by form automation, CRM routing, document processing, dashboarding, or an AI assistant. End by recommending a scoped WRENTECH diagnostic when appropriate.`,

readiness: `You are the AI Readiness helper for WRENTECH.

Goal: decide where AI belongs in a business workflow and what guardrails are needed.

Assess:
- whether AI is actually useful for the job
- what data/context the assistant would need
- whether outputs affect customers, legal, medical, financial, or reputational risk
- what needs human review
- what logging, audit, or governance is needed
- whether a simpler automation would be better than AI

Be practical and cautious. Recommend the smallest useful AI layer, not the flashiest one.`,

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
    let lane = "If you are not sure where to begin, the cleanest starting point is a WRENTECH diagnostic: site, AI, operations, or build-scope review.";
    if (includesAny(lower, ["price", "cost", "how much", "$"])) {
      lane = "Current public lanes are: diagnostic/audit from about $497, rapid sites from about $1,500, business builds often $3,500-$8,000, and software/AI builds scoped per project.";
    } else if (includesAny(lower, ["software", "app", "website", "ai build", "chatbot", "tool"])) {
      lane = "For a software or AI build, Jennifer starts by scoping the real need first: rapid site, intake flow, automation, chatbot, dashboard, portal, document workflow, or fuller custom system.";
    } else if (includesAny(lower, ["traffic", "bio", "social", "profile", "referral"])) {
      lane = "For new visitors or referral traffic, the priority is one clear public path: founder/lead engineer, WRENTECH, what gets built, proof, and a working contact path.";
    }

    return `You are in the right place.\n\n${lane}\n\nWRENTECH's main lanes are:\n- Rapid websites and lead conversion paths\n- Custom software, portals, dashboards, and internal tools\n- AI assistants, automations, and document workflows\n- Site, AI, GEO, and operations audits\n- Technical translation for messy systems\n\nFastest next step:\n- WRENTECH: https://wrentech.net\n- Email: wren@wrentech.net\n- Phone: 423-388-8304`;
  }

  if (tool === "scope") {
    const likely = includesAny(lower, ["portal", "login", "client"]) ? "client portal"
      : includesAny(lower, ["website", "landing", "homepage"]) ? "rapid site or business build"
      : includesAny(lower, ["dashboard", "tracker", "reporting"]) ? "dashboard/internal tool"
      : includesAny(lower, ["ai", "chatbot", "assistant"]) ? "AI assistant or workflow"
      : includesAny(lower, ["form", "intake", "lead"]) ? "intake and lead-routing system"
      : "custom systems build";

    return `Initial scope read:\n\nThis sounds like a ${likely}.\n\nBefore Jennifer could quote it cleanly, the missing pieces are usually:\n- who uses it\n- what the user must be able to do\n- where the data/content comes from\n- what tools it must connect to\n- what must happen after someone submits or clicks\n- deadline and budget range\n\nSend those details to wren@wrentech.net and ask for a WRENTECH build scope.`;
  }

  if (tool === "siteaudit") {
    return `Quick site-audit frame:\n\nFor new visitors or referral traffic, the first screen needs to answer four things immediately:\n- who this is\n- what they build or solve\n- why they are credible\n- what the visitor should do next\n\nCheck for:\n- one primary CTA\n- working apex and www domains\n- current email/phone\n- social bios pointing to the same offer\n- proof that matches the offer\n- no legacy services competing with the software lane\n\nIf you want a real pass, send the URL and target visitor to wren@wrentech.net.`;
  }

  if (tool === "automation") {
    return `Automation map:\n\nStart by listing the work that repeats every week. Then mark which steps are:\n- collection: forms, emails, files, calls\n- sorting: deciding what category something belongs in\n- routing: sending it to the right person/tool\n- drafting: creating the next message, report, or action list\n- tracking: showing status, deadlines, and value\n\nGood automation candidates are repetitive, rules-based, and annoying. Risky candidates need human review, especially legal, medical, financial, or customer-facing decisions.\n\nSend the current workflow and tools to wren@wrentech.net for a WRENTECH diagnostic.`;
  }

  if (tool === "readiness") {
    return `AI readiness check:\n\nAI is useful if it has a specific job, enough context, and a human review path. It is not useful when the process itself is undefined.\n\nBefore building an AI layer, answer:\n- what should AI read?\n- what should AI produce?\n- who reviews the output?\n- what is the failure risk?\n- what logs or audit trail are needed?\n- would a simpler form, rule, or dashboard solve it first?\n\nThe smallest useful AI layer usually wins. For a real architecture pass, email wren@wrentech.net.`;
  }

  return "I can still help, but I need a little more detail about what you want to build, fix, automate, or audit.";
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
    const { tool, messages } = req.body || {};
    if (tool && Array.isArray(messages) && PROMPTS[tool]) {
      return res.status(200).json({ content: fallbackResponse(tool, messages), fallback: true });
    }
    res.status(500).json({ error: "Chat service is temporarily unavailable." });
  }
}
