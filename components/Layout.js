import Head from 'next/head';
import Link from 'next/link';

const SocialLink = ({ href, text, className }) => (
  <a href={href} className={`${className} transition-colors duration-300`} target="_blank" rel="noopener noreferrer">
    {text}
  </a>
);

export default function Layout({ children, home }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>aditya washikar.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>

      {!home && (
        <div className="mt-12">
          <Link href="/">
            <a className="text-blue-400 hover:underline">← Back to home</a>
          </Link>
        </div>
      )}

      <footer className="mt-12">
        <div className="flex flex-wrap justify-center space-x-4 md:space-x-6">
          <SocialLink href="https://twitter.com/gucciwashi" text="x" className="text-blue-400 hover:text-blue-300" />
          <SocialLink href="https://www.instagram.com/wz5hi/" text="instagram" className="text-pink-400 hover:text-pink-300" />
          <SocialLink href="https://linkedin.com/in/adityawashikar" text="linkedin" className="text-blue-600 hover:text-blue-500" />
          <SocialLink href="https://github.com/NeonNova" text="github" className="text-gray-400 hover:text-gray-300" />
          <SocialLink href="https://open.spotify.com/user/aditya_washikar" text="spotify" className="text-green-500 hover:text-green-400" />
          <SocialLink href="/path-to-your-resume.pdf" text="resume" className="text-yellow-400 hover:text-yellow-300" />
        </div>
      </footer>
    </div>
  );
}