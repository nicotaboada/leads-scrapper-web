'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from 'components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form'
import { Input } from 'components/ui/input'
import { Textarea } from 'components/ui/textarea'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from 'components/ui/sheet'
import { TagColorPicker } from './tag-color-picker'
import { useCreateTag } from '../hooks/use-create-tag'
import { useUpdateTag } from '../hooks/use-update-tag'
import { type Tag, TagColor } from '../types'

const tagFormSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  color: z.nativeEnum(TagColor).nullable().optional(),
  description: z
    .string()
    .max(200, 'La descripción no puede exceder 200 caracteres')
    .nullable()
    .optional(),
})

type TagFormValues = z.infer<typeof tagFormSchema>

interface TagSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  tag?: Tag | null
  onSuccess: () => void
}

/**
 * Sheet form for creating or editing a tag
 */
export function TagSheet({ open, onOpenChange, tag, onSuccess }: TagSheetProps) {
  const isEditing = Boolean(tag)
  const { createTag, loading: createLoading } = useCreateTag()
  const { updateTag, loading: updateLoading } = useUpdateTag()
  const loading = createLoading || updateLoading

  const form = useForm<TagFormValues>({
    resolver: zodResolver(tagFormSchema),
    defaultValues: {
      name: '',
      color: null,
      description: '',
    },
  })

  useEffect(() => {
    if (open) {
      if (tag) {
        form.reset({
          name: tag.name,
          color: tag.color,
          description: tag.description ?? '',
        })
      } else {
        form.reset({
          name: '',
          color: null,
          description: '',
        })
      }
    }
  }, [open, tag, form])

  async function onSubmit(values: TagFormValues) {
    try {
      if (isEditing && tag) {
        await updateTag(tag.id, {
          name: values.name,
          color: values.color,
          description: values.description || null,
        })
      } else {
        await createTag({
          name: values.name,
          color: values.color,
          description: values.description || null,
        })
      }
      onOpenChange(false)
      onSuccess()
    } catch (error) {
      console.error('Error saving tag:', error)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className="flex h-full flex-col sm:max-w-md"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader className="shrink-0">
          <SheetTitle>{isEditing ? 'Editar Tag' : 'Nuevo Tag'}</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="flex-1 space-y-6 overflow-y-auto px-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombre del tag"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color (opcional)</FormLabel>
                    <FormControl>
                      <TagColorPicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descripción del tag"
                        className="resize-none"
                        {...field}
                        value={field.value ?? ''}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SheetFooter className="mt-4 shrink-0 flex-row gap-2 border-t pt-4">
              <div className="flex-[0.5]" />
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
                className="flex-[0.2] cursor-pointer"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-[0.5] cursor-pointer"
              >
                {loading ? 'Guardando...' : 'Guardar'}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}

