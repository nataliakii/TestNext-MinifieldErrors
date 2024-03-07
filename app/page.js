import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link"

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>app/page.js</code>
        </p>
        <div>
          <a
            href="/menu"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/logo.png"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={100}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/logo.png"
          alt=" Logo"
          width={180}
          height={180}
          priority
        />
      </div>

      <div className={styles.grid}>
        <Link
          href="/menu"
          className={styles.card}

        >
          <h2>
            Menu <span>-&gt;</span>
          </h2>
          <p>Explore Menu</p>
        </Link>
      </div>
    </main>
  );
}
