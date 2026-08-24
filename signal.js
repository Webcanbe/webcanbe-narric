/* Content layer deliberately runs after Framer hydration, leaving template
   markup, motion, image treatment, and responsive composition untouched. */
(() => {
  const brand = "THE SIGNAL";
  const description = "Independent reporting and analysis on technology, business, and the people building what's next.";
  const disclosure = "Due to contractual restrictions, the original work cannot be displayed publicly. The copyright and publication rights remain with the employer, so an unrelated demonstration site is presented here instead.";
  const exact = new Map([
    ["Narric", brand], ["NARRIC", brand],
    ["Premium Blog & Content Platform", "Independent Business & Technology Media"],
    ["Featured Blogs", "Featured Reporting"], ["Latest Blogs", "Latest Stories"],
    ["All Blogs", "All Stories"], ["Blogs", "Stories"], ["Blog", "Story"],
    ["Subscribe", "Get the Briefing"], ["SUBSCRIBE", "GET THE BRIEFING"],
    ["Join the newsletter", "Get the Briefing"],
    ["Guides, insights, opinions, and deep dives for creators who want to stay ahead. Written by creators, for creators.", description],
    ["Maya Collins", "Signal Desk"], ["Olivia Carter", "Signal Desk"], ["Lena Hart", "Signal Desk"],
    ["Daniel Brooks", "Signal Desk"], ["Skylar Bennett", "Signal Desk"], ["Adrian Cole", "Signal Desk"], ["Ethan Walker", "Signal Desk"],
    ["36 ARTICLES", "36 DISPATCHES"], ["7 AUTHORS", "7 CONTRIBUTORS"], ["6 CATEGORIES", "6 DESKS"],
    ["13 TOPICS", "13 BEATS"], ["WEEKLY UPDATES", "WEEKLY BRIEFING"], ["8 SPONSORED POSTS", "PARTNER REPORTS"],
    ["6 RESOURCES", "FIELD RESOURCES"], ["EST. 2026", "INDEPENDENTLY PUBLISHED"],
    ["Mailvio", "Partner Report"], ["Clipnote", "Partner Report"], ["Formly", "Partner Report"], ["Designly", "Partner Report"],
    ["Postly", "Partner Report"], ["Buildify", "Partner Report"], ["Sketchly", "Partner Report"], ["Workbase", "Partner Report"],
    ["Sponsored", "Partner Reports"], ["hello@narric.com", "Editorial desk"],
    ["NEWSLETTER CREATORS", "INDEPENDENT MEDIA"], ["ACTIVE USERS", "EDITORIAL SYSTEMS"],
    ["FORMS CREATED", "MEDIA PARTNERSHIPS"], ["PROJECTS COMPLETED", "CREATOR OPERATIONS"]
  ]);
  const stories = new Map([
    ["Why Every Creator Needs a Simple Website", "The New Operating System for Independent Creators"],
    ["Design Trends That Are Shaping Modern Websites", "The Quiet Design Choices Building Trust Online"],
    ["How to Turn One Article Into Ten Pieces of Content", "How Independent Media Teams Make One Story Travel"],
    ["A Beginner’s Guide to Content Strategy", "The Case for a Clear Publishing Point of View"],
    ["Tools That Automate Content Publishing", "The Tools Rewiring Independent Publishing"],
    ["A Guide to Writing Better Blog Introductions", "Why the First Paragraph Still Decides Everything"],
    ["How to Build a Content Engine That Grows", "How Small Media Teams Build Editorial Momentum"],
    ["How to Build an Audience Around Your Content", "Audience Is an Asset, Not a Distribution Hack"],
    ["How Automation Can Save Creators Hours Every Week", "Where Automation Actually Helps a Media Business"],
    ["How AI Is Changing Content Marketing", "AI Is Changing the Economics of Attention"],
    ["The Best Writing Tools for Modern Creators", "The Independent Publisher’s Working Toolkit"],
    ["The Tools I Use to Write and Publish Faster", "What a Lean Editorial Stack Looks Like"],
    ["The Future of AI in Digital Publishing", "What Comes After the AI Publishing Gold Rush"],
    ["Search Engines Are Prioritizing Helpful Content More Than Ever", "Search Is Rewarding Useful Work Again"]
  ]);
  const replaceText = value => {
    let next = value;
    stories.forEach((to, from) => { next = next.split(from).join(to); });
    exact.forEach((to, from) => { next = next.split(from).join(to); });
    return next.replace(/content platform/gi, "independent publication").replace(/content marketing/gi, "media strategy");
  };
  const setMeta = (selector, value) => document.querySelector(selector)?.setAttribute("content", value);
  function replaceNodes() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode(node) {
      const parent = node.parentElement;
      return parent && !/^(SCRIPT|STYLE|NOSCRIPT)$/i.test(parent.tagName) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }});
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => { const next = replaceText(node.nodeValue); if (next !== node.nodeValue) node.nodeValue = next; });
    document.querySelectorAll("img[alt]").forEach(img => { img.alt = replaceText(img.alt).replace(/writing|content marketing/gi, "independent publishing").replace(/blog/gi, "publication"); });
  }
  function replaceHero() {
    document.querySelectorAll('h1,h2,h3,p').forEach(node => {
      const text = (node.textContent || '').replace(/\s+/g, ' ').trim();
      if (text === 'Where great ideas find great creators.') node.textContent = 'Know what matters before everyone else does.';
      if (text === 'The go-to content platform for modern creators who want to stay ahead.') node.textContent = description;
      if (/^no spam, unsubscribe any time$/i.test(text)) node.textContent = 'A sharp read on the shifts worth tracking.';
    });
  }
  function cleanLinks() {
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href') || '';
      if (/^(https?:)?\/\/(instagram|twitter|x|facebook|linkedin)\.com/i.test(href)) link.remove();
      if (/framer\.(com|website)/i.test(href)) link.removeAttribute('href');
      if (/narric\.com/i.test(href)) link.removeAttribute('href');
      if (/buy\.polar|framer\.com\/marketplace/i.test(href)) (link.closest('[data-framer-appear-id]') || link).remove();
      if (/subscribe|newsletter/i.test(link.textContent || '')) link.setAttribute('href', '/subscribe');
    });
  }
  function replaceLogos() {
    document.querySelectorAll('img[src*="zKf8ggJiYtueKFPWAO7E8xYjs70"]').forEach(img => {
      if (img.parentElement?.querySelector('.signal-wordmark')) return;
      img.style.visibility = 'hidden';
      const mark = document.createElement('span');
      mark.className = 'signal-wordmark';
      mark.textContent = brand;
      mark.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;white-space:nowrap;color:#0a0a0a;font:800 clamp(13px,1.4vw,20px)/1 Inter,Arial,sans-serif;letter-spacing:-.06em';
      img.parentElement?.append(mark);
    });
  }
  function replacePartnerImages() {
    const replacements = {
      '2CcZnF0FfYaBkjVZnNdIsZ6HOeI': '/assets/partner-report-01.png',
      'ezhjSbkRRlzNQdS6RsQyie7h5nk': '/assets/partner-report-02.png',
      'e0jlXj7RvNwKyL7krMh6oECnZo': '/assets/partner-report-03.png',
      '3AHIor86v5NCbEStBxB9sSAAWKQ': '/assets/partner-report-04.png'
    };
    document.querySelectorAll('img').forEach(img => {
      const match = Object.entries(replacements).find(([key]) => img.src.includes(key));
      if (!match) return;
      img.removeAttribute('srcset');
      img.src = match[1];
      img.alt = 'Abstract editorial art for a partner report';
    });
  }
  function addFooter() {
    if (document.getElementById('signal-portfolio-credit')) return;
    const footer = document.createElement('div');
    footer.id = 'signal-portfolio-credit';
    footer.style.cssText = 'max-width:1440px;margin:0 auto;padding:18px 20px 30px;color:rgba(10,10,10,.48);font:500 11px/1.45 Inter,Arial,sans-serif;text-align:center';
    footer.innerHTML = '<p style="margin:0 0 8px">A <a href="https://webcanbe.com" target="_blank" rel="noopener noreferrer" style="color:inherit">WebCanBe</a> project</p><p style="margin:0">' + disclosure + '</p>';
    document.body.append(footer);
  }
  function apply() {
    document.title = `${brand} — Independent Business & Technology Media`;
    setMeta('meta[name="description"]', description); setMeta('meta[property="og:title"]', `${brand} — Independent Business & Technology Media`);
    setMeta('meta[property="og:description"]', description); setMeta('meta[name="twitter:title"]', `${brand} — Independent Business & Technology Media`);
    setMeta('meta[name="twitter:description"]', description); document.querySelector('meta[name="generator"]')?.remove();
    replaceNodes(); replaceHero(); cleanLinks(); replaceLogos(); replacePartnerImages(); addFooter();
  }
  const afterHydration = () => { apply(); window.setTimeout(apply, 700); window.setTimeout(apply, 2200); };
  if (document.readyState === 'complete') window.setTimeout(afterHydration, 0); else window.addEventListener('load', afterHydration, { once: true });
})();
