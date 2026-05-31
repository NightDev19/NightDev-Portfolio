import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getContactMessages } from '@/features/contact/actions'
import { MarkReadButton } from './mark-read-button'
import { DeleteMessageButton } from './delete-button'

export default async function AdminMessagesPage() {
  const messages = await getContactMessages()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>

      <div className="space-y-4">
        {messages.map((msg: any) => (
          <Card key={msg.id} className={msg.read ? 'opacity-70' : ''}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-base">{msg.subject || 'No Subject'}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    From <span className="font-medium">{msg.name}</span> ({msg.email})
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {!msg.read && <Badge variant="secondary">New</Badge>}
                  <span className="text-xs text-muted-foreground">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{msg.message}</p>
              <div className="flex gap-2 mt-4">
                {!msg.read && <MarkReadButton messageId={msg.id} />}
                <DeleteMessageButton messageId={msg.id} />
              </div>
            </CardContent>
          </Card>
        ))}

        {messages.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No messages yet.
          </p>
        )}
      </div>
    </div>
  )
}
