export interface CreationResponse {
   id: string
}

export interface SliceResponse<T> {
   content: T[]
   first: boolean
   last: boolean
   hasNext: boolean
}

export interface SliceParams {
   pageNumber: number
}
