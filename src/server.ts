import { HTTPAdapterRepository } from "./adapters/HTTPAdapter/repository/HTTPAdapterRepository";


export class Server {

    constructor(protected HTTPUtil: HTTPAdapterRepository) {}

    async start() {

        this.setup()
        this.HTTPUtil.listen( Number(process.env.PORT) || 3000, () => {
            console.log(`Server is running in port ${process.env.PORT || 3000}`)
        })
    }

    setup(): void {

        this.HTTPUtil.config()
    }

}