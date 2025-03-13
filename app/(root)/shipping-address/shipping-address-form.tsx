'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { ShippingAddress } from '@/types';
import { shippingAddressSchema } from '@/lib/validators';
import { ControllerRenderProps, useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { shippingAddressDefaultValues, US_STATES } from '@/lib/constants';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader, Asterisk } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { updateUserAddress } from '@/lib/actions/user.actions';
import { showErrorToast } from '@/lib/client-utils';

const ShippingAddressForm = ({ address }: { address: ShippingAddress }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address || shippingAddressDefaultValues,
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<z.infer<typeof shippingAddressSchema>> = async (
    values
  ) => {
    startTransition(async () => {
      const res = await updateUserAddress(values);

      if (!res.success) {
        showErrorToast(res.message);
        return;
      }

      router.push('payment-method');
    });
  };

  return (
    <>
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="h2-bold mt-4">Shipping Address</h1>
        <p className="text-sm text-muted-foreground">
          Please enter an address to ship to
        </p>
        <Form {...form}>
          <form
            action="post"
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col md:flex-row gap-5">
              <FormField
                control={form.control}
                name="fullName"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    z.infer<typeof shippingAddressSchema>,
                    'fullName'
                  >;
                }) => (
                  <FormItem className="w-full">
                    <FormLabel className="flex gap-1 py-2">
                      Full Name <Asterisk className="w-3 h-3 text-red-500" />
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              <FormField
                control={form.control}
                name="streetAddress"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    z.infer<typeof shippingAddressSchema>,
                    'streetAddress'
                  >;
                }) => (
                  <FormItem className="w-full">
                    <FormLabel className="flex gap-1 py-2">
                      Address
                      <Asterisk className="w-3 h-3 text-red-500" />
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              <FormField
                control={form.control}
                name="city"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    z.infer<typeof shippingAddressSchema>,
                    'city'
                  >;
                }) => (
                  <FormItem className="w-full">
                    <FormLabel className="flex gap-1 py-2">
                      City
                      <Asterisk className="w-3 h-3 text-red-500" />
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              <FormField
                control={form.control}
                name="state"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    z.infer<typeof shippingAddressSchema>,
                    'state'
                  >;
                }) => (
                  <FormItem className="w-20">
                    <FormLabel className="flex gap-1 py-2">
                      State
                      <Asterisk className="w-3 h-3 text-red-500" />
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose a state" />
                        </SelectTrigger>
                        <SelectContent>
                          {US_STATES.map((state) => (
                            <SelectItem key={state.label} value={state.label}>
                              {state.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              <FormField
                control={form.control}
                name="postalCode"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    z.infer<typeof shippingAddressSchema>,
                    'postalCode'
                  >;
                }) => (
                  <FormItem className="w-28">
                    <FormLabel className="flex gap-1 py-2">
                      Postal Code
                      <Asterisk className="w-3 h-3 text-red-500" />
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter postal code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              <FormField
                control={form.control}
                name="country"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    z.infer<typeof shippingAddressSchema>,
                    'country'
                  >;
                }) => (
                  <FormItem className="w-full">
                    <FormLabel className="flex gap-1 py-2">
                      Country
                      <Asterisk className="w-3 h-3 text-red-500" />
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}{' '}
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ShippingAddressForm;
