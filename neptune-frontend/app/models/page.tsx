"use client"

import { useState } from "react"
import { Search, ChevronDown, ArrowUpDown, Cpu, Database, Download, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

// Define model type for type safety
type Model = {
  id: string
  name: string
  organization: string
  fullName: string
  type: string
  updatedAt: string
  downloads: string
  likes: string
  description: string
  parameters: string
  license: string
}

// Sample model data
const modelData: Model[] = [
  {
    id: "1",
    name: "DeepSeek-V3-0324",
    organization: "deepseek-ai",
    fullName: "deepseek-ai/DeepSeek-V3-0324",
    type: "Text Generation",
    updatedAt: "3 days ago",
    downloads: "60.5k",
    likes: "1.99k",
    description:
      "DeepSeek-V3 is a state-of-the-art language model designed for advanced text generation tasks. It excels in understanding context, generating coherent responses, and maintaining consistency across long-form content.",
    parameters: "7B",
    license: "Apache 2.0",
  },
  {
    id: "2",
    name: "Qwen2.5-0nmi-7B",
    organization: "Qwen",
    fullName: "Qwen/Qwen2.5-0nmi-7B",
    type: "Any-to-Any",
    updatedAt: "1 day ago",
    downloads: "27.9k",
    likes: "822",
    description:
      "Qwen2.5 is a multimodal model capable of processing and generating content across different modalities including text, images, and structured data. It's designed for versatile applications requiring cross-modal understanding.",
    parameters: "7B",
    license: "MIT",
  },
]

export default function ModelsPage() {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModelDetails = (model: Model) => {
    setSelectedModel(model)
    setIsModalOpen(true)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
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
          <Link href="/models" className="flex items-center gap-1.5 text-base font-medium text-primary">
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

      {/* Main Content */}
      <main className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-64 border-r border-border p-4 hidden md:block">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Tasks</h3>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  Text Generation
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  Image-to-Text
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  Text-to-Image
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  Any-to-Any
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Size</h3>
              <div className="relative pt-1">
                <div className="h-1 bg-muted rounded-full">
                  <div
                    className="absolute h-4 w-4 bg-primary rounded-full -mt-1.5 transform -translate-x-1/2"
                    style={{ left: "30%" }}
                  ></div>
                  <div
                    className="absolute h-4 w-4 bg-primary rounded-full -mt-1.5 transform -translate-x-1/2"
                    style={{ left: "70%" }}
                  ></div>
                  <div className="h-1 bg-primary rounded-full" style={{ width: "40%", marginLeft: "30%" }}></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>&lt; 1k</span>
                  <span>&gt; 1T</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Models</h1>
              <span className="ml-2 text-sm text-muted-foreground">1,554,891</span>
            </div>
            <div className="flex items-center gap-2">
              <Button className="gap-2 mr-2" size="sm">
                <Upload className="h-4 w-4" />
                Upload Model
              </Button>
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Filter by name"
                  className="pl-10 bg-card border-border text-sm rounded-md w-full focus:ring-primary focus:border-primary h-9"
                />
              </div>
              <Button variant="outline" size="sm" className="border-border hover:bg-muted">
                <span className="hidden sm:inline-block mr-2">Sort:</span>
                <span>Trending</span>
                <ArrowUpDown className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Model List */}
          <div className="space-y-4">
            {/* Model Items */}
            {modelData.map((model) => (
              <div
                key={model.id}
                className="border border-border bg-card rounded-lg p-4 hover:bg-muted transition cursor-pointer"
                onClick={() => openModelDetails(model)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-5 h-5 ${model.id === "1" ? "bg-primary" : "bg-accent"} rounded-sm flex items-center justify-center`}
                    >
                      <Cpu className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-mono truncate">{model.fullName}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span>{model.type}</span>
                      <span>•</span>
                      <span>Updated {model.updatedAt}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M4 13V21H20V13"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 15V3M12 15L7 10M12 15L17 10"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {model.downloads}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {model.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline" className="border-border hover:bg-muted text-sm">
              Load More
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>

      {/* Model Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedModel && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-8 h-8 ${selectedModel.id === "1" ? "bg-primary" : "bg-accent"} rounded-sm flex items-center justify-center`}
                  >
                    <Cpu className="w-4 h-4" />
                  </div>
                  <DialogTitle className="font-mono">{selectedModel.fullName}</DialogTitle>
                </div>
                <DialogDescription className="text-left">{selectedModel.type}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 my-2">
                <p>{selectedModel.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Parameters</h4>
                    <p className="text-sm text-muted-foreground">{selectedModel.parameters}</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">License</h4>
                    <p className="text-sm text-muted-foreground">{selectedModel.license}</p>
                  </div>
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

