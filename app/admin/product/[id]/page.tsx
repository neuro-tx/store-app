interface ProductParam {
  params: {
    id: string;
  };
}

export default async function EditProduct({ params }: ProductParam) {
  const { id } = await params;

  return <div className="">{id}</div>;
}
