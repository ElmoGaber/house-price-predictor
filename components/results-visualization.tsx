"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface PredictionResult {
  model: string
  price: number
  confidence: number
  accuracy: number
}

interface ResultsVisualizationProps {
  predictions: PredictionResult[]
  showCharts?: boolean
}

export function ResultsVisualization({ predictions, showCharts = false }: ResultsVisualizationProps) {
  if (predictions.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">No Results Yet</h3>
            <p className="text-sm text-muted-foreground">Run a prediction to see detailed results and analysis</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const bestPrediction = predictions.reduce((best, current) => (current.accuracy > best.accuracy ? current : best))

  const averagePrice = predictions.reduce((sum, pred) => sum + pred.price, 0) / predictions.length
  const priceRange = {
    min: Math.min(...predictions.map((p) => p.price)),
    max: Math.max(...predictions.map((p) => p.price)),
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Best Prediction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${bestPrediction.price.toLocaleString()}</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                {bestPrediction.model}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {(bestPrediction.accuracy * 100).toFixed(1)}% accuracy
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averagePrice.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">Across {predictions.length} models</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Price Range</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">
              ${priceRange.min.toLocaleString()} - ${priceRange.max.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Variance: ${(priceRange.max - priceRange.min).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Results */}
      <Card>
        <CardHeader>
          <CardTitle>Model Predictions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictions.map((prediction) => (
              <div key={prediction.model} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-semibold">{prediction.model}</div>
                    <div className="text-sm text-muted-foreground">
                      Confidence: {(prediction.confidence * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">${prediction.price.toLocaleString()}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={prediction.accuracy * 100} className="w-16 h-2" />
                    <span className="text-xs text-muted-foreground">{(prediction.accuracy * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {showCharts && (
        <Card>
          <CardHeader>
            <CardTitle>Price Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="text-lg font-semibold mb-2">Chart Visualization</div>
                <p className="text-sm">Advanced charts coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
