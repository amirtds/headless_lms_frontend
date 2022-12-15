import Link from 'next/link'

export default function Header({userAuthenticated}) {
  const handleLogout = () => {
    // remove jwt and user from the cookie
    document
      .cookie
      .split(";")
      .forEach(function (c) {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      }
   
      );
  }
  return (
    <header className="bg-neutral-900">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-neutral-500 py-6 lg:border-none">
          <div className="flex items-center">
            <Link href="/">
              <span className="sr-only">Headless LMS</span>
              <img className="h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="" />
            </Link>
          </div>
          <div className="ml-10 space-x-4">
            {/* if user is not authenticated, show sign in and sign up buttons */}
            {
              userAuthenticated === false && 
              <>
                <Link
                  href={process.env.NEXT_PUBLIC_BACKEND_URL + "/api/connect/auth0"}
                  className="inline-block rounded-md border border-transparent bg-neutral-700 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75"
                >
                  Sign in
                </Link>
                <Link
                  href={process.env.NEXT_PUBLIC_BACKEND_URL + "/api/connect/auth0"}
                  className="inline-block rounded-md border border-transparent bg-neutral-100 py-2 px-4 text-base font-medium text-neutral-800 hover:bg-neutral-200"
                >
                  Sign up
                </Link>
              </>
            }
            {/* if user is authenticated, show sign out button */}
            {
              userAuthenticated === true &&
              <Link
                href={process.env.NEXT_PUBLIC_AUTH0_DOMAIN + "/v2/logout?client_id=" + process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID + "&returnTo=" + process.env.NEXT_PUBLIC_FRONTEND_URL}
                className="inline-block rounded-md border border-transparent bg-neutral-100 py-2 px-4 text-base font-medium text-neutral-800 hover:bg-neutral-200"
                onClick={handleLogout}>
                  Sign Out
              </Link>
            }
          </div>
        </div>
      </nav>
    </header>
  )
}
