import puppeteer from "puppeteer";
import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

// Fonction d'installation de Chrome si nécessaire
async function ensureBrowser() {
  try {
    // Pour vérifier si Chrome est déjà installé
    await puppeteer
      .launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      })
      .then((browser) => browser.close());
  } catch (error) {
    console.log("Chrome n'est pas installé. Installation en cours...");
    // Installation de Chrome via Puppeteer
    const { execSync } = require("child_process");
    try {
      execSync("npx puppeteer browsers install chrome", { stdio: "inherit" });
    } catch (installError) {
      console.error("Erreur d'installation automatique:", installError);
      throw new Error(
        "Impossible d'installer Chrome automatiquement. Veuillez l'installer manuellement.",
      );
    }
  }
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "Le lien de capture n'est pas valide." },
      { status: 400 },
    );
  }

  try {
    // S'assurer que Chrome est installé
    await ensureBrowser();

    // Lancer Puppeteer avec des options spécifiques pour Ubuntu VPS
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage", // Important pour les VPS avec mémoire limitée
        "--disable-gpu",
        "--disable-software-rasterizer",
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1080, deviceScaleFactor: 2 });

    // Gestion des cookies
    const cookieHeader = request.headers.get("cookie");
    if (cookieHeader) {
      try {
        const targetDomain = new URL(url).hostname;

        // Traitement des cookies avec validation
        const parsedCookies = cookieHeader
          .split(";")
          .map((cookie) => {
            const parts = cookie.trim().split("=");
            if (parts.length < 2 || !parts[0]) return null;

            const name = parts[0].trim();
            const value = parts.slice(1).join("=").trim();

            // Validation basique pour éviter les erreurs
            if (!name || name.includes(" ")) return null;

            return {
              name,
              value,
              domain: targetDomain,
              path: "/",
              httpOnly: false,
              secure: url.startsWith("https"),
              sameSite: "Lax" as const,
            };
          })
          .filter((cookie) => cookie !== null);

        console.log(`Nombre de cookies valides: ${parsedCookies.length}`);

        // Application des cookies valides seulement
        if (parsedCookies.length > 0) {
          for (const cookie of parsedCookies) {
            await page.setCookie(cookie);
          }
        }
      } catch (cookieError) {
        console.error("Erreur lors du traitement des cookies:", cookieError);
        // Continuer sans cookies en cas d'erreur
      }
    }

    // Navigation vers l'URL cible
    console.log(`Accès à l'URL: ${url}`);
    await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

    // Attente du sélecteur
    const selector = "#capture-me";
    console.log(`Recherche du sélecteur: ${selector}`);
    await page.waitForSelector(selector, { visible: true, timeout: 10000 });

    // Attendre que toutes les images soient chargées
    await page.evaluate(async () => {
      const promises = Array.from(document.images).map((img) => {
        if (img.complete) return Promise.resolve(true);
        return new Promise((resolve) => {
          img.onload = img.onerror = () => resolve(true);
        });
      });
      await Promise.all(promises);
    });

    // Attendre un indicateur personnalisé si disponible
    try {
      await page.waitForFunction(() => (window as any).isDataReady === true, {
        timeout: 10000,
      });
    } catch (e) {
      console.log(
        "Variable isDataReady non trouvée ou timeout, poursuite du processus...",
      );
    }

    // Capture de l'élément
    const element = await page.$(selector);
    if (!element) {
      await browser.close();
      return NextResponse.json(
        { error: "La section à capturer n'a pas été trouvée." },
        { status: 404 },
      );
    }

    const box = await element.boundingBox();
    if (!box) {
      await browser.close();
      return NextResponse.json(
        { error: "Impossible de récupérer les dimensions de la section." },
        { status: 500 },
      );
    }

    // Prise de la capture d'écran
    console.log("Prise de capture d'écran...");
    const imageBuffer = await page.screenshot({
      type: "png",
      clip: {
        x: box.x,
        y: box.y,
        width: box.width,
        height: box.height,
      },
    });

    await browser.close();

    // Création du PDF avec pdf-lib
    console.log("Création du PDF...");
    const pdfDoc = await PDFDocument.create();
    const pngImage = await pdfDoc.embedPng(imageBuffer);
    const pngDims = pngImage.scale(1);

    // Largeur A4 en points
    const a4Width = 595.28;

    // Calcul du ratio pour adapter la largeur
    const scale = a4Width / pngDims.width;
    const scaledHeight = pngDims.height * scale;

    const pagePdf = pdfDoc.addPage([a4Width, scaledHeight]);
    pagePdf.drawImage(pngImage, {
      x: 0,
      y: 0,
      width: a4Width,
      height: scaledHeight,
    });

    const pdfBytes = await pdfDoc.save();

    console.log("PDF généré avec succès");

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="capture-section.pdf"`,
        "Cache-Control": "no-cache",
      },
    });
  } catch (error: any) {
    console.error("Erreur lors de la capture:", error);
    return NextResponse.json(
      { error: `Erreur lors de la génération du PDF: ${error.message}` },
      { status: 500 },
    );
  }
}
