import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getExperiences } from '@/features/experience/queries'
import { DeleteExperienceButton } from './delete-button'

export default async function AdminExperiencePage() {
  const experiences = await getExperiences()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Experience</h1>

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
                    ? new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                    : '—'}
                  {' → '}
                  {exp.current
                    ? 'Present'
                    : exp.end_date
                      ? new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                      : '—'}
                </TableCell>
                <TableCell>
                  {exp.current && <Badge variant="secondary">Current</Badge>}
                </TableCell>
                <TableCell className="text-right">
                  <DeleteExperienceButton experienceId={exp.id} />
                </TableCell>
              </TableRow>
            ))}
            {experiences.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  No experience entries yet. Add them through Supabase.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
