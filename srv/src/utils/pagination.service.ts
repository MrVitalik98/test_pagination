export class PaginationService {
    private DEFAULT_LIMIT:number = 20
    private DEFAULT_PAGE:number = 1

    generatePaginationParams(limit: number, page: number) {
        const _limit = limit && isFinite(Math.abs(limit)) ? Math.abs(limit) : this.DEFAULT_LIMIT
        const _page = page && isFinite(Math.abs(page)) ? Math.abs(page) : this.DEFAULT_PAGE

        const skip = _limit * (_page - 1)

        return { skip, page: _page, limit: _limit }
    }
}
