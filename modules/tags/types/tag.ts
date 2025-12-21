/**
 * Available tag colors
 */
export enum TagColor {
  RED = 'RED',
  ORANGE = 'ORANGE',
  GREEN = 'GREEN',
  BLUE = 'BLUE',
  PURPLE = 'PURPLE',
}

/**
 * Tag entity type
 */
export interface Tag {
  id: string
  name: string
  color?: TagColor | null
  description?: string | null
  createdAt: string
  updatedAt: string
}

/**
 * Pagination metadata for tags response
 */
export interface TagsPaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

/**
 * Paginated tags response
 */
export interface PaginatedTagsResponse {
  tags: {
    data: Tag[]
    meta: TagsPaginationMeta
  }
}

/**
 * Color configuration for display
 */
export const TAG_COLOR_CONFIG: Record<TagColor, { hex: string; label: string }> = {
  [TagColor.RED]: { hex: '#C0392B', label: 'Rojo' },
  [TagColor.ORANGE]: { hex: '#E67E22', label: 'Naranja' },
  [TagColor.GREEN]: { hex: '#27AE60', label: 'Verde' },
  [TagColor.BLUE]: { hex: '#2980B9', label: 'Azul' },
  [TagColor.PURPLE]: { hex: '#8E44AD', label: 'Púrpura' },
}

