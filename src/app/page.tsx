"use client";

import { useState, useEffect, useRef, FormEvent } from "react";

const CheckIcon = ({ color = "#03C75A" }: { color?: string }) => (
  <svg width="16" height="16" fill="none" stroke={color} strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const ChevronDown = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const KakaoIcon = ({ size = 22, fill = "#191919" }: { size?: number; fill?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
    <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.727 1.818 5.127 4.545 6.472-.2.745-.727 2.7-.832 3.116-.13.516.189.51.397.371.163-.109 2.6-1.768 3.654-2.487.729.107 1.478.164 2.236.164 5.523 0 10-3.463 10-7.636C22 6.463 17.523 3 12 3z" />
  </svg>
);

export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

    const handleScroll = () => {
      const nav = document.querySelector("nav");
      if (nav) {
        nav.style.boxShadow = window.scrollY > 10 ? "0 1px 3px rgba(0,0,0,0.1)" : "none";
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleFaq = (index: number) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  useEffect(() => {
    faqRefs.current.forEach((ref, i) => {
      if (ref) {
        ref.style.maxHeight = activeFaq === i ? ref.scrollHeight + "px" : "0";
      }
    });
  }, [activeFaq]);

  const closeMobileNav = () => setMobileNavOpen(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      company: formData.get("company") as string,
      contact: formData.get("contact") as string,
      solution: formData.get("solution") as string,
      message: formData.get("message") as string,
    };
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      // still show success to user
    }
    setFormLoading(false);
    setFormSubmitted(true);
  };

  const faqItems = [
    { q: "개발 지식이 없어도 사용할 수 있나요?", a: "네. 설치 가이드와 초기 세팅을 도와드리며, 이후에는 별도의 개발 지식 없이 바로 사용하실 수 있습니다." },
    { q: "프로그램은 어떤 환경에서 동작하나요?", a: "Windows와 macOS 환경 모두 지원합니다. 상담 시 운영체제에 맞는 설치 파일을 안내드립니다." },
    { q: "블로거 수집기로 어떤 정보를 수집할 수 있나요?", a: "블로그 제목, URL, ID, 생성일자, 포스팅 수, 검색 순위 등의 기본 정보와 함께 전화번호, 이메일, 카카오톡 오픈채팅 등 공개된 연락처를 자동으로 추출합니다." },
    { q: "블로그 원고 편집기의 금지어 목록을 직접 수정할 수 있나요?", a: "네. 기본 금지어 목록이 제공되며, 직접 금지어를 추가하거나 파일로 업로드하여 커스터마이징할 수 있습니다. 대체어 매핑도 자유롭게 설정 가능합니다." },
    { q: "카페 포스팅 자동화 사용 시 IP 차단이 걱정됩니다.", a: "Android USB 테더링을 통한 IP 자동 로테이션 기능이 내장되어 있습니다. 키워드를 일정 단위로 나누어 처리할 때마다 IP가 자동 변경되며, 카페 간 랜덤 대기 시간(30~90초)도 적용되어 차단 위험을 최소화합니다." },
    { q: "커스터마이징이나 추가 기능 개발도 가능한가요?", a: "네. 기존 솔루션의 커스터마이징뿐 아니라, 새로운 자동화 프로그램 제작도 가능합니다. 맞춤 제작 문의를 통해 상담해 주세요." },
    { q: "구매 후 기술 지원은 어떻게 되나요?", a: "구매 후 1개월간 무상 기술 지원을 제공합니다. 이후에도 유지보수 계약을 통해 지속적인 지원을 받으실 수 있으며, 카카오톡 채널로 빠르게 문의하실 수 있습니다." },
  ];

  return (
    <>
      {/* NAV */}
      <nav>
        <div className="container nav-inner">
          <a href="#" className="logo">Auto<span>Flow</span></a>
          <ul className="nav-links">
            <li><a href="#products">솔루션</a></li>
            <li><a href="#how">도입 과정</a></li>
            <li><a href="#pricing">가격</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
          <div className="nav-cta">
            <a href="#contact" className="btn btn-naver btn-sm">문의하기</a>
          </div>
          <button className="mobile-toggle" onClick={() => setMobileNavOpen(!mobileNavOpen)} aria-label="메뉴">
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </nav>
      <div className={`mobile-nav${mobileNavOpen ? " active" : ""}`}>
        <a href="#products" onClick={closeMobileNav}>솔루션</a>
        <a href="#how" onClick={closeMobileNav}>도입 과정</a>
        <a href="#pricing" onClick={closeMobileNav}>가격</a>
        <a href="#faq" onClick={closeMobileNav}>FAQ</a>
        <a href="#contact" className="btn btn-naver" onClick={closeMobileNav}>문의하기</a>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="container hero-content">
          <div>
            <div className="hero-badge"><span className="dot"></span> 네이버 마케팅 자동화 전문</div>
            <h1>블로그 마케팅,<br /><span className="highlight">수작업은 이제 끝</span></h1>
            <p className="subtitle">원고 편집부터 블로거 수집, 카페 포스팅까지. 네이버 마케팅에 필요한 반복 작업을 프로그램이 대신합니다.</p>
            <div className="hero-buttons">
              <a href="#contact" className="btn btn-naver">무료 상담 신청</a>
              <a href="#products" className="btn btn-outline">솔루션 보기</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card">
              <div className="editor-header">
                <span className="editor-dot r"></span>
                <span className="editor-dot y"></span>
                <span className="editor-dot g"></span>
                <span className="editor-title">블로그 원고 편집기</span>
              </div>
              <div className="editor-body">
                <div className="editor-stats">
                  <div className="editor-stat">글자수 <strong>1,847</strong> / 2,500</div>
                  <div className="editor-stat">달성률 <strong>72%</strong></div>
                  <div className="editor-stat">금지어 <strong style={{ color: "#DC2626" }}>2</strong></div>
                </div>
                <div className="editor-text">
                  오늘은 <span className="keyword">강남 맛집</span> 추천 포스팅을 작성해 보겠습니다.
                  지난주에 방문한 <span className="banned">맛집추천</span> <span className="replaced">맛집 리뷰</span> 코너에서 발견한 숨은 명소인데요,
                  분위기도 좋고 <span className="banned">가성비</span> <span className="replaced">합리적 가격</span>까지 갖춘 곳이라...
                </div>
              </div>
              <div className="editor-bar">
                <span>목표 달성률</span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div className="progress-bar"><div className="progress-fill"></div></div>
                  <span style={{ fontWeight: 600, color: "var(--naver)" }}>72%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="pain-section fade-in">
        <div className="container">
          <div className="section-header">
            <h2>이런 문제, 겪고 계시죠?</h2>
            <p>블로그 마케팅에서 반복되는 비효율이 성과를 가로막습니다.</p>
          </div>
          <div className="pain-grid">
            <div className="pain-card">
              <div className="pain-icon">⏳</div>
              <h3>원고 작성에 걸리는 시간</h3>
              <p>금지어 확인, 글자수 체크, 키워드 배치를 수동으로 하다 보면 원고 하나에 시간이 과하게 소요됩니다.</p>
            </div>
            <div className="pain-card">
              <div className="pain-icon">🔍</div>
              <h3>블로거 찾기가 막막</h3>
              <p>계정을 수급하려면 블로거를 일일이 검색해서 연락처를 찾아야 하는 번거로움이 있습니다.</p>
            </div>
            <div className="pain-card">
              <div className="pain-icon">📝</div>
              <h3>카페 포스팅 반복 작업</h3>
              <p>여러 카페에 글/댓글을 수동으로 반복 등록하고, IP 차단 걱정에 계정 관리까지. 시간과 리스크가 모두 큽니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="products-section fade-in">
        <div className="container">
          <div className="section-header">
            <h2>3가지 솔루션으로 해결하세요</h2>
            <p>네이버 블로그 마케팅의 핵심 업무를 자동화합니다.</p>
          </div>
          <div className="product-grid">
            {/* Product 1: 블로그 솔루션 프로그램 */}
            <div className="product-block">
              <div>
                <div className="product-num num-green">1</div>
                <h3>네이버 블로그 솔루션 프로그램</h3>
                <p className="product-desc">블로그 포스팅 작성을 도와주는 올인원 에디터. 금지어 탐지부터 키워드 관리, 경쟁 분석까지.</p>
                <ul className="feature-list">
                  <li><CheckIcon /> 실시간 글자수 계산 & 목표 달성률 표시</li>
                  <li><CheckIcon /> 네이버 금지어 자동 탐지 & 대체어 일괄 치환</li>
                  <li><CheckIcon /> 목표 키워드 보호 (치환에서 자동 제외)</li>
                  <li><CheckIcon /> 이미지/동영상 리소스 관리 & 플레이스홀더</li>
                  <li><CheckIcon /> 인기글 분석 & 블로그 점수 산출 & 경쟁 분석</li>
                  <li><CheckIcon /> 타이핑 시간 자동 측정</li>
                </ul>
              </div>
              <div className="product-visual">
                <div className="visual-header">
                  <div className="icon-circle" style={{ background: "var(--naver-light)" }}>
                    <svg width="16" height="16" fill="none" stroke="var(--naver)" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                  </div>
                  원고 편집 미리보기
                </div>
                <div style={{ background: "var(--white)", borderRadius: "8px", padding: "14px", fontSize: "0.82rem", lineHeight: 1.8, color: "var(--gray-700)", border: "1px solid var(--gray-300)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", paddingBottom: "8px", borderBottom: "1px solid var(--gray-100)", fontSize: "0.75rem", color: "var(--gray-500)" }}>
                    <span>금지어 <strong style={{ color: "#DC2626" }}>2개</strong> 발견</span>
                    <span style={{ color: "var(--naver)", fontWeight: 600 }}>자동 치환 완료</span>
                  </div>
                  <span className="banned" style={{ fontSize: "0.8rem" }}>맛집추천</span> → <span className="replaced" style={{ fontSize: "0.8rem" }}>맛집 리뷰</span><br />
                  <span className="banned" style={{ fontSize: "0.8rem" }}>가성비</span> → <span className="replaced" style={{ fontSize: "0.8rem" }}>합리적 가격</span>
                  <div style={{ marginTop: "12px", paddingTop: "10px", borderTop: "1px solid var(--gray-100)", display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                    <span style={{ color: "var(--gray-500)" }}>키워드 밀도</span>
                    <span style={{ color: "var(--naver)", fontWeight: 600 }}>적정 (2.3%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product 2: 블로거 수집기 */}
            <div className="product-block reverse">
              <div>
                <div className="product-num num-blue">2</div>
                <h3>고성능 네이버 블로그 DB 수집기</h3>
                <p className="product-desc">키워드로 블로거 정보/연락처 자동 수집</p>
                <ul className="feature-list">
                  <li><CheckIcon color="#2563EB" /> 키워드 기반 블로그 검색 (최대 100건)</li>
                  <li><CheckIcon color="#2563EB" /> 연관 키워드 자동 확장 검색</li>
                  <li><CheckIcon color="#2563EB" /> 블로그 생성일, 포스팅 수, 검색 순위 수집</li>
                  <li><CheckIcon color="#2563EB" /> 전화번호 / 이메일 / 카카오톡 연락처 자동 추출</li>
                  <li><CheckIcon color="#2563EB" /> 수집 데이터 테이블 뷰 & 실시간 로그</li>
                </ul>
              </div>
              <div className="product-visual">
                <div className="visual-header">
                  <div className="icon-circle" style={{ background: "var(--primary-light)" }}>
                    <svg width="16" height="16" fill="none" stroke="var(--primary)" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>
                  </div>
                  수집 결과 미리보기
                </div>
                <div className="collector-row">
                  <div className="collector-avatar" style={{ background: "#4F46E5" }}>J</div>
                  <span className="collector-name">제주맛집여행</span>
                  <span style={{ fontSize: "0.72rem", color: "var(--gray-500)" }}>포스팅 342개</span>
                  <span className="collector-tag tag-phone">010-****</span>
                </div>
                <div className="collector-row">
                  <div className="collector-avatar" style={{ background: "#0891B2" }}>S</div>
                  <span className="collector-name">서울데일리</span>
                  <span style={{ fontSize: "0.72rem", color: "var(--gray-500)" }}>포스팅 891개</span>
                  <span className="collector-tag tag-email">이메일</span>
                </div>
                <div className="collector-row">
                  <div className="collector-avatar" style={{ background: "#D97706" }}>M</div>
                  <span className="collector-name">맘스데이</span>
                  <span style={{ fontSize: "0.72rem", color: "var(--gray-500)" }}>포스팅 156개</span>
                  <span className="collector-tag tag-kakao">카톡</span>
                </div>
                <div className="collector-row">
                  <div className="collector-avatar" style={{ background: "#DC2626" }}>B</div>
                  <span className="collector-name">뷰티인사이드</span>
                  <span style={{ fontSize: "0.72rem", color: "var(--gray-500)" }}>포스팅 567개</span>
                  <span className="collector-tag tag-phone">010-****</span>
                </div>
              </div>
            </div>

            {/* Product 3: 카페 포스팅 자동화 */}
            <div className="product-block">
              <div>
                <div className="product-num num-purple">3</div>
                <h3>네이버 카페 포스팅 자동화</h3>
                <p className="product-desc">여러 카페에 게시물과 댓글을 자동으로 작성하는 데스크톱 프로그램. 키워드 템플릿, IP 자동 변경, 이미지 미세조정까지.</p>
                <ul className="feature-list">
                  <li><CheckIcon color="#7C3AED" /> 다중 카페 동시 포스팅 & 댓글/대댓글 자동 작성</li>
                  <li><CheckIcon color="#7C3AED" /> <code style={{ background: "#EDE9FE", padding: "1px 6px", borderRadius: "3px", fontSize: "0.82rem" }}>{`{{keyword}}`}</code> 템플릿으로 동적 제목/본문 생성</li>
                  <li><CheckIcon color="#7C3AED" /> 이미지 랜덤 삽입 + 밝기/대비/채도 미세조정 (중복 감지 방지)</li>
                  <li><CheckIcon color="#7C3AED" /> 네이버 지도 자동 삽입 & 폰트 컬러 변경</li>
                  <li><CheckIcon color="#7C3AED" /> USB 테더링 IP 자동 로테이션 (차단 방지)</li>
                  <li><CheckIcon color="#7C3AED" /> 포스팅용/댓글용 계정 분리 & 엑셀 일괄 관리</li>
                  <li><CheckIcon color="#7C3AED" /> 실시간 진행 모니터링 (Windows & macOS 지원)</li>
                </ul>
              </div>
              <div className="product-visual">
                <div className="visual-header">
                  <div className="icon-circle" style={{ background: "#EDE9FE" }}>
                    <svg width="16" height="16" fill="none" stroke="#7C3AED" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
                  </div>
                  자동화 실행 현황
                </div>
                {/* Template Preview */}
                <div style={{ background: "var(--white)", borderRadius: "8px", padding: "12px", fontSize: "0.78rem", lineHeight: 1.7, color: "var(--gray-700)", border: "1px solid var(--gray-300)", marginBottom: "10px" }}>
                  <div style={{ fontSize: "0.72rem", color: "var(--gray-500)", marginBottom: "6px", display: "flex", justifyContent: "space-between" }}>
                    <span>템플릿 미리보기</span>
                    <span style={{ color: "#7C3AED", fontWeight: 600 }}>Chunk 3/8</span>
                  </div>
                  <span style={{ color: "#7C3AED", fontWeight: 600 }}>{`{{keyword}}`}</span> 진료 잘보는데 알려주세요.
                  <span style={{ color: "var(--gray-400)" }}> [사진]</span>
                  {" "}그래서 <span style={{ color: "#7C3AED", fontWeight: 600 }}>{`{{keyword}}`}</span> 가보려고 하는데...
                  <span style={{ color: "var(--gray-400)" }}> [지도]</span>
                </div>
                {/* Status rows */}
                <div className="cafe-post">
                  <span className="cafe-status status-done"></span>
                  <span className="cafe-name">맛집탐방 카페</span>
                  <span style={{ fontSize: "0.68rem", color: "var(--gray-500)" }}>글+댓글 3</span>
                  <span className="cafe-tag cafe-done">완료</span>
                </div>
                <div className="cafe-post">
                  <span className="cafe-status status-done"></span>
                  <span className="cafe-name">서울 핫플 모임</span>
                  <span style={{ fontSize: "0.68rem", color: "var(--gray-500)" }}>글+댓글 2</span>
                  <span className="cafe-tag cafe-done">완료</span>
                </div>
                <div className="cafe-post">
                  <span className="cafe-status status-running"></span>
                  <span className="cafe-name">일상공유 카페</span>
                  <span style={{ fontSize: "0.68rem", color: "var(--gray-500)" }}>IP 변경됨</span>
                  <span className="cafe-tag cafe-running">진행 중</span>
                </div>
                <div className="cafe-post">
                  <span className="cafe-status status-wait"></span>
                  <span className="cafe-name">동네맘 커뮤니티</span>
                  <span style={{ fontSize: "0.68rem", color: "var(--gray-500)" }}>대기</span>
                  <span className="cafe-tag cafe-wait">대기</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="how-section fade-in">
        <div className="container">
          <div className="section-header">
            <h2>도입은 이렇게 간단합니다</h2>
            <p>문의부터 세팅까지 빠르게 진행됩니다</p>
          </div>
          <div className="how-steps">
            {[
              { num: 1, title: "문의 접수", desc: "필요한 솔루션을 선택하고 문의를 남겨주세요." },
              { num: 2, title: "상담 & 견적", desc: "업무 환경을 파악하고 맞춤 견적을 안내드립니다." },
              { num: 3, title: "설치 & 세팅", desc: "프로그램 설치와 초기 환경 세팅을 도와드립니다." },
              { num: 4, title: "자동화 운영", desc: "세팅 완료 후 바로 사용을 시작합니다." },
            ].map((step) => (
              <div key={step.num} className="step">
                <div className="step-num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="pricing-section fade-in">
        <div className="container">
          <div className="section-header">
            <h2>원하는 방식으로 도입하세요</h2>
            <p>필요한 솔루션만 선택하거나, 패키지로 할인받으세요.</p>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card">
              <h3>단일 솔루션</h3>
              <div className="price">개별 문의</div>
              <p className="price-note">필요한 프로그램 1개 구매</p>
              <ul className="pricing-features">
                <li><CheckIcon /> 원하는 솔루션 1개 선택</li>
                <li><CheckIcon /> 설치 가이드 제공</li>
                <li><CheckIcon /> 1개월 무상 지원</li>
              </ul>
              <a href="#contact" className="btn btn-outline" style={{ width: "100%" }}>구매 문의</a>
            </div>
            <div className="pricing-card featured">
              <h3>올인원 패키지</h3>
              <div className="price">맞춤 견적</div>
              <p className="price-note">3개 솔루션 패키지 할인</p>
              <ul className="pricing-features">
                <li><CheckIcon /> 블로그 솔루션 + 수집기 + 카페 포스팅</li>
                <li><CheckIcon /> 패키지 할인 적용</li>
                <li><CheckIcon /> 우선 기술 지원</li>
                <li><CheckIcon /> 기본 커스터마이징 포함</li>
              </ul>
              <a href="#contact" className="btn btn-naver" style={{ width: "100%" }}>패키지 상담</a>
            </div>
            <div className="pricing-card" style={{ borderColor: "var(--accent)" }}>
              <h3>맞춤 제작</h3>
              <div className="price">별도 견적</div>
              <p className="price-note">원하는 자동화를 새로 개발</p>
              <ul className="pricing-features">
                <li><CheckIcon /> 신규 자동화 프로그램 개발</li>
                <li><CheckIcon /> 기존 프로그램 커스터마이징</li>
                <li><CheckIcon /> 업무 프로세스 분석 포함</li>
                <li><CheckIcon /> 전담 개발자 배정</li>
              </ul>
              <a href="#contact" className="btn btn-outline" style={{ width: "100%", borderColor: "var(--accent)", color: "var(--accent)" }}>제작 문의</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="faq-section fade-in">
        <div className="container">
          <div className="section-header">
            <h2>자주 묻는 질문</h2>
          </div>
          <div className="faq-list">
            {faqItems.map((item, i) => (
              <div key={i} className="faq-item">
                <button className={`faq-question${activeFaq === i ? " active" : ""}`} onClick={() => toggleFaq(i)}>
                  {item.q}
                  <ChevronDown />
                </button>
                <div className="faq-answer" ref={(el) => { faqRefs.current[i] = el; }}>
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section fade-in">
        <div className="container">
          <div className="section-header">
            <h2>문의하기</h2>
            <p>관심 있는 솔루션을 알려주시면 빠르게 안내드리겠습니다.</p>
          </div>
          <div className="contact-wrapper">
            <div className="contact-form-card">
              {!formSubmitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">담당자명 *</label>
                    <input type="text" id="name" name="name" placeholder="홍길동" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">회사/업체명</label>
                    <input type="text" id="company" name="company" placeholder="회사명 또는 업체명" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact">연락처 (이메일 또는 전화번호) *</label>
                    <input type="text" id="contact" name="contact" placeholder="email@example.com 또는 010-0000-0000" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="solution">관심 솔루션 *</label>
                    <select id="solution" name="solution" required defaultValue="">
                      <option value="" disabled>선택해 주세요</option>
                      <optgroup label="개별 솔루션">
                        <option value="blog-solution">네이버 블로그 솔루션 프로그램 (원고 편집기)</option>
                        <option value="blogger-collector">네이버 블로거 수집기 (계정 수급)</option>
                        <option value="cafe-posting">네이버 카페 포스팅 자동화</option>
                      </optgroup>
                      <optgroup label="패키지 & 맞춤 제작">
                        <option value="package-all">올인원 패키지 (3개 전체)</option>
                        <option value="package-custom">2개 조합 패키지</option>
                        <option value="custom-new">맞춤 제작 - 새로운 자동화 개발</option>
                        <option value="custom-modify">맞춤 제작 - 기존 프로그램 커스터마이징</option>
                        <option value="other">기타 문의</option>
                      </optgroup>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">문의 내용</label>
                    <textarea id="message" name="message" placeholder="사용 목적, 예상 사용량, 필요한 기능 등을 알려주시면 더 정확한 안내가 가능합니다."></textarea>
                  </div>
                  <button type="submit" className="btn btn-naver form-submit" disabled={formLoading}>
                    {formLoading ? "전송 중..." : "문의 보내기"}
                  </button>
                </form>
              ) : (
                <div className="form-success active">
                  <svg width="56" height="56" fill="none" stroke="#10B981" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-5" /></svg>
                  <h3>문의가 접수되었습니다</h3>
                  <p>영업일 기준 1일 이내 연락드리겠습니다.<br />급한 문의는 카카오톡 채널로 연락해 주세요.</p>
                </div>
              )}
            </div>
            <div className="contact-info-card">
              <a href="https://pf.kakao.com/_gSShX" className="kakao-btn-large" target="_blank" rel="noopener">
                <KakaoIcon />
                카카오톡으로 문의하기
              </a>
              <div className="contact-method">
                <div className="contact-method-icon kakao">
                  <KakaoIcon size={18} />
                </div>
                <div>
                  <h4>카카오톡 채널</h4>
                  <p>평일 10:00 - 18:00 실시간 상담</p>
                </div>
              </div>
              <div className="contact-method">
                <div className="contact-method-icon email">
                  <svg width="18" height="18" fill="none" stroke="#2563EB" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6l-10 7L2 6" /></svg>
                </div>
                <div>
                  <h4>이메일 문의</h4>
                  <p>24시간 접수 가능</p>
                </div>
              </div>
              <div style={{ background: "var(--white)", borderRadius: "var(--radius)", padding: "18px", boxShadow: "var(--shadow-sm)", border: "1px dashed var(--gray-300)" }}>
                <p style={{ fontSize: "0.82rem", color: "var(--gray-500)", lineHeight: 1.7 }}>
                  <strong style={{ color: "var(--dark)" }}>응답 안내</strong><br />
                  문의 접수 후 영업일 기준 1일 이내 회신드립니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container footer-inner">
          <div>
            <div className="footer-logo">Auto<span>Flow</span></div>
            <p style={{ marginTop: "4px" }}>by 뉴데브 (NewDev)</p>
          </div>
          <p>&copy; 2026 NewDev. All rights reserved.</p>
        </div>
      </footer>

      {/* Kakao floating button */}
      <a href="https://pf.kakao.com/_gSShX" className="kakao-float" target="_blank" rel="noopener">
        <div className="kakao-float-btn">
          <KakaoIcon size={28} />
        </div>
        <span className="kakao-float-label">바로 상담</span>
      </a>
    </>
  );
}
