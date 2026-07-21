import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  Check,
  Inbox,
  LockKeyhole,
  LogOut,
  ShieldCheck,
  X,
} from 'lucide-react'
import type { User } from 'firebase/auth'
import {
  isFirebaseConfigured,
  isModerator,
  moderateComment,
  signInModerator,
  signOutModerator,
  subscribeToAuthState,
  subscribeToModerationQueue,
  type ModerationComment,
} from '../lib/firebase'

type Filter = 'pending' | 'approved' | 'rejected'

function formatDate(date: Date | null) {
  if (!date) return 'Just now'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [comments, setComments] = useState<ModerationComment[]>([])
  const [filter, setFilter] = useState<Filter>('pending')
  const [error, setError] = useState('')
  const [workingId, setWorkingId] = useState('')

  useEffect(() => subscribeToAuthState((nextUser) => {
    setUser(nextUser)
    setAuthLoading(false)
  }), [])

  useEffect(() => {
    if (!isModerator(user)) return
    return subscribeToModerationQueue(setComments, () => {
      setError('The moderation queue could not be loaded. Check the Firestore rules and try again.')
    })
  }, [user])

  const visibleComments = useMemo(
    () => comments.filter((comment) => comment.status === filter),
    [comments, filter],
  )

  const counts = useMemo(() => ({
    pending: comments.filter((comment) => comment.status === 'pending').length,
    approved: comments.filter((comment) => comment.status === 'approved').length,
    rejected: comments.filter((comment) => comment.status === 'rejected').length,
  }), [comments])

  async function handleSignIn() {
    setError('')
    try {
      await signInModerator()
    } catch (signInError) {
      setError(signInError instanceof Error ? signInError.message : 'Sign-in failed.')
    }
  }

  async function handleModeration(commentId: string, decision: 'approved' | 'rejected') {
    setError('')
    setWorkingId(commentId)
    try {
      await moderateComment(commentId, decision)
    } catch (moderationError) {
      setError(moderationError instanceof Error ? moderationError.message : 'The comment could not be updated.')
    } finally {
      setWorkingId('')
    }
  }

  if (authLoading) {
    return <main className="admin-gate"><p>Checking moderator access…</p></main>
  }

  if (!isFirebaseConfigured || !isModerator(user)) {
    return (
      <main className="admin-gate">
        <div className="admin-gate-card">
          <span className="admin-lock"><LockKeyhole size={27} /></span>
          <div className="brand admin-brand">
            <span className="brand-mark" aria-hidden="true">MA</span>
            <span><strong>Makedon Academy</strong><small>Moderation desk</small></span>
          </div>
          <h1>Owner access</h1>
          <p>Sign in with the authorized Google account to review community comments.</p>
          <button data-testid="admin-signin" className="button button-primary admin-signin" type="button" onClick={handleSignIn} disabled={!isFirebaseConfigured}>
            Sign in with Google
          </button>
          {error && <p className="admin-error" role="alert">{error}</p>}
          {!isFirebaseConfigured && <p className="admin-error">Firebase must be connected before sign-in is available.</p>}
          <a className="admin-back" href="#top"><ArrowLeft size={15} /> Return to the newsletter</a>
        </div>
      </main>
    )
  }

  return (
    <main className="admin-dashboard">
      <header className="admin-header">
        <div className="brand admin-brand">
          <span className="brand-mark" aria-hidden="true">MA</span>
          <span><strong>Makedon Academy</strong><small>Moderation desk</small></span>
        </div>
        <div className="admin-account">
          <span><strong>{user.displayName ?? 'Moderator'}</strong><small>{user.email}</small></span>
          <button type="button" onClick={signOutModerator}><LogOut size={16} /> Sign out</button>
        </div>
      </header>

      <div className="admin-shell">
        <div className="admin-title-row">
          <div>
            <p className="section-kicker"><ShieldCheck size={15} /> Private workspace</p>
            <h1>Community moderation</h1>
            <p>Review each submission for privacy, kindness, and relevance before publishing it.</p>
          </div>
          <a href="#top"><ArrowLeft size={15} /> View newsletter</a>
        </div>

        <div className="admin-tabs" role="tablist" aria-label="Comment status">
          {(['pending', 'approved', 'rejected'] as Filter[]).map((status) => (
            <button
              key={status}
              type="button"
              role="tab"
              aria-selected={filter === status}
              className={filter === status ? 'active' : ''}
              onClick={() => setFilter(status)}
            >
              {status}<span>{counts[status]}</span>
            </button>
          ))}
        </div>

        {error && <p className="admin-banner-error" role="alert">{error}</p>}

        <section className="moderation-list" aria-live="polite">
          {visibleComments.length === 0 && (
            <div className="admin-empty">
              <Inbox size={31} />
              <h2>No {filter} comments</h2>
              <p>Comments with this status will appear here.</p>
            </div>
          )}

          {visibleComments.map((comment) => (
            <article className="moderation-card" key={comment.id}>
              <div className="moderation-meta">
                <span className="comment-avatar" aria-hidden="true">{comment.displayName.slice(0, 1).toUpperCase()}</span>
                <div><strong>{comment.displayName}</strong><small>{comment.role} · {formatDate(comment.createdAt)}</small></div>
                <span className={`status-pill ${comment.status}`}>{comment.status}</span>
              </div>
              <p>{comment.message}</p>
              <div className="moderation-footer">
                <small>Update: {comment.updateId}</small>
                <div>
                  {comment.status !== 'rejected' && (
                    <button className="reject-button" type="button" disabled={workingId === comment.id} onClick={() => handleModeration(comment.id, 'rejected')}>
                      <X size={15} /> Reject
                    </button>
                  )}
                  {comment.status !== 'approved' && (
                    <button className="approve-button" type="button" disabled={workingId === comment.id} onClick={() => handleModeration(comment.id, 'approved')}>
                      <Check size={15} /> Approve
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}
