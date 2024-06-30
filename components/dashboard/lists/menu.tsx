"use client"

import { useEffect, useState, useCallback } from "react"
import Loader from "@/components/custom-ui/loader"
import MenuForm from "@/components/dashboard/forms/menu-form"

const MenuDetails = ({ menuId }: { menuId: string }) => {
  const [loading, setLoading] = useState(true)
  const [menuDetails, setMenuDetails] = useState<TMenu | null>(null)

  const getMenuDetails = useCallback(async () => {
    try { 
      const res = await fetch(`/api/menus/${menuId}`, {
        method: "GET"
      })
      const data = await res.json()
      setMenuDetails(data)
      setLoading(false)
    } catch (err) {
      console.log("[menuId_GET]", err)
      setLoading(false)
    }
  }, [menuId])

  useEffect(() => {
    getMenuDetails()
  }, [getMenuDetails])

  return loading ? <Loader /> : (
    <MenuForm initialData={menuDetails}/>
  )
}

export default MenuDetails
