import Link from "next/link"
import { Facebook, Instagram, Twitter, Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-2xl font-bold text-red-500">FIX.TJ</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              FIX.TJ платформаи пешқадами хидматрасонии Тоҷикистон мебошад, ки устодони моҳир ва муштариёнро пайваст
              мекунад. Мутахассисони боэътимодро барои ҳамаи ниёзҳои хонагӣ ва тиҷоратии худ пайдо кунед.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Пайвандҳои зуд</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-red-500 transition-colors">
                  Асосӣ
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-red-500 transition-colors">
                  Маҳсулот
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-red-500 transition-colors">
                  Дар бораи мо
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-300 hover:text-red-500 transition-colors">
                  Ҳамчун устод ҳамроҳ шавед
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Тамос</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-red-500" />
                <span className="text-gray-300">+992 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-red-500" />
                <span className="text-gray-300">info@fix.tj</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} FIX.TJ. Ҳамаи ҳуқуқҳо ҳифз шудаанд.</p>
        </div>
      </div>
    </footer>
  )
}
