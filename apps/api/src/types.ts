export interface BookDTO {
    title: string
    year: number
    genre: string
}
export type Filter = {
    year: number | undefined
    genre: string | undefined
}
