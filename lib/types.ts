export interface CategoryProps {
  _id: string;
  name: string;
  description: string;
  slug: string;
  image: string;
}

export interface ProductCardProps {
  _id: string;
  name: string;
  description?: string;
  price: number;
  images: string[];
  isAvailable?: boolean;
  isFeatured?: boolean;
  brand?: string;
  discount?: number;
  capacity?: string;
  hasDiscount?: boolean;
  endDate?: Date;
  features: string[]
}