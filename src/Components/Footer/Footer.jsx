import './Footer.css'
import { Link } from 'react-router';
export default function Footer() {
    const year = new Date().getFullYear();
    const name = 'BusarovForumApp';
    return (
        <footer className="p-4  md:p-8 lg:p-10 dark:bg-gray-800">
            <div className="mx-auto max-w-screen-xl text-center">
                <Link href="#" className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"></Link>
                <p className="my-7 text-gray-500 dark:text-gray-400">© {year} {name}. Connecting conversations worldwide.</p>
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {year} {name}. All Rights Reserved. You can find more information about us <Link to="/about" className="hover:underline">here</Link>.</span>
            </div>
        </footer>
    );
}