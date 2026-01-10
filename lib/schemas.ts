import { z } from "zod";
import {
  ACCEPTED_ICON_TYPES,
  ACCEPTED_MEDIA_TYPES,
  ICON_TYPES,
  MEDIA_TYPES,
  MAX_FILE_SIZE,
} from "./constant";

export const emailSchema = z.object({
  email: z.string().min(1).trim().email(),
});

export const houseSchema = z.object({
  status: z.string().min(1, {
    message: "Selectionner le status de la proprieté.",
  }),
  property: z.string().min(1, {
    message: "Selectionner le type de proprieté.",
  }),
  city: z.string().min(1, {
    message: "Ville oligatoire.",
  }),
  district: z.string().min(1, {
    message: "Quartier obligatoire.",
  }),
  bedrooms: z.string().min(1, {
    message: "Selectionner le nombre de chambre.",
  }),
  bathrooms: z.string().min(1, {
    message: "Selectionner le nombre de douche.",
  }),
  username: z.string().min(1, {
    message: "Nom obligatoire.",
  }),
  email: z
    .string()
    .min(1, {
      message: "Adresse mail obligatoire.",
    })
    .email({ message: "Adresse mail invalide." }),
  phone: z.string().min(1, {
    message: "Numero de téléphone obligatoire.",
  }),
  message: z.string().min(1, {
    message: "Message obligatoire.",
  }),
});

export const contactSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "Nom obligatoire.",
    })
    .trim(),
  email: z
    .string()
    .min(1, {
      message: "Adresse mail obligatoire.",
    })
    .email({ message: "Adresse mail invalide." })
    .trim(),
  phone: z
    .string()
    .min(1, {
      message: "Numero de téléphone obligatoire.",
    })
    .trim(),
  message: z
    .string()
    .min(1, {
      message: "Message obligatoire.",
    })
    .trim(),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Adresse mail obligatoire.",
    })
    .email({ message: "Adresse mail invalide." }),
  password: z.string().min(1, {
    message: "Mot de passe obligatoire.",
  }),
});

export const realStateSchema = z.object({
  deletedMedias: z.array(z.instanceof(String)).optional(),
  images: z
    .array(z.instanceof(File))
    .min(1, "Au moins une image est requise")
    .refine(
      (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
      `Chaque fichier doit être inférieur à ${MAX_FILE_SIZE}MB`,
    )
    .refine(
      (files) =>
        files.every((file) =>
          ACCEPTED_MEDIA_TYPES.includes(file.type as MEDIA_TYPES),
        ),
      "Formats acceptés: .jpg, .jpeg, .png, .webp",
    ),
  title: z.string().min(1, { message: "Le titre est obligatoire." }).trim(),
  online: z.boolean(),
  description: z
    .string()
    .min(1, { message: "La description est obligatoire." }),
  translate: z
    .string()
    .min(1, { message: "La description en anglais est obligatoire." }),
  status: z.string().min(1, { message: "Le status est obligatoire." }),
  property: z
    .string()
    .min(1, { message: "Le type de propriété est obligatoire." }),
  city: z.string().min(1, { message: "La ville est obligatoire." }),
  area: z.string().min(1, { message: "Le quartier est obligatoire." }),
  price: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]+$/.test(val), {
      message: "Le prix doit contenir uniquement des chiffres.",
    }),

  dimension: z.string().optional(),
  bedroom: z
    .string()
    .min(1, { message: "Le nombre de chambres est obligatoire." }),
  bathroom: z
    .string()
    .min(1, { message: "Le nombre de douches est obligatoire." }),
  room: z.string().min(1, { message: "Le nombre de pièces est obligatoire." }),

  pool: z.boolean().optional(),
  view: z.string().optional(),
  options: z.array(z.string()).optional(),
  gym: z.boolean().optional(),
  generator: z.boolean().optional(),
  garden: z.boolean().optional(),
  security: z.boolean().optional(),

  furnished: z.boolean().optional(),
  equippedKitchen: z.boolean().optional(),
  terrace: z.boolean().optional(),
  elevator: z.boolean().optional(),
  clim: z.boolean().optional(),
  pmr: z.boolean().optional(),
  parking: z.boolean().optional(),
  internet: z.boolean().optional(),

  position: z.array(z.number()).refine((val) => val.length === 2, {
    message: "La latitude et longitude sont obligatoires.",
  }),
  email: z.string().optional(),
  telephone: z.string().optional(),
  whatsapp: z.string().optional(),
});

export const editRealStateSchema = z.object({
  deletedMedias: z.array(z.string()).optional(),
  images: z
    .array(z.instanceof(File))
    .refine((files) => {
      if (files.length === 0) return true;
      if (files.length > 0) {
        return files.every((file) => file.size <= MAX_FILE_SIZE);
      }
    }, `Chaque fichier doit être inférieur à ${MAX_FILE_SIZE}MB`)
    .refine((files) => {
      if (files.length === 0) return true;
      if (files.length > 0) {
        return files.every((file) =>
          ACCEPTED_MEDIA_TYPES.includes(file.type as MEDIA_TYPES),
        );
      }
    }, "Formats acceptés: .jpg, .jpeg, .png, .webp")
    .optional(),
  title: z.string().min(1, { message: "Le titre est obligatoire." }).trim(),
  online: z.boolean(),
  description: z
    .string()
    .min(1, { message: "La description est obligatoire." }),
  translate: z
    .string()
    .min(1, { message: "La description en anglais est obligatoire." }),
  status: z.string().min(1, { message: "Le status est obligatoire." }),
  property: z
    .string()
    .min(1, { message: "Le type de propriété est obligatoire." }),
  city: z.string().min(1, { message: "La ville est obligatoire." }),
  area: z.string().min(1, { message: "Le quartier est obligatoire." }),
  price: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]+$/.test(val), {
      message: "Le prix doit contenir uniquement des chiffres.",
    }),
  dimension: z.string().optional(),
  bedroom: z
    .string()
    .min(1, { message: "Le nombre de chambres est obligatoire." }),
  bathroom: z
    .string()
    .min(1, { message: "Le nombre de douches est obligatoire." }),
  room: z.string().min(1, { message: "Le nombre de pièces est obligatoire." }),
  pool: z.boolean().optional(),
  view: z.string().optional(),
  options: z.array(z.string()).optional(),
  gym: z.boolean().optional(),
  generator: z.boolean().optional(),
  garden: z.boolean().optional(),
  security: z.boolean().optional(),

  furnished: z.boolean().optional(),
  equippedKitchen: z.boolean().optional(),
  terrace: z.boolean().optional(),
  elevator: z.boolean().optional(),
  clim: z.boolean().optional(),
  pmr: z.boolean().optional(),
  parking: z.boolean().optional(),
  internet: z.boolean().optional(),

  position: z.array(z.number()).refine((val) => val.length === 2, {
    message: "La latitude et longitude sont obligatoires.",
  }),
  email: z.string().optional(),
  telephone: z.string().optional(),
  whatsapp: z.string().optional(),
});

export const citySchema = z.object({
  city: z.string().min(1, { message: "La ville est obligatoire." }).trim(),
});

export const optionSchema = z.object({
  icon: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `Le fichier doit être inférieur à ${MAX_FILE_SIZE} octets`,
    })
    .refine((file) => ACCEPTED_ICON_TYPES.includes(file.type as ICON_TYPES), {
      message: "Formats acceptés : .svg",
    })
    .optional(),
  name: z
    .string()
    .min(1, { message: "Le nom de l'option est obligatoire." })
    .trim(),
  translate: z
    .string()
    .min(1, { message: "La traduction anglaise du nom est obligatoire." })
    .trim(),
});

export const areaSchema = z.object({
  city: z.string().min(1, { message: "La ville est obligatoire." }).trim(),
  area: z.string().min(1, { message: "Le quartier est obligatoire." }).trim(),
});

export const passwordSchema = z.object({
  oldPassword: z
    .string()
    .min(1, { message: "L'ancien mot de passe est obligatoire." })
    .trim(),
  newPassword: z
    .string()
    .min(1, { message: "Le nouveau mot de passe est obligatoire." })
    .trim(),
});

export const paginationSchema = z.object({
  page: z.string().refine((v) => !isNaN(parseInt(v)), {
    message: "Parametre invalide",
  }),
  pageSize: z.string().refine((v) => !isNaN(parseInt(v)), {
    message: "Parametre invalide",
  }),
  search: z.string().optional(),
});

export const titleSchema = z.object({
  title: z.string().min(1, { message: "Le titre est obligatoire." }).trim(),
});

export type EmailSchemaType = z.infer<typeof emailSchema>;
export type HouseSchemaType = z.infer<typeof houseSchema>;
export type ContactSchemaType = z.infer<typeof contactSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RealStateSchemaType = z.infer<typeof realStateSchema>;
export type EditRealStateSchemaType = z.infer<typeof editRealStateSchema>;

export type CitySchemaType = z.infer<typeof citySchema>;
export type TitleSchemaType = z.infer<typeof titleSchema>;
export type OptionSchemaType = z.infer<typeof optionSchema>;
export type AreaSchemaType = z.infer<typeof areaSchema>;
export type PasswordSchemaType = z.infer<typeof passwordSchema>;
export type PaginationSchemaType = z.infer<typeof paginationSchema>;
