import jsPDF from 'jspdf'
import QRCode from 'qrcode'

export interface LabelData {
  id: string
  name: string
  date: string
  categoryId?: string
  jarSize?: number
  recipeName?: string
}

export type LabelTemplate = 'small' | 'medium' | 'large'

const TEMPLATE_SIZES: Record<LabelTemplate, { w: number; h: number; fontSize: number; qrSize: number }> = {
  small: { w: 52, h: 30, fontSize: 7, qrSize: 18 },
  medium: { w: 70, h: 40, fontSize: 9, qrSize: 24 },
  large: { w: 90, h: 52, fontSize: 11, qrSize: 30 },
}

const COLUMNS: Record<LabelTemplate, number> = {
  small: 3,
  medium: 2,
  large: 2,
}

async function generateQRDataUrl(text: string): Promise<string> {
  return QRCode.toDataURL(text, {
    width: 256,
    margin: 1,
    errorCorrectionLevel: 'M',
  })
}

export async function generateLabelPDF(
  items: LabelData[],
  template: LabelTemplate = 'medium',
  appName = 'Комора',
): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const size = TEMPLATE_SIZES[template]
  const cols = COLUMNS[template]
  const pageWidth = 210
  const pageHeight = 297
  const margin = 10
  const gapX = 4
  const gapY = 4
  const labelWidth = size.w
  const labelHeight = size.h
  const startY = margin
  const colWidth = (pageWidth - 2 * margin - (cols - 1) * gapX) / cols

  let row = 0
  let col = 0

  for (const item of items) {
    if (row * (labelHeight + gapY) + startY + labelHeight > pageHeight - margin) {
      doc.addPage()
      row = 0
      col = 0
    }

    const x = margin + col * (colWidth + gapX)
    const y = startY + row * (labelHeight + gapY)

    doc.setDrawColor(200)
    doc.setLineWidth(0.2)
    doc.roundedRect(x, y, labelWidth, labelHeight, 2, 2)

    const qrUrl = `${window.location.origin}/app/cannings/${item.id}`
    const qrSize = size.qrSize
    const qrX = x + 3
    const qrY = y + (labelHeight - qrSize) / 2

    try {
      const qrDataUrl = await generateQRDataUrl(qrUrl)
      doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize)
    } catch {
      doc.setFontSize(6)
      doc.text('QR', qrX + qrSize / 2, qrY + qrSize / 2, { align: 'center' })
    }

    const textX = qrX + qrSize + 4
    const textWidth = labelWidth - (qrSize + 7)
    doc.setFontSize(size.fontSize)
    doc.setFont('helvetica', 'bold')
    const nameLines = doc.splitTextToSize(item.name, textWidth)
    doc.text(nameLines.slice(0, 2), textX, y + 8)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(size.fontSize - 1)
    doc.text(item.date, textX, y + 14)

    if (item.jarSize) {
      doc.text(`${item.jarSize} л`, textX, y + 19)
    }

    if (item.recipeName) {
      const recipeLines = doc.splitTextToSize(item.recipeName, textWidth)
      doc.text(recipeLines.slice(0, 1), textX, y + 24)
    }

    doc.setFontSize(size.fontSize - 2)
    doc.setTextColor(150)
    doc.text(appName, textX, y + labelHeight - 3)
    doc.setTextColor(0)

    col++
    if (col >= cols) {
      col = 0
      row++
    }
  }

  return doc
}

export async function downloadLabelPDF(items: LabelData[], template: LabelTemplate = 'medium') {
  const doc = await generateLabelPDF(items, template)
  const filename = `komora-labels-${new Date().toISOString().slice(0, 10)}.pdf`
  doc.save(filename)
}
