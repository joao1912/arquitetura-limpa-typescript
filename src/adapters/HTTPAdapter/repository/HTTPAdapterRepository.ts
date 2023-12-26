
export interface HTTPAdapterRepository {

    listen( port: number, callback: () => void ): void

    setRoutes(): void

    use( handler: any ): void

    config(): void

}