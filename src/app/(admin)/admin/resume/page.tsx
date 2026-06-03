import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getResumeSections } from '@/features/resume/queries'
import { DeleteResumeSectionButton } from './delete-button'
import { AddResumeSectionForm } from './add-section-form'
import { EditResumeSectionDialog } from './edit-section-dialog'

const SECTION_TYPE_LABELS: Record<string, string> = {
  personal_info: 'Personal Info',
  experience: 'Experience',
  education: 'Education',
  awards: 'Awards',
  skills: 'Skills',
}

const SECTION_TYPE_ORDER = ['personal_info', 'experience', 'education', 'skills', 'awards']

export default async function AdminResumePage() {
  const sections = await getResumeSections()

  // Group by section_type
  const grouped = SECTION_TYPE_ORDER.map((type) => ({
    type,
    label: SECTION_TYPE_LABELS[type] || type,
    items: sections.filter((s) => s.section_type === type).sort((a, b) => a.order_index - b.order_index),
  })).filter((group) => group.items.length > 0 || true) // Show all groups even if empty

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Resume Sections</h1>

      {/* Add new section form */}
      <AddResumeSectionForm />

      <div className="mt-8 space-y-8">
        {grouped.map((group) => (
          <div key={group.type}>
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-lg font-semibold">{group.label}</h2>
              <Badge variant="outline" className="text-xs">
                {group.items.length} {group.items.length === 1 ? 'item' : 'items'}
              </Badge>
            </div>

            {group.items.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 pl-1">
                No {group.label.toLowerCase()} entries yet. Add one above.
              </p>
            ) : (
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Subtitle</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Order</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {group.items.map((section) => (
                      <TableRow key={section.id}>
                        <TableCell className="font-medium max-w-[200px] truncate">
                          {section.title || '—'}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate text-muted-foreground">
                          {section.subtitle || '—'}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{SECTION_TYPE_LABELS[section.section_type] || section.section_type}</Badge>
                        </TableCell>
                        <TableCell>{section.order_index}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <EditResumeSectionDialog section={section} />
                            <DeleteResumeSectionButton sectionId={section.id} sectionTitle={section.title || 'this section'} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
