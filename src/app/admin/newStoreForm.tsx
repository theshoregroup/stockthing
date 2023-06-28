"use client";

import { Store } from "@prisma/client";
import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "~/components/ui/button";
import { Save, XCircle } from "lucide-react";
import { useTransition } from "react";
import { handleAddStore } from "~/server/actions/stores";

export default function NewStoreForm() {
  const newStore = useForm<Store>();
  const [saving, startSaving] = useTransition();

  function handleSubmit(data: Store) {
    startSaving(async () => {
      const res = handleAddStore(data);
      if (!res) throw new Error("Failed to create store");
    });
  }

  return (
    <Form {...newStore}>
      <form onSubmit={newStore.handleSubmit(handleSubmit)}>
        <FormField
          control={newStore.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Name</FormLabel>
              <FormControl>
                <Input placeholder="Chichester" {...field} />
              </FormControl>
              <FormDescription>
                The name of the store you want to add
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-2">
          <Save className="mr-1 h-5 w-5" />
          Save and close
        </Button>
      </form>
    </Form>
  );
}
