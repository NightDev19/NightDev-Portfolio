import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getSkills } from '@/features/skills/queries'
import { DeleteSkillButton } from './delete-button'
import { AddSkillForm } from './add-skill-form'
import { EditSkillDialog } from './edit-skill-dialog'

export default async function AdminSkillsPage() {
  const skills = await getSkills()

  // Group by category
  const categories = Array.from(new Set(skills.map((s) => s.category)))

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Skills</h1>

      {/* Add new skill form */}
      <AddSkillForm categories={categories} />

      <div className="mt-8 space-y-8">
        {categories.map((category) => (
          <div key={category}>
            <h2 className="text-lg font-semibold mb-3">{category}</h2>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
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
                          <Badge variant="outline">{skill.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{skill.level || 'N/A'}</Badge>
                        </TableCell>
                        <TableCell>{skill.order_index}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <EditSkillDialog skill={skill} categories={categories} />
                            <DeleteSkillButton skillId={skill.id} />
                          </div>
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
            No skills yet. Add your first skill above!
          </p>
        )}
      </div>
    </div>
  )
}
