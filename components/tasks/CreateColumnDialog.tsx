'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface CreateColumnDialogProps {
  open: boolean
  onClose: () => void
  onCreateColumn: (title: string) => void
}

export function CreateColumnDialog({ open, onClose, onCreateColumn }: CreateColumnDialogProps) {
  const [title, setTitle] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) {
      alert('Введите название колонки')
      return
    }

    onCreateColumn(title)
    setTitle('')
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Создать новую колонку</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Название колонки</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например: В разработке"
              autoFocus
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Отмена
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
            >
              Создать колонку
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
