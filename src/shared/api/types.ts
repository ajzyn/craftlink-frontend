export interface CreationDto {
   id: string
}

export interface SliceDto<T> {
   content: T[]
   first: boolean
   last: boolean
   hasNext: boolean
}

export interface SliceParamsDto {
   pageNumber: number
}
