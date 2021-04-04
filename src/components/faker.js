import faker, { fake } from 'faker'
faker.seed(123)
export const data =  [...Array(10)].map(item =>
    ({
    id: faker.datatype.uuid() ,
    productName  : faker.commerce.productName(),
    description  : faker.commerce.productDescription(),
    price : faker.commerce.price() , 
    image : faker.image.fashion()
    })
)

console.log(data)