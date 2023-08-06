import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // const data = await req.formData();
  // const json = {
  //   name: data.get('name'),
  //   email: data.get('email'),
  //   message: data.get('message'),
  // };

  const data = await req.json();

  return NextResponse.json(data);
}
