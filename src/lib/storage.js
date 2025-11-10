// src/lib/storage.js
import { supabase } from './supabase.js'

export async function uploadFileForUser(userId, file, bucket = 'user-uploads') {
  const path = `${userId}/${Date.now()}-${file.name}`
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })
  if (error) throw error
  return path
}

export async function createSignedUrl(path, expiresInSec = 300, bucket = 'user-uploads') {
  const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, expiresInSec)
  if (error) throw error
  return data.signedUrl
}

export async function listMyFiles(userId, bucket = 'user-uploads') {
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(`${userId}`, { limit: 100, sortBy: { column: 'created_at', order: 'desc' } })
  if (error) throw error
  return data || []
}

export async function removeFile(path, bucket = 'user-uploads') {
  const { error } = await supabase.storage.from(bucket).remove([path])
  if (error) throw error
}
