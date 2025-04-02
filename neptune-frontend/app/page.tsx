"use client"

import { useState } from "react"
import { Cpu, Database, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/modal"

// Define types for models and databases
type TrendingItem = {
  id: string
  name: string
  organization: string
  fullName: string
  type: string
  category: "model" | "database"
  downloads: string
  description: string
  parameters?: string
  format?: string
  size?: string
  license: string
  updatedAt: string
  likes: string
}

// Sample trending data
const trendingData: TrendingItem[] = [
  {
    id: "1",
    name: "DeepSeek-V3-0324",
    organization: "deepseek-ai",
    fullName: "deepseek-ai/DeepSeek-V3-0324",
    type: "Text Generation",
    category: "model",
    downloads: "60.5k",
    description:
      "DeepSeek-V3 is a state-of-the-art language model designed for advanced text generation tasks. It excels in understanding context, generating coherent responses, and maintaining consistency across long-form content.",
    parameters: "7B",
    license: "Apache 2.0",
    updatedAt: "3 days ago",
    likes: "1.99k",
  },
  {
    id: "2",
    name: "Qwen2.5-0nmi-7B",
    organization: "Qwen",
    fullName: "Qwen/Qwen2.5-0nmi-7B",
    type: "Any-to-Any",
    category: "model",
    downloads: "27.9k",
    description:
      "Qwen2.5 is a multimodal model capable of processing and generating content across different modalities including text, images, and structured data. It's designed for versatile applications requiring cross-modal understanding.",
    parameters: "7B",
    license: "MIT",
    updatedAt: "1 day ago",
    likes: "822",
  },
  {
    id: "3",
    name: "llama-Nemotron-Dataset",
    organization: "nvidia",
    fullName: "nvidia/llama-Nemotron-Dataset",
    type: "Viewer",
    category: "database",
    downloads: "15.2M",
    description:
      "A comprehensive dataset used for training the Nemotron language model. This dataset contains a diverse range of text from various sources, carefully curated to enhance model performance across multiple domains and tasks.",
    format: "parquet",
    size: "1.2TB",
    license: "CC BY-NC 4.0",
    updatedAt: "12 days ago",
    likes: "269",
  },
]

export default function LandingPage() {
  const [selectedItem, setSelectedItem] = useState<TrendingItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openItemDetails = (item: TrendingItem) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      {/* Header - With Narrower Height */}
      <header className="border-b border-border px-4 py-1 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/neptune-combined-logo.svg"
            alt="Neptune"
            width={500}
            height={125}
            className="h-24 w-auto"
            priority
          />
        </Link>

        <nav className="flex items-center gap-8">
          <Link
            href="/models"
            className="flex items-center gap-1.5 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <Cpu className="w-5 h-5" />
            <span>Models</span>
          </Link>
          <Link
            href="/databases"
            className="flex items-center gap-1.5 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <Database className="w-5 h-5" />
            <span>Databases</span>
          </Link>
          <ThemeToggle />
        </nav>
      </header>

      {/* Main Content - Stacked Layout with Larger Elements */}
      <main className="flex-1 flex flex-col px-6 py-8 max-w-6xl mx-auto w-full">
        {/* Hero Section - Larger */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-4">Discover, Share, and Use AI Models</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-6 text-lg">
            Neptune provides a minimalistic platform for AI researchers and developers to find and share models and
            datasets.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/models">
              <Button className="bg-primary hover:bg-primary/90 h-12 px-8 text-base">Explore Models</Button>
            </Link>
            <Link href="/databases">
              <Button variant="outline" className="border-border hover:bg-muted h-12 px-8 text-base">
                Browse Databases
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Row - Larger */}
        <div className="flex justify-center gap-20 mb-10">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">1.5M+</div>
            <div className="text-base text-muted-foreground">AI Models</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">340K+</div>
            <div className="text-base text-muted-foreground">Databases</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">Daily</div>
            <div className="text-base text-muted-foreground">Updates</div>
          </div>
        </div>

        {/* Trending Section - Simplified and Larger */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4 text-center">Trending</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Trending Items */}
            {trendingData.map((item) => (
              <div
                key={item.id}
                className="border border-border bg-card rounded-lg p-4 hover:bg-muted transition cursor-pointer"
                onClick={() => openItemDetails(item)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-8 h-8 ${item.id === "3" ? "bg-primary/70" : item.id === "2" ? "bg-accent" : "bg-primary"} rounded-sm flex items-center justify-center`}
                    >
                      {item.category === "model" ? <Cpu className="w-4 h-4" /> : <Database className="w-4 h-4" />}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-mono truncate">{item.fullName}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <span>{item.type}</span>
                      <span>•</span>
                      <span>{item.downloads} downloads</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4 px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src="/neptune-logo.svg" alt="Neptune" width={40} height={40} className="h-10 w-10" />
            <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} Neptune</span>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              About
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Documentation
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              GitHub
            </Link>
          </div>
        </div>
      </footer>

      {/* Item Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedItem && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-8 h-8 ${selectedItem.id === "3" ? "bg-primary/70" : selectedItem.id === "2" ? "bg-accent" : "bg-primary"} rounded-sm flex items-center justify-center`}
                  >
                    {selectedItem.category === "model" ? <Cpu className="w-4 h-4" /> : <Database className="w-4 h-4" />}
                  </div>
                  <DialogTitle className="font-mono">{selectedItem.fullName}</DialogTitle>
                </div>
                <DialogDescription className="text-left">{selectedItem.type}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 my-2">
                <p>{selectedItem.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  {selectedItem.category === "model" ? (
                    <>
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium">Parameters</h4>
                        <p className="text-sm text-muted-foreground">{selectedItem.parameters}</p>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium">License</h4>
                        <p className="text-sm text-muted-foreground">{selectedItem.license}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium">Format</h4>
                        <p className="text-sm text-muted-foreground">{selectedItem.format}</p>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium">Size</h4>
                        <p className="text-sm text-muted-foreground">{selectedItem.size}</p>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium">License</h4>
                        <p className="text-sm text-muted-foreground">{selectedItem.license}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <DialogFooter>
                <Button size="sm" className="gap-2 ml-auto">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

