import { NextResponse } from 'next/server'
import { submitPrecheckRun } from '@/lib/engine/submitPrecheckRun'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const result = await submitPrecheckRun(body)

    if (result.status === 'validation_error') {
      return NextResponse.json(result, { status: 400 })
    }

    if (result.status === 'system_error') {
      return NextResponse.json(result, { status: 500 })
    }

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'system_error',
        validationPaassed: false,
        error:
          error instanceof Error
            ? error.message
            : 'Unknown API error.'
      },
      { status: 500 }
    )
  }
}