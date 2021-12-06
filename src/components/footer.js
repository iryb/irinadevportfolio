import React from 'react'

export default function Footer() {
  return (
    <footer className="py-5 text-center font-sans">
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com" target="_blank">Gatsby</a>
    </footer>
  )
}
