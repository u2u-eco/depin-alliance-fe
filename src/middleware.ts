import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { redirect } from 'next/navigation'

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: ['/home', '/shop']
}

export function middleware(request: NextRequest) {
  // Call our authentication function to check the request

  if (!isAuthenticated(request)) {
    // Respond with JSON indicating an error message
    return NextResponse.redirect(new URL('/onboarding', request.url))
  }
}
