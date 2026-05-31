import { getAllProjectsAdmin } from '@/features/projects/queries'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getSkills } from '@/features/skills/queries'
import { DeleteSkillButton } from './delete-button'

export default async function AdminSkillsPage() {
  const skills = await getSkills()

  // Group by category
  const categories = Array.from(new Set(skills.map((s) => s.category)))

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Skills</h1>

      {categories.map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-lg font-semibold mb-3">{category}</h2>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {skills
                  .filter((s) => s.category === category)
                  .sort((a, b) => a.order_index - b.order_index)
                  .map((skill) => (
                    <TableRow key={skill.id}>
                      <TableCell className="font-medium">{skill.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{skill.level || 'N/A'}</Badge>
                      </TableCell>
                      <TableCell>{skill.order_index}</TableCell>
                      <TableCell className="text-right">
                        <DeleteSkillButton skillId={skill.id} />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ))}

      {skills.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          No skills yet. Skills are managed through the Supabase database.
        </p>
      )}
    </div>
  )
}
