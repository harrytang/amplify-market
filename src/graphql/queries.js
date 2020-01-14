/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMarket = `query GetMarket($id: ID!) {
  getMarket(id: $id) {
    id
    name
    tags
    owner
    createdAt
    products {
      items {
        id
        descriptopn
        price
        deliveryMethod
        owner
        createdAt
      }
      nextToken
    }
  }
}
`;
export const listMarkets = `query ListMarkets(
  $filter: ModelMarketFilterInput
  $limit: Int
  $nextToken: String
) {
  listMarkets(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      tags
      owner
      createdAt
      products {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getProduct = `query GetProduct($id: ID!) {
  getProduct(id: $id) {
    id
    descriptopn
    file {
      bucket
      region
      key
    }
    price
    deliveryMethod
    owner
    createdAt
    market {
      id
      name
      tags
      owner
      createdAt
      products {
        nextToken
      }
    }
  }
}
`;
export const listProducts = `query ListProducts(
  $filter: ModelProductFilterInput
  $limit: Int
  $nextToken: String
) {
  listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      descriptopn
      file {
        bucket
        region
        key
      }
      price
      deliveryMethod
      owner
      createdAt
      market {
        id
        name
        tags
        owner
        createdAt
      }
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    email
    registered
    orders {
      items {
        createdAt
      }
      nextToken
    }
  }
}
`;
