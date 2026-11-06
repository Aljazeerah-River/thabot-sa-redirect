/* Progressive enhancements only. Public content remains readable without JavaScript. */
(() => {
  "use strict";

  function init() {
    const isArabic = document.documentElement.lang.toLowerCase().startsWith("ar");
    const isRTL = document.documentElement.dir === "rtl";
    const byId = (id) => document.getElementById(id);
    const year = byId("year");
    if (year) year.textContent = String(new Date().getFullYear());

    const menuButton = byId("menu-toggle");
    const navigation = byId("main-nav");
    if (menuButton && navigation) {
      const setMenu = (open) => {
        menuButton.setAttribute("aria-expanded", String(open));
        navigation.classList.toggle("is-open", open);
      };
      menuButton.setAttribute("aria-controls", "main-nav");
      setMenu(false);
      menuButton.addEventListener("click", () => {
        setMenu(menuButton.getAttribute("aria-expanded") !== "true");
      });
      navigation.addEventListener("click", (event) => {
        if (event.target.closest("a")) setMenu(false);
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
          setMenu(false);
          menuButton.focus();
        }
      });
      document.addEventListener("click", (event) => {
        if (!navigation.contains(event.target) && !menuButton.contains(event.target)) setMenu(false);
      });
      const desktop = window.matchMedia("(min-width: 960px)");
      const onBreakpoint = () => { if (desktop.matches) setMenu(false); };
      if (desktop.addEventListener) desktop.addEventListener("change", onBreakpoint);
      else desktop.addListener(onBreakpoint);
    }

    const examples = isArabic ? {
      meeting: {
        title: "من الاجتماع إلى خطة عمل",
        subtitle: "مثال: اجتماع فريق التشغيل",
        items: [
          ["قرار موثّق", "مراجعة خطة الإنتاج للأسبوع المقبل"],
          ["مهمة واضحة", "إعداد الخطة · مسؤول التشغيل · الخميس"],
          ["اعتماد بشري", "مراجعة المحضر قبل مشاركته مع الفريق"]
        ],
        note: "مثال توضيحي لرحلة القرار؛ ليس محضر اجتماع حقيقيًا."
      },
      tasks: {
        title: "متابعة تعرف الخطوة التالية",
        subtitle: "مثال: تجهيز طلب عميل",
        items: [
          ["اكتمل", "تأكيد تفاصيل الطلب والكميات"],
          ["قيد التنفيذ", "تجهيز المنتجات · فريق التشغيل"],
          ["يحتاج متابعة", "تأكيد موعد التسليم مع المسؤول"]
        ],
        note: "حالات وبيانات تجريبية لتوضيح أسلوب المتابعة."
      },
      knowledge: {
        title: "إجابة مرتبطة بمصدرها",
        subtitle: "مثال: كيف نعتمد طلب شراء؟",
        items: [
          ["المعلومة المطلوبة", "خطوات اعتماد طلب الشراء"],
          ["المصدر المرجعي", "دليل إجراءات المنشأة · قسم المشتريات"],
          ["الخطوة التالية", "مراجعة الصلاحية والتوجّه إلى المسؤول المعتمد"]
        ],
        note: "مثال افتراضي؛ لا يسترجع هذا العرض مستندات المنشأة."
      }
    } : {
      meeting: {
        title: "Turn a meeting into an action plan",
        subtitle: "Example: an operations team meeting",
        items: [
          ["Recorded decision", "Review next week's production plan"],
          ["Clear ownership", "Prepare the plan · Operations lead · Thursday"],
          ["Human approval", "Review the minutes before sharing with the team"]
        ],
        note: "An illustrative decision workflow, not real meeting minutes."
      },
      tasks: {
        title: "Know what needs to happen next",
        subtitle: "Example: preparing a customer order",
        items: [
          ["Completed", "Confirm the order details and quantities"],
          ["In progress", "Prepare the products · Operations team"],
          ["Follow-up needed", "Confirm delivery timing with the responsible person"]
        ],
        note: "Sample statuses and information illustrate the follow-up process."
      },
      knowledge: {
        title: "An answer connected to its source",
        subtitle: "Example: how do we approve a purchase?",
        items: [
          ["Information needed", "The purchase request approval process"],
          ["Reference source", "Company procedures manual · Purchasing section"],
          ["Next step", "Check permissions and refer to the authorized approver"]
        ],
        note: "A hypothetical example; this preview does not retrieve company documents."
      }
    };

    const tabs = Array.from(document.querySelectorAll("[data-demo]"));
    const panel = byId("demo-panel");
    const demoTitle = byId("demo-title");
    const demoSubtitle = byId("demo-subtitle");
    const demoItems = byId("demo-items");
    const demoNote = byId("demo-note");
    if (tabs.length && panel && demoTitle && demoSubtitle && demoItems && demoNote) {
      const selectDemo = (tab, focus = false) => {
        const example = examples[tab.dataset.demo];
        if (!example) return;
        tabs.forEach((item) => {
          const selected = item === tab;
          item.setAttribute("aria-selected", String(selected));
          item.tabIndex = selected ? 0 : -1;
          item.classList.toggle("is-active", selected);
        });
        panel.setAttribute("aria-labelledby", tab.id);
        demoTitle.textContent = example.title;
        demoSubtitle.textContent = example.subtitle;
        demoNote.textContent = example.note;
        const fragment = document.createDocumentFragment();
        example.items.forEach(([label, detail], index) => {
          const row = document.createElement("div");
          row.className = "demo-item";
          const number = document.createElement("b");
          number.className = "demo-item-number";
          number.setAttribute("aria-hidden", "true");
          number.textContent = String(index + 1).padStart(2, "0");
          const text = document.createElement("div");
          const heading = document.createElement("span");
          heading.textContent = label;
          const small = document.createElement("small");
          small.textContent = detail;
          text.append(heading, small);
          row.append(number, text);
          fragment.appendChild(row);
        });
        demoItems.replaceChildren(fragment);
        if (focus) tab.focus();
      };
      tabs.forEach((tab, index) => {
        if (!tab.id) tab.id = `demo-tab-${tab.dataset.demo}`;
        tab.setAttribute("role", "tab");
        tab.setAttribute("aria-controls", "demo-panel");
        tab.addEventListener("click", () => selectDemo(tab));
        tab.addEventListener("keydown", (event) => {
          let next = index;
          if (event.key === "Home") next = 0;
          else if (event.key === "End") next = tabs.length - 1;
          else if (event.key === "ArrowRight") next += isRTL ? -1 : 1;
          else if (event.key === "ArrowLeft") next += isRTL ? 1 : -1;
          else return;
          event.preventDefault();
          selectDemo(tabs[(next + tabs.length) % tabs.length], true);
        });
      });
      panel.setAttribute("role", "tabpanel");
      selectDemo(tabs.find((tab) => tab.getAttribute("aria-selected") === "true") || tabs[0]);
    }

    const form = byId("brief-form");
    const result = byId("brief-result");
    const draft = byId("email-draft");
    const briefText = byId("brief-text");
    const status = byId("brief-status");
    const copyButton = byId("copy-brief");
    if (form && result && draft && briefText && status && copyButton) {
      status.setAttribute("aria-live", "polite");
      const fields = {
        name: byId("brief-name"), company: byId("brief-company"), email: byId("brief-email"),
        service: byId("brief-service"), message: byId("brief-message")
      };
      if (Object.values(fields).every(Boolean)) {
        const clearStaleDraft = () => {
          if (!result.hidden) {
            result.hidden = true;
            draft.removeAttribute("href");
            briefText.value = "";
            status.textContent = isArabic ? "عدّلت البيانات. أعد تجهيز الرسالة لتحديثها." : "Your details changed. Prepare the message again to update it.";
          }
        };
        form.addEventListener("input", clearStaleDraft);
        form.addEventListener("change", clearStaleDraft);
        form.addEventListener("submit", (event) => {
          event.preventDefault();
          Object.values(fields).forEach((field) => { field.value = field.value.trim(); });
          if (!form.reportValidity()) return;
          const recipient = String(window.THABOT_CONFIG?.email || "").trim();
          if (!/^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(recipient)) {
            status.textContent = isArabic ? "تعذّر تجهيز بريد التواصل. استخدم وسيلة التواصل المباشرة الموضحة في الصفحة." : "The contact email could not be prepared. Please use the direct contact details on this page.";
            return;
          }
          const selectedOption = fields.service.selectedOptions[0];
          const service = selectedOption ? selectedOption.textContent.trim() : fields.service.value;
          const subject = isArabic ? `استفسار عن خدمات ثابوت — ${fields.company.value}` : `Thabot service inquiry — ${fields.company.value}`;
          const body = isArabic ? [
            "مرحبًا فريق ثابوت،", "", "أرغب في مناقشة احتياج منشأتي:",
            `الاسم: ${fields.name.value}`, `المنشأة: ${fields.company.value}`,
            `البريد الإلكتروني: ${fields.email.value}`, `مجال الاهتمام: ${service}`,
            "", "تفاصيل الاحتياج:", fields.message.value, "", "شكرًا لكم."
          ].join("\n") : [
            "Hello Thabot team,", "", "I would like to discuss my organization's needs:",
            `Name: ${fields.name.value}`, `Organization: ${fields.company.value}`,
            `Email: ${fields.email.value}`, `Area of interest: ${service}`,
            "", "Project details:", fields.message.value, "", "Thank you."
          ].join("\n");
          draft.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          briefText.value = `${isArabic ? "الموضوع" : "Subject"}: ${subject}\n\n${body}`;
          result.hidden = false;
          status.textContent = isArabic
            ? "الرسالة جاهزة ولم تُرسل. افتح تطبيق البريد لمراجعتها وإرسالها، أو انسخ النص."
            : "Your message is ready and has not been sent. Open your email app to review and send it, or copy the text.";
          draft.focus({ preventScroll: true });
          result.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
        });
        copyButton.addEventListener("click", async () => {
          if (!briefText.value) return;
          try {
            await navigator.clipboard.writeText(briefText.value);
            status.textContent = isArabic ? "نُسخ النص. يمكنك لصقه في بريدك وإرساله إلى فريق ثابوت." : "Text copied. Paste it into your email and send it to the Thabot team.";
          } catch {
            briefText.focus();
            briefText.select();
            status.textContent = isArabic ? "حُدّد النص. استخدم أمر النسخ في جهازك، ثم الصقه في بريدك." : "The text is selected. Use your device's copy command, then paste it into your email.";
          }
        });
        const prepareButton = byId("prepare-brief");
        if (prepareButton) prepareButton.disabled = false;
      }
    }

    document.documentElement.classList.add("js");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
