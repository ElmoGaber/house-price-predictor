"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

interface HouseFeatures {
  sqft: number
  bedrooms: number
  bathrooms: number
  age: number
  location: string
  garageSize: number
  lotSize: number
}

interface PredictionFormProps {
  features: HouseFeatures
  setFeatures: (features: HouseFeatures) => void
  onPredict: () => void
  isLoading: boolean
}

export function PredictionForm({ features, setFeatures, onPredict, isLoading }: PredictionFormProps) {
  const updateFeature = (key: keyof HouseFeatures, value: string | number) => {
    setFeatures({ ...features, [key]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>House Features</CardTitle>
        <CardDescription>Enter the property details to get price predictions from multiple ML models</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="sqft">Square Feet</Label>
            <Input
              id="sqft"
              type="number"
              value={features.sqft}
              onChange={(e) => updateFeature("sqft", Number.parseInt(e.target.value) || 0)}
              placeholder="2000"
            />
          </div>
          <div>
            <Label htmlFor="age">Age (years)</Label>
            <Input
              id="age"
              type="number"
              value={features.age}
              onChange={(e) => updateFeature("age", Number.parseInt(e.target.value) || 0)}
              placeholder="10"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Select
              value={features.bedrooms.toString()}
              onValueChange={(value) => updateFeature("bedrooms", Number.parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Select
              value={features.bathrooms.toString()}
              onValueChange={(value) => updateFeature("bathrooms", Number.parseFloat(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 1.5, 2, 2.5, 3, 3.5, 4].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="location">Location Type</Label>
          <Select value={features.location} onValueChange={(value) => updateFeature("location", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="urban">Urban</SelectItem>
              <SelectItem value="suburban">Suburban</SelectItem>
              <SelectItem value="rural">Rural</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="garage">Garage Size</Label>
            <Select
              value={features.garageSize.toString()}
              onValueChange={(value) => updateFeature("garageSize", Number.parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} cars
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="lotSize">Lot Size (acres)</Label>
            <Input
              id="lotSize"
              type="number"
              step="0.1"
              value={features.lotSize}
              onChange={(e) => updateFeature("lotSize", Number.parseFloat(e.target.value) || 0)}
              placeholder="0.25"
            />
          </div>
        </div>

        <Button onClick={onPredict} disabled={isLoading} className="w-full" size="lg">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing with ML Models...
            </>
          ) : (
            "Predict Price"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
