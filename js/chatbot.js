/* ==========================================================================
   Bikee Prajapati — Portfolio Chat Assistant
   A scripted, keyword-matched FAQ bot. No API, no backend, no data leaves
   the browser. Answers are fixed strings selected by simple keyword rules.
   ========================================================================== */

(function () {
  const toggle = document.getElementById('chatToggle');
  const panel = document.getElementById('chatPanel');
  const closeBtn = document.getElementById('chatClose');
  const messagesEl = document.getElementById('chatMessages');
  const suggestionsEl = document.getElementById('chatSuggestions');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');

  if (!toggle || !panel) return;

  // ---- FAQ knowledge base -------------------------------------------------
  // Each entry: keywords to match against the user's message, and the reply.
  // Order matters — first match wins, so more specific entries go first.
  const FAQ = [
    {
      keywords: ['lms', 'learning management', 'course platform'],
      reply: "The Dev Weekends LMS is a full-stack learning platform: admins publish video courses, students browse, purchase, and learn, with Q&amp;A threads, reviews, real-time notifications, and an analytics dashboard. Built with Next.js, Express, MongoDB, and Stripe.<br><br>Live app: <a href=\"https://lms-platform-two-psi.vercel.app\" target=\"_blank\" rel=\"noopener\">lms-platform-two-psi.vercel.app</a>"
    },
    {
      keywords: ['docmind', 'rag', 'pdf chatbot', 'chatbot project'],
      reply: "DocMind is a RAG chatbot for PDFs, built from scratch without LangChain so every part of the retrieval pipeline is understood, not just wired together. PyMuPDF for parsing, FAISS for vector search, Mistral for generation.<br><br>Live demo: <a href=\"https://huggingface.co/spaces/Vickypy/docmind-pdf-chatbot\" target=\"_blank\" rel=\"noopener\">HuggingFace Spaces</a>"
    },
    {
      keywords: ['shopo', 'ecommerce', 'e-commerce', 'marketplace', 'multivendor'],
      reply: "ShopO is a multivendor marketplace with three roles (buyers, sellers, admins), supporting event listings, discount coupons, real-time chat, order lifecycle management, and Stripe/PayPal payments.<br><br>Frontend: <a href=\"https://multivendor-mern-ashy.vercel.app\" target=\"_blank\" rel=\"noopener\">multivendor-mern-ashy.vercel.app</a><br>Note: the backend runs on Render's free tier, so it may take up to a minute to wake up if it's been idle."
    },
    {
      keywords: ['readme', 'generator'],
      reply: "The AI-Powered README Generator reads a public GitHub repo's structure and writes a professional README automatically, using Flan-T5 and Mistral through a LangChain pipeline.<br><br>Source: <a href=\"https://github.com/bikeeprajapati/readme-generator\" target=\"_blank\" rel=\"noopener\">github.com/bikeeprajapati/readme-generator</a>"
    },
    {
      keywords: ['project', 'projects', 'work', 'built', 'portfolio'],
      reply: "Bikee's top projects here are the Dev Weekends LMS, DocMind (a RAG PDF chatbot), ShopO (a multivendor marketplace), and an AI-powered README generator. Ask me about any of them by name, or scroll to the Work section."
    },
    {
      keywords: ['stack', 'tech', 'technology', 'skills', 'languages'],
      reply: "The stack spans full-stack (Next.js, React, Express, MongoDB), AI/ML (FAISS, HuggingFace, Mistral, Scikit-learn), and DevOps (Docker, GitHub Actions, GCP Cloud Run). Full breakdown is in the About section."
    },
    {
      keywords: ['resume', 'résumé', 'cv'],
      reply: "You can download the résumé as a PDF from the Résumé section, or just <a href=\"resume.pdf\" download>click here</a>."
    },
    {
      keywords: ['contact', 'email', 'reach', 'hire', 'linkedin', 'github'],
      reply: "You can reach Bikee at <a href=\"mailto:workwithbikee@gmail.com\">workwithbikee@gmail.com</a>, or through <a href=\"https://github.com/bikeeprajapati\" target=\"_blank\" rel=\"noopener\">GitHub</a> and <a href=\"https://www.linkedin.com/in/bikee-prajapati9898/\" target=\"_blank\" rel=\"noopener\">LinkedIn</a>."
    },
    {
      keywords: ['who', 'about you', 'bikee', 'background'],
      reply: "Bikee Prajapati is a full-stack developer and AI/ML engineer based in Kathmandu, Nepal, currently a Dev Weekends Fellowship mentee and actively applying for AI/ML engineering roles."
    },
    {
      keywords: ['location', 'based', 'nepal', 'kathmandu', 'where'],
      reply: "Bikee is based in Kathmandu, Nepal."
    },
    {
      keywords: ['hi', 'hello', 'hey'],
      reply: "Hey! Ask me about any of the projects, the tech stack, or how to get in touch."
    },
  ];

  const FALLBACK = "I don't have a scripted answer for that one. Try asking about a specific project (LMS, DocMind, ShopO, README Generator), the tech stack, or how to reach Bikee directly.";

  const SUGGESTIONS = [
    'Tell me about the LMS project',
    'What tech stack is used?',
    'How do I download the résumé?',
    'How do I contact Bikee?'
  ];

  function matchReply(text) {
    const lower = text.toLowerCase();
    for (const entry of FAQ) {
      if (entry.keywords.some(k => lower.includes(k))) {
        return entry.reply;
      }
    }
    return FALLBACK;
  }

  function addMessage(html, sender) {
    const el = document.createElement('div');
    el.className = 'chat-msg ' + sender;
    el.innerHTML = html;
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return el;
  }

  function showTyping() {
    const el = document.createElement('div');
    el.className = 'chat-typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return el;
  }

  function respondTo(userText) {
    hideSuggestions();
    addMessage(userText.replace(/</g, '&lt;'), 'user');
    input.value = '';
    const typingEl = showTyping();
    const delay = 500 + Math.random() * 500;
    setTimeout(() => {
      typingEl.remove();
      const reply = matchReply(userText);
      addMessage(reply, 'bot');
    }, delay);
  }

  function renderSuggestions() {
    suggestionsEl.innerHTML = '';
    suggestionsEl.hidden = false;
    SUGGESTIONS.forEach(text => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chat-chip';
      chip.textContent = text;
      chip.addEventListener('click', () => respondTo(text));
      suggestionsEl.appendChild(chip);
    });
  }

  function hideSuggestions() {
    suggestionsEl.hidden = true;
    suggestionsEl.innerHTML = '';
  }

  let initialized = false;
  function openChat() {
    panel.hidden = false;
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    if (!initialized) {
      addMessage("Hi, I'm a scripted assistant for this portfolio. Ask me about a project, the tech stack, or how to get in touch.", 'bot');
      renderSuggestions();
      initialized = true;
    }
    input.focus();
  }

  function closeChat() {
    panel.hidden = true;
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    if (panel.hidden) openChat(); else closeChat();
  });
  closeBtn.addEventListener('click', closeChat);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    respondTo(text);
  });
})();
