'use client'

import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { CalendarDays } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils/merge'

dayjs.locale('es')

interface DatePickerProps {
	date?: Date
	onDateChange: (date: Date | undefined) => void
	placeholder?: string
	disabled?: boolean
	minDate?: Date
	className?: string
}

export function DatePicker({
	date,
	onDateChange,
	placeholder = 'Seleccionar fecha',
	disabled = false,
	minDate,
	className,
}: DatePickerProps) {
	const [open, setOpen] = React.useState(false)

	const handleSelect = (selectedDate: Date | undefined) => {
		onDateChange(selectedDate)
		if (selectedDate) {
			setOpen(false)
		}
	}

	return (
		<Popover open={open} onOpenChange={setOpen} modal>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					disabled={disabled}
					data-empty={!date}
					className={cn(
						'data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal',
						className
					)}
				>
					<CalendarDays className="mr-2 h-4 w-4" />
					{date ? dayjs(date).format('D [de] MMMM [de] YYYY') : placeholder}
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="w-auto p-0"
				align="start"
				onInteractOutside={(e) => e.preventDefault()}
				onPointerDownOutside={(e) => e.preventDefault()}
			>
				<Calendar
					mode="single"
					selected={date}
					onSelect={handleSelect}
					disabled={minDate ? { before: minDate } : undefined}
				/>
			</PopoverContent>
		</Popover>
	)
}
