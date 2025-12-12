import fs from 'fs'
import path from 'path'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { template } = req.query

    if (!template) {
      return res.status(400).json({ message: 'Template name is required' })
    }

    // Leer el archivo HTML desde la carpeta email-templates
    const filePath = path.join(process.cwd(), 'src', 'email-templates', template)
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Template not found' })
    }

    const htmlContent = fs.readFileSync(filePath, 'utf8')

    return res.status(200).json({ html: htmlContent })
  } catch (error) {
    console.error('Error reading template:', error)
    return res.status(500).json({ message: 'Error reading template' })
  }
}

