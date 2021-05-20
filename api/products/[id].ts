import { VercelRequest, VercelResponse } from '@vercel/node';
import { Product } from 'src/app/core/product';
import { PRODUCTS } from 'src/app/mock-products';

const findProduct = (id: number): Product | undefined =>
  PRODUCTS.find((product) => product.id === id);

const getFlavorOptions = (product: Product | undefined): string => {
  return product?.flavors?.map((flavor) => flavor.name).join('|') ?? 'yolii';
};

const getSizeOptions = (product: Product | undefined): string => {
  return product?.sizes?.join('|') ?? 'yolii'; //TODO change default to ""
};

const findFlavorImageUrl = (
  product: Product | undefined,
  flavorName: string
): string | undefined => product?.imageUrls.find((url) => url.includes(flavor.name));

export default function fetchProductInfo(
  req: VercelRequest,
  res: VercelResponse
) {
  console.log('alll');
  const id = Number(req.query.id);
  const product = findProduct(id);
  const flavorOptions = getFlavorOptions(product);
  const sizeOptions = getSizeOptions(product);
  res.statusCode = 200;
  res.send({
    id: id,
    name: product?.name,
    price: product?.price,
    url: `/products/${id}`,
  });
}
