"use client"

import { useEffect, useState, useCallback } from "react"
import Loader from "@/components/custom-ui/loader"
import DishForm from "@/components/dashboard/forms/dish-form"

const DishDetails = ({ dishId }: { dishId: string }) => {
  const [loading, setLoading] = useState(true)
  const [dishDetails, setDishDetails] = useState<TDish | null>(null)

  const getDishDetails = useCallback(async () => {
    try {
      const res = await fetch(`/api/dishes/${dishId}`, {
        method: "GET"
      })
      const data = await res.json()
      setDishDetails(data)
      setLoading(false)
    } catch (err) {
      console.log("[dish_GET]", err)
      setLoading(false)
    }
  }, [dishId])

  useEffect(() => {
    getDishDetails()
  }, [getDishDetails])

  return loading ? <Loader /> : (
    <DishForm initialData={dishDetails}/>
  )
}

export default DishDetails
