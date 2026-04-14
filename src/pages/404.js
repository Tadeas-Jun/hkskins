import * as React from "react"
import { Link } from "gatsby"

const NotFoundPage = () => {
  return (
    <main>
      <h1>404 Page not found</h1>
      <p>This page was not found. <Link to="/">Go home</Link>.</p>
    </main>
  )
}

export default NotFoundPage;

export const Head = () => <title>Not found</title>
