package main

import (
    "fmt"
    "math"
)

// Define the Shape interface with the Area method.
type Shape interface {
    Area() float64
}

// Define the Rectangle struct with width and height.
type Rectangle struct {
    Width  float64
    Height float64
}

// Implement the Area method for Rectangle.
func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

// Define the Circle struct with radius.
type Circle struct {
    Radius float64
}

// Implement the Area method for Circle.
func (c Circle) Area() float64 {
    return math.Pi * c.Radius * c.Radius
}

func main() {
    // Create a rectangle and a circle.
    rectangle := Rectangle{Width: 5, Height: 10}
    circle := Circle{Radius: 3}

    // Use the Shape interface to calculate and print areas.
    shapes := []Shape{rectangle, circle}

    for _, shape := range shapes {
        fmt.Printf("Area of shape: %.2f\n", shape.Area())
    }
}
