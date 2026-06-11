import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import { readdirSync } from 'fs'
import { join } from 'path'

const execAsync = promisify(exec)

export async function POST(req: NextRequest) {
  try {
    const { url, quality } = await req.json()

    if (!url) {
      return NextResponse.json({ error: 'No URL provided' }, { status: 400 })
    }

    const downloadDir = `C:\\Users\\LENOVO\\Downloads`
    const timestamp = Date.now()
    const outputTemplate = `${downloadDir}\\${timestamp}_%(title)s.%(ext)s`

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

    const ffmpegPath = 'C:\\ffmpeg-master-latest-win64-gpl\\bin'

    await execAsync(
      `python -m yt_dlp ${formatArg} --ffmpeg-location "${ffmpegPath}" -o "${outputTemplate}" --no-playlist "${url}"`,
      { 
        timeout: 600000,
        env: { ...process.env, PATH: `${process.env.PATH};${ffmpegPath}` }
      }
    )

    // Find downloaded file
    const files = readdirSync(downloadDir).filter(f => f.startsWith(`${timestamp}_`))

    if (files.length === 0) {
      return NextResponse.json({ error: 'File not found after download' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true,
      message: `✅ Downloaded! Check your Downloads folder: ${files[0].replace(`${timestamp}_`, '')}`,
      filename: files[0].replace(`${timestamp}_`, '')
    })

  } catch (err: any) {
    console.error('Download error:', err?.message)
    return NextResponse.json(
      { error: `Download failed: ${err?.message?.slice(0, 200)}` },
      { status: 500 }
    )
  }
}