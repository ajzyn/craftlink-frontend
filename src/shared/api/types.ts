export interface CreationResponseDto {
   id: string
}

export interface SliceResponseDto<T> {
   content: T[]
   first: boolean
   last: boolean
   hasNext: boolean
}

export interface SliceRequestParamsDto {
   pageNumber: number
}
