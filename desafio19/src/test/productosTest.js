import faker from 'faker';
faker.locale = 'es';

const array = [];

for (let index = 0; index < 5; index++) {
  array.push({
    id: index + 1,
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    thumbnail: faker.image.imageUrl(),
  });
}

export { array };
