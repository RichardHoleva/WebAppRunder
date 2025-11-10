import { supabase } from './supabase.js'
import { uploadFileForUser, createSignedUrl, removeFile } from './storage.js'

export async function createEvent(eventData, imageFile = null) {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    let imageUrl = null

    // Upload image if provided
    if (imageFile) {
      const imagePath = await uploadFileForUser(user.id, imageFile, 'run-event')
      imageUrl = await createSignedUrl(imagePath, 31536000, 'run-event')
    }

    // Parse and format the date properly
    let startsAt
    if (eventData.date) {
      // Create a proper Date object from the input
      const date = new Date(eventData.date)
      const time = eventData.time || '00:00'
      const [hours, minutes] = time.split(':')
      
      // Set the time on the date
      date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0)
      
      // Convert to ISO string
      startsAt = date.toISOString()
    } else {
      throw new Error('Date is required')
    }

    // Create event in database - using user_id instead of created_by
    const { data, error } = await supabase
      .from('events')
      .insert({
        title: eventData.title,
        starts_at: startsAt,
        user_id: user.id,
        description: eventData.description || null,
        location: eventData.location,
        type_of_run: eventData.typeOfRun || 'free',
        ticket_price: eventData.typeOfRun === 'paid' ? eventData.ticketPrice : null,
        image_url: imageUrl
      })
      .select()
      .single()

    if (error) throw error

    return { success: true, event: data }
  } catch (error) {
    console.error('Error creating event:', error)
    return { success: false, error: error.message }
  }
}

// Update other functions similarly...
export async function getUserEvents() {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('user_id', user.id) // Changed from created_by to user_id
      .order('inserted_at', { ascending: false })

    if (error) throw error

    return { success: true, events: data || [] }
  } catch (error) {
    console.error('Error getting user events:', error)
    return { success: false, error: error.message }
  }
}

export async function getAllEvents() {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('starts_at', { ascending: true }) // Changed from date to starts_at

    if (error) throw error

    return { success: true, events: data || [] }
  } catch (error) {
    console.error('Error getting all events:', error)
    return { success: false, error: error.message }
  }
}

export async function getJoinedEvents() {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .contains('participants', [user.id]) // Filter events where user is in participants array
      .order('starts_at', { ascending: true })

    if (error) throw error

    return { success: true, events: data || [] }
  } catch (error) {
    console.error('Error getting joined events:', error)
    return { success: false, error: error.message }
  }
}

export async function joinEvent(eventId) {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    // Get current event
    const { data: event, error: fetchError } = await supabase
      .from('events')
      .select('participants')
      .eq('id', eventId)
      .single()

    if (fetchError) throw fetchError

    const participants = event.participants || []
    
    if (participants.includes(user.id)) {
      return { success: true, message: 'Already joined' }
    }

    const { error } = await supabase
      .from('events')
      .update({ participants: [...participants, user.id] })
      .eq('id', eventId)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('Error joining event:', error)
    return { success: false, error: error.message }
  }
}

export async function deleteEvent(eventId, imageUrl = null) {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    if (imageUrl) {
      const urlParts = imageUrl.split('/')
      const bucket = 'run-event'
      const path = `${user.id}/${urlParts[urlParts.length - 1]}`
      await removeFile(path, bucket).catch(console.error)
    }

    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', eventId)
      .eq('user_id', user.id) // Changed from created_by to user_id

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('Error deleting event:', error)
    return { success: false, error: error.message }
  }
}