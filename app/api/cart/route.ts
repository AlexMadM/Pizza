import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
export async function GET(req: NextRequest) {
  try {
    const userId = 1

    return NextResponse.json({ cart: [] })
  } catch (error) {
    console.log(error)
  }
  return NextResponse.json({ cart: [] })
}
