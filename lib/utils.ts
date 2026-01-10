import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function initialName(name: string): string {
  const splitName = name.split(" ");
  if (splitName.length === 1) {
    return `${splitName[0][0]}${splitName[0][1]}`;
  }
  return `${splitName[0][0]}${splitName[1][0]}`;
}

export function limiteName(name: string, limit?: number, isPoint = true) {
  const point = isPoint ? "..." : ""
  if (name.length > (limit || 15)) {
    return name.slice(0, (limit || 15)) + point;
  }
  return name
}

export function formatPrice(amount: number): string {
  const formattedNumber = amount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return `${formattedNumber || "0"}`;
}

export function mapValue(input: number | string): number {
  if (input === '+5') return 6;
  return Number(input);
}

export function getFrPropertyType(property: string): string {
  const propertyType = {
    "Villa": "Villa",
    "Apartment": "Appartement",
    "Office": "Bureau",
    "Commercial Space": "Espace commercial",
    "Land": "Terrain",
    "Warehouse": "Entrepôt",
  };
  return propertyType[property as keyof typeof propertyType] || property;
}

export function getLocalOrderType(property: string): string {
  const propertyType = {
    "Ascending price": "order1",
    "Descending price": "order2",
    "Oldest to newest": "order3",
  };
  return propertyType[property as keyof typeof propertyType] || property;
}

export async function createFileFromImageName(imageUrl?: string): Promise<File | null> {
  if (!imageUrl || imageUrl === "undefined") return null;
  const response = await fetch(imageUrl);
  const imageName = imageUrl.split("/").pop() as string;
  const blob = await response.blob();
  const file = new File([blob], imageName, { type: blob.type });
  return file;
}

export function getLocaleFromPathname(): string {
  if (typeof window === "undefined") return "fr";
  const pathname = window.location.pathname;
  const locale = pathname.split("/")[1];
  return ["fr", "en"].includes(locale) ? locale : "fr";
}