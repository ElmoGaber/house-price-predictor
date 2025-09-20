"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PredictionForm } from "./prediction-form"
import { ModelComparison } from "./model-comparison"
import { ResultsVisualization } from "./results-visualization"
import { MLModelEngine } from "@/lib/ml-models"

interface HouseFeatures {
  sqft: number
  bedrooms: number
  bathrooms: number
  age: number
  location: string
  garageSize: number
  lotSize: number
}

interface PredictionResult {
  model: string
  price: number
  confidence: number
  accuracy: number
}

export function HousePricePredictorApp() {
  const [features, setFeatures] = useState<HouseFeatures>({
    sqft: 2000,
    bedrooms: 3,
    bathrooms: 2,
    age: 10,
    location: "suburban",
    garageSize: 2,
    lotSize: 0.25,
  })

  const [predictions, setPredictions] = useState<PredictionResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState<string>("ensemble")

  const mlEngine = new MLModelEngine()

  const handlePredict = async () => {
    setIsLoading(true)
    try {
      // Simulate ML processing time
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const results = mlEngine.predictAllModels(features)
      setPredictions(results)
    } catch (error) {
      console.error("Prediction error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const bestPrediction =
    predictions.length > 0
      ? predictions.reduce((best, current) => (current.accuracy > best.accuracy ? current : best))
      : null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">House Price Predictor</h1>
              <p className="text-muted-foreground mt-1">
                ML-powered real estate analysis with multiple regression models
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                {predictions.length} Models Active
              </Badge>
              {bestPrediction && (
                <Badge variant="default" className="text-sm">
                  Best: {bestPrediction.model} ({(bestPrediction.accuracy * 100).toFixed(1)}%)
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Prediction Form */}
          <div className="lg:col-span-1">
            <PredictionForm
              features={features}
              setFeatures={setFeatures}
              onPredict={handlePredict}
              isLoading={isLoading}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="results" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="results">Prediction Results</TabsTrigger>
                <TabsTrigger value="comparison">Model Comparison</TabsTrigger>
                <TabsTrigger value="visualization">Data Visualization</TabsTrigger>
              </TabsList>

              <TabsContent value="results" className="space-y-6">
                {predictions.length > 0 ? (
                  <ResultsVisualization predictions={predictions} />
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center h-64">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-muted-foreground mb-2">No Predictions Yet</h3>
                        <p className="text-sm text-muted-foreground">
                          Enter house features and click "Predict Price" to see results
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="comparison">
                <ModelComparison predictions={predictions} />
              </TabsContent>

              <TabsContent value="visualization">
                <ResultsVisualization predictions={predictions} showCharts />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
