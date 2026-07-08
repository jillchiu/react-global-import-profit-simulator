import { demoProducts } from "../data/demoProducts"

export default function createDemoProducts(){
    return demoProducts.map(product => ({
        ...product,
        id: crypto.randomUUID(),
        createdAt: Date.now()

    }))

}