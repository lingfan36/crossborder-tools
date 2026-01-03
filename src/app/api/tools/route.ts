import { NextResponse } from 'next/server'
import { getAllCourses } from '@/services/courses'

export async function GET() {
  const tools = await getAllCourses()
  return NextResponse.json(tools)
}
