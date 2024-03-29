"use client";
import axios from "axios";
import * as  z  from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Button } from "../ui/button";
import toast from "react-hot-toast";


const FormShema = z.object({
    name: z.string().min(2),
});

export const StoreModal = () => {
    const StoreModal = useStoreModal();

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof FormShema>>({
        resolver: zodResolver(FormShema),
        defaultValues : {
            name: "",
        },
    })

    const onSubmit =async (values: z.infer<typeof FormShema>) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/stores', values);
            toast.success("Store created")
            window.location.assign(`/${response.data.id}`);
          } catch (error) {
            toast.error('Something went wrong');
          } finally {
            setLoading(false);
          }
    }
    return (
        <Modal
            title="Create Store"
            description="Add new store"
            isOpen = {StoreModal.isOpen}
            onClose={StoreModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit= {form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) =>(
                                    <FormItem>
                                        <FormLabel>
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                disabled = {loading}
                                                placeholder="E-Commerce" {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button
                                    disabled = {loading}
                                    variant="outline"
                                    onClick={StoreModal.onClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    disabled = {loading} 
                                    type="submit"
                                >
                                    Continue
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>

        </Modal>
    );
};