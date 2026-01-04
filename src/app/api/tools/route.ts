import { NextResponse } from 'next/server'
import { getAllTools } from '@/services/tools'

export async function GET() {
  const tools = await getAllTools()
  return NextResponse.json(tools)
}
