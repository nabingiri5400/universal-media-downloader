import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import { readdirSync, readFileSync, unlinkSync } from 'fs'
import { join } from 'path'
import { tmpdir } from 'os'

const execAsync = promisify(exec)

export async function POST(req: NextRequest) {
  try {
    const { url, quality } = await req.json()
    if (!url) return NextResponse.json({ error: 'No URL' }, { status: 400 })

    const timestamp = Date.now()
    const tmpDir = tmpdir()
    const outputTemplate = join(tmpDir, `${timestamp}_%(title)s.%(ext)s`)

    let formatArg = ''
    if (quality === 'Audio Only') {
      formatArg = '-x --audio-format mp3'
    } else if (quality === '4K') {
      formatArg = '-f "bestvideo[height<=2160]+bestaudio/best" --merge-output-format mp4'
    } else if (quality === '1080p') {
      formatArg = '-f "bestvideo[height<=1080]+bestaudio/best" --merge-output-format mp4'
    } else if (quality === '720p') {
      formatArg = '-f "bestvideo[height<=720]+bestaudio/best" --merge-output-format mp4'
    } else if (quality === '360p') {
      formatArg = '-f "bestvideo[height<=360]+bestaudio/best" --merge-output-format mp4'
    } else {
      formatArg = '-f best'
    }

    await execAsync(
      `yt-dlp ${formatArg} -o "${outputTemplate}" --no-playlist "${url}"`,
      { timeout: 300000 }
    )

    const files = readdirSync(tmpDir).filter(f => f.startsWith(`${timestamp}_`))
    if (files.length === 0) return NextResponse.json({ error: 'Download failed' }, { status: 500 })

    const filePath = join(tmpDir, files[0])
    const fileBuffer = readFileSync(filePath)
    const fileName = files[0].replace(`${timestamp}_`, '')
    try { unlinkSync(filePath) } catch {}

    const ext = fileName.split('.').pop()?.toLowerCase() || 'mp4'
    const mimeType = ext === 'mp3' ? 'audio/mpeg' : 'video/mp4'

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': fileBuffer.length.toString(),
      },
    })

  } catch (err: any) {
    console.error('Download error:', err?.message)
    return NextResponse.json({ error: 'Download failed. Try lower quality.' }, { status: 500 })
  }
}