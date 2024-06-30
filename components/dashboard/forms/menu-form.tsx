"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import ImageUpload from "@/components/custom-ui/image-upload"
import toast from "react-hot-toast"
import Delete from "@/components/custom-ui/delete"

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(500).trim(),
  image: z.string(),
})

interface MenuFormProps {
  initialData?: TMenu | null;
}

const MenuForm: React.FC<MenuFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [ loading, setLoading ] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? initialData : {
      title: "",
      description: "",
      image: "",
    },
  })

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const url = initialData ? `/api/menus/${initialData._id}` : "/api/menus";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(`Menu ${initialData ? "updated" : "created"}`);
        window.location.href = "/dashboard/menus";
        router.push("/dashboard/menus");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again.");
      console.error("[menus_POST]", error)
    }
  }

  return (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Menu</p>
          <Delete id={initialData._id} item="menu" />
        </div>
      ) : (
        <p className="text-heading2-bold">Create Menu</p>
      )}
      <Separator className="bg-gray-500 mt-4 mb-7" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Menu title" {...field} onKeyDown={handleKeyPress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Menu description" {...field} rows={5} onKeyDown={handleKeyPress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [ field.value ] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-10">
            <Button type="submit" variant="destructive">Submit</Button>
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard/menus")}>Discard</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default MenuForm