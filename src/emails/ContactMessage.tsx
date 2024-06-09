import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

const startYear = 2023;
const year = new Date().getFullYear();

interface ContactMessageProps {
  name: string;
  email: string;
  message: string;
}

const baseUrl = process.env.BASE_URL || "https://branchstudio.io";
export const ContactMessage = ({
  name,
  email,
  message,
}: ContactMessageProps) => {
  const previewText = `Message to Branch Software Studio`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/logo.png`}
                width="60"
                height="60"
                alt="Branch Software Studio"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              <strong>BRANCH</strong> Software Studio
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Message From: <strong>{name}</strong> (
              <Link
                href={`mailto:${email}`}
                className="text-blue-600 no-underline"
              >
                {email}
              </Link>
              )
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              {message}
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Heading
              as="h3"
              className="mb-2 text-[12px] font-normal text-[#666666]"
            >
              Simple, creative, and effective websites.
            </Heading>
            <Text className="m-0 p-0 text-[10px] leading-snug text-[#666666]">
              © {startYear} - {year} Branch Software Studio LLC. All rights
              reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

ContactMessage.PreviewProps = {
  name: "Andrew Branch",
  email: "andrew@branchstudio.io",
  message:
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
} as ContactMessageProps;

export default ContactMessage;
