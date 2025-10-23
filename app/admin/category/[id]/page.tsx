interface CategoryParam {
  params: {
    id: string;
  };
}

export default async function EditCategory({ params }: CategoryParam) {
  const { id } = await params;

  return <div className="">{id}</div>;
}
