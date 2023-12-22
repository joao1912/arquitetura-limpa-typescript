import { Router } from "express"

export interface HTTPAdapterRepository {

    listen( port: number, callback: () => void ): void

    use( handler: any ): void

    config(): void

    useRoute(path: string, route: Router): void

}