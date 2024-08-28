import type { NextRequest } from 'next/server'
// import { isAuthenticated } from '@lib/auth'

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: '/home'
}

export function middleware(request: NextRequest) {
  console.log('🚀 ~ middleware ~ request:', request)
  // Call our authentication function to check the request
  // if (!isAuthenticated(request)) {
  //   // Respond with JSON indicating an error message
  //   return Response.json(
  //     { success: false, message: 'authentication failed' },
  //     { status: 401 }
  //   )
  // }
}
