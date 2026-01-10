"use client";

import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { Combobox } from "@/components/combobox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { rubik } from "@/font/font";
import { editRealStateSchema, EditRealStateSchemaType } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { filtersData } from "./data";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import InputFile from "./input-file";
import {
  FiltersType,
  OptionType,
  PlaceType,
  RealStateType,
  RequestResponse,
} from "@/lib/type";
import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { filters } from "@/actions/filters";
import { edit } from "@/actions/realstate";
import v from "voca";
import { list } from "@/actions/option";
import { ROOM_DATA } from "@/lib/constant";
import { toast } from "sonner";
import useQueryActionFile from "@/hooks/useQueryActionFile";

import { unique } from "@/actions/realstate";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import CardMediaSlider from "@/components/caroussel/card-media-slider";
import { Switch } from "@/components/ui/switch";
import GoogleMapbox from "@/components/google-mapbox";

type EditHouseFormProps = {
  id: string;
};

export default function EditHouseForm({ id }: EditHouseFormProps) {
  const [data, setData] = useState<RealStateType>();

  const queryClient = useQueryClient();
  const [cities, setCities] = useState<PlaceType[]>([]);
  const [areas, setAreas] = useState<PlaceType[]>([]);
  const [medias, setMedias] = useState<string[]>([]);
  const [property, setProperty] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EditRealStateSchemaType>({
    resolver: zodResolver(editRealStateSchema),
    defaultValues: {
      deletedMedias: [],
      images: [],
      title: "",
      description: "",
      translate: "",
      status: "",
      online: false,
      property: "",
      price: "",
      city: "",
      area: "",
      dimension: "",
      bedroom: "",
      bathroom: "",
      room: "",
      pool: false,
      view: "",
      options: [],
      gym: false,
      generator: false,
      garden: false,
      security: false,
      position: [],
      email: "",
      telephone: "",
      whatsapp: "",
    },
  });

  const realstate = useQuery({
    queryKey: ["unique_realstate", id],
    queryFn: () => unique({ id }),
  });

  const query: UseQueryResult<FiltersType, Error> = useQuery({
    queryKey: ["filters"],
    queryFn: () => filters(),
  });

  const options = useQuery({
    queryKey: ["options"],
    queryFn: () => list(),
  });

  const { mutate, isPending } = useQueryActionFile<
    EditRealStateSchemaType & { id: string },
    RequestResponse<RealStateType[]>
  >(
    edit,
    () => {
      queryClient.invalidateQueries({ queryKey: ["unique_realstate", id] });
      queryClient.invalidateQueries({ queryKey: ["filters"] });
      window.location.reload();
    },
    "unique_realstate"
  );

  useEffect(() => {
    if (realstate.data && realstate.data) {
      setData(realstate.data.data);
      const opts = realstate.data.data?.options.map((opt: OptionType) =>
        JSON.stringify({
          id: opt.id,
          icon: opt.icon,
          name: opt.name,
          translate: opt.translate,
        })
      );
      const p = filtersData.properties.find(
        (f) => f.value === realstate.data.data.property
      )?.label as string;
      const bedroom =
        realstate.data.data.bedroom === 6
          ? "+5"
          : realstate.data.data.bedroom === 0
            ? ""
            : String(realstate.data.data.bedroom);

      const bathroom =
        realstate.data.data.bathroom === 6
          ? "+5"
          : realstate.data.data.bathroom === 0
            ? ""
            : String(realstate.data.data.bathroom);

      const room =
        realstate.data.data.room === 6
          ? "+5"
          : realstate.data.data.room === 0
            ? ""
            : String(realstate.data.data.room);

      setProperty(p);
      setMedias(realstate.data.data?.images ?? []);
      form.setValue("title", realstate.data.data.title);
      form.setValue("dimension", realstate.data.data?.dimension ?? "");
      form.setValue("status", realstate.data.data.status);
      form.setValue("online", realstate.data.data.online);
      form.setValue("property", p);
      form.setValue("bedroom", bedroom);
      form.setValue("bathroom", bathroom), form.setValue("room", room);
      form.setValue("city", realstate.data.data.city);
      form.setValue("area", realstate.data.data.area);
      if (realstate.data.data.price > 0) {
        form.setValue("price", String(realstate.data.data.price));
      }
      form.setValue("email", realstate.data.data?.email ?? "");
      form.setValue("furnished", realstate.data.data.furnished);
      form.setValue("equippedKitchen", realstate.data.data.equippedKitchen);
      form.setValue("terrace", realstate.data.data.terrace);
      form.setValue("security", realstate.data.data.security);
      form.setValue("pmr", realstate.data.data.pmr);
      form.setValue("elevator", realstate.data.data.elevator);
      form.setValue("view", realstate.data.data.view);
      form.setValue("pool", realstate.data.data.pool);
      form.setValue("internet", realstate.data.data?.internet);
      form.setValue("gym", realstate.data.data.gym);
      form.setValue("garden", realstate.data.data.garden);
      form.setValue("parking", realstate.data.data.parking);
      form.setValue("clim", realstate.data.data.clim);
      form.setValue("generator", realstate.data.data.generator);
      form.setValue("view", realstate.data.data.view);
      form.setValue("telephone", realstate.data.data?.phone ?? "");
      form.setValue("whatsapp", realstate.data.data?.whatsapp ?? "");
      form.setValue("description", realstate.data.data.description);
      form.setValue("translate", realstate.data.data.translate);
      form.setValue("position", realstate.data.data.position);
      form.setValue("options", opts ?? []);
    }
  }, [realstate.data]);

  useEffect(() => {
    if (query.data?.cities) {
      setCities([
        ...query.data.cities.map((f, index) => ({
          id: index,
          label: v.titleCase(f.name),
          value: f.name,
        })),
      ]);
    }
  }, [query.data?.cities]);

  useEffect(() => {
    const deletedMedias = form.getValues("deletedMedias");
    const images = form.getValues("images");
    const hasImage = medias.map((f) => deletedMedias?.filter((t) => t === f));
    if (hasImage.length === 0 && images?.length === 0) {
      form.clearErrors("images");
    }
  }, [form.watch]);

  useEffect(() => {
    if (ROOM_DATA.includes(property)) {
      form.setValue("bedroom", "0");
      form.setValue("bathroom", "0");
    }
    if (property === "Terrain") {
      form.setValue("bedroom", "0");
      form.setValue("bathroom", "0");
      form.setValue("room", "0");
    }
    if (!ROOM_DATA.includes(property) && property !== "Terrain") {
      form.setValue("room", "0");
    }
  }, [property]);

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name !== "city") return;
      const city = value.city;

      if (!city) {
        setAreas([]);
        return;
      }

      if (query.data?.areas) {
        const filteredAreas = query.data.areas
          .filter((area) => area.city.toLowerCase() === city.toLowerCase())
          .map((area, index) => ({
            id: index,
            label: v.titleCase(area.name),
            value: area.name,
          }));
        setAreas(filteredAreas);
      }
    });

    return () => subscription.unsubscribe();
  }, [query.data?.areas]);

  async function submit(formData: EditRealStateSchemaType) {
    try {
      if (isSubmitting) return;
      setIsSubmitting(true);
      const validateData = editRealStateSchema.safeParse(formData);
      if (validateData.success) {
        const property = Object.entries(filtersData.properties).find(
          (v) => v[1].label === formData.property
        );
        const { data } = validateData;
        const hasImage = medias.map((f) =>
          data.deletedMedias?.filter((t) => t === f)
        );

        if (hasImage.length === 0 && data.images?.length === 0) {
          return form.setError("images", {
            message: "Au moins une image est requise.",
          });
        }

        mutate({
          ...formData,
          property: property?.[1].value as string,
          id: id,
        });
      }
    } catch (error: any) {
      toast.error(error.message || "Une erreur s'est produite");
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className="space-y-6">
      <h2
        className={clsx(
          "flex items-center gap-x-1 font-semibold text-(--turquoise) text-xl uppercase",
          rubik.className
        )}
      >
        <Link href="/admin/real-state">
          <ArrowLeftIcon size={15} />
        </Link>
        Modifiction des informations de la propriété
      </h2>
      {query.isLoading && !data && (
        <div className="flex justify-center p-4">
          <Spinner className="w-6 h-6 text-neutral-600" />
        </div>
      )}
      {!query.isLoading && data && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className="space-y-2 mb-10"
          >
            <FormField
              name="deletedMedias"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex w-full overflow-hidden">
                      <CardMediaSlider
                        medias={medias}
                        setMedias={setMedias}
                        onChange={(e) => field.onChange(e)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="images"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <InputFile
                      error={!!fieldState.error?.message}
                      handleFiles={(e) => field.onChange(e)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="online"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-row justify-between items-center bg-background p-3 border rounded-lg">
                  <div className="space-y-0.5">
                    <FormLabel>Publier le bien</FormLabel>
                    <FormDescription>
                      Cochez cette case pour afficher ce bien sur le site.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 w-full">
              <div className="space-y-2 w-full">
                <FormField
                  name="title"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="-space-y-2">
                      <FormLabel className={clsx("text-sm", rubik.className)}>
                        Titre*
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-background shadow-xs border focus-visible:border-ring border-border rounded-md outline-none focus-visible:ring-(--bright-green)/50 h-9 placeholder:text-neutral-500 text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="status"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormItem className="-space-y-2">
                      <FormLabel className={clsx("text-sm", rubik.className)}>
                        Statut*
                      </FormLabel>
                      <FormControl>
                        <Combobox
                          datas={filtersData.categories}
                          value={field.value}
                          setValue={(value) => field.onChange(value as string)}
                          placeholder="Ex:..Louer"
                          emptyText="Statut"
                          notFoundText="Aucun statut trouvé."
                          error={!!fieldState.error?.message}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2 w-full">
                <FormField
                  name="dimension"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="-space-y-2">
                      <FormLabel className={clsx("text-sm", rubik.className)}>
                        Dimension
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-background shadow-xs border focus-visible:border-ring border-border rounded-md outline-none focus-visible:ring-(--bright-green)/50 h-9 placeholder:text-neutral-500 text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="property"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormItem className="-space-y-2">
                      <FormLabel className={clsx("text-sm", rubik.className)}>
                        Type de propriété*
                      </FormLabel>
                      <FormControl>
                        <Combobox
                          datas={filtersData.properties}
                          value={field.value}
                          setValue={(value) => {
                            setProperty(value);
                            field.onChange(value as string);
                          }}
                          placeholder="Ex:..Villa"
                          emptyText="Type de proprieté"
                          notFoundText="Aucune propriété trouvée."
                          error={!!fieldState.error?.message}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {ROOM_DATA.includes(property) && (
              <div className="gap-2 grid grid-cols-1 w-full">
                <FormField
                  name="room"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormItem className="-space-y-2">
                      <FormLabel className={clsx("text-sm", rubik.className)}>
                        Nombre de pièces*
                      </FormLabel>
                      <FormControl>
                        <Combobox
                          datas={filtersData.bedrooms}
                          value={field.value}
                          setValue={(value) => field.onChange(value as string)}
                          placeholder="Ex:..2"
                          emptyText="Nombre de pièces"
                          notFoundText="Aucune pièces trouvée."
                          error={!!fieldState.error?.message}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {!ROOM_DATA.includes(property) && property !== "Terrain" && (
              <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 w-full">
                <FormField
                  name="bedroom"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormItem className="-space-y-2">
                      <FormLabel className={clsx("text-sm", rubik.className)}>
                        Nombre de chambres*
                      </FormLabel>
                      <FormControl>
                        <Combobox
                          datas={filtersData.bedrooms}
                          value={field.value}
                          setValue={(value) => field.onChange(value as string)}
                          placeholder="Ex:..2"
                          emptyText="Nombre de chambres"
                          notFoundText="Aucun nombre trouvé."
                          error={!!fieldState.error?.message}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="bathroom"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormItem className="-space-y-2">
                      <FormLabel className={clsx("text-sm", rubik.className)}>
                        Nombre de douches*
                      </FormLabel>
                      <FormControl>
                        <Combobox
                          datas={filtersData.bathrooms}
                          value={field.value}
                          setValue={(value) => field.onChange(value as string)}
                          placeholder="Ex:..2"
                          emptyText="Nombre de douches"
                          notFoundText="Aucun nombre trouvé."
                          error={!!fieldState.error?.message}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 w-full">
              <div className="space-y-2 w-full">
                <FormField
                  name="city"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormItem className="-space-y-2">
                      <FormLabel className={clsx("text-sm", rubik.className)}>
                        Ville*
                      </FormLabel>
                      <FormControl>
                        <Combobox
                          datas={cities}
                          value={field.value}
                          setValue={(value) => field.onChange(value as string)}
                          placeholder="Ex:..Pointe-Noire"
                          emptyText="Ville"
                          notFoundText="Aucune ville trouvée."
                          error={!!fieldState.error?.message}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="price"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="-space-y-2">
                      <FormLabel className={clsx("text-sm", rubik.className)}>
                        Prix
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-background shadow-xs border focus-visible:border-ring border-border rounded-md outline-none focus-visible:ring-(--bright-green)/50 h-9 placeholder:text-neutral-500 text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="gap-2 grid grid-cols-2">
                  <FormField
                    name="furnished"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="-space-y-2">
                        <FormControl>
                          <Label
                            htmlFor={field.name}
                            className={clsx(
                              "flex items-center bg-background hover:bg-accent shadow-xs p-3 border border-border rounded-md cursor-pointer",
                              field.value && "!bg-(--brown)"
                            )}
                          >
                            <Checkbox
                              checked={field.value}
                              id={field.name}
                              className="border-neutral-400"
                              onCheckedChange={(e) => {
                                field.onChange(e);
                              }}
                            />
                            <p>Meublé</p>
                          </Label>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="equippedKitchen"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="-space-y-2">
                        <FormControl>
                          <Label
                            htmlFor={field.name}
                            className={clsx(
                              "flex items-center bg-background hover:bg-accent shadow-xs p-3 border border-border rounded-md cursor-pointer",
                              field.value && "!bg-(--brown)"
                            )}
                          >
                            <Checkbox
                              checked={field.value}
                              id={field.name}
                              className="border-neutral-400"
                              onCheckedChange={(e) => {
                                field.onChange(e);
                              }}
                            />
                            <p>Cuisine équipée</p>
                          </Label>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="terrace"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="-space-y-2">
                        <FormControl>
                          <Label
                            htmlFor={field.name}
                            className={clsx(
                              "flex items-center bg-background hover:bg-accent shadow-xs p-3 border border-border rounded-md cursor-pointer",
                              field.value && "!bg-(--brown)"
                            )}
                          >
                            <Checkbox
                              checked={field.value}
                              id={field.name}
                              className="border-neutral-400"
                              onCheckedChange={(e) => {
                                field.onChange(e);
                              }}
                            />
                            <p>Balcon / Terrace</p>
                          </Label>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="security"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="-space-y-2">
                        <FormControl>
                          <Label
                            htmlFor={field.name}
                            className={clsx(
                              "flex items-center bg-background hover:bg-accent shadow-xs p-3 border border-border rounded-md cursor-pointer",
                              field.value && "!bg-(--brown)"
                            )}
                          >
                            <Checkbox
                              checked={field.value}
                              id={field.name}
                              className="border-neutral-400"
                              onCheckedChange={(e) => {
                                field.onChange(e);
                              }}
                            />
                            <p>Sécurité</p>
                          </Label>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="pmr"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="-space-y-2">
                        <FormControl>
                          <Label
                            htmlFor={field.name}
                            className={clsx(
                              "flex items-center bg-background hover:bg-accent shadow-xs p-3 border border-border rounded-md cursor-pointer",
                              field.value && "!bg-(--brown)"
                            )}
                          >
                            <Checkbox
                              checked={field.value}
                              id={field.name}
                              className="border-neutral-400"
                              onCheckedChange={(e) => {
                                field.onChange(e);
                              }}
                            />
                            <p>Accès PMR</p>
                          </Label>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="elevator"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="-space-y-2">
                        <FormControl>
                          <Label
                            htmlFor={field.name}
                            className={clsx(
                              "flex items-center bg-background hover:bg-accent shadow-xs p-3 border border-border rounded-md cursor-pointer",
                              field.value && "!bg-(--brown)"
                            )}
                          >
                            <Checkbox
                              checked={field.value}
                              id={field.name}
                              className="border-neutral-400"
                              onCheckedChange={(e) => {
                                field.onChange(e);
                              }}
                            />
                            <p>Ascenceur</p>
                          </Label>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  name="view"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormItem className="-space-y-2">
                      <FormControl>
                        <Combobox
                          datas={filtersData.views}
                          value={field.value as string}
                          setValue={(value) => field.onChange(value as string)}
                          placeholder="Ex:..Vue mer"
                          emptyText="Type de vue"
                          notFoundText="Aucune vue trouvée."
                          error={!!fieldState.error?.message}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2 w-full">
                <FormField
                  name="area"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormItem className="-space-y-2">
                      <FormLabel className={clsx("text-sm", rubik.className)}>
                        Quartier*
                      </FormLabel>
                      <FormControl>
                        <Combobox
                          datas={areas}
                          value={field.value}
                          setValue={(value) => field.onChange(value as string)}
                          placeholder="Ex:..Aéroport"
                          emptyText="Quartier"
                          notFoundText="Aucun quartier trouvé."
                          error={!!fieldState.error?.message}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="-space-y-2">
                      <FormLabel className={clsx("text-sm", rubik.className)}>
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Ex:...johndoe@exemple.com"
                          className="bg-background shadow-xs border focus-visible:border-ring border-border rounded-md outline-none focus-visible:ring-(--bright-green)/50 h-9 placeholder:text-neutral-500 text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="gap-2 grid grid-cols-2">
                  <FormField
                    name="pool"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="-space-y-2">
                        <FormControl>
                          <Label
                            htmlFor={field.name}
                            className={clsx(
                              "flex items-center bg-background hover:bg-accent shadow-xs p-3 border border-border rounded-md cursor-pointer",
                              field.value && "!bg-(--brown)"
                            )}
                          >
                            <Checkbox
                              checked={field.value}
                              id={field.name}
                              className="border-neutral-400"
                              onCheckedChange={(e) => {
                                field.onChange(e);
                              }}
                            />
                            <p>Piscine</p>
                          </Label>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="internet"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="-space-y-2">
                        <FormControl>
                          <Label
                            htmlFor={field.name}
                            className={clsx(
                              "flex items-center bg-background hover:bg-accent shadow-xs p-3 border border-border rounded-md cursor-pointer",
                              field.value && "!bg-(--brown)"
                            )}
                          >
                            <Checkbox
                              checked={field.value}
                              id={field.name}
                              className="border-neutral-400"
                              onCheckedChange={(e) => {
                                field.onChange(e);
                              }}
                            />
                            <p>Internet</p>
                          </Label>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="gym"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="-space-y-2">
                        <FormControl>
                          <Label
                            htmlFor={field.name}
                            className={clsx(
                              "flex items-center bg-background hover:bg-accent shadow-xs p-3 border border-border rounded-md cursor-pointer",
                              field.value && "!bg-(--brown)"
                            )}
                          >
                            <Checkbox
                              checked={field.value}
                              id={field.name}
                              className="border-neutral-400"
                              onCheckedChange={(e) => {
                                field.onChange(e);
                              }}
                            />
                            <p>Salle de sport</p>
                          </Label>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="garden"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="-space-y-2">
                        <FormControl>
                          <Label
                            htmlFor={field.name}
                            className={clsx(
                              "flex items-center bg-background hover:bg-accent shadow-xs p-3 border border-border rounded-md cursor-pointer",
                              field.value && "!bg-(--brown)"
                            )}
                          >
                            <Checkbox
                              checked={field.value}
                              id={field.name}
                              className="border-neutral-400"
                              onCheckedChange={(e) => {
                                field.onChange(e);
                              }}
                            />
                            <p>Jardin</p>
                          </Label>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="parking"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="-space-y-2">
                        <FormControl>
                          <Label
                            htmlFor={field.name}
                            className={clsx(
                              "flex items-center bg-background hover:bg-accent shadow-xs p-3 border border-border rounded-md cursor-pointer",
                              field.value && "!bg-(--brown)"
                            )}
                          >
                            <Checkbox
                              checked={field.value}
                              id={field.name}
                              className="border-neutral-400"
                              onCheckedChange={(e) => {
                                field.onChange(e);
                              }}
                            />
                            <p>Parking / Garage</p>
                          </Label>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="clim"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="-space-y-2">
                        <FormControl>
                          <Label
                            htmlFor={field.name}
                            className={clsx(
                              "flex items-center bg-background hover:bg-accent shadow-xs p-3 border border-border rounded-md cursor-pointer",
                              field.value && "!bg-(--brown)"
                            )}
                          >
                            <Checkbox
                              checked={field.value}
                              id={field.name}
                              className="border-neutral-400"
                              onCheckedChange={(e) => {
                                field.onChange(e);
                              }}
                            />
                            <p>Climatisation</p>
                          </Label>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  name="generator"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="-space-y-2">
                      <FormControl>
                        <Label
                          htmlFor={field.name}
                          className={clsx(
                            "flex items-center space-x-1 bg-background hover:bg-accent shadow-xs p-3 border border-border rounded-md cursor-pointer",
                            field.value && "!bg-(--brown)"
                          )}
                        >
                          <Checkbox
                            checked={field.value}
                            id={field.name}
                            className="border-neutral-400"
                            onCheckedChange={(e) => {
                              field.onChange(e);
                            }}
                          />
                          <p>Groupe élèctrogène</p>
                        </Label>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              name="options"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <MultipleSelector
                      options={options.data?.data.map((option: OptionType) => ({
                        id: option.id,
                        value: option.name,
                        label: option.name,
                        icon: option.icon,
                        translate: option.translate,
                      }))}
                      value={
                        Array.isArray(field.value) && field.value.length > 0
                          ? field.value.map((e) => {
                              const opt = JSON.parse(e) as OptionType;
                              return {
                                id: opt.id,
                                value: opt.name,
                                label: opt.name,
                                icon: opt.icon,
                                translate: opt.translate,
                              };
                            })
                          : []
                      }
                      isPending={options.isLoading}
                      placeholder="Sélectionner des options"
                      emptyIndicator={
                        <p className="text-gray-600 dark:text-gray-400 text-sm text-center leading-10">
                          Aucune option trouvée
                        </p>
                      }
                      error={!!fieldState.error?.message}
                      onChange={(e: Option[]) => {
                        field.onChange(
                          e.map((option) =>
                            JSON.stringify({
                              id: option.id,
                              icon: option.icon,
                              name: option.value,
                              translate: option.translate,
                            })
                          )
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="gap-2 grid grid-cols-2">
              <FormField
                name="telephone"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="-space-y-2">
                    <FormLabel className={clsx("text-sm", rubik.className)}>
                      Numéro de téléphone
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-background shadow-xs border focus-visible:border-ring border-border rounded-md outline-none focus-visible:ring-(--bright-green)/50 h-9 placeholder:text-neutral-500 text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="whatsapp"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="-space-y-2">
                    <FormLabel className={clsx("text-sm", rubik.className)}>
                      Numéro whatsapp
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-background shadow-xs border focus-visible:border-ring border-border rounded-md outline-none focus-visible:ring-(--bright-green)/50 h-9 placeholder:text-neutral-500 text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="-space-y-2">
                  <FormLabel className={clsx("text-sm", rubik.className)}>
                    Description*
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="!bg-background !shadow-xs !border focus-visible:border-ring !border-border !rounded-md outline-none focus-visible:ring-(--bright-green)/50 h-20 placeholder:text-neutral-500 text-sm"
                    ></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="translate"
              control={form.control}
              render={({ field }) => (
                <FormItem className="-space-y-2">
                  <FormLabel className={clsx("text-sm", rubik.className)}>
                    Description en anglais*
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="!bg-background !shadow-xs !border focus-visible:border-ring !border-border !rounded-md outline-none focus-visible:ring-(--bright-green)/50 h-20 placeholder:text-neutral-500 text-sm"
                    ></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="position"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <div
                      className={clsx(
                        "flex justify-center items-center bg-background shadow-slate-400/30 shadow-sm p-2 border border-transparent rounded-lg w-full h-[350px] overflow-hidden",
                        fieldState.error?.message && "border-destructive"
                      )}
                    >
                      <GoogleMapbox
                        value={
                          Array.isArray(field.value) && field.value.length === 2
                            ? field.value
                            : undefined
                        }
                        handleChange={(coords) =>
                          field.onChange([coords[0], coords[1]])
                        }
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="search"
                disabled={isPending || isSubmitting}
                className="bg-(--bright-green) shadow-none rounded-lg h-10"
              >
                {(isPending || isSubmitting) && (
                  <Spinner className="w-4 h-4 text-(--light)" />
                )}
                {!isPending && !isSubmitting && "Modifier"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
