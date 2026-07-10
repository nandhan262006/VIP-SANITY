import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { deleteFromCloudinary } from '@/lib/cloudinary'

export async function POST(req: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { publicId } = await req.json()
    if (!publicId) {
      return NextResponse.json({ error: 'No publicId provided' }, { status: 400 })
    }
    await deleteFromCloudinary(publicId)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 })
  }
}
