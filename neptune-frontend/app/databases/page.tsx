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

// Define database type for type safety
type DatabaseItem = {
  id: string
  name: string
  organization: string
  fullName: string
  type: string
  updatedAt: string
  downloads: string
  likes: string
  description: string
  format: string
  size: string
  license: string
}

// Sample database data
const databaseData: DatabaseItem[] = [
  {
    id: "1",
    name: "llama-Nemotron-Post-Training-Dataset-v1",
    organization: "nvidia",
    fullName: "nvidia/llama-Nemotron-Post-Training-Dataset-v1",
    type: "Viewer",
    updatedAt: "12 days ago",
    downloads: "15.2M",
    likes: "269",
    description:
      "A comprehensive dataset used for post-training the Nemotron language model. This dataset contains a diverse range of text from various sources, carefully curated to enhance model performance across multiple domains and tasks.",
    format: "parquet",
    size: "1.2TB",
    license: "CC BY-NC 4.0",
  },
  {
    id: "2",
    name: "reasoning-v1-20m",
    organization: "glaiveai",
    fullName: "glaiveai/reasoning-v1-20m",
    type: "Viewer",
    updatedAt: "11 days ago",
    downloads: "22.2M",
    likes: "131",
    description:
      "A specialized dataset focused on enhancing reasoning capabilities in language models. Contains 20 million examples of complex reasoning tasks, logical puzzles, and step-by-step problem solving scenarios.",
    format: "json",
    size: "450GB",
    license: "MIT",
  },
]

export default function DatabasesPage() {
  const [selectedDatabase, setSelectedDatabase] = useState<DatabaseItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openDatabaseDetails = (database: DatabaseItem) => {
    setSelectedDatabase(database)
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
          <Link
            href="/models"
            className="flex items-center gap-1.5 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <Cpu className="w-5 h-5" />
            <span>Models</span>
          </Link>
          <Link href="/databases" className="flex items-center gap-1.5 text-base font-medium text-primary">
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
              <h3 className="text-sm font-medium mb-2">Modalities</h3>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  3D
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  Audio
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  Geospatial
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  Image
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  Tabular
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  Text
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  Time-series
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  Video
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Format</h3>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  json
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  csv
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  parquet
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  imagefolder
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Databases</h1>
              <span className="ml-2 text-sm text-muted-foreground">342,953</span>
            </div>
            <div className="flex items-center gap-2">
              <Button className="gap-2 mr-2" size="sm">
                <Upload className="h-4 w-4" />
                Upload Database
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

          {/* Database List */}
          <div className="space-y-4">
            {/* Database Items */}
            {databaseData.map((database) => (
              <div
                key={database.id}
                className="border border-border bg-card rounded-lg p-4 hover:bg-muted transition cursor-pointer"
                onClick={() => openDatabaseDetails(database)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-5 h-5 ${database.id === "1" ? "bg-primary" : "bg-accent"} rounded-sm flex items-center justify-center`}
                    >
                      <Database className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-mono truncate">{database.fullName}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span>{database.type}</span>
                      <span>•</span>
                      <span>Updated {database.updatedAt}</span>
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
                        {database.downloads}
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
                        {database.likes}
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

      {/* Database Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedDatabase && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-8 h-8 ${selectedDatabase.id === "1" ? "bg-primary" : "bg-accent"} rounded-sm flex items-center justify-center`}
                  >
                    <Database className="w-4 h-4" />
                  </div>
                  <DialogTitle className="font-mono">{selectedDatabase.fullName}</DialogTitle>
                </div>
                <DialogDescription className="text-left">{selectedDatabase.type}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 my-2">
                <p>{selectedDatabase.description}</p>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Format</h4>
                    <p className="text-sm text-muted-foreground">{selectedDatabase.format}</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Size</h4>
                    <p className="text-sm text-muted-foreground">{selectedDatabase.size}</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">License</h4>
                    <p className="text-sm text-muted-foreground">{selectedDatabase.license}</p>
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

