import type { Product } from "../model/types";

export const demoProducts = [{
    name: 'iphone Shower',

    data: {
      productCost: '100',
      domesticShipping: '10',
      internationShipping: '20',
      sellingPrice: '200',

      productCurrency: 'USD',
      domesticShippingCurrency: 'USD',
      internationShippingCurrency: 'USD',
      sellingCurrency: 'JPY'

    },

    createdAt: Date.now()

  },{
    name: 'Gaming Mouse',

    data: {
      productCost: '50',
      domesticShipping: '5',
      internationShipping: '10',
      sellingPrice: '120',

      productCurrency: 'HKD',
      domesticShippingCurrency: 'HKD',
      internationShippingCurrency: 'HKD',
      sellingCurrency: 'USD'

    },

    createdAt: Date.now()

  }

] satisfies Omit<Product, 'id'>[] 