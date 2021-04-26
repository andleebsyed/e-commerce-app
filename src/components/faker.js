import faker, { fake } from 'faker'
faker.seed(123)
export const data = [...Array(15)].map(item =>
    ({
        id: faker.datatype.uuid(),
        productName: faker.commerce.productName(),
        description: faker.lorem.words(),
        price: faker.commerce.price(),
        image: faker.random.image(),
        inStock: faker.datatype.boolean(),
        fastDelivery: faker.datatype.boolean(),
    })
)