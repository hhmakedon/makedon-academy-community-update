import { FormEvent, useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  HeartHandshake,
  Mail,
  Menu,
  MessageCircle,
  Quote,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react'
import { createFeedback, createSubscription, isFirebaseConfigured } from './lib/firebase'
import CommentsSection from './components/CommentsSection'
import AdminDashboard from './components/AdminDashboard'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

const commitments = [
  {
    number: '01',
    icon: Users,
    title: 'Every student is known',
    text: 'We will ask whether every student can name an adult in the building they trust.',
  },
  {
    number: '02',
    icon: HeartHandshake,
    title: 'Every classroom welcomes',
    text: 'We will listen for what helps students feel safe, connected, and ready to learn.',
  },
  {
    number: '03',
    icon: ShieldCheck,
    title: 'Support arrives early',
    text: 'We will pay attention to patterns so students who are struggling are noticed sooner.',
  },
]

const cycle = [
  { step: 'Listen', detail: 'Hear from students, families, and staff.' },
  { step: 'Learn', detail: 'Look for strengths, needs, and patterns.' },
  { step: 'Act', detail: 'Choose focused, practical next steps.' },
  { step: 'Share', detail: 'Report what we learn and what changes.' },
]

function Header() {
  const [open, setOpen] = useState(false)
  const closeMenu = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#top" aria-label="Makedon Academy Community Update home">
          <span className="brand-mark" aria-hidden="true">MA</span>
          <span>
            <strong>Makedon Academy</strong>
            <small>Community Update</small>
          </span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Primary navigation">
          <a href="#welcome" onClick={closeMenu}>Welcome</a>
          <a href="#focus" onClick={closeMenu}>Our focus</a>
          <a href="#approach" onClick={closeMenu}>Our approach</a>
          <a href="#comments" onClick={closeMenu}>Comments</a>
          <a className="nav-cta" href="#connect" onClick={closeMenu}>Connect with us <ArrowRight size={15} /></a>
        </nav>
      </div>
    </header>
  )
}

function NewsletterForm() {
  const [status, setStatus] = useState<SubmitState>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    if (formData.get('website')) return

    setStatus('submitting')
    try {
      await createSubscription({
        firstName: String(formData.get('firstName') ?? '').trim(),
        email: String(formData.get('email') ?? '').trim(),
        role: String(formData.get('role') ?? 'Family member'),
      })
      form.reset()
      setStatus('success')
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <div className="field compact-field">
        <label htmlFor="firstName">First name</label>
        <input id="firstName" name="firstName" autoComplete="given-name" placeholder="Your first name" maxLength={60} />
      </div>
      <div className="field compact-field">
        <label htmlFor="email">Email address <span aria-hidden="true">*</span></label>
        <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={160} />
      </div>
      <div className="field compact-field">
        <label htmlFor="role">I am a…</label>
        <select id="role" name="role" defaultValue="Family member">
          <option>Family member</option>
          <option>Staff member</option>
          <option>Community member</option>
        </select>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <button className="button button-light signup-button" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Joining…' : 'Join the list'}
        {status === 'success' ? <Check size={17} /> : <ArrowRight size={17} />}
      </button>
      <p className={`form-status ${status}`} role="status">
        {status === 'success' && 'You’re on the list. Thank you for staying connected!'}
        {status === 'error' && 'We couldn’t save your information. Please try again.'}
      </p>
    </form>
  )
}

function FeedbackForm() {
  const [status, setStatus] = useState<SubmitState>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    if (formData.get('company')) return

    setStatus('submitting')
    try {
      await createFeedback({
        name: String(formData.get('name') ?? '').trim(),
        email: String(formData.get('feedbackEmail') ?? '').trim(),
        topic: String(formData.get('topic') ?? 'A question'),
        message: String(formData.get('message') ?? '').trim(),
      })
      form.reset()
      setStatus('success')
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="success-card" role="status">
        <span className="success-icon"><Check size={24} /></span>
        <h3>Thank you for reaching out.</h3>
        <p>Your perspective matters, and your message has been received.</p>
        <button className="text-button" type="button" onClick={() => setStatus('idle')}>Send another message</button>
      </div>
    )
  }

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Name <span className="optional">Optional</span></label>
          <input id="name" name="name" autoComplete="name" placeholder="Your name" maxLength={100} />
        </div>
        <div className="field">
          <label htmlFor="feedbackEmail">Email <span className="optional">Optional</span></label>
          <input id="feedbackEmail" name="feedbackEmail" type="email" autoComplete="email" placeholder="For a reply" maxLength={160} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="topic">What would you like to share?</label>
        <select id="topic" name="topic" defaultValue="A question">
          <option>A question</option>
          <option>Something working well</option>
          <option>An idea for improvement</option>
          <option>A concern</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">Message <span aria-hidden="true">*</span></label>
        <textarea id="message" name="message" rows={5} placeholder="What would you like me to know?" minLength={10} maxLength={1500} required />
        <small>Please do not include private student records or urgent safety concerns in this form.</small>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <button className="button button-primary" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send your message'} <ArrowRight size={17} />
      </button>
      <p className={`form-status ${status}`} role="status">
        {status === 'error' && 'We couldn’t send your message. Please try again.'}
      </p>
    </form>
  )
}

function App() {
  const [adminMode, setAdminMode] = useState(window.location.hash === '#/admin')

  useEffect(() => {
    const handleHashChange = () => setAdminMode(window.location.hash === '#/admin')
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (adminMode) return <AdminDashboard />

  return (
    <div id="top">
      <Header />
      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow"><Sparkles size={14} /> A new school year · A shared purpose</p>
              <h1 id="hero-title">Belonging, growth, and a strong start—<em>together.</em></h1>
              <p className="hero-lede">A welcome message from Havee Makedon, your new principal, and an invitation to help shape what comes next at Makedon Academy.</p>
              <div className="hero-actions">
                <a className="button button-coral" href="#welcome">Read the welcome <ArrowDown size={17} /></a>
                <a className="text-link" href="#connect">Share your perspective <ArrowRight size={16} /></a>
              </div>
            </div>
            <div className="hero-art" aria-label="This year's focus is belonging and student wellbeing">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="focus-card">
                <span className="focus-label">2026–27 focus</span>
                <HeartHandshake size={42} strokeWidth={1.5} />
                <strong>Belonging &amp;<br />student wellbeing</strong>
                <span className="focus-rule" />
                <small>Every student known.<br />Every voice valued.</small>
              </div>
              <span className="art-note note-one">LISTEN</span>
              <span className="art-note note-two">LEARN</span>
              <span className="art-note note-three">GROW</span>
            </div>
          </div>
          <div className="hero-band" aria-hidden="true">
            <span>MAKEDON ACADEMY</span><span>•</span><span>COMMUNITY UPDATE · ISSUE 01</span><span>•</span><span>2026–27 SCHOOL YEAR</span>
          </div>
        </section>

        <section className="letter-section" id="welcome" aria-labelledby="welcome-title">
          <div className="section-shell letter-grid">
            <aside className="letter-aside">
              <p className="section-kicker">A note from your principal</p>
              <div className="portrait-placeholder" aria-hidden="true">
                <span>HM</span>
              </div>
              <div className="principal-card">
                <strong>Havee Makedon</strong>
                <span>Principal</span>
                <span>Makedon Academy</span>
              </div>
              <div className="aside-quote">
                <Quote size={21} />
                <p>Middle school is not a pause between childhood and high school. It is a powerful season of becoming.</p>
              </div>
            </aside>
            <article className="letter-body">
              <span className="issue-tag">WELCOME · AUGUST 2026</span>
              <h2 id="welcome-title">Dear Makedon Academy Families,</h2>
              <p className="dropcap">My name is Havee Makedon, and it is my honor to introduce myself as the new principal of Makedon Academy. I have spent my career at the intersection of teaching and technology, and I came into this role because I believe the middle school years are some of the most important in a young person's life. I am grateful to be walking into this one with your children.</p>
              <p>Let me tell you what I believe our school is for. Makedon Academy is a place where every learner belongs and is empowered to reach their full potential. My vision is for your child to leave here capable, confident, empathetic, and resilient, ready for high school and for whatever comes after it. That is the standard I hold for every student who walks through our doors, and it is the promise I am asking our staff and our families to work toward together.</p>
              <blockquote>
                <span>Our promise</span>
                “Every learner belongs and is empowered to reach their full potential.”
              </blockquote>
              <p>Over the summer I spent time looking closely at our school's data. Not only test scores, but also what our students have told us about how safe and connected they feel here. One thing stood out to me. Middle schoolers learn best when they feel they belong, and that sense of belonging is not automatic at this age. It has to be built on purpose.</p>
              <p>So the first area I will focus on this year is belonging and student wellbeing. In practical terms, that means paying attention to whether every student has an adult in the building they trust, whether our classrooms feel welcoming, and whether students who are struggling get noticed early rather than late. I will be listening to students and to you as I learn where we are strong and where we can grow.</p>
              <p>You know your child better than anyone, and I want to hear from you. My door is open, and I will share more as this work takes shape. Thank you for trusting us with your children. I am looking forward to a great year.</p>
              <div className="signature">
                <span>Warmly,</span>
                <strong>Havee Makedon</strong>
                <small>Principal, Makedon Academy</small>
              </div>
            </article>
          </div>
        </section>

        <section className="focus-section" id="focus" aria-labelledby="focus-title">
          <div className="section-shell">
            <div className="section-heading split-heading">
              <div>
                <p className="section-kicker light">Our first focus</p>
                <h2 id="focus-title">What belonging looks like in practice.</h2>
              </div>
              <p>Belonging is more than a feeling. It shows up in the everyday experiences that help young people feel seen, supported, and ready to learn.</p>
            </div>
            <div className="commitment-grid">
              {commitments.map(({ number, icon: Icon, title, text }) => (
                <article className="commitment-card" key={number}>
                  <div className="commitment-top"><span>{number}</span><Icon size={29} strokeWidth={1.6} /></div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span className="card-line" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="approach-section" id="approach" aria-labelledby="approach-title">
          <div className="section-shell">
            <div className="approach-grid">
              <div className="approach-copy">
                <p className="section-kicker">How we improve</p>
                <h2 id="approach-title">A continuous cycle, shared in plain language.</h2>
                <p>School improvement is not a one-time initiative. It is a steady habit of listening closely, learning from the full picture, taking focused action, and reporting back to our community.</p>
                <div className="transparency-note">
                  <BookOpen size={23} />
                  <div>
                    <strong>Data with context</strong>
                    <p>Numbers can reveal a pattern, but people help us understand it. Student and family voices will always be part of the story.</p>
                  </div>
                </div>
              </div>
              <ol className="cycle-list">
                {cycle.map((item, index) => (
                  <li key={item.step}>
                    <span className="cycle-number">{String(index + 1).padStart(2, '0')}</span>
                    <div><strong>{item.step}</strong><p>{item.detail}</p></div>
                    {index < cycle.length - 1 && <ChevronRight size={19} aria-hidden="true" />}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="questions-section" aria-labelledby="questions-title">
          <div className="section-shell questions-grid">
            <div className="question-intro">
              <p className="section-kicker light">Questions guiding our work</p>
              <h2 id="questions-title">What will we keep asking?</h2>
              <p>These questions will help us stay centered on students—not just on programs or numbers.</p>
            </div>
            <div className="question-list">
              <article><span>01</span><p>Do our students feel known and valued here?</p></article>
              <article><span>02</span><p>Whose experience may be missing from the story?</p></article>
              <article><span>03</span><p>What is working—and how do we know?</p></article>
              <article><span>04</span><p>What will we do next, and when will we share the result?</p></article>
            </div>
          </div>
        </section>

        <section className="subscribe-section" aria-labelledby="subscribe-title">
          <div className="section-shell subscribe-shell">
            <div className="subscribe-copy">
              <span className="mail-icon"><Mail size={24} /></span>
              <div>
                <p className="section-kicker light">Stay in the loop</p>
                <h2 id="subscribe-title">Get the next community update.</h2>
                <p>Short, useful updates on what we are learning and where we are headed.</p>
              </div>
            </div>
            <NewsletterForm />
          </div>
        </section>

        <section className="connect-section" id="connect" aria-labelledby="connect-title">
          <div className="section-shell connect-grid">
            <div className="connect-copy">
              <p className="section-kicker">Your voice matters</p>
              <h2 id="connect-title">What would you like me to know?</h2>
              <p>You know your child and this community in ways that school data never can. Share a question, a bright spot, or an idea for how we can grow.</p>
              <div className="response-promise">
                <MessageCircle size={23} />
                <p><strong>I am listening.</strong><br />Your feedback will help inform the questions we ask and the next steps we take.</p>
              </div>
              {!isFirebaseConfigured && (
                <p className="preview-notice"><strong>Preview mode:</strong> Forms save only in this browser until Firebase is connected.</p>
              )}
            </div>
            <FeedbackForm />
          </div>
        </section>

        <CommentsSection updateId="welcome-2026-27" />
      </main>

      <footer>
        <div className="section-shell footer-inner">
          <div className="brand footer-brand">
            <span className="brand-mark" aria-hidden="true">MA</span>
            <span><strong>Makedon Academy</strong><small>Community School</small></span>
          </div>
          <p>Belonging. Growth. A strong start—together.</p>
          <a href="#top">Back to top <ArrowDown className="up-arrow" size={15} /></a>
        </div>
      </footer>
    </div>
  )
}

export default App
