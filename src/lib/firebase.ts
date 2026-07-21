import { initializeApp } from 'firebase/app'
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth'
import {
  Timestamp,
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  doc,
  where,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId,
)

const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null
const db = app ? getFirestore(app) : null
const auth = app ? getAuth(app) : null

export const moderatorEmail = import.meta.env.VITE_MODERATOR_EMAIL?.toLowerCase().trim() ?? ''

type Subscription = {
  firstName: string
  email: string
  role: string
}

type Feedback = {
  name: string
  email: string
  topic: string
  message: string
}

export type PublicComment = {
  id: string
  displayName: string
  role: string
  message: string
  createdAt: Date | null
}

export type ModerationComment = PublicComment & {
  updateId: string
  status: 'pending' | 'approved' | 'rejected'
  approved: boolean
}

type NewComment = {
  updateId: string
  displayName: string
  role: string
  message: string
}

function savePreviewItem(key: string, value: object) {
  const existing = JSON.parse(localStorage.getItem(key) ?? '[]') as object[]
  localStorage.setItem(key, JSON.stringify([...existing, { ...value, createdAt: new Date().toISOString() }]))
}

export async function createSubscription(data: Subscription) {
  if (db) {
    await addDoc(collection(db, 'newsletter_subscribers'), {
      ...data,
      email: data.email.toLowerCase().trim(),
      createdAt: serverTimestamp(),
      source: 'community-update',
    })
    return
  }

  savePreviewItem('makedon-academy-preview-subscribers', data)
}

export async function createFeedback(data: Feedback) {
  if (db) {
    await addDoc(collection(db, 'family_feedback'), {
      ...data,
      createdAt: serverTimestamp(),
      status: 'new',
      source: 'community-update',
    })
    return
  }

  savePreviewItem('makedon-academy-preview-feedback', data)
}

export async function createComment(data: NewComment) {
  const cleanData = {
    updateId: data.updateId,
    displayName: data.displayName.trim(),
    role: data.role,
    message: data.message.trim(),
  }

  if (db) {
    await addDoc(collection(db, 'update_comments'), {
      ...cleanData,
      approved: false,
      status: 'pending',
      createdAt: serverTimestamp(),
      source: 'community-update',
    })
    return
  }

  savePreviewItem('makedon-academy-preview-comments', {
    ...cleanData,
    approved: false,
    status: 'pending',
  })
}

export function subscribeToApprovedComments(
  updateId: string,
  onComments: (comments: PublicComment[]) => void,
  onError: () => void,
) {
  if (!db) {
    onComments([])
    return () => undefined
  }

  const commentsQuery = query(
    collection(db, 'update_comments'),
    where('updateId', '==', updateId),
    where('approved', '==', true),
    where('status', '==', 'approved'),
    orderBy('createdAt', 'desc'),
  )

  return onSnapshot(
    commentsQuery,
    (snapshot) => {
      onComments(snapshot.docs.map((comment) => {
        const data = comment.data()
        return {
          id: comment.id,
          displayName: String(data.displayName),
          role: String(data.role),
          message: String(data.message),
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : null,
        }
      }))
    },
    () => onError(),
  )
}

export function subscribeToAuthState(onUser: (user: User | null) => void) {
  if (!auth) {
    onUser(null)
    return () => undefined
  }
  return onAuthStateChanged(auth, onUser)
}

export function isModerator(user: User | null): user is User {
  return Boolean(
    user?.email
      && user.emailVerified
      && moderatorEmail
      && user.email.toLowerCase() === moderatorEmail,
  )
}

export async function signInModerator() {
  if (!auth) throw new Error('Firebase is not configured.')
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })
  const result = await signInWithPopup(auth, provider)
  if (!isModerator(result.user)) {
    await signOut(auth)
    throw new Error('This Google account is not authorized to moderate comments.')
  }
  return result.user
}

export async function signOutModerator() {
  if (auth) await signOut(auth)
}

export function subscribeToModerationQueue(
  onComments: (comments: ModerationComment[]) => void,
  onError: () => void,
) {
  if (!db) {
    onComments([])
    return () => undefined
  }

  const moderationQuery = query(
    collection(db, 'update_comments'),
    orderBy('createdAt', 'desc'),
  )

  return onSnapshot(
    moderationQuery,
    (snapshot) => {
      onComments(snapshot.docs.map((comment) => {
        const data = comment.data()
        return {
          id: comment.id,
          updateId: String(data.updateId),
          displayName: String(data.displayName),
          role: String(data.role),
          message: String(data.message),
          status: data.status as ModerationComment['status'],
          approved: Boolean(data.approved),
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : null,
        }
      }))
    },
    () => onError(),
  )
}

export async function moderateComment(
  commentId: string,
  decision: 'approved' | 'rejected',
) {
  if (!db || !auth?.currentUser || !isModerator(auth.currentUser)) {
    throw new Error('Moderator access is required.')
  }

  await updateDoc(doc(db, 'update_comments', commentId), {
    approved: decision === 'approved',
    status: decision,
    moderatedAt: serverTimestamp(),
    moderatedBy: auth.currentUser.email,
  })
}
