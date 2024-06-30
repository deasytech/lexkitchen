"use client"

import { useEffect, useState } from "react"
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
import Loader from "@/components/custom-ui/loader"
import MultiText from "@/components/custom-ui/multi-text"
import MultiSelect from "@/components/custom-ui/multi-select"

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(500).trim(),
  media: z.array(z.string()),
  category: z.string(),
  menus: z.array(z.string()),
  tags: z.array(z.string()),
  sizes: z.array(z.string()),
  price: z.coerce.number().min(0.1),
})

interface DishFormProps {
  initialData?: TDish | null;
}

const DishForm: React.FC<DishFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [ loading, setLoading ] = useState(false);
  const [ menus, setMenus ] = useState<TMenu[]>([]);

  const getMenus = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/menus", {
        method: "GET",
      });
      const data = await res.json();
      console.log(data)
      setMenus(data);
    } catch (err) {
      console.log("[menus_GET]", err);
      toast.error("Something went wrong! Please try again.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMenus();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
        ...initialData,
        menus: initialData.menus.map(
          (menu) => menu._id
        ),
      } : {
        title: "",
        description: "",
        media: [],
        category: "",
        menus: [],
        tags: [],
        sizes: [],
        price: 0.1,
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
      const url = initialData ? `/api/dishes/${initialData._id}` : "/api/dishes";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(`Dish ${initialData ? "updated" : "created"}`);
        window.location.href = "/dashboard/dishes";
        router.push("/dashboard/dishes");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again.");
      console.error("[dishes_POST]", error)
    }
  }

  return (loading ? (
    <Loader />
  ) : (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Dish</p>
          <Delete id={initialData._id} item="dish" />
        </div>
      ) : (
        <p className="text-heading2-bold">Create Dish</p>
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
                  <Input placeholder="Title" {...field} onKeyDown={handleKeyPress} />
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
            name="media"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={(url) => field.onChange([ ...field.value, url ])}
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((image) => image !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Category"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <MultiText
                      placeholder="Tags"
                      value={field.value}
                      onChange={(tag) => field.onChange([ ...field.value, tag ])}
                      onRemove={(tagToRemove) =>
                        field.onChange([
                          ...field.value.filter((tag) => tag !== tagToRemove),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {menus && menus.length > 0 && (
              <FormField
                control={form.control}
                name="menus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Menus</FormLabel>
                    <FormControl>
                      <MultiSelect
                        placeholder="Menus"
                        menus={menus}
                        value={field.value}
                        onChange={(_id) =>
                          field.onChange([ ...field.value, _id ])
                        }
                        onRemove={(idToRemove) =>
                          field.onChange([
                            ...field.value.filter(
                              (menuId) => menuId !== idToRemove
                            ),
                          ])
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="sizes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sizes</FormLabel>
                  <FormControl>
                    <MultiText
                      placeholder="Sizes"
                      value={field.value}
                      onChange={(size) =>
                        field.onChange([ ...field.value, size ])
                      }
                      onRemove={(sizeToRemove) =>
                        field.onChange([
                          ...field.value.filter(
                            (size) => size !== sizeToRemove
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-10">
            <Button type="submit" variant="destructive">Submit</Button>
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard/dishes")}>Discard</Button>
          </div>
        </form>
      </Form>
    </div>
  ))
}

export default DishForm