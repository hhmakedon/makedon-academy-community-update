import { FormEvent, useEffect, useState } from 'react'
import { Check, MessageCircle, Send, ShieldCheck } from 'lucide-react'
import {
  createComment,
  isFirebaseConfigured,
  subscribeToApprovedComments,
  type PublicComment,
} from '../lib/firebase'

type CommentsSectionProps = {
  updateId: string
  sectionId?: string
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

function formatCommentDate(date: Date | null) {
  if (!date) return 'Recently'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export default function CommentsSection({ updateId, sectionId }: CommentsSectionProps) {
  const [comments, setComments] = useState<PublicComment[]>([])
  const [loading, setLoading] = useState(isFirebaseConfigured)
  const [loadError, setLoadError] = useState(false)
  const [status, setStatus] = useState<SubmitState>('idle')
  const idPrefix = `comments-${updateId}`
  const resolvedSectionId = sectionId ?? idPrefix

  useEffect(() => {
    const unsubscribe = subscribeToApprovedComments(
      updateId,
      (nextComments) => {
        setComments(nextComments)
        setLoading(false)
        setLoadError(false)
      },
      () => {
        setLoading(false)
        setLoadError(true)
      },
    )

    return unsubscribe
  }, [updateId])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    if (formData.get('commentWebsite')) return

    setStatus('submitting')
    try {
      await createComment({
        updateId,
        displayName: String(formData.get('commentName') ?? '').trim(),
        role: String(formData.get('commentRole') ?? 'Family member'),
        message: String(formData.get('commentMessage') ?? '').trim(),
      })
      form.reset()
      setStatus('success')
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  return (
    <section
      className="comments-section"
      id={resolvedSectionId}
      aria-labelledby={`${idPrefix}-title`}
      data-update-id={updateId}
    >
      <div className="section-shell">
        <div className="comments-heading">
          <div>
            <p className="section-kicker">Community conversation</p>
            <h2 id={`${idPrefix}-title`}>Continue the conversation.</h2>
          </div>
          <div className="moderation-badge">
            <ShieldCheck size={18} />
            <span><strong>Thoughtfully moderated</strong> for privacy, kindness, and relevance</span>
          </div>
        </div>

        <div className="comments-layout">
          <div className="comment-thread" aria-live="polite">
            <div className="thread-title">
              <h3>Community comments</h3>
              <span>{comments.length} {comments.length === 1 ? 'comment' : 'comments'}</span>
            </div>

            {loading && <p className="thread-state">Loading the conversation…</p>}
            {loadError && (
              <p className="thread-state error">Comments are temporarily unavailable. Please check back soon.</p>
            )}
            {!loading && !loadError && comments.length === 0 && (
              <div className="empty-comments">
                <span><MessageCircle size={25} /></span>
                <h3>Be part of the conversation.</h3>
                <p>There are no published comments yet. Share a thoughtful response using the form.</p>
              </div>
            )}
            {comments.map((comment) => (
              <article className="comment-card" key={comment.id}>
                <div className="comment-avatar" aria-hidden="true">
                  {comment.displayName.slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <div className="comment-meta">
                    <strong>{comment.displayName}</strong>
                    <span>{comment.role}</span>
                    <time dateTime={comment.createdAt?.toISOString()}>{formatCommentDate(comment.createdAt)}</time>
                  </div>
                  <p>{comment.message}</p>
                </div>
              </article>
            ))}
          </div>

          <form className="comment-form" onSubmit={handleSubmit} data-update-id={updateId}>
            <div className="comment-form-intro">
              <p className="section-kicker">Add your voice</p>
              <h3>Share a response</h3>
              <p>What resonated with you? What should we keep in mind as this work continues?</p>
            </div>
            <div className="field">
              <label htmlFor={`${idPrefix}-name`}>Display name <span aria-hidden="true">*</span></label>
              <input id={`${idPrefix}-name`} name="commentName" autoComplete="name" placeholder="First name and last initial" minLength={2} maxLength={60} required />
              <small>Use a name you are comfortable displaying publicly after approval.</small>
            </div>
            <div className="field">
              <label htmlFor={`${idPrefix}-role`}>I am a…</label>
              <select id={`${idPrefix}-role`} name="commentRole" defaultValue="Family member">
                <option>Family member</option>
                <option>Staff member</option>
                <option>Student</option>
                <option>Community member</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor={`${idPrefix}-message`}>Comment <span aria-hidden="true">*</span></label>
              <textarea id={`${idPrefix}-message`} name="commentMessage" rows={5} placeholder="Write a thoughtful, community-centered response…" minLength={20} maxLength={800} required />
              <small>Do not include student names, private records, or urgent safety concerns.</small>
            </div>
            <div className="honeypot" aria-hidden="true">
              <label htmlFor={`${idPrefix}-website`}>Website</label>
              <input id={`${idPrefix}-website`} name="commentWebsite" tabIndex={-1} autoComplete="off" />
            </div>
            <button className="button button-coral comment-submit" type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Submitting…' : 'Submit for review'}
              {status === 'success' ? <Check size={17} /> : <Send size={17} />}
            </button>
            <p className={`comment-form-status ${status}`} role="status">
              {status === 'success' && (
                <><Check size={16} /> Thank you. Your comment was submitted and will appear after review.</>
              )}
              {status === 'error' && 'We couldn’t submit your comment. Please try again.'}
            </p>
            {!isFirebaseConfigured && (
              <p className="comment-preview-note">Preview mode: this submission is saved only in your browser.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
