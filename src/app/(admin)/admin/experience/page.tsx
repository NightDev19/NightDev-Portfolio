import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getExperiences } from '@/features/experience/queries'
import { DeleteExperienceButton } from './delete-button'
import { AddExperienceForm } from './add-experience-form'
import { EditExperienceDialog } from './edit-experience-dialog'
import { formatShortDate } from '@/lib/utils'

export default async function AdminExperiencePage() {
  const experiences = await getExperiences()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Experience</h1>
        <AddExperienceForm />
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Current</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {experiences.map((exp) => (
              <TableRow key={exp.id}>
                <TableCell className="font-medium">{exp.title}</TableCell>
                <TableCell className="text-muted-foreground">{exp.organization || '—'}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {exp.start_date
                    ? formatShortDate(exp.start_date)
                    : '—'}
                  {' → '}
                  {exp.current
                    ? 'Present'
                    : exp.end_date
                      ? formatShortDate(exp.end_date)
                      : '—'}
                </TableCell>
                <TableCell>
                  {exp.current && <Badge variant="secondary">Current</Badge>}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <EditExperienceDialog experience={exp} />
                    <DeleteExperienceButton experienceId={exp.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {experiences.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  No experience entries yet. Add your first one!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
