import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Button,
  Section,
  Img,
  Link,
} from "@react-email/components";

type ResetPasswordEmailProps = {
  userName: string;
  resetLink: string;
};

export function ResetPasswordEmailTemplate({
  resetLink,
  userName,
}: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <style>{`
                @font-face {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 400;
                  src: url(https://rsms.me/inter/font-files/Inter-Regular.woff2?v=3.19) format('woff2');
                }
                * {
                  font-family: 'Inter', sans-serif;
                }
                body {
                  margin: 0;
                }
              `}</style>
      </Head>
      <Body style={{ margin: 0 }}>
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "0.5rem",
          }}
        >
          {/* Espace en haut */}
          <Section style={{ height: "64px" }} />
          {/* Logo */}
          <Section
            style={{
              marginBottom: "32px",
              textAlign: "left",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Img
              src="https://upside-gabon.com/_next/image?url=%2FLogo.png&w=640&q=75"
              alt="Logo"
              width={300}
              height={70}
              style={{
                display: "block",
                outline: "none",
                border: "none",
                objectFit: "contain",
                objectPosition: "center",
              }}
            />
          </Section>
          {/* Titre (optionnel, à ajouter si besoin) */}
          <Text
            style={{
              fontSize: "30px",
              lineHeight: "36px",
              fontWeight: 700,
              color: "#111827",
              marginBottom: "12px",
              textAlign: "left",
            }}
          >
            {/* Vous pouvez ajouter ici un titre si nécessaire */}
          </Text>
          {/* Message de salutation */}
          <Text
            style={{
              fontSize: "15px",
              lineHeight: "26.25px",
              color: "#374151",
              margin: "16px 0 20px 0",
            }}
          >
            Bonjour {userName},
          </Text>
          {/* Instruction principale */}
          <Text
            style={{
              fontSize: "15px",
              lineHeight: "26.25px",
              color: "#374151",
              margin: "0 0 20px 0",
            }}
          >
            Vous avez récemment demandé à réinitialiser votre mot de passe pour
            Upside. Pour procéder à la réinitialisation, veuillez cliquer sur le
            lien ci-dessous :
          </Text>
          {/* Bouton de réinitialisation */}
          <Section style={{ textAlign: "left", marginBottom: "20px" }}>
            <Button
              href={resetLink}
              style={{
                backgroundColor: "#2bb998",
                color: "#ffffff",
                borderColor: "#2bb998",
                borderWidth: "2px",
                borderStyle: "solid",
                fontSize: "14px",
                fontWeight: 500,
                borderRadius: "6px",
                padding: "12px 32px",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Réinitialiser mon mot de passe
            </Button>
          </Section>
          {/* Lien alternatif */}
          <Text
            style={{
              fontSize: "15px",
              lineHeight: "26.25px",
              color: "#374151",
              margin: "0 0 20px 0",
            }}
          >
            Si le lien ci-dessus ne fonctionne pas, copiez-collez l’URL suivante
            dans votre navigateur :
          </Text>
          <Text
            style={{
              fontSize: "15px",
              lineHeight: "26.25px",
              color: "#374151",
              margin: "0 0 20px 0",
            }}
          >
            <Link
              href={resetLink}
              style={{
                color: "#111827",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              {resetLink}
            </Link>
          </Text>
          {/* Durée de validité */}
          <Text
            style={{
              fontSize: "15px",
              lineHeight: "26.25px",
              color: "#374151",
              margin: "0 0 20px 0",
            }}
          >
            Ce lien est valable pendant 30 minutes. Passé ce délai, vous devrez
            refaire une demande de réinitialisation.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export function NewsletterAdminNotificationEmail({
  userEmail,
}: {
  userEmail: string;
}) {
  return (
    <Html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <style>{`
                @font-face {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 400;
                  src: url(https://rsms.me/inter/font-files/Inter-Regular.woff2?v=3.19) format('woff2');
                }
                * {
                  font-family: 'Inter', sans-serif;
                }
                body {
                  margin: 0;
                }
              `}</style>
      </Head>
      <Body style={{ margin: 0 }}>
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "0.5rem",
          }}
        >
          <Section style={{ height: "64px" }} />
          <Section
            style={{
              marginBottom: "32px",
              textAlign: "left",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Img
              src="https://upside-gabon.com/_next/image?url=%2FLogo.png&w=640&q=75"
              alt="Logo"
              width={300}
              height={70}
              style={{
                display: "block",
                outline: "none",
                border: "none",
                objectFit: "contain",
                objectPosition: "center",
              }}
            />
          </Section>
          <Text
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#111827",
              marginBottom: "12px",
            }}
          >
            Nouvelle inscription à la newsletter
          </Text>
          <Text
            style={{
              fontSize: "15px",
              lineHeight: "26.25px",
              color: "#374151",
              marginBottom: "20px",
            }}
          >
            L'utilisateur possédant l’adresse email suivante vient de s’abonner
            à la newsletter :
          </Text>
          <Text
            style={{
              fontSize: "16px",
              fontWeight: 500,
              color: "#2bb998",
              marginBottom: "24px",
            }}
          >
            {userEmail}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export function ContactAdminNotificationEmail({
  username,
  email,
  telephone,
  message,
}: {
  username: string;
  email: string;
  telephone: string;
  message: string;
}) {
  return (
    <Html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <style>{`
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            src: url(https://rsms.me/inter/font-files/Inter-Regular.woff2?v=3.19) format('woff2');
          }
          * {
            font-family: 'Inter', sans-serif;
          }
          body {
            margin: 0;
          }
        `}</style>
      </Head>
      <Body style={{ margin: 0 }}>
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "0.5rem",
          }}
        >
          <Section style={{ height: "64px" }} />
          <Section style={{ marginBottom: "32px", textAlign: "left" }}>
            <Img
              src="https://upside-gabon.com/_next/image?url=%2FLogo.png&w=640&q=75"
              alt="Logo"
              width={300}
              height={70}
              style={{
                display: "block",
                outline: "none",
                border: "none",
                objectFit: "contain",
                objectPosition: "center",
              }}
            />
          </Section>
          <Text
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#111827",
              marginBottom: "12px",
            }}
          >
            Nouveau message via le formulaire de contact
          </Text>
          <Text
            style={{
              fontSize: "15px",
              lineHeight: "26.25px",
              color: "#374151",
              marginBottom: "12px",
            }}
          >
            Un utilisateur a envoyé un message via le formulaire de contact :
          </Text>

          <Text style={{ fontSize: "16px", fontWeight: 500, color: "#111827" }}>
            Nom : <span style={{ color: "#2bb998" }}>{username}</span>
          </Text>
          <Text style={{ fontSize: "16px", fontWeight: 500, color: "#111827" }}>
            Email : <span style={{ color: "#2bb998" }}>{email}</span>
          </Text>
          <Text style={{ fontSize: "16px", fontWeight: 500, color: "#111827" }}>
            Téléphone : <span style={{ color: "#2bb998" }}>{telephone}</span>
          </Text>
          <Text
            style={{
              fontSize: "16px",
              fontWeight: 500,
              color: "#111827",
              marginTop: "16px",
            }}
          >
            Message :
          </Text>
          <Text
            style={{
              fontSize: "15px",
              color: "#374151",
              marginBottom: "24px",
              whiteSpace: "pre-wrap",
            }}
          >
            {message}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export function AskAdminNotificationEmail({
  property,
  city,
  area,
  bedroom,
  bathroom,
  status,
  username,
  email,
  phone,
  message,
}: {
  property: string;
  city: string;
  area: string;
  bedroom: string;
  bathroom: string;
  status: string;
  username: string;
  email: string;
  phone: string;
  message: string;
}) {
  return (
    <Html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <style>{`
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            src: url(https://rsms.me/inter/font-files/Inter-Regular.woff2?v=3.19) format('woff2');
          }
          * {
            font-family: 'Inter', sans-serif;
          }
          body {
            margin: 0;
          }
        `}</style>
      </Head>
      <Body style={{ margin: 0 }}>
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "0.5rem",
          }}
        >
          <Section style={{ height: "64px" }} />
          <Section
            style={{
              marginBottom: "32px",
              textAlign: "left",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Img
              src="https://upside-gabon.com/_next/image?url=%2FLogo.png&w=640&q=75"
              alt="AskHouse Logo"
              width={300}
              height={70}
              style={{
                display: "block",
                outline: "none",
                border: "none",
                objectFit: "contain",
                objectPosition: "center",
              }}
            />
          </Section>
          <Text
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#111827",
              marginBottom: "12px",
            }}
          >
            Nouvelle demande de contact reçue
          </Text>
          <Text
            style={{
              fontSize: "15px",
              lineHeight: "26.25px",
              color: "#374151",
              marginBottom: "12px",
            }}
          >
            Un utilisateur vous a contacté au sujet d’un bien :
          </Text>

          <Text style={{ fontSize: "16px", fontWeight: 500, color: "#111827" }}>
            Status : <span style={{ color: "#2bb998" }}>{status}</span>
          </Text>

          <Text style={{ fontSize: "16px", fontWeight: 500, color: "#111827" }}>
            Bien : <span style={{ color: "#2bb998" }}>{property}</span>
          </Text>
          <Text style={{ fontSize: "16px", fontWeight: 500, color: "#111827" }}>
            Ville : <span style={{ color: "#2bb998" }}>{city}</span>
          </Text>
          <Text style={{ fontSize: "16px", fontWeight: 500, color: "#111827" }}>
            Quartier : <span style={{ color: "#2bb998" }}>{area}</span>
          </Text>
          <Text style={{ fontSize: "16px", fontWeight: 500, color: "#111827" }}>
            Chambres : <span style={{ color: "#2bb998" }}>{bedroom}</span>
          </Text>
          <Text style={{ fontSize: "16px", fontWeight: 500, color: "#111827" }}>
            Salles de bain :{" "}
            <span style={{ color: "#2bb998" }}>{bathroom}</span>
          </Text>

          <Section style={{ marginTop: "24px" }}>
            <Text
              style={{ fontSize: "16px", fontWeight: 500, color: "#111827" }}
            >
              Nom : <span style={{ color: "#2bb998" }}>{username}</span>
            </Text>
            <Text
              style={{ fontSize: "16px", fontWeight: 500, color: "#111827" }}
            >
              Email : <span style={{ color: "#2bb998" }}>{email}</span>
            </Text>
            <Text
              style={{ fontSize: "16px", fontWeight: 500, color: "#111827" }}
            >
              Téléphone : <span style={{ color: "#2bb998" }}>{phone}</span>
            </Text>
            <Text
              style={{
                fontSize: "16px",
                fontWeight: 500,
                color: "#111827",
                marginTop: "16px",
              }}
            >
              Message :
            </Text>
            <Text
              style={{
                fontSize: "15px",
                color: "#374151",
                marginBottom: "24px",
                whiteSpace: "pre-wrap",
              }}
            >
              {message}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
