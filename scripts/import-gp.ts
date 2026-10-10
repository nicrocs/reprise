import { readFile } from 'node:fs/promises'
import { basename, extname, resolve } from 'node:path'
import * as alphaTab from '@coderline/alphatab'
import * as dotenv from 'dotenv'
import { PrismaClient } from '../prisma/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'

dotenv.config({ path: '.env.local' })
dotenv.config({ path: '.env' })

function messageOf(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

async function main() {
  const [, , songId, gpPath] = process.argv
  if (!songId || !gpPath) {
    throw new Error('Usage: npx tsx scripts/import-gp.ts <songId> <gp-file-path>')
  }

  const filePath = resolve(gpPath)
  const label = basename(filePath, extname(filePath)).trim()
  if (!label) throw new Error('The GP filename must contain a section name')

  let fileBytes: Buffer
  try {
    fileBytes = await readFile(filePath)
  } catch (error) {
    throw new Error(`Could not read GP file "${filePath}": ${messageOf(error)}`)
  }

  const connectionString = process.env.DATABASE_URL
  if (!connectionString) throw new Error('DATABASE_URL is not configured in .env.local or .env')

  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  })

  try {
    const song = await prisma.song.findUnique({
      where: { id: songId },
      select: { id: true, title: true },
    })
    if (!song) throw new Error(`No song found with ID "${songId}"`)

    let alphaTex: string
    try {
      const settings = new alphaTab.Settings()
      const score = alphaTab.importer.ScoreLoader.loadScoreFromBytes(
        new Uint8Array(fileBytes),
        settings
      )
      alphaTex = new alphaTab.exporter.AlphaTexExporter().exportToString(score, settings)
    } catch (error) {
      throw new Error(`Could not convert "${filePath}" to alphaTex: ${messageOf(error)}`)
    }

    if (!alphaTex.trim()) throw new Error(`alphaTab produced no score data for "${filePath}"`)

    const existing = await prisma.songScore.findUnique({
      where: { songId_label: { songId, label } },
      select: { sortOrder: true },
    })

    let sortOrder = existing?.sortOrder
    if (sortOrder === undefined) {
      const lastScore = await prisma.songScore.findFirst({
        where: { songId },
        orderBy: [{ sortOrder: 'desc' }, { createdAt: 'desc' }],
        select: { sortOrder: true },
      })
      sortOrder = (lastScore?.sortOrder ?? -1) + 1
    }

    await prisma.songScore.upsert({
      where: { songId_label: { songId, label } },
      update: { alphaTex },
      create: { songId, label, sortOrder, alphaTex },
    })

    console.log(`Imported "${label}" for "${song.title}" (${alphaTex.length} characters of alphaTex)`)
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((error: unknown) => {
  console.error(`Import failed: ${messageOf(error)}`)
  process.exitCode = 1
})
