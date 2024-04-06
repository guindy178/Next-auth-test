// interfaces/product.interface.ts

export interface Product {
    id: string;
    name: string;
    price: string;
    description: string;
    createdBy: string;
    active: boolean;
  }

  export interface AddProduct {
    name: string;
    price: string;
    description: string;
    createdBy: string ;
    active: boolean;
  }
  