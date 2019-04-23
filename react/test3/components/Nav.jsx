import Link from 'next/link';
function Nav() {
  return (
    <ul>
      <li>
        <Link href="/">
          <a>Home page</a>
        </Link>
      </li>
      <li>
        <Link href="/test">
          <a>Test page</a>
        </Link>
      </li>
      <li>
        <Link href="/test2">
          <a>Test2 page</a>
        </Link>
      </li>
      <li>
        <Link href="/special-route">
          <a>Special Route</a>
        </Link>
      </li>
    </ul>
  );
}

export default Nav;
