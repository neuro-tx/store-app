import React from "react";

interface ParamsProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ParamsProps) {
  const { id } = await params;
  return <div>{id}</div>;
}
