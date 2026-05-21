// 목회자를 위한 노트북LM 마스터 가이드 — 앱 진입
// 8개 섹션을 모두 렌더링하고, 좌측 sticky 네비에 스크롤 스파이를 붙입니다.

const { useState, useEffect, useMemo, useRef, useCallback } = React;
const D = window.GUIDE_DATA;

// ── 작은 헬퍼들 ─────────────────────────────────────────────
function SectionEyebrow({ num, children }) {
  return (
    <div className="section-eyebrow">
      <span>{num} · {children}</span>
    </div>
  );
}

function PlaceholderArt({ label, accent }) {
  // 본문에 직접 그리는 SVG 대신, 차분한 줄무늬 placeholder.
  // 진짜 일러스트는 디자인이 굳어진 후 차후 교체.
  return (
    <div className="usecase-art" data-accent={accent || "default"}>
      <span className="label">{label}</span>
    </div>
  );
}

// ── 사이드바 네비 + 스크롤 스파이 ─────────────────────────
function Sidebar({ items, active }) {
  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 0,
        behavior: "smooth",
      });
    }
  };
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <div className="seal">N</div>
          <span className="brand-title">노트북LM 가이드</span>
        </div>
        <div className="brand-sub">PASTORAL · MASTER GUIDE</div>
      </div>

      <nav className="nav">
        {items.map((n) => (
          <a key={n.id} href={`#${n.id}`}
             className={active === n.id ? "active" : ""}
             onClick={(e) => handleClick(e, n.id)}>
            <span className="num">{n.num}</span>
            <span>{n.label}</span>
          </a>
        ))}
      </nav>

      <div className="sidebar-foot">
        한 영혼을 더 가까이 보기 위함입니다.<br />
        목회자가 도구를 쓰는 자리에서<br />
        도구가 사람을 가리지 않도록.
      </div>
    </aside>
  );
}

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const fold = window.innerHeight * 0.3;
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top - fold < 0) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);
  return active;
}

// ── HERO ─────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="hero-grid">
        <div>
          <div className="hero-eyebrow">{D.meta.eyebrow}</div>
          <h1>
            목회자를 위한<br />
            <em>노트북LM</em> 마스터 가이드
          </h1>
          <p className="hero-sub">
            구글이 만든 ‘나만의 문서만을 위한 맞춤형 AI 비서’를,
            <br />설교·연구·교육·행정의 한 자리에서 책임 있게 활용하는 방법.
          </p>
          <div className="hero-chips">
            <span className="chip">8개 섹션</span>
            <span className="chip">12 프롬프트</span>
            <span className="chip">사역별 워크플로</span>
            <span className="chip">한국어 가이드</span>
          </div>
          <div className="hero-meta">
            <span><b>읽는 시간</b> 약 25분</span>
            <span className="dot">·</span>
            <span><b>대상</b> 담임 · 부교역자 · 사역팀</span>
            <span className="dot">·</span>
            <span><b>도구</b> NotebookLM (Google)</span>
          </div>
        </div>

        <aside className="hero-card">
          <div className="quote-mark">“</div>
          <div className="pull">
            자료를 찾는 시간은 노트북LM에게 맡기고,
            목회자 본연의 사명인 ‘기도와 말씀 묵상, 그리고 성도를 돌보는 시간’에
            더 집중하실 수 있습니다.
          </div>
          <div className="attrib">— 본 가이드의 결론, 미리 적어둠</div>
        </aside>
      </div>
    </section>
  );
}

// ── 01. 노트북LM이란 ─────────────────────────────────────
function IntroSection() {
  return (
    <section id="intro" className="page-section" data-screen-label="02 Intro">
      <SectionEyebrow num="01">노트북LM이란 무엇인가</SectionEyebrow>
      <h2>인터넷 전체가 아니라,<br />목회자가 올린 자료만 읽는 AI.</h2>
      <p className="lede">
        일반적인 ChatGPT나 Claude가 인터넷의 광범위한 지식을 바탕으로 답하는 ‘일반 비서’라면,
        노트북LM은 목회자가 직접 올린 자료만 읽고, 그 안에서만 응답하는
        ‘전속 연구원’에 가깝습니다.
      </p>

      <div className="grid-3" style={{ marginTop: 36 }}>
        {D.introCards.map((c) => (
          <article className="card why-card" key={c.tag}>
            <div className="num">{c.tag}</div>
            <h3>{c.title}</h3>
            <p style={{ whiteSpace: "pre-line" }}>{c.body}</p>
          </article>
        ))}
      </div>

      <div className="stat-strip">
        <div className="stat">
          <div className="v">2,500<span className="unit">만 자</span></div>
          <div className="k">노트북 1개당 메모리</div>
        </div>
        <div className="stat">
          <div className="v">≈ 50<span className="unit">권</span></div>
          <div className="k">책 분량으로 환산</div>
        </div>
        <div className="stat">
          <div className="v">5<span className="unit">종</span></div>
          <div className="k">지원 파일 (PDF·DOC·TXT·URL·YT)</div>
        </div>
        <div className="stat">
          <div className="v">0<span className="unit">원</span></div>
          <div className="k">기본 활용은 무료</div>
        </div>
      </div>
    </section>
  );
}

// ── 02. 다섯 가지 이유 ────────────────────────────────────
function WhySection() {
  return (
    <section id="why" className="page-section" data-screen-label="03 Why">
      <SectionEyebrow num="02">왜 다른 AI가 아닌 노트북LM인가</SectionEyebrow>
      <h2>목회자에게 필요한 다섯 가지 약속.</h2>
      <p className="lede">
        강대상에 오를 글을 다루는 사람에게 가장 중요한 것은 ‘속도’가 아니라
        ‘출처가 분명한 답’과 ‘민감한 자료를 안전하게 다룰 기반’입니다.
        노트북LM이 다른 AI와 갈라지는 다섯 지점.
      </p>

      <div className="principle-list">
        {D.reasons.map((r) => (
          <div className="principle" key={r.n}>
            <div className="marker">{r.n}</div>
            <div>
              <h4>{r.label} · {r.title}</h4>
              <p>{r.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="caveat">
        <div className="label">CAVEAT</div>
        <p>
          ‘할루시네이션 제로’라는 표현은 마케팅에 가깝습니다.
          실제로는 ‘훨씬 적다’가 정직한 표현이며, 출처 핀이 붙은 문장만 신뢰하시고,
          핀이 없거나 모호한 답은 원문 확인 전에는 인용하지 마세요.
        </p>
      </div>
    </section>
  );
}

// ── 03. 스튜디오 (탭 인터랙션) ───────────────────────────
function StudioSection() {
  const groups = D.studioGroups;
  // 그룹 모두 펼친 채 카테고리 탭으로 그룹 안의 도구를 보여 줍니다.
  const [active, setActive] = useState(groups[0].key);
  const cur = groups.find((g) => g.key === active);
  return (
    <section id="studio" className="page-section" data-screen-label="04 Studio">
      <SectionEyebrow num="03">노트북LM 스튜디오</SectionEyebrow>
      <h2>한 편의 글을<br />다섯 가지 형식으로 변환한다.</h2>
      <p className="lede">
        우측 패널의 ‘스튜디오(Studio)’는 업로드한 자료를 클릭 한 번에
        오디오 대담, 영상 브리핑, 학습 가이드, 마인드맵, 발표 슬라이드, FAQ로 자동 변환합니다.
        프롬프트를 외우지 못해도 됩니다.
      </p>

      <div className="tabs-shell" style={{ marginTop: 36 }}>
        <div className="tab-list">
          {groups.map((g) => (
            <button
              key={g.key}
              className={`tab ${active === g.key ? "active" : ""}`}
              onClick={() => setActive(g.key)}
            >
              <span className="tab-num">{g.num}</span>
              <div>
                <div className="tab-name">{g.name}</div>
                <span className="tab-sub">{g.sub}</span>
              </div>
            </button>
          ))}
        </div>
        <div className="tab-body">
          {cur.tools.map((t) => (
            <div key={t.key} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="tab-eyebrow">{t.tag}</div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
              <p style={{ color: "var(--ink)", fontWeight: 500 }}>
                <span style={{ color: "var(--accent)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", marginRight: 10 }}>
                  USE
                </span>
                {t.use}
              </p>
              {t.modes && (
                <ul style={{ marginTop: 4 }}>
                  {t.modes.map((m) => (
                    <li key={m.name}>
                      <span><strong style={{ color: "var(--ink)" }}>{m.name}</strong> — {m.desc}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      <aside className="hero-card" style={{ marginTop: 40, maxWidth: 760 }}>
        <div className="quote-mark">“</div>
        <div className="pull">{D.studioPullquote}</div>
        <div className="attrib">— 스튜디오 기능 한 줄 정리</div>
      </aside>
    </section>
  );
}

// ── 04. BananaNL ─────────────────────────────────────────
function BananaSection() {
  return (
    <section id="banana" className="page-section" data-screen-label="05 BananaNL">
      <SectionEyebrow num="04">슬라이드 디자인 보강 — BananaNL</SectionEyebrow>
      <h2>노트북LM의 약점,<br />‘단조로운 슬라이드 디자인’을 보강하는 한 가지.</h2>
      <p className="lede">{D.banana.pitch}</p>

      <h3 style={{ marginTop: 56, marginBottom: 18 }}>설치 (PC 기준, 약 35초)</h3>
      <div className="grid-4">
        {D.banana.install.map((s, i) => (
          <article className="card" key={i}>
            <div className="num">STEP {String(i + 1).padStart(2, "0")} · {s.sec}</div>
            <h3 style={{ fontSize: 18 }}>{s.title}</h3>
            <p>{s.body}</p>
          </article>
        ))}
      </div>

      <h3 style={{ marginTop: 56, marginBottom: 18 }}>슬라이드 만들 때 사용 방법</h3>
      <div className="timeline">
        {D.banana.use.map((s) => (
          <article className="tl-item" key={s.n}>
            <div className="tl-num">{s.n}</div>
            <div className="tl-title">
              <div className="meta">USE STEP</div>
              <h3>{s.title}</h3>
            </div>
            <div className="tl-body" dangerouslySetInnerHTML={{ __html: s.body }} />
          </article>
        ))}
      </div>

      <div className="grid-2" style={{ marginTop: 36 }}>
        {D.banana.tips.map((t) => (
          <div className="caveat" key={t.head} style={{ marginTop: 0 }}>
            <div className="label">TIP · {t.head}</div>
            <p>{t.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── 05. 사역별 워크플로 ──────────────────────────────────
function WorkflowSection() {
  return (
    <section id="workflow" className="page-section" data-screen-label="06 Workflow">
      <SectionEyebrow num="05">사역별 워크플로</SectionEyebrow>
      <h2>설교 · 연구 · 교육 · 행정,<br />네 가지 결의 일.</h2>
      <p className="lede">
        목회자분들에게 노트북LM은 ‘지치지 않는 수석 연구원’이자
        ‘가장 든든한 사역 비서’가 될 수 있습니다. 각 사역에 맞춘 활용의 결을 정리합니다.
      </p>

      <div className="grid-2" style={{ marginTop: 36 }}>
        {D.workflow.map((w, i) => (
          <article className="usecase" key={w.tag}>
            <PlaceholderArt label={w.role} accent={i} />
            <div className="usecase-body">
              <div className="role">{w.tag}</div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
              <ul className="usecase-steps">
                {w.items.map((it, j) => (
                  <li key={j}>
                    <b>{String(j + 1).padStart(2, "0")}</b>
                    <span><strong style={{ color: "var(--ink)", fontWeight: 600 }}>{it.h}</strong> — {it.b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ── 06. 프롬프트 라이브러리 ───────────────────────────────
function PromptsSection() {
  const [filter, setFilter] = useState("전체");
  const [copied, setCopied] = useState(null);
  const list = useMemo(
    () => filter === "전체" ? D.prompts : D.prompts.filter((p) => p.cat === filter),
    [filter]
  );
  const copy = async (i, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(i);
      setTimeout(() => setCopied(null), 1500);
    } catch (e) {
      setCopied(i);
      setTimeout(() => setCopied(null), 1500);
    }
  };
  return (
    <section id="prompts" className="page-section" data-screen-label="07 Prompts">
      <SectionEyebrow num="06">프롬프트 묶음 12</SectionEyebrow>
      <h2>‘무엇을 물어야 하는가’가<br />결과의 8할입니다.</h2>
      <p className="lede">
        설교·점검·소그룹·행정에서 바로 쓸 수 있는 한국어 프롬프트 12개.
        각각 ‘초안 생성용’이지, 그대로 출력하기 위한 것이 아닙니다.
        한 번 받고, 한 번 다듬으세요.
      </p>

      <div className="prompt-filter">
        {D.promptCategories.map((c) => (
          <button key={c} className={`filter-btn ${filter === c ? "active" : ""}`}
                  onClick={() => setFilter(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="prompt-grid">
        {list.map((p, i) => (
          <article className="prompt" key={`${p.cat}-${p.title}`}>
            <div className="prompt-head">
              <span className="prompt-tag">{p.cat} · {p.tag}</span>
            </div>
            <div className="prompt-title">{p.title}</div>
            <div className="prompt-body">{p.body}</div>
            <div className="prompt-foot">
              <span className="prompt-note">{p.note}</span>
              <button className={`copy-btn ${copied === i ? "copied" : ""}`}
                      onClick={() => copy(i, p.body)}>
                {copied === i ? "복사됨" : "복사"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ── 07. 강의용 핵심 포인트 ───────────────────────────────
function TipsSection() {
  return (
    <section id="tips" className="page-section" data-screen-label="08 Tips">
      <SectionEyebrow num="07">강의·안내 시 핵심 포인트</SectionEyebrow>
      <h2>여섯 가지 자기 규칙.</h2>
      <p className="lede">
        목회자 모임이나 사역팀 안에 노트북LM을 소개할 때 짚어 줄 만한
        ‘써도 되는 자세’의 여섯 가지. 도구가 사역을 가리지 않게 하기 위함입니다.
      </p>
      <div className="principle-list">
        {D.tips.map((p) => (
          <div className="principle" key={p.mark}>
            <div className="marker">{p.mark}</div>
            <div>
              <h4>{p.head}</h4>
              <p>{p.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── 08. FAQ ──────────────────────────────────────────────
function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="page-section" data-screen-label="09 FAQ">
      <SectionEyebrow num="08">자주 묻는 질문</SectionEyebrow>
      <h2>8가지의 질문, 8가지의 정직한 답.</h2>
      <div className="faq">
        {D.faq.map((f, i) => (
          <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
            <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
              <span>{f.q}</span>
              <span className="icon" aria-hidden="true"></span>
            </button>
            <div className="faq-a" dangerouslySetInnerHTML={{ __html: f.a }} />
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Footer ──────────────────────────────────────────────
function Footer() {
  return (
    <footer className="foot">
      <div>
        <h4>맺음</h4>
        <p className="blessing">
          “자료를 찾는 시간은 노트북LM에게,<br />
          목회자는 기도와 말씀과 사람에게.”
        </p>
      </div>
      <div>
        <h4>이 가이드의 구성</h4>
        <ul>
          {D.nav.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`}>{n.num} · {n.label}</a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4>도구</h4>
        <ul>
          <li><a href="https://notebooklm.google.com" target="_blank" rel="noopener noreferrer">NotebookLM (Google) ↗</a></li>
          <li><a href="https://chromewebstore.google.com" target="_blank" rel="noopener noreferrer">Chrome 웹 스토어 ↗</a></li>
          <li><span style={{ color: "var(--muted)" }}>BananaNL — 크롬 확장</span></li>
        </ul>
      </div>
      <div className="foot-bottom">
        <span>NotebookLM is a product of Google. 본 가이드는 비공식 안내자료로, 어떠한 상표·UI도 사칭하지 않습니다.</span>
        <span>v1 · 2026</span>
      </div>
    </footer>
  );
}

// ── 메인 앱 ─────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  const navIds = D.nav.map((n) => n.id);
  const active = useScrollSpy(navIds);

  // 데이터 속성으로 테마 / 밀도 적용 (CSS 변수가 받아 처리)
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", t.theme);
    document.documentElement.setAttribute("data-density", t.density);
    document.body.style.fontFamily = t.serifBody ? "var(--serif)" : "var(--sans)";
  }, [t.theme, t.density, t.serifBody]);

  return (
    <div className="shell">
      <Sidebar items={D.nav} active={active} />

      <main className="main">
        <Hero />
        <IntroSection />
        <WhySection />
        <StudioSection />
        <BananaSection />
        <WorkflowSection />
        <PromptsSection />
        <TipsSection />
        <FaqSection />
        <Footer />
      </main>

      <TweaksPanel title="Tweaks · 가이드 톤">
        <TweakSection label="색상 테마">
          <TweakSelect
            label="팔레트"
            value={t.theme}
            options={[
              { value: "manuscript", label: "Aged Manuscript (기본)" },
              { value: "cathedral",  label: "Cathedral (다크 네이비)" },
              { value: "sage",       label: "Sage Study (화이트·세이지)" },
            ]}
            onChange={(v) => setTweak("theme", v)}
          />
        </TweakSection>
        <TweakSection label="레이아웃">
          <TweakRadio
            label="여백"
            value={t.density}
            options={[
              { value: "compact", label: "촘촘" },
              { value: "regular", label: "보통" },
              { value: "cozy",    label: "넉넉" },
            ]}
            onChange={(v) => setTweak("density", v)}
          />
        </TweakSection>
        <TweakSection label="타이포그래피">
          <TweakToggle label="본문도 세리프로"
            value={t.serifBody}
            onChange={(v) => setTweak("serifBody", v)} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

// Render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
