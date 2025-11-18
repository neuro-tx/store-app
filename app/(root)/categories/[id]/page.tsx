interface ParamsProps {
  params: { id: string };
  searchParams: { slug?: string };
}

export default async function CatePage({ params, searchParams }: ParamsProps) {
  const { id } = await params;
  const { slug } = await searchParams;

  return (
    <div>
      <p>الرقم: {id}</p>
      <p>القسم: {slug}</p>
    </div>
  );
}
