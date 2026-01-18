import fs from 'fs'
import path from 'path'
import { getOneTool } from './tools'

export interface CollectionTool {
  toolSlug: string
  rank: number
  whyWePick: string
  bestFor: string
}

export interface Collection {
  title: string
  slug: string
  seoDescription: string
  heroImage: string
  updatedAt: string
  relatedCollections?: string[]
  tools: CollectionTool[]
  comparisonTable: {
    headers: string[]
    rows: string[][]
  }
}

const collectionsDirectory = path.join(process.cwd(), 'content/collections')

export async function getAllCollections(): Promise<Collection[]> {
  if (!fs.existsSync(collectionsDirectory)) {
    return []
  }

  const files = fs.readdirSync(collectionsDirectory)
  const collections: Collection[] = []

  for (const file of files) {
    if (file.endsWith('.json')) {
      const filePath = path.join(collectionsDirectory, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      collections.push(JSON.parse(content))
    }
  }

  return collections
}

export async function getOneCollection(slug: string): Promise<Collection | null> {
  const filePath = path.join(collectionsDirectory, `${slug}.json`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const content = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(content)
}

export async function getCollectionWithTools(slug: string) {
  const collection = await getOneCollection(slug)

  if (!collection) {
    return null
  }

  const toolsWithDetails = await Promise.all(
    collection.tools.map(async (item) => {
      const toolDetails = await getOneTool(item.toolSlug)
      return {
        ...item,
        details: toolDetails,
      }
    })
  )

  return {
    ...collection,
    tools: toolsWithDetails,
  }
}

export async function getCollectionsForTool(toolSlug: string): Promise<Collection[]> {
  const allCollections = await getAllCollections()

  return allCollections.filter(collection =>
    collection.tools.some(tool => tool.toolSlug === toolSlug)
  )
}

