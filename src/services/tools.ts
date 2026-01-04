import { promises as fs } from 'fs'
import path from 'path'

export interface FAQ {
  question: string
  answer: string
}

export interface Tool {
  title: string
  shortDescription: string
  cover: string
  slug: string
  category: string
  link: string
  features: string[]
  longDescription?: string
  faqs?: FAQ[]
}

const readToolFile = async (filePath: string): Promise<Tool> => {
  const fileData = await fs.readFile(filePath, 'utf8')
  return JSON.parse(fileData) as Tool
}

export const getAllTools = async (): Promise<Tool[]> => {
  try {
    const toolsPath = path.join(process.cwd(), 'content/tools')
    const toolFiles = await fs.readdir(toolsPath)

    const tools = await Promise.all(
      toolFiles.map(async (fileName) => {
        const filePath = path.join(toolsPath, fileName)
        return await readToolFile(filePath)
      })
    )

    return tools
  } catch (error: unknown) {
    console.error('Error:', error)
    return []
  }
}

export const getOneTool = async (slug: string): Promise<Tool | null> => {
  try {
    const tools = await getAllTools()
    const tool = tools.find((tool) => tool.slug === slug)
    return tool || null
  } catch (error: unknown) {
    console.error('Error:', error)
    return null
  }
}
