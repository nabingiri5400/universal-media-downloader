import { NextRequest, NextResponse } from 'next/server'
import { writeFileSync } from 'fs'
import { join } from 'path'

export async function POST(req: NextRequest) {
  try {
    const { thumbnailUrl, title } = await req.json()

    if (!thumbnailUrl) {
      return NextResponse.json({ error: 'No thumbnail URL provided' }, { status: 400 })
    }

    const response = await fetch(thumbnailUrl)
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch thumbnail' }, { status: 500 })
    }

    const buffer = Buffer.from(await response.arrayBuffer())
    const safeTitle = (title || 'thumbnail').replace(/[^a-z0-9]/gi, '_').slice(0, 50)
    const fileName = `${safeTitle}_thumbnail.jpg`
    const savePath = join('C:\\Users\\LENOVO\\Downloads', fileName)

    writeFileSync(savePath, buffer)

    return NextResponse.json({
      success: true,
      message: `✅ Thumbnail saved! Check Downloads folder: ${fileName}`,
      fileName,
    })

  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to save thumbnail' }, { status: 500 })
  }
}