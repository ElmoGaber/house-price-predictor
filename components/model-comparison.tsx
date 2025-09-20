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

interface ModelComparisonProps {
  predictions: PredictionResult[]
}

export function ModelComparison({ predictions }: ModelComparisonProps) {
  if (predictions.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">No Model Data</h3>
            <p className="text-sm text-muted-foreground">Run a prediction to compare model performance</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const sortedPredictions = [...predictions].sort((a, b) => b.accuracy - a.accuracy)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Model Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedPredictions.map((prediction, index) => (
              <div key={prediction.model} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Badge variant={index === 0 ? "default" : "secondary"}>#{index + 1}</Badge>
                    <span className="font-semibold">{prediction.model}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">${prediction.price.toLocaleString()}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">{(prediction.accuracy * 100).toFixed(1)}% Accuracy</div>
                    <div className="text-xs text-muted-foreground">
                      {(prediction.confidence * 100).toFixed(1)}% Confidence
                    </div>
                  </div>
                  <div className="w-24">
                    <Progress value={prediction.accuracy * 100} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
