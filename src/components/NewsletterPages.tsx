import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  MessageCircle,
  Sparkles,
} from 'lucide-react'
import CommentsSection from './CommentsSection'
import { newsletterIssues, type NewsletterIssue } from '../data/newsletters'

function issueHref(issue: NewsletterIssue) {
  return './?update=' + encodeURIComponent(issue.slug)
}

export function NewsletterArchive() {
  const newestFirst = [...newsletterIssues].reverse()

  return (
    <main id="main-content" className="updates-page">
      <section className="updates-archive-hero" aria-labelledby="updates-archive-title">
        <div className="section-shell archive-hero-grid">
          <div>
            <p className="eyebrow"><Sparkles size={14} /> News from our halls</p>
            <h1 id="updates-archive-title">Makedon Academy Weekly</h1>
          </div>
          <p>Clear, useful updates from Principal Havee Makedon—what families need to know, what students are experiencing, and what comes next.</p>
        </div>
      </section>

      <section className="updates-archive-section" aria-label="Weekly newsletter archive">
        <div className="section-shell">
          <div className="archive-heading">
            <div>
              <p className="section-kicker">2026–27 school year</p>
              <h2>Every issue, in one place.</h2>
            </div>
            <p>Each page preserves the original issue date and follows the same warm, practical rhythm families receive each week.</p>
          </div>

          <div className="issue-card-grid">
            {newestFirst.map((issue) => {
              const chronologicalIndex = newsletterIssues.findIndex((item) => item.slug === issue.slug)
              return (
                <a className="issue-card" href={issueHref(issue)} key={issue.updateId}>
                  <div className="issue-card-meta">
                    <span>Issue {String(chronologicalIndex + 1).padStart(2, '0')}</span>
                    <time dateTime={issue.date}>{issue.dateLabel}</time>
                  </div>
                  <h3>{issue.title}</h3>
                  <p>{issue.intro}</p>
                  <span className="issue-card-link">Read this issue <ArrowRight size={16} /></span>
                </a>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

type NewsletterIssuePageProps = {
  issue: NewsletterIssue
}

export function NewsletterIssuePage({ issue }: NewsletterIssuePageProps) {
  const issueIndex = newsletterIssues.findIndex((item) => item.slug === issue.slug)
  const olderIssue = issueIndex > 0 ? newsletterIssues[issueIndex - 1] : undefined
  const newerIssue = issueIndex < newsletterIssues.length - 1 ? newsletterIssues[issueIndex + 1] : undefined

  return (
    <main id="main-content" className="weekly-issue-page">
      <section className="weekly-issue-hero" aria-labelledby="weekly-issue-title">
        <div className="section-shell">
          <a className="archive-back-link" href="./?view=updates"><ArrowLeft size={16} /> All weekly updates</a>
          <div className="weekly-issue-hero-grid">
            <div>
              <p className="eyebrow"><Sparkles size={14} /> Makedon Academy Weekly</p>
              <h1 id="weekly-issue-title">{issue.title}</h1>
              <p className="weekly-issue-intro">{issue.intro}</p>
            </div>
            <div className="weekly-date-card">
              <span>Published</span>
              <time dateTime={issue.date}>{issue.dateLabel}</time>
              <small>From Principal Havee Makedon</small>
            </div>
          </div>
          <ul className="weekly-highlights" aria-label="At a glance">
            {issue.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
          </ul>
        </div>
      </section>

      <section className="weekly-issue-content">
        <div className="section-shell weekly-content-grid">
          <div className="weekly-story-list">
            {issue.sections.map((section, index) => (
              <article className="weekly-story" key={section.title}>
                <div className="weekly-story-number">{String(index + 1).padStart(2, '0')}</div>
                <div>
                  <p className="section-kicker">{section.eyebrow}</p>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.items && (
                    <ul>
                      {section.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  )}
                </div>
              </article>
            ))}

            <div className="weekly-signoff">
              <span className="weekly-signoff-mark" aria-hidden="true">HM</span>
              <div>
                <p>Thank you for reading and for being an active part of our school community.</p>
                <strong>Havee Makedon</strong>
                <small>Principal, Makedon Academy</small>
              </div>
            </div>
          </div>

          <aside className="weekly-sidebar" aria-label="Issue information">
            <div className="weekly-dates-card">
              <CalendarDays size={23} />
              <p className="section-kicker">Mark your calendar</p>
              <h2>Important dates</h2>
              <ul>
                {issue.importantDates.map((item) => (
                  <li key={item.date + item.label}>
                    <strong>{item.date}</strong>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="weekly-response-note">
              <MessageCircle size={20} />
              <div>
                <strong>Join the conversation</strong>
                <p>Each weekly issue has its own moderated family comment thread below.</p>
              </div>
            </div>
            <div className="weekly-access-note">
              <Clock3 size={19} />
              <p>Updates are designed for quick reading on a phone and can also be shared in print or translation.</p>
            </div>
          </aside>
        </div>
      </section>

      <nav className="issue-pagination section-shell" aria-label="Weekly issue navigation">
        {olderIssue ? (
          <a href={issueHref(olderIssue)}>
            <ArrowLeft size={17} />
            <span><small>Earlier issue</small>{olderIssue.dateLabel}</span>
          </a>
        ) : <span />}
        {newerIssue ? (
          <a href={issueHref(newerIssue)}>
            <span><small>Next issue</small>{newerIssue.dateLabel}</span>
            <ArrowRight size={17} />
          </a>
        ) : (
          <a href="./?view=updates">
            <span><small>Browse</small>All issues</span>
            <ArrowRight size={17} />
          </a>
        )}
      </nav>

      <CommentsSection updateId={issue.updateId} />
    </main>
  )
}
