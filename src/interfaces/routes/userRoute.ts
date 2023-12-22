import { RouteExpressAdapter } from "../../adapters/RouteAdapter/RouteExpressAdapter";

const routerAdapter = new RouteExpressAdapter()

routerAdapter.get('/', () => {

    return Promise.resolve({})

})

export default routerAdapter.router

