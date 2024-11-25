import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'

export default function SearchBox() {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <Input 
        type="text" 
        placeholder="Search for tractors by Location, Price, Model..." 
        className="pl-10 pr-24 py-2 w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500 rounded-none"
      />
      <Button 
        type="submit"
        className="absolute right-0 top-0 bottom-0 bg-[#ff4d17] hover:bg-[#e63d0a] text-white font-bold px-4 rounded-none"
      >
        Search
      </Button>
    </div>
  )
}

