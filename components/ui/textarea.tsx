import * as React from 'react'

import { cn } from 'lib/utils/merge'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 min-h-20 w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-base shadow-sm transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
				'focus-visible:border-gray-400 focus-visible:ring-2 focus-visible:ring-gray-200',
				'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
				className
			)}
			{...props}
		/>
	)
}

export { Textarea }
