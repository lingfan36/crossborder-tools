import { MetadataRoute } from 'next'
import { getAllCourses } from '@/services/courses'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lingfan.site'
  
  // 获取所有工具
  const tools = await getAllCourses()
  
  // 工具详情页
  const toolPages = tools.map((tool) => ({
    url: `${baseUrl}/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  
  // 分类页面
  const categories = [
    'product-research',
    'ai-video-marketing',
    'e-commerce-platforms',
    'marketing-seo',
    'logistics-payments',
    'creative-tools',
  ]
  
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/category/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...categoryPages,
    ...toolPages,
  ]
}
