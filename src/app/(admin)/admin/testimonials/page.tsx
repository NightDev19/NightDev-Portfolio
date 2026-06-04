import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getAllTestimonialsAdmin } from '@/features/testimonials/queries'
import { DeleteTestimonialButton } from './delete-button'
import { AddTestimonialForm } from './add-testimonial-form'
import { EditTestimonialDialog } from './edit-testimonial-dialog'
import { Star } from 'lucide-react'

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonialsAdmin()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Testimonials</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage client and colleague testimonials displayed on your portfolio.</p>
        </div>
        <AddTestimonialForm />
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role / Company</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="font-medium">{t.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {t.role || '—'}
                  {t.company && <span className="text-xs block">{t.company}</span>}
                </TableCell>
                <TableCell>
                  {t.rating && (
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${i < t.rating! ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'}`}
                        />
                      ))}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    {t.published ? (
                      <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Published</Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-muted text-muted-foreground">Draft</Badge>
                    )}
                    {t.featured && (
                      <Badge variant="secondary" className="bg-amber-500/10 text-amber-400 border-amber-500/20">Featured</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <EditTestimonialDialog testimonial={t} />
                    <DeleteTestimonialButton testimonialId={t.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {testimonials.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  No testimonials yet. Add your first one!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
