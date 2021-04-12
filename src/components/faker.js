import faker, { fake } from 'faker'
faker.seed(123)
export const data =  [...Array(13)].map(item =>
    ({
    id: faker.datatype.uuid() ,
    productName  : faker.commerce.productName(),
    // description  : faker.commerce.productDescription(),
    description : faker.lorem.words() , 
    price : faker.commerce.price() , 
    image : faker.image.fashion() , 
    inStock: faker.datatype.boolean(),
    fastDelivery: faker.datatype.boolean(),
    })
)

// console.log(data)