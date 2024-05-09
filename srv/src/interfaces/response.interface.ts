export interface IResponse<T> {
    total: number
    limit: number
    page: number
    data: T
}